/**
 * Stripe Integration Utility
 *
 * Handles checkout session creation for international payments.
 * Uses STRIPE_SECRET_KEY (server) and NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY (client).
 *
 * TODO (Phase 5 — Payments):
 * 1. Install SDK: npm install stripe
 * 2. Add real keys to .env.local
 * 3. Set up Stripe webhook at: stripe.com → Developers → Webhooks
 */

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;

const isConfigured =
  STRIPE_SECRET_KEY &&
  !STRIPE_SECRET_KEY.includes("placeholder");

/**
 * Create a Stripe Checkout Session (Server-side only)
 *
 * @param amountInPaise — Amount in smallest currency unit
 * @param packageName — Product name for the checkout page
 * @param successUrl — Redirect URL after payment
 * @param cancelUrl — Redirect URL if cancelled
 */
export async function createStripeSession(
  amountInPaise: number,
  packageName: string,
  successUrl: string,
  cancelUrl: string
) {
  if (!isConfigured) {
    console.warn("[Stripe] Not configured — returning mock session");
    return {
      id: `cs_mock_${Date.now()}`,
      url: cancelUrl, // Redirect back in mock mode
      mock: true,
    };
  }

  // REAL IMPLEMENTATION (uncomment when SDK is installed):
  // const Stripe = (await import("stripe")).default;
  // const stripe = new Stripe(STRIPE_SECRET_KEY!, { apiVersion: "2024-04-10" });
  // return stripe.checkout.sessions.create({
  //   mode: "payment",
  //   payment_method_types: ["card"],
  //   line_items: [{
  //     price_data: {
  //       currency: "inr",
  //       product_data: { name: packageName },
  //       unit_amount: amountInPaise,
  //     },
  //     quantity: 1,
  //   }],
  //   success_url: successUrl,
  //   cancel_url: cancelUrl,
  // });

  throw new Error("Stripe SDK not installed. Run: npm install stripe");
}

/**
 * Verify Stripe webhook signature
 * Called in the webhook endpoint POST /api/payments/stripe/webhook
 */
export function verifyStripeWebhook(payload: string, signature: string) {
  if (!isConfigured || !STRIPE_WEBHOOK_SECRET) return null;

  // REAL IMPLEMENTATION:
  // const Stripe = require("stripe");
  // const stripe = new Stripe(STRIPE_SECRET_KEY!, { apiVersion: "2024-04-10" });
  // return stripe.webhooks.constructEvent(payload, signature, STRIPE_WEBHOOK_SECRET!);

  return null;
}

export const stripePublicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "";
export const stripeConfigured = isConfigured;
