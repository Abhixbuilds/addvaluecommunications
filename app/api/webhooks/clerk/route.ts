import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * POST /api/webhooks/clerk
 *
 * Clerk Webhook — Syncs user data to Supabase profiles table.
 * Triggered on: user.created, user.updated, user.deleted
 *
 * Setup:
 * 1. Go to clerk.com → Webhooks → Add endpoint
 * 2. URL: https://yourdomain.com/api/webhooks/clerk
 * 3. Events: user.created, user.updated, user.deleted
 * 4. Copy signing secret to .env.local: CLERK_WEBHOOK_SECRET=whsec_xxx
 *
 * TODO (Phase 5): Uncomment svix verification once real keys are set
 */

function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key || url.includes("placeholder") || key.includes("placeholder")) {
    return null;
  }

  // Dynamically import to avoid build-time issues with missing SDK
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { createClient } = require("@supabase/supabase-js");
  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();
    const { type, data } = payload;

    // TODO: Verify webhook signature using svix:
    // const { Webhook } = require("svix");
    // const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET!);
    // const headers = { "svix-id": request.headers.get("svix-id")!, "svix-timestamp": ..., "svix-signature": ... };
    // wh.verify(JSON.stringify(payload), headers);

    const db = getAdminClient();

    if (!db) {
      console.warn("[Clerk Webhook] Supabase not configured — skipping profile sync");
      return NextResponse.json({ received: true, synced: false });
    }

    switch (type) {
      case "user.created": {
        const primaryEmail = data.email_addresses?.[0]?.email_address;
        await db.from("profiles").insert({
          clerk_user_id: data.id,
          email: primaryEmail ?? "",
          full_name: `${data.first_name ?? ""} ${data.last_name ?? ""}`.trim(),
          avatar_url: data.image_url ?? null,
          role: "client",
        });
        break;
      }

      case "user.updated": {
        const primaryEmail = data.email_addresses?.[0]?.email_address;
        await db
          .from("profiles")
          .update({
            email: primaryEmail ?? "",
            full_name: `${data.first_name ?? ""} ${data.last_name ?? ""}`.trim(),
            avatar_url: data.image_url ?? null,
          })
          .eq("clerk_user_id", data.id);
        break;
      }

      case "user.deleted": {
        await db.from("profiles").delete().eq("clerk_user_id", data.id);
        break;
      }

      default:
        console.log(`[Clerk Webhook] Unhandled event: ${type}`);
    }

    return NextResponse.json({ received: true, synced: true, event: type });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    console.error("[Clerk Webhook] Error:", msg);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}
