/**
 * Database Query Functions — Projects
 *
 * These wrap Supabase queries with safe null-client guards.
 * Falls back to mock data when Supabase is not configured.
 *
 * TODO (Phase 5 — DB): Supabase client auto-activates when real credentials are in .env.local
 */

import { getSupabaseAdmin } from "@/lib/supabase/server";
import { CLIENT_PROJECTS } from "@/lib/dashboard-data";

export async function getProjectsByClient(clientId: string) {
  const db = getSupabaseAdmin();
  if (!db) {
    // Fallback: Return mock data
    console.warn("[DB] Using mock project data — Supabase not configured");
    return CLIENT_PROJECTS;
  }

  const { data, error } = await db
    .from("projects")
    .select("*")
    .eq("client_id", clientId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[DB] getProjectsByClient error:", error.message);
    return CLIENT_PROJECTS; // Fallback
  }

  return data;
}

export async function getAllProjects() {
  const db = getSupabaseAdmin();
  if (!db) return [];

  const { data, error } = await db
    .from("projects")
    .select("*, profiles(full_name, business_name, email)")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[DB] getAllProjects error:", error.message);
    return [];
  }

  return data;
}

export async function updateProjectStatus(
  projectId: string,
  status: string,
  progress: number
) {
  const db = getSupabaseAdmin();
  if (!db) return null;

  const { data, error } = await db
    .from("projects")
    .update({ status, progress, updated_at: new Date().toISOString() })
    .eq("id", projectId)
    .select()
    .single();

  if (error) {
    console.error("[DB] updateProjectStatus error:", error.message);
    return null;
  }

  return data;
}

export async function createProject(project: {
  client_id: string;
  name: string;
  service: string;
  subcategory: string;
  budget: number;
  start_date: string;
  due_date: string;
}) {
  const db = getSupabaseAdmin();
  if (!db) return null;

  const { data, error } = await db
    .from("projects")
    .insert({ ...project, status: "planning", progress: 0 })
    .select()
    .single();

  if (error) {
    console.error("[DB] createProject error:", error.message);
    return null;
  }

  return data;
}
