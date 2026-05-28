/**
 * Razorpay Integration Utility
 *
 * Handles order creation and payment verification.
 * Uses NEXT_PUBLIC_RAZORPAY_KEY_ID (client) and RAZORPAY_KEY_SECRET (server only).
 *
 * TODO (Phase 5 — Payments):
 * 1. Install SDK: npm install razorpay
 * 2. Add real keys to .env.local
 * 3. Replace placeholder check below with real Razorpay instance
 */

const RAZORPAY_KEY_ID = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;

const isConfigured =
  RAZORPAY_KEY_ID &&
  RAZORPAY_KEY_SECRET &&
  !RAZORPAY_KEY_ID.includes("placeholder") &&
  !RAZORPAY_KEY_SECRET.includes("placeholder");

/**
 * Create a Razorpay order (Server-side only)
 *
 * @param amountInPaise — Amount in smallest currency unit (₹1 = 100 paise)
 * @param receipt — Unique receipt ID (e.g., invoice ID)
 */
export async function createRazorpayOrder(
  amountInPaise: number,
  receipt: string,
  notes?: Record<string, string>
) {
  if (!isConfigured) {
    console.warn("[Razorpay] Not configured — returning mock order");
    return {
      id: `order_mock_${Date.now()}`,
      amount: amountInPaise,
      currency: "INR",
      receipt,
      status: "created",
      mock: true,
    };
  }

  // REAL IMPLEMENTATION (uncomment when SDK is installed):
  // const Razorpay = (await import("razorpay")).default;
  // const razorpay = new Razorpay({ key_id: RAZORPAY_KEY_ID!, key_secret: RAZORPAY_KEY_SECRET! });
  // return razorpay.orders.create({ amount: amountInPaise, currency: "INR", receipt, notes });

  throw new Error("Razorpay SDK not installed. Run: npm install razorpay");
}

/**
 * Verify Razorpay payment signature (Server-side only)
 * Called after successful payment to confirm authenticity
 */
export function verifyRazorpaySignature(
  orderId: string,
  paymentId: string,
  signature: string
): boolean {
  if (!isConfigured) return true; // Skip verification in mock mode

  // REAL IMPLEMENTATION:
  // const crypto = require("crypto");
  // const body = orderId + "|" + paymentId;
  // const expectedSignature = crypto.createHmac("sha256", RAZORPAY_KEY_SECRET!).update(body).digest("hex");
  // return expectedSignature === signature;

  return false;
}

export const razorpayPublicKey = RAZORPAY_KEY_ID ?? "";
export const razorpayConfigured = isConfigured;
