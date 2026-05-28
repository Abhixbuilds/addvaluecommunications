/**
 * Database TypeScript Types — Generated from Supabase schema
 *
 * TODO (Phase 5): Run `npx supabase gen types typescript --project-id YOUR_PROJECT_ID > lib/supabase/types.ts`
 * to auto-generate this from your live schema.
 */

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type UserRole = "client" | "admin" | "manager";
export type ProjectStatus = "planning" | "active" | "review" | "completed" | "paused";
export type InvoiceStatus = "pending" | "paid" | "overdue" | "cancelled";
export type ServiceType = "finance" | "advertisement" | "pr" | "marketing" | "insurance";

// ── Profiles ────────────────────────────────────────────
export interface Profile {
  id: string;                      // UUID — matches Clerk user ID
  clerk_user_id: string;
  email: string;
  full_name: string | null;
  business_name: string | null;
  industry: string | null;
  phone: string | null;
  website: string | null;
  social_links: string | null;
  role: UserRole;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

// ── Projects ────────────────────────────────────────────
export interface Project {
  id: string;
  client_id: string;               // FK → profiles.id
  name: string;
  service: ServiceType;
  subcategory: string;
  status: ProjectStatus;
  progress: number;                // 0–100
  start_date: string;
  due_date: string;
  manager_name: string | null;
  budget: number;                  // in paise (smallest currency unit)
  color: string;
  last_update: string;
  tags: string[];
  description: string | null;
  created_at: string;
  updated_at: string;
}

// ── Invoices ────────────────────────────────────────────
export interface Invoice {
  id: string;
  project_id: string;              // FK → projects.id
  client_id: string;               // FK → profiles.id
  invoice_number: string;          // e.g. INV-2026-001
  amount: number;                  // in paise
  gst_amount: number;              // 18% GST
  total_amount: number;
  status: InvoiceStatus;
  package_name: string;
  payment_method: "razorpay" | "stripe" | null;
  payment_id: string | null;       // Gateway payment ID
  issued_date: string;
  due_date: string;
  paid_date: string | null;
  pdf_url: string | null;
  created_at: string;
}

// ── Messages ────────────────────────────────────────────
export interface Message {
  id: string;
  project_id: string | null;       // FK → projects.id
  sender_id: string;               // FK → profiles.id
  receiver_id: string;             // FK → profiles.id
  content: string;
  is_read: boolean;
  created_at: string;
}

// ── Onboarding Submissions ───────────────────────────────
export interface OnboardingSubmission {
  id: string;
  client_id: string | null;        // NULL if submitted before sign-up
  session_id: string;
  service: ServiceType;
  subcategory: string;
  business_name: string;
  industry: string;
  goals: string;
  budget: string;
  timeline: string;
  campaign_size: string;
  target_audience: string;
  existing_assets: string | null;
  additional_notes: string | null;
  recommendation_json: Json | null; // Stored AI recommendation
  created_at: string;
}

// ── Database type map ────────────────────────────────────
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<Profile, "id" | "created_at">>;
      };
      projects: {
        Row: Project;
        Insert: Omit<Project, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<Project, "id" | "created_at">>;
      };
      invoices: {
        Row: Invoice;
        Insert: Omit<Invoice, "id" | "created_at">;
        Update: Partial<Omit<Invoice, "id" | "created_at">>;
      };
      messages: {
        Row: Message;
        Insert: Omit<Message, "id" | "created_at">;
        Update: Partial<Omit<Message, "id" | "created_at">>;
      };
      onboarding_submissions: {
        Row: OnboardingSubmission;
        Insert: Omit<OnboardingSubmission, "id" | "created_at">;
        Update: Partial<Omit<OnboardingSubmission, "id" | "created_at">>;
      };
    };
    Views: {};
    Functions: {};
    Enums: {
      user_role: UserRole;
      project_status: ProjectStatus;
      invoice_status: InvoiceStatus;
      service_type: ServiceType;
    };
  };
}
