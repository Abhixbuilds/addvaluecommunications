/**
 * Database Query Functions — Invoices
 *
 * TODO (Phase 5 — DB): Supabase client auto-activates when real credentials are in .env.local
 */

import { getSupabaseAdmin } from "@/lib/supabase/server";
import { CLIENT_INVOICES } from "@/lib/dashboard-data";

export async function getInvoicesByClient(clientId: string) {
  const db = getSupabaseAdmin();
  if (!db) {
    console.warn("[DB] Using mock invoice data — Supabase not configured");
    return CLIENT_INVOICES;
  }

  const { data, error } = await db
    .from("invoices")
    .select("*")
    .eq("client_id", clientId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[DB] getInvoicesByClient error:", error.message);
    return CLIENT_INVOICES;
  }

  return data;
}

export async function markInvoicePaid(
  invoiceId: string,
  paymentId: string,
  paymentMethod: "razorpay" | "stripe"
) {
  const db = getSupabaseAdmin();
  if (!db) return null;

  const { data, error } = await db
    .from("invoices")
    .update({
      status: "paid",
      payment_id: paymentId,
      payment_method: paymentMethod,
      paid_date: new Date().toISOString().split("T")[0],
    })
    .eq("id", invoiceId)
    .select()
    .single();

  if (error) {
    console.error("[DB] markInvoicePaid error:", error.message);
    return null;
  }

  return data;
}

export async function createInvoice(invoice: {
  client_id: string;
  project_id?: string;
  amount: number;
  package_name: string;
  due_date: string;
}) {
  const db = getSupabaseAdmin();
  if (!db) return null;

  // Generate invoice number
  const { data: numData } = await db.rpc("generate_invoice_number");

  const gstAmount = Math.round(invoice.amount * 0.18);
  const totalAmount = invoice.amount + gstAmount;

  const { data, error } = await db
    .from("invoices")
    .insert({
      ...invoice,
      invoice_number: numData ?? `INV-${Date.now()}`,
      gst_amount: gstAmount,
      total_amount: totalAmount,
      status: "pending",
      issued_date: new Date().toISOString().split("T")[0],
    })
    .select()
    .single();

  if (error) {
    console.error("[DB] createInvoice error:", error.message);
    return null;
  }

  return data;
}
