import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getOpenAIClient, openaiConfigured, SYSTEM_PROMPTS, MODEL_MINI, MAX_TOKENS } from "@/lib/ai/openai";
import { mockDelay, isOpenAIBillingError } from "@/lib/ai/mock-engine";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { service, subcategory, businessScale, timeline, goals } = body;

    const scaleMultiplier: Record<string, number> = {
      "Solo / Freelancer": 0.8,
      "Small Business (1–10 employees)": 1,
      "Mid-size Business (11–50 employees)": 1.8,
      "Growing Business (51–200 employees)": 2.8,
      "Large Enterprise (200+ employees)": 5,
    };
    const mult = scaleMultiplier[businessScale] ?? 1;
    const baseMin = Math.round(15000 * mult);
    const baseMax = Math.round(50000 * mult);

    // ── Try real OpenAI ──────────────────────────────────
    if (openaiConfigured) {
      try {
        const client = await getOpenAIClient();
        if (client) {
          const userPrompt = `Generate a cost estimate for:
Service: ${service} — ${subcategory}
Business Scale: ${businessScale}
Timeline: ${timeline}
Goals: ${goals}

Return JSON: { "estimatedMin": number, "estimatedMax": number, "currency": "INR", "breakdown": [{ "item": string, "percentage": number, "costRange": string }], "deliveryTimeline": string, "includedServices": string[], "gstNote": string, "recommendation": string }`;

          const completion = await client.chat.completions.create({
            model: MODEL_MINI,
            messages: [
              { role: "system", content: SYSTEM_PROMPTS.quotation },
              { role: "user", content: userPrompt },
            ],
            max_tokens: MAX_TOKENS.quotation,
            temperature: 0.5,
            response_format: { type: "json_object" },
          });

          const raw = completion.choices[0]?.message?.content ?? "{}";
          return NextResponse.json({
            success: true,
            data: { ...JSON.parse(raw), service, subcategory, generatedAt: new Date().toISOString(), powered_by: "openai" },
          });
        }
      } catch (err) {
        if (isOpenAIBillingError(err)) {
          console.warn("[AI Quotation] OpenAI billing error — using mock quotation");
        } else {
          console.warn("[AI Quotation] OpenAI error:", (err as Error).message);
        }
      }
    }

    // ── Mock fallback ────────────────────────────────────
    await mockDelay();
    return NextResponse.json({
      success: true,
      data: {
        estimatedMin: baseMin,
        estimatedMax: baseMax,
        currency: "INR",
        breakdown: [
          { item: "Strategy & Planning", percentage: 20, costRange: `₹${Math.round(baseMin * 0.2).toLocaleString("en-IN")} – ₹${Math.round(baseMax * 0.2).toLocaleString("en-IN")}` },
          { item: "Creative Production", percentage: 35, costRange: `₹${Math.round(baseMin * 0.35).toLocaleString("en-IN")} – ₹${Math.round(baseMax * 0.35).toLocaleString("en-IN")}` },
          { item: "Campaign Management", percentage: 30, costRange: `₹${Math.round(baseMin * 0.3).toLocaleString("en-IN")} – ₹${Math.round(baseMax * 0.3).toLocaleString("en-IN")}` },
          { item: "Analytics & Reporting", percentage: 15, costRange: `₹${Math.round(baseMin * 0.15).toLocaleString("en-IN")} – ₹${Math.round(baseMax * 0.15).toLocaleString("en-IN")}` },
        ],
        deliveryTimeline: timeline ?? "4–12 weeks depending on scope",
        includedServices: ["Dedicated account manager", "Weekly progress reports", "Revision rounds included", "Post-project analytics summary"],
        gstNote: "18% GST applicable on final invoice",
        recommendation: `For a ${businessScale} in ${service}, this budget range provides optimal coverage with measurable outcomes.`,
        service,
        subcategory,
        generatedAt: new Date().toISOString(),
        powered_by: "mock",
      },
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    console.error("[AI Quotation] Unexpected error:", msg);
    return NextResponse.json({ error: "Failed to generate quotation" }, { status: 500 });
  }
}
