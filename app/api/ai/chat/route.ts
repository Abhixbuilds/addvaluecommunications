import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getOpenAIClient, openaiConfigured, SYSTEM_PROMPTS, MODEL, MAX_TOKENS } from "@/lib/ai/openai";
import { getMockChatResponse, mockDelay, isOpenAIBillingError } from "@/lib/ai/mock-engine";

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

async function tryOpenAI(messages: ChatMessage[], context?: string): Promise<string | null> {
  if (!openaiConfigured) return null;

  try {
    const client = await getOpenAIClient();
    if (!client) return null;

    const systemMessage: ChatMessage = {
      role: "system",
      content: SYSTEM_PROMPTS.consultant + (context ? `\n\nContext: ${context}` : ""),
    };

    const completion = await client.chat.completions.create({
      model: MODEL,
      messages: [systemMessage, ...messages.slice(-10)],
      max_tokens: MAX_TOKENS.chat,
      temperature: 0.75,
    });

    return completion.choices[0]?.message?.content ?? null;
  } catch (err) {
    if (isOpenAIBillingError(err)) {
      console.warn("[AI Chat] OpenAI billing/quota error — falling back to mock responses");
    } else {
      console.warn("[AI Chat] OpenAI error — falling back to mock responses:", (err as Error).message);
    }
    return null; // Trigger fallback
  }
}

export async function POST(request: NextRequest) {
  try {
    const { messages, context }: { messages: ChatMessage[]; context?: string } = await request.json();

    if (!messages?.length) {
      return NextResponse.json({ error: "Messages are required" }, { status: 400 });
    }

    // Try real OpenAI first — silently fall back on any error
    const aiResponse = await tryOpenAI(messages, context);

    if (aiResponse) {
      return NextResponse.json({
        success: true,
        data: {
          role: "assistant",
          content: aiResponse,
          powered_by: "openai",
        },
      });
    }

    // ── Mock fallback (always works) ──────────────────────
    await mockDelay();
    const mockContent = getMockChatResponse(messages);

    return NextResponse.json({
      success: true,
      data: {
        role: "assistant",
        content: mockContent,
        powered_by: "mock",
      },
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    console.error("[AI Chat] Unexpected error:", msg);

    // Even on unexpected errors, return a graceful mock response
    await mockDelay();
    return NextResponse.json({
      success: true,
      data: {
        role: "assistant",
        content: "I'm here to help! 😊 Could you tell me a bit more about your business and what you're trying to achieve? That way I can give you the most relevant advice.",
        powered_by: "mock",
      },
    });
  }
}
