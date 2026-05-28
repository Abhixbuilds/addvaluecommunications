// Mock data for Client Dashboard (Phase 4)
// TODO (Phase 5): Replace with live Supabase queries

export interface Project {
  id: string;
  name: string;
  service: string;
  subcategory: string;
  status: "planning" | "active" | "review" | "completed" | "paused";
  progress: number;
  startDate: string;
  dueDate: string;
  manager: string;
  budget: string;
  color: string;
  lastUpdate: string;
  tags: string[];
}

export interface Invoice {
  id: string;
  project: string;
  amount: number;
  status: "paid" | "pending" | "overdue";
  date: string;
  dueDate: string;
  package: string;
}

export interface Message {
  id: string;
  from: string;
  role: string;
  avatar: string;
  content: string;
  time: string;
  unread: boolean;
  project: string;
}

export interface ClientStats {
  activeProjects: number;
  completedProjects: number;
  totalSpend: string;
  pendingInvoices: number;
  messagesUnread: number;
  nextDeliverable: string;
}

// ── Client Mock Data ─────────────────────────────────────

export const CLIENT_STATS: ClientStats = {
  activeProjects: 3,
  completedProjects: 7,
  totalSpend: "₹2,45,000",
  pendingInvoices: 1,
  messagesUnread: 4,
  nextDeliverable: "Meta Ads Creatives — Due Jun 2",
};

export const CLIENT_PROJECTS: Project[] = [
  {
    id: "proj-001",
    name: "Meta Ads Campaign Q3",
    service: "Advertisement",
    subcategory: "Meta Ads",
    status: "active",
    progress: 68,
    startDate: "May 10, 2026",
    dueDate: "Jun 30, 2026",
    manager: "Rahul Sharma",
    budget: "₹45,000",
    color: "#38BDF8",
    lastUpdate: "2 hours ago",
    tags: ["Meta Ads", "Performance", "Q3"],
  },
  {
    id: "proj-002",
    name: "SEO Strategy & Implementation",
    service: "Marketing",
    subcategory: "SEO Marketing",
    status: "review",
    progress: 90,
    startDate: "Apr 1, 2026",
    dueDate: "May 31, 2026",
    manager: "Priya Kapoor",
    budget: "₹30,000",
    color: "#34D399",
    lastUpdate: "1 day ago",
    tags: ["SEO", "Content", "Technical"],
  },
  {
    id: "proj-003",
    name: "Brand PR Strategy",
    service: "Public Relations",
    subcategory: "Press Releases",
    status: "planning",
    progress: 20,
    startDate: "May 25, 2026",
    dueDate: "Jul 15, 2026",
    manager: "Ananya Singh",
    budget: "₹25,000",
    color: "#A78BFA",
    lastUpdate: "3 days ago",
    tags: ["PR", "Media", "Brand"],
  },
  {
    id: "proj-004",
    name: "Finance Advisory — Seed Round",
    service: "Finance",
    subcategory: "Startup Funding",
    status: "completed",
    progress: 100,
    startDate: "Feb 1, 2026",
    dueDate: "Apr 30, 2026",
    manager: "Vikram Mehta",
    budget: "₹60,000",
    color: "#F5C518",
    lastUpdate: "May 1, 2026",
    tags: ["Funding", "Pitch Deck", "Investors"],
  },
];

export const CLIENT_INVOICES: Invoice[] = [
  { id: "INV-2026-001", project: "Finance Advisory — Seed Round", amount: 60000, status: "paid", date: "May 1, 2026", dueDate: "May 1, 2026", package: "Growth" },
  { id: "INV-2026-002", project: "SEO Strategy & Implementation", amount: 30000, status: "paid", date: "Apr 3, 2026", dueDate: "Apr 3, 2026", package: "Starter" },
  { id: "INV-2026-003", project: "Meta Ads Campaign Q3", amount: 45000, status: "pending", date: "May 20, 2026", dueDate: "Jun 3, 2026", package: "Growth" },
  { id: "INV-2026-004", project: "Brand PR Strategy", amount: 25000, status: "pending", date: "May 25, 2026", dueDate: "Jun 5, 2026", package: "Starter" },
];

export const CLIENT_MESSAGES: Message[] = [
  { id: "msg-001", from: "Rahul Sharma", role: "Ad Campaign Manager", avatar: "RS", content: "The Meta Ads creatives are almost ready! I'll send you the final versions for approval by tomorrow. Looking great so far — expecting strong CTR.", time: "2h ago", unread: true, project: "Meta Ads Campaign Q3" },
  { id: "msg-002", from: "Priya Kapoor", role: "SEO Strategist", avatar: "PK", content: "Great news! Your site has moved to position 4 for 'best finance consulting Mumbai'. Content updates are live and indexing well.", time: "1d ago", unread: true, project: "SEO Strategy" },
  { id: "msg-003", from: "Ananya Singh", role: "PR Executive", avatar: "AS", content: "I've drafted the press release for review. Could you confirm the key announcement points before I send to editors?", time: "3d ago", unread: false, project: "Brand PR Strategy" },
  { id: "msg-004", from: "Support Team", role: "AddValue Support", avatar: "AV", content: "Your invoice INV-2026-003 for ₹45,000 is due June 3rd. Please make the payment to continue uninterrupted service.", time: "4d ago", unread: true, project: "Billing" },
];

export const REVENUE_CHART_DATA = [
  { month: "Jan", spend: 0, roi: 0 },
  { month: "Feb", spend: 60000, roi: 85000 },
  { month: "Mar", spend: 30000, roi: 52000 },
  { month: "Apr", spend: 45000, roi: 78000 },
  { month: "May", spend: 70000, roi: 140000 },
  { month: "Jun", spend: 45000, roi: 95000 },
];

// ── Admin Mock Data ───────────────────────────────────────

export interface AdminClient {
  id: string;
  name: string;
  business: string;
  industry: string;
  projects: number;
  totalValue: string;
  status: "active" | "onboarding" | "churned";
  joinDate: string;
  avatar: string;
  color: string;
}

export interface AdminProject {
  id: string;
  client: string;
  name: string;
  service: string;
  manager: string;
  status: "planning" | "active" | "review" | "completed";
  progress: number;
  value: string;
  dueDate: string;
  color: string;
}

export const ADMIN_STATS = {
  totalClients: 142,
  activeProjects: 28,
  monthlyRevenue: "₹4.2L",
  pendingInquiries: 12,
  teamMembers: 18,
  clientSatisfaction: "98%",
};

export const ADMIN_CLIENTS: AdminClient[] = [
  { id: "cl-001", name: "Arjun Mehta", business: "FreshCart India", industry: "E-Commerce", projects: 4, totalValue: "₹1,80,000", status: "active", joinDate: "Jan 2026", avatar: "AM", color: "#F5C518" },
  { id: "cl-002", name: "Priya Sharma", business: "NovaTech Solutions", industry: "SaaS", projects: 3, totalValue: "₹2,50,000", status: "active", joinDate: "Feb 2026", avatar: "PS", color: "#38BDF8" },
  { id: "cl-003", name: "Rahul Verma", business: "GreenLife Wellness", industry: "Healthcare", projects: 2, totalValue: "₹90,000", status: "active", joinDate: "Mar 2026", avatar: "RV", color: "#34D399" },
  { id: "cl-004", name: "Sneha Kapoor", business: "SafeNest Realty", industry: "Real Estate", projects: 1, totalValue: "₹45,000", status: "onboarding", joinDate: "May 2026", avatar: "SK", color: "#A78BFA" },
  { id: "cl-005", name: "Kiran Patel", business: "TastyBite Foods", industry: "FMCG", projects: 5, totalValue: "₹3,20,000", status: "active", joinDate: "Dec 2025", avatar: "KP", color: "#FB923C" },
];

export const ADMIN_PROJECTS: AdminProject[] = [
  { id: "ap-001", client: "FreshCart India", name: "Meta Ads Scale Campaign", service: "Advertisement", manager: "Rahul S.", status: "active", progress: 68, value: "₹45,000", dueDate: "Jun 30", color: "#38BDF8" },
  { id: "ap-002", client: "NovaTech Solutions", name: "SEO + Content Strategy", service: "Marketing", manager: "Priya K.", status: "review", progress: 90, value: "₹30,000", dueDate: "May 31", color: "#34D399" },
  { id: "ap-003", client: "GreenLife Wellness", name: "PR Media Outreach", service: "PR", manager: "Ananya S.", status: "active", progress: 45, value: "₹25,000", dueDate: "Jun 15", color: "#A78BFA" },
  { id: "ap-004", client: "SafeNest Realty", name: "Business Insurance Setup", service: "Insurance", manager: "Vikram M.", status: "planning", progress: 10, value: "₹18,000", dueDate: "Jul 1", color: "#FB923C" },
  { id: "ap-005", client: "TastyBite Foods", name: "Google Ads + Meta Ads", service: "Advertisement", manager: "Rahul S.", status: "active", progress: 55, value: "₹60,000", dueDate: "Jun 20", color: "#F5C518" },
];

export const ADMIN_REVENUE_DATA = [
  { month: "Dec", revenue: 180000, projects: 8 },
  { month: "Jan", revenue: 220000, projects: 12 },
  { month: "Feb", revenue: 280000, projects: 15 },
  { month: "Mar", revenue: 310000, projects: 18 },
  { month: "Apr", revenue: 390000, projects: 24 },
  { month: "May", revenue: 420000, projects: 28 },
];
