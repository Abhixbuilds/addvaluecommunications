import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getOpenAIClient, openaiConfigured, SYSTEM_PROMPTS, MODEL_MINI, MAX_TOKENS } from "@/lib/ai/openai";
import { mockDelay, isOpenAIBillingError } from "@/lib/ai/mock-engine";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { businessName, industry, service, subcategory, goals, budget, timeline, campaignSize, targetAudience } = body;

    // ── Try real OpenAI ──────────────────────────────────
    if (openaiConfigured) {
      try {
        const client = await getOpenAIClient();
        if (client) {
          const userPrompt = `Summarize this business onboarding:
Business: ${businessName} (${industry})
Service: ${service} — ${subcategory}
Goals: ${goals}
Budget: ${budget}
Timeline: ${timeline}
Scale: ${campaignSize}
Target Audience: ${targetAudience}

Return JSON: { "summary": string, "keyGoals": string[], "recommendedServices": string[], "urgency": "low"|"medium"|"high", "estimatedBudget": string, "fitScore": number, "fitReason": string }`;

          const completion = await client.chat.completions.create({
            model: MODEL_MINI,
            messages: [
              { role: "system", content: SYSTEM_PROMPTS.summarizer },
              { role: "user", content: userPrompt },
            ],
            max_tokens: MAX_TOKENS.summary,
            temperature: 0.4,
            response_format: { type: "json_object" },
          });

          const raw = completion.choices[0]?.message?.content ?? "{}";
          return NextResponse.json({ success: true, data: { ...JSON.parse(raw), powered_by: "openai" } });
        }
      } catch (err) {
        if (isOpenAIBillingError(err)) {
          console.warn("[AI Summarize] OpenAI billing error — using mock summary");
        } else {
          console.warn("[AI Summarize] OpenAI error:", (err as Error).message);
        }
      }
    }

    // ── Mock fallback ────────────────────────────────────
    await mockDelay();
    return NextResponse.json({
      success: true,
      data: {
        summary: `${businessName} is a ${industry} business seeking ${subcategory} services to achieve their growth goals. With a ${budget} budget over ${timeline}, they are well-positioned for an impactful campaign.`,
        keyGoals: goals.split(/[.,]/).filter(Boolean).map((g: string) => g.trim()).slice(0, 4),
        recommendedServices: [subcategory, `${service} Strategy Consultation`, "Monthly Analytics Report"],
        urgency: "high",
        estimatedBudget: budget,
        fitScore: 88,
        fitReason: `Strong fit — ${industry} businesses see excellent ROI from ${subcategory} campaigns`,
        powered_by: "mock",
      },
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    console.error("[AI Summarize] Unexpected error:", msg);
    return NextResponse.json({ error: "Failed to summarize" }, { status: 500 });
  }
}
