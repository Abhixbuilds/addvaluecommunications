// Centralized data for all services and subcategories
// Used by service pages, onboarding, and recommendation engine

export type ServiceId = "finance" | "advertisement" | "pr" | "marketing" | "insurance";

export interface Subcategory {
  id: string;
  label: string;
  description: string;
  icon: string;
  stat: string;
  statLabel: string;
  startingAt: string;
}

export interface ServiceData {
  id: ServiceId;
  label: string;
  tagline: string;
  description: string;
  heroDescription: string;
  color: string;
  bgColor: string;
  borderColor: string;
  subcategories: Subcategory[];
  whyUs: { title: string; description: string }[];
  process: { step: string; title: string; description: string }[];
}

export const SERVICES_DATA: Record<ServiceId, ServiceData> = {
  finance: {
    id: "finance",
    label: "Finance",
    tagline: "Fund. Plan. Grow.",
    color: "#F5C518",
    bgColor: "#F5C51815",
    borderColor: "#F5C51830",
    description: "Expert financial guidance to fund, plan, and grow your business.",
    heroDescription:
      "From startup funding to accounting solutions — our financial experts help businesses at every stage make smarter money decisions and achieve sustainable growth.",
    subcategories: [
      { id: "startup-funding", label: "Startup Funding Guidance", description: "Expert support to prepare your pitch, identify investors, and secure seed or Series funding for your startup.", icon: "🚀", stat: "₹50Cr+", statLabel: "Funds Raised", startingAt: "₹15,000" },
      { id: "taxation", label: "Taxation Services", description: "End-to-end tax planning, filing, and compliance services for startups, SMEs, and enterprises in India.", icon: "📋", stat: "1,200+", statLabel: "Returns Filed", startingAt: "₹8,000" },
      { id: "budget-planning", label: "Budget Planning", description: "Build detailed financial budgets, forecasts, and cash flow models to manage your business finances strategically.", icon: "📊", stat: "98%", statLabel: "Accuracy Rate", startingAt: "₹12,000" },
      { id: "investment-consulting", label: "Investment Consulting", description: "Strategic investment advisory to grow your business capital through smart diversification and risk management.", icon: "📈", stat: "3.2x", statLabel: "Avg. Returns", startingAt: "₹20,000" },
      { id: "loan-assistance", label: "Loan Assistance", description: "End-to-end support for business loan applications — documentation, lender matching, and approval guidance.", icon: "🏦", stat: "94%", statLabel: "Approval Rate", startingAt: "₹10,000" },
      { id: "accounting-solutions", label: "Accounting Solutions", description: "Monthly bookkeeping, P&L reporting, reconciliation, and financial dashboard management for your business.", icon: "🧾", stat: "500+", statLabel: "Businesses Managed", startingAt: "₹6,000" },
    ],
    whyUs: [
      { title: "CA & CFA Certified Experts", description: "Our team holds top financial certifications with 10+ years of industry experience." },
      { title: "Complete Confidentiality", description: "Your financial data is handled with bank-grade security and strict NDA protection." },
      { title: "Startup Friendly", description: "We understand the unique financial challenges of early-stage businesses and tailor solutions accordingly." },
    ],
    process: [
      { step: "01", title: "Initial Consultation", description: "Free 30-min call to understand your financial goals and challenges." },
      { step: "02", title: "Financial Assessment", description: "Comprehensive review of your current financial health and requirements." },
      { step: "03", title: "Strategy & Execution", description: "Expert-crafted financial plan with full implementation support." },
      { step: "04", title: "Ongoing Advisory", description: "Monthly reviews, reporting, and proactive financial guidance." },
    ],
  },

  advertisement: {
    id: "advertisement",
    label: "Advertisement",
    tagline: "Reach. Convert. Scale.",
    color: "#38BDF8",
    bgColor: "#38BDF815",
    borderColor: "#38BDF830",
    description: "Performance-driven advertising campaigns across every channel.",
    heroDescription:
      "From social media to billboards — we create and manage high-performance advertising campaigns that drive real results. Measurable reach, measurable ROI.",
    subcategories: [
      { id: "poster-advertisement", label: "Poster Advertisement", description: "Creative, high-impact poster and print ad design for offline and digital channels.", icon: "🎨", stat: "10,000+", statLabel: "Designs Created", startingAt: "₹5,000" },
      { id: "social-media-advertisement", label: "Social Media Ads", description: "Targeted paid ad campaigns on Instagram, Facebook, LinkedIn, and more — optimized for your audience.", icon: "📱", stat: "340%", statLabel: "Avg. ROAS", startingAt: "₹20,000" },
      { id: "billboard-advertisement", label: "Billboard Advertisement", description: "Strategic outdoor advertising placement and creative production across premium locations.", icon: "🏙️", stat: "500+", statLabel: "Locations", startingAt: "₹50,000" },
      { id: "video-advertisement", label: "Video Advertisement", description: "Professional video ad production from scripting to post-production for TV, OTT, and digital platforms.", icon: "🎬", stat: "2M+", statLabel: "Views Generated", startingAt: "₹35,000" },
      { id: "google-ads", label: "Google Ads", description: "Search, Display, and Shopping campaigns on Google — expertly managed for maximum conversions.", icon: "🔍", stat: "4.2x", statLabel: "Avg. ROAS", startingAt: "₹15,000" },
      { id: "meta-ads", label: "Meta Ads", description: "Advanced Meta Ads campaigns with pixel tracking, retargeting, lookalikes, and funnel optimization.", icon: "🎯", stat: "62%", statLabel: "Lower CPA", startingAt: "₹15,000" },
      { id: "influencer-marketing", label: "Influencer Marketing", description: "Connect with nano to mega influencers across niches for authentic brand campaigns.", icon: "⭐", stat: "1,000+", statLabel: "Influencer Network", startingAt: "₹25,000" },
      { id: "youtube-promotions", label: "YouTube Promotions", description: "YouTube pre-roll ads, channel sponsorships, and video SEO for maximum video reach.", icon: "▶️", stat: "5M+", statLabel: "Views Delivered", startingAt: "₹20,000" },
    ],
    whyUs: [
      { title: "Certified Ad Experts", description: "Google and Meta certified media buyers managing millions in ad spend." },
      { title: "Data-Driven Campaigns", description: "Every decision backed by analytics — no guesswork, only results." },
      { title: "Full-Funnel Strategy", description: "We manage your entire ad funnel from awareness to conversion." },
    ],
    process: [
      { step: "01", title: "Audience Research", description: "Deep analysis of your ideal customers, competitors, and market landscape." },
      { step: "02", title: "Creative Production", description: "Compelling ad creatives designed to stop the scroll and drive action." },
      { step: "03", title: "Campaign Launch", description: "Strategic campaign setup with precise targeting and budget allocation." },
      { step: "04", title: "Optimize & Scale", description: "Continuous A/B testing, optimization, and scaling of winning campaigns." },
    ],
  },

  pr: {
    id: "pr",
    label: "Public Relations",
    tagline: "Build. Trust. Lead.",
    color: "#A78BFA",
    bgColor: "#A78BFA15",
    borderColor: "#A78BFA30",
    description: "Build, protect, and amplify your brand's public reputation.",
    heroDescription:
      "Strategic PR that shapes how the world sees your brand. From press coverage to crisis management — we protect and elevate your public image with precision.",
    subcategories: [
      { id: "press-releases", label: "Press Releases", description: "Professionally crafted press releases distributed to top-tier media outlets and journalists in your industry.", icon: "📰", stat: "500+", statLabel: "Releases Published", startingAt: "₹8,000" },
      { id: "brand-reputation", label: "Brand Reputation Management", description: "Proactive monitoring and management of your brand's online and offline reputation.", icon: "🛡️", stat: "95%", statLabel: "Positive Sentiment", startingAt: "₹20,000" },
      { id: "crisis-management", label: "Crisis Management", description: "Rapid response PR strategy to protect your brand during crises, negative press, or reputational threats.", icon: "⚡", stat: "48hrs", statLabel: "Avg. Response Time", startingAt: "₹30,000" },
      { id: "influencer-pr", label: "Influencer PR", description: "Strategic PR collaborations with key influencers and content creators to amplify your brand story.", icon: "🤝", stat: "200+", statLabel: "Influencer Partners", startingAt: "₹15,000" },
      { id: "event-publicity", label: "Event Publicity", description: "End-to-end PR support for product launches, corporate events, and brand activations.", icon: "🎪", stat: "150+", statLabel: "Events Covered", startingAt: "₹25,000" },
    ],
    whyUs: [
      { title: "Established Media Network", description: "Relationships with 500+ journalists and media outlets across print, digital, and broadcast." },
      { title: "Proactive Storytelling", description: "We don't wait for news — we create compelling narratives that journalists want to publish." },
      { title: "Crisis-Ready 24/7", description: "Our crisis team is on standby to protect your reputation around the clock." },
    ],
    process: [
      { step: "01", title: "Brand Audit", description: "Comprehensive assessment of your current public image and reputation landscape." },
      { step: "02", title: "Strategy Development", description: "Tailored PR strategy aligned with your business goals and target audience." },
      { step: "03", title: "Media Outreach", description: "Strategic pitching to journalists, bloggers, and media outlets in your industry." },
      { step: "04", title: "Coverage & Monitoring", description: "Track placements, measure sentiment, and report on PR impact." },
    ],
  },

  marketing: {
    id: "marketing",
    label: "Marketing",
    tagline: "Attract. Retain. Win.",
    color: "#34D399",
    bgColor: "#34D39915",
    borderColor: "#34D39930",
    description: "Data-driven marketing strategies that attract, convert, and retain customers.",
    heroDescription:
      "Full-stack digital marketing from SEO to performance campaigns. We build marketing engines that grow traffic, generate leads, and drive revenue consistently.",
    subcategories: [
      { id: "seo-marketing", label: "SEO Marketing", description: "Technical SEO, content strategy, link building, and local SEO to rank higher and drive organic traffic.", icon: "🔎", stat: "420%", statLabel: "Avg. Traffic Growth", startingAt: "₹15,000" },
      { id: "email-marketing", label: "Email Marketing", description: "Strategy, design, automation, and analytics for email campaigns that convert subscribers to customers.", icon: "📧", stat: "42%", statLabel: "Avg. Open Rate", startingAt: "₹10,000" },
      { id: "lead-generation", label: "Lead Generation", description: "Multi-channel lead generation funnels — content, ads, landing pages — designed to fill your pipeline.", icon: "🎯", stat: "3x", statLabel: "More Qualified Leads", startingAt: "₹20,000" },
      { id: "growth-marketing", label: "Growth Marketing", description: "Rapid experimentation and growth hacking strategies to accelerate startup and business growth.", icon: "🚀", stat: "180%", statLabel: "Avg. MoM Growth", startingAt: "₹25,000" },
      { id: "affiliate-marketing", label: "Affiliate Marketing", description: "Build and manage affiliate programs to expand your reach through a commission-based partner network.", icon: "🔗", stat: "300+", statLabel: "Affiliate Partners", startingAt: "₹12,000" },
      { id: "performance-marketing", label: "Performance Marketing", description: "Data-driven campaigns focused on measurable KPIs — clicks, conversions, cost-per-acquisition.", icon: "📊", stat: "65%", statLabel: "Lower CPA", startingAt: "₹18,000" },
    ],
    whyUs: [
      { title: "Full-Funnel Expertise", description: "We manage every stage of the marketing funnel from awareness to loyalty." },
      { title: "Analytics-First", description: "Every campaign is tracked, measured, and optimized based on real data." },
      { title: "Industry Specialists", description: "Dedicated marketing strategists with deep expertise in your specific niche." },
    ],
    process: [
      { step: "01", title: "Market Research", description: "Audience analysis, competitor benchmarking, and opportunity identification." },
      { step: "02", title: "Strategy & Planning", description: "Channel selection, content calendar, and campaign blueprint development." },
      { step: "03", title: "Execution & Launch", description: "Multi-channel campaign execution with precise tracking from day one." },
      { step: "04", title: "Analyze & Scale", description: "Monthly reporting, strategy iteration, and scaling of winning channels." },
    ],
  },

  insurance: {
    id: "insurance",
    label: "Insurance",
    tagline: "Protect. Secure. Prosper.",
    color: "#FB923C",
    bgColor: "#FB923C15",
    borderColor: "#FB923C30",
    description: "Comprehensive business insurance and risk management solutions.",
    heroDescription:
      "Protect your business, employees, and assets with expertly structured insurance solutions. We analyze your risk exposure and design coverage that keeps your business secure.",
    subcategories: [
      { id: "business-insurance", label: "Business Insurance", description: "Comprehensive business insurance policies covering property, operations, and general liability.", icon: "🏢", stat: "1,000+", statLabel: "Policies Managed", startingAt: "₹12,000" },
      { id: "employee-insurance", label: "Employee Insurance", description: "Group health, life, and accident insurance plans to protect your team and attract top talent.", icon: "👥", stat: "10,000+", statLabel: "Employees Covered", startingAt: "₹8,000" },
      { id: "asset-insurance", label: "Asset Insurance", description: "Insurance coverage for your business assets — equipment, machinery, inventory, and property.", icon: "🏭", stat: "₹500Cr+", statLabel: "Assets Insured", startingAt: "₹10,000" },
      { id: "liability-protection", label: "Liability Protection", description: "Professional indemnity, product liability, and public liability insurance for comprehensive protection.", icon: "⚖️", stat: "Zero", statLabel: "Claim Rejections", startingAt: "₹15,000" },
      { id: "startup-risk-coverage", label: "Startup Risk Coverage", description: "Tailored insurance packages for startups covering D&O, cyber risks, IP, and operational risks.", icon: "🛡️", stat: "500+", statLabel: "Startups Protected", startingAt: "₹18,000" },
    ],
    whyUs: [
      { title: "IRDAI Certified Advisors", description: "All our insurance advisors are certified by the Insurance Regulatory Authority of India." },
      { title: "Best-in-Market Rates", description: "We compare across 30+ insurers to get you the best coverage at the lowest premium." },
      { title: "Claims Support", description: "Dedicated claims support team to ensure smooth, fast claim settlements when you need it most." },
    ],
    process: [
      { step: "01", title: "Risk Assessment", description: "Comprehensive analysis of your business's risk exposure and coverage gaps." },
      { step: "02", title: "Policy Recommendation", description: "Tailored insurance recommendations compared across top insurers." },
      { step: "03", title: "Policy Issuance", description: "Seamless onboarding, documentation, and policy activation." },
      { step: "04", title: "Claims & Renewal", description: "Proactive claims support and annual policy review for optimal coverage." },
    ],
  },
};

export const ALL_SERVICE_IDS: ServiceId[] = ["finance", "advertisement", "pr", "marketing", "insurance"];
