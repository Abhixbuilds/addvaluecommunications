/**
 * Supabase Browser Client
 *
 * Use this in Client Components ("use client").
 * Reads NEXT_PUBLIC_ env vars directly.
 *
 * TODO (Phase 5 — DB):
 * Replace placeholder values in .env.local with real Supabase credentials.
 * Get them from: supabase.com → Project → Settings → API
 */

import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Guard against placeholder values in development
const isConfigured =
  supabaseUrl &&
  supabaseAnonKey &&
  !supabaseUrl.includes("placeholder") &&
  !supabaseAnonKey.includes("placeholder");

export const supabase = isConfigured
  ? createClient<Database>(supabaseUrl, supabaseAnonKey)
  : null;

export function getSupabaseClient() {
  if (!supabase) {
    console.warn("[Supabase] Client not configured. Add real credentials to .env.local");
    return null;
  }
  return supabase;
}
