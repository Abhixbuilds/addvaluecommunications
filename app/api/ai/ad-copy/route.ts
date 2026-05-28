import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getOpenAIClient, openaiConfigured, SYSTEM_PROMPTS, MODEL, MAX_TOKENS } from "@/lib/ai/openai";
import { mockDelay, isOpenAIBillingError } from "@/lib/ai/mock-engine";

export async function POST(request: NextRequest) {
  try {
    const { businessName, industry, product, targetAudience, goal, tone, platform } = await request.json();

    // ── Try real OpenAI ──────────────────────────────────
    if (openaiConfigured) {
      try {
        const client = await getOpenAIClient();
        if (client) {
          const userPrompt = `Generate ad copy for:
Business: ${businessName} (${industry})
Product/Service: ${product}
Target Audience: ${targetAudience}
Goal: ${goal}
Tone: ${tone ?? "professional and energetic"}
Platform: ${platform ?? "Meta Ads"}

Return JSON: { "variants": [{ "headline": string, "primaryText": string, "description": string, "cta": string, "hook": string }], "hashtags": string[], "abtestTip": string }
Generate 3 variants: emotional, rational, and social proof.`;

          const completion = await client.chat.completions.create({
            model: MODEL,
            messages: [
              { role: "system", content: SYSTEM_PROMPTS.adCopy },
              { role: "user", content: userPrompt },
            ],
            max_tokens: MAX_TOKENS.adCopy,
            temperature: 0.85,
            response_format: { type: "json_object" },
          });

          const raw = completion.choices[0]?.message?.content ?? "{}";
          return NextResponse.json({ success: true, data: { ...JSON.parse(raw), powered_by: "openai" } });
        }
      } catch (err) {
        if (isOpenAIBillingError(err)) {
          console.warn("[AI Ad Copy] OpenAI billing error — using mock ad copy");
        } else {
          console.warn("[AI Ad Copy] OpenAI error:", (err as Error).message);
        }
      }
    }

    // ── Mock fallback ────────────────────────────────────
    await mockDelay();
    return NextResponse.json({
      success: true,
      data: {
        variants: [
          {
            headline: `Grow ${businessName} Fast`,
            primaryText: `Struggling to get customers? ${businessName} uses proven strategies to 3x your leads in 60 days. No guesswork.`,
            description: "Book a free strategy call",
            cta: "Book Now",
            hook: "What if you could triple your leads this quarter?",
          },
          {
            headline: "Results-Driven Marketing",
            primaryText: `Join 500+ ${industry} businesses that trust AddValue Communications to deliver measurable growth. See real results in 30 days.`,
            description: "See our success stories",
            cta: "Learn More",
            hook: "500+ businesses can't be wrong.",
          },
          {
            headline: "Free Strategy Session",
            primaryText: `Get a free 30-minute ${industry} marketing strategy session. Our experts will show you exactly how to grow ${businessName}.`,
            description: "Limited slots available",
            cta: "Claim Free Session",
            hook: "Only 5 free sessions left this week.",
          },
        ],
        hashtags: [`#${industry.replace(/\s+/g, "")}`, "#DigitalMarketing", "#BusinessGrowth", "#MarketingIndia", "#ROI"],
        abtestTip: "Test emotional vs social proof variant first — emotional hooks typically win in B2C, social proof wins in B2B.",
        powered_by: "mock",
      },
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    console.error("[AI Ad Copy] Unexpected error:", msg);
    return NextResponse.json({ error: "Failed to generate ad copy" }, { status: 500 });
  }
}
