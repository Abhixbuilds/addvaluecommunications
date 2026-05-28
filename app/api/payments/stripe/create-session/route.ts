import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createStripeSession, stripeConfigured } from "@/lib/payments/stripe";

/**
 * POST /api/payments/stripe/create-session
 *
 * Creates a Stripe Checkout Session for international card payments.
 *
 * Request body:
 * {
 *   amount: number,        // in paise (₹1 = 100)
 *   packageName: string,
 *   clientId?: string
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const { amount, packageName, clientId } = await request.json();

    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

    const session = await createStripeSession(
      amount,
      packageName,
      `${appUrl}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      `${appUrl}/payment`
    );

    return NextResponse.json({
      success: true,
      sessionId: session.id,
      url: session.url,
      configured: stripeConfigured,
      mock: (session as any).mock ?? false,
    });
  } catch (error: any) {
    console.error("[Stripe] Session creation failed:", error.message);
    return NextResponse.json({ error: "Failed to create Stripe session" }, { status: 500 });
  }
}
