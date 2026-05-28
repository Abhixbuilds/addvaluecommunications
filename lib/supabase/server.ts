/**
 * Supabase Server Client
 *
 * Use this in Server Components, Route Handlers, and Server Actions.
 * Uses service role key for elevated privileges (admin operations).
 *
 * TODO (Phase 5 — DB):
 * 1. Add real credentials to .env.local
 * 2. For user-scoped queries, use @supabase/ssr createServerClient with cookies
 */

import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

const isConfigured =
  supabaseUrl &&
  serviceRoleKey &&
  !supabaseUrl.includes("placeholder") &&
  !serviceRoleKey.includes("placeholder");

// Use 'any' to avoid Database generic resolution issues when types are hand-written
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let _client: SupabaseClient<any> | null = null;

if (isConfigured) {
  _client = createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

export function getSupabaseAdmin() {
  if (!_client) {
    console.warn("[Supabase Admin] Server client not configured. Add real credentials to .env.local");
    return null;
  }
  return _client;
}
