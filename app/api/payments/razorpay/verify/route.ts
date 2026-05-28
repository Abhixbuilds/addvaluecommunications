import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyRazorpaySignature } from "@/lib/payments/razorpay";
import { markInvoicePaid } from "@/lib/db/invoices";

/**
 * POST /api/payments/razorpay/verify
 *
 * Verifies Razorpay payment signature after successful payment.
 * Called from the client after Razorpay checkout completes.
 *
 * Request body:
 * {
 *   razorpay_order_id: string,
 *   razorpay_payment_id: string,
 *   razorpay_signature: string,
 *   invoiceId: string
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, invoiceId } =
      await request.json();

    const isValid = verifyRazorpaySignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    );

    if (!isValid) {
      return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 });
    }

    // Mark invoice as paid in Supabase
    if (invoiceId) {
      await markInvoicePaid(invoiceId, razorpay_payment_id, "razorpay");
    }

    return NextResponse.json({
      success: true,
      paymentId: razorpay_payment_id,
      message: "Payment verified successfully",
    });
  } catch (error: any) {
    console.error("[Razorpay] Verification failed:", error.message);
    return NextResponse.json({ error: "Payment verification failed" }, { status: 500 });
  }
}
