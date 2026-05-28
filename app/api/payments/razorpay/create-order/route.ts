import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createRazorpayOrder, razorpayConfigured } from "@/lib/payments/razorpay";

/**
 * POST /api/payments/razorpay/create-order
 *
 * Creates a Razorpay order to initiate a payment.
 *
 * Request body:
 * {
 *   amount: number,        // in paise (₹1 = 100)
 *   packageName: string,
 *   clientId: string,
 *   invoiceId?: string
 * }
 *
 * Response:
 * { orderId, amount, currency, keyId, configured }
 */
export async function POST(request: NextRequest) {
  try {
    const { amount, packageName, clientId, invoiceId } = await request.json();

    if (!amount || amount < 100) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    const order = await createRazorpayOrder(
      amount,
      invoiceId ?? `receipt_${Date.now()}`,
      {
        package: packageName,
        clientId: clientId ?? "anonymous",
      }
    );

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: "INR",
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      configured: razorpayConfigured,
      mock: (order as any).mock ?? false,
    });
  } catch (error: any) {
    console.error("[Razorpay] Order creation failed:", error.message);
    return NextResponse.json(
      { error: "Failed to create order", details: error.message },
      { status: 500 }
    );
  }
}
