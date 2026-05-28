/**
 * ─────────────────────────────────────────────────────────
 *  AddValue Communications — AI Module (Stub Layer)
 * ─────────────────────────────────────────────────────────
 *  All functions here are STUBS returning mock data.
 *  When OpenAI integration is activated in a future phase:
 *
 *  1. npm install openai
 *  2. Add OPENAI_API_KEY to .env.local / Vercel env vars
 *  3. Replace each stub body with the real OpenAI SDK call
 *  4. Remove "Coming Soon" states from UI components
 *
 *  Planned AI Features:
 *  - AI Business Consultant (floating chat)
 *  - AI Quotation Generator
 *  - AI Marketing Strategy Generator
 *  - AI Ad Copy Generator
 *  - AI PR Assistant
 *  - AI Financial Recommendations
 *  - AI Onboarding Summarizer
 * ─────────────────────────────────────────────────────────
 */

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface RecommendationInput {
  service: string;
  subcategory: string;
  businessName: string;
  industry: string;
  budget: string;
  timeline: string;
  goals: string;
  targetAudience: string;
}

export interface RecommendationOutput {
  strategy: string;
  budgetBreakdown: { label: string; percentage: number; amount: string }[];
  timeline: { phase: string; duration: string; deliverables: string[] }[];
  suggestedServices: string[];
  expectedResults: string[];
  nextSteps: string[];
}

export interface QuotationInput {
  service: string;
  subcategory: string;
  budget: string;
  timeline: string;
  businessScale: string;
}

export interface QuotationOutput {
  estimatedMin: number;
  estimatedMax: number;
  currency: string;
  breakdown: { item: string; cost: string }[];
  deliveryTimeline: string;
  includedServices: string[];
}

// ─── Chat ────────────────────────────────────────────────

/**
 * TODO: Replace with OpenAI streaming chat call
 * Model: gpt-4o | Role: Business Services Consultant
 */
export async function getChatResponse(messages: ChatMessage[]): Promise<string> {
  // STUB — Mock response
  await new Promise((r) => setTimeout(r, 800));
  const lastMessage = messages[messages.length - 1]?.content ?? "";

  if (lastMessage.toLowerCase().includes("marketing")) {
    return "For marketing, I'd recommend starting with SEO and social media advertising to build brand awareness, then scaling to performance marketing as you gather data. Our team can create a tailored strategy for your business. Would you like to explore our Marketing services?";
  }
  if (lastMessage.toLowerCase().includes("finance")) {
    return "Our finance team specializes in startup funding guidance, budget planning, and investment consulting. Based on your stage, we can help structure your financials for growth. Shall I connect you with a finance expert?";
  }
  if (lastMessage.toLowerCase().includes("insurance")) {
    return "Business insurance is essential for protecting your assets and managing risk. We offer comprehensive packages for startups and enterprises. What type of coverage are you looking for?";
  }

  return "I'm your AddValue Communications AI assistant. I can help you choose the right services, estimate budgets, and create a growth strategy. What business challenge can I help you with today?";
}

// ─── Recommendation ──────────────────────────────────────

/**
 * TODO: Replace with OpenAI API call
 * Generates strategy, budget allocation, roadmap from onboarding form data
 */
export async function getAIRecommendation(
  input: RecommendationInput
): Promise<RecommendationOutput> {
  // STUB — Mock recommendation
  await new Promise((r) => setTimeout(r, 1200));

  return {
    strategy: `Based on your ${input.industry} business and focus on ${input.subcategory}, we recommend a phased approach starting with brand awareness and moving toward targeted conversion campaigns. Your ${input.budget} budget allows for a solid foundation with measurable ROI.`,
    budgetBreakdown: [
      { label: "Campaign Creation", percentage: 35, amount: "₹35,000" },
      { label: "Media Spend", percentage: 40, amount: "₹40,000" },
      { label: "Analytics & Reporting", percentage: 15, amount: "₹15,000" },
      { label: "Expert Consultation", percentage: 10, amount: "₹10,000" },
    ],
    timeline: [
      {
        phase: "Discovery & Strategy",
        duration: "Week 1-2",
        deliverables: ["Brand audit", "Competitor analysis", "Strategy document"],
      },
      {
        phase: "Creation & Setup",
        duration: "Week 3-4",
        deliverables: ["Creative assets", "Campaign setup", "Tracking installation"],
      },
      {
        phase: "Launch & Optimize",
        duration: "Week 5-8",
        deliverables: ["Campaign launch", "A/B testing", "Weekly reports"],
      },
      {
        phase: "Scale & Report",
        duration: "Week 9-12",
        deliverables: ["Scale winning ads", "ROI analysis", "Final report"],
      },
    ],
    suggestedServices: [
      "Social Media Advertisement",
      "SEO Marketing",
      "Brand Reputation Management",
    ],
    expectedResults: [
      "3x increase in brand awareness",
      "40% growth in qualified leads",
      "25% reduction in cost per acquisition",
      "Measurable ROI within 90 days",
    ],
    nextSteps: [
      "Book a free consultation with our expert team",
      "Review and approve the strategy document",
      "Make initial payment to begin project",
      "Onboard to the client dashboard",
    ],
  };
}

// ─── Quotation ───────────────────────────────────────────

/**
 * TODO: Replace with OpenAI API call
 * Estimates project cost based on requirements
 */
export async function getQuotation(input: QuotationInput): Promise<QuotationOutput> {
  // STUB — Mock quotation
  await new Promise((r) => setTimeout(r, 800));

  return {
    estimatedMin: 25000,
    estimatedMax: 75000,
    currency: "INR",
    breakdown: [
      { item: "Strategy & Planning", cost: "₹8,000 – ₹15,000" },
      { item: "Creative Production", cost: "₹10,000 – ₹25,000" },
      { item: "Campaign Management", cost: "₹5,000 – ₹20,000" },
      { item: "Reporting & Analytics", cost: "₹2,000 – ₹15,000" },
    ],
    deliveryTimeline: "4 – 12 weeks depending on scope",
    includedServices: [
      "Dedicated account manager",
      "Weekly progress reports",
      "Revision rounds included",
      "Post-project analytics summary",
    ],
  };
}

// ─── Marketing Strategy ──────────────────────────────────

/**
 * TODO: Replace with OpenAI API call
 */
export async function getMarketingStrategy(input: {
  niche: string;
  businessSize: string;
  budget: string;
}): Promise<{ channels: string[]; plan: string; timeline: string }> {
  // STUB
  await new Promise((r) => setTimeout(r, 1000));
  return {
    channels: ["Google Ads", "Meta Ads", "SEO", "Email Marketing", "Influencer Marketing"],
    plan: `For a ${input.businessSize} business in ${input.niche}, we recommend starting with SEO for organic growth, supplemented by targeted paid ads for immediate visibility. Your ${input.budget} budget should be split 60% digital ads / 40% content and SEO.`,
    timeline: "3–6 months to see measurable results",
  };
}

// ─── Onboarding Summarizer ───────────────────────────────

/**
 * TODO: Replace with OpenAI API call
 * Summarizes onboarding form data for expert review
 */
export async function summarizeOnboarding(formData: Record<string, string>): Promise<string> {
  // STUB
  await new Promise((r) => setTimeout(r, 600));
  return `Client ${formData.businessName || "Unknown"} from ${formData.industry || "unspecified industry"} is seeking ${formData.service || "business"} services with a budget of ${formData.budget || "TBD"} and timeline of ${formData.timeline || "TBD"}. Primary goal: ${formData.goals || "Business growth"}. Expert review required.`;
}
