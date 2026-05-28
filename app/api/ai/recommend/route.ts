import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getOpenAIClient, openaiConfigured, SYSTEM_PROMPTS, MODEL, MAX_TOKENS } from "@/lib/ai/openai";
import { mockDelay, isOpenAIBillingError } from "@/lib/ai/mock-engine";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { service, subcategory, businessName, industry, goals, budget, timeline, campaignSize, targetAudience } = body;

    const userPrompt = `Generate a detailed business strategy for:
Business: ${businessName} (${industry})
Service Needed: ${service} — ${subcategory}
Goals: ${goals}
Budget: ${budget}
Timeline: ${timeline}
Business Scale: ${campaignSize}
Target Audience: ${targetAudience}

Return a JSON object with these exact fields:
{
  "strategy": "2-3 sentence executive summary",
  "budgetBreakdown": [{ "label": string, "percentage": number }],
  "timeline": [{ "phase": string, "duration": string, "deliverables": string[] }],
  "expectedResults": string[],
  "nextSteps": string[],
  "estimatedRange": { "min": number, "max": number, "currency": "INR" },
  "keyInsights": string[]
}`;

    // ── Try real OpenAI ──────────────────────────────────
    if (openaiConfigured) {
      try {
        const client = await getOpenAIClient();
        if (client) {
          const completion = await client.chat.completions.create({
            model: MODEL,
            messages: [
              { role: "system", content: SYSTEM_PROMPTS.strategist },
              { role: "user", content: userPrompt },
            ],
            max_tokens: MAX_TOKENS.strategy,
            temperature: 0.7,
            response_format: { type: "json_object" },
          });

          const raw = completion.choices[0]?.message?.content ?? "{}";
          const recommendation = JSON.parse(raw);

          return NextResponse.json({
            success: true,
            data: {
              ...recommendation,
              generatedFor: businessName,
              generatedAt: new Date().toISOString(),
              powered_by: "openai",
            },
          });
        }
      } catch (err) {
        if (isOpenAIBillingError(err)) {
          console.warn("[AI Recommend] OpenAI billing error — using mock strategy");
        } else {
          console.warn("[AI Recommend] OpenAI error — using mock strategy:", (err as Error).message);
        }
        // Falls through to mock below
      }
    }

    // ── Mock fallback ────────────────────────────────────
    await mockDelay();

    const scaleMultiplier: Record<string, number> = {
      "Solo / Freelancer": 0.8,
      "Small Business (1–10 employees)": 1,
      "Mid-size Business (11–50 employees)": 1.8,
      "Growing Business (51–200 employees)": 2.8,
      "Large Enterprise (200+ employees)": 5,
    };
    const mult = scaleMultiplier[campaignSize] ?? 1;

    return NextResponse.json({
      success: true,
      data: {
        strategy: `Based on your ${industry} business and focus on ${subcategory}, we recommend a phased approach starting with brand awareness and moving toward targeted conversions. Your ${budget} budget over ${timeline} allows for strong, measurable ROI with the right channel mix.`,
        budgetBreakdown: [
          { label: "Strategy & Planning", percentage: 20 },
          { label: "Creative Production", percentage: 35 },
          { label: "Campaign Management", percentage: 30 },
          { label: "Analytics & Reporting", percentage: 15 },
        ],
        timeline: [
          { phase: "Discovery & Strategy", duration: "Week 1–2", deliverables: ["Brand audit", "Strategy document", "Competitor analysis"] },
          { phase: "Creation & Setup", duration: "Week 3–4", deliverables: ["Creative assets", "Campaign setup", "Tracking installation"] },
          { phase: "Launch & Optimize", duration: "Week 5–8", deliverables: ["Campaign launch", "A/B testing", "Weekly reports"] },
          { phase: "Scale & Report", duration: "Week 9–12", deliverables: ["Scale winning channels", "ROI analysis", "Final report"] },
        ],
        expectedResults: [
          "3x increase in brand awareness within 60 days",
          "40% growth in qualified leads month-over-month",
          "25% reduction in cost per acquisition",
          `Measurable ROI within ${timeline} of launch`,
        ],
        keyInsights: [
          `${industry} businesses see best results with ${subcategory} during Q3–Q4`,
          `Your target audience (${targetAudience}) is most active on Instagram and Google`,
          "A/B testing headlines can improve CTR by 30–50%",
        ],
        nextSteps: [
          "Book a free consultation with our expert team",
          "Review and approve the strategy document",
          "Make initial project payment",
          "Get onboarded to your client dashboard",
        ],
        estimatedRange: { min: Math.round(25000 * mult), max: Math.round(75000 * mult), currency: "INR" },
        generatedFor: businessName,
        generatedAt: new Date().toISOString(),
        powered_by: "mock",
      },
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    console.error("[AI Recommend] Unexpected error:", msg);
    return NextResponse.json({ error: "Failed to generate recommendation" }, { status: 500 });
  }
}
