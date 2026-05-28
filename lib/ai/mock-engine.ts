/**
 * AI Mock Engine — Development & Fallback Mode
 *
 * Provides rich, context-aware business consultant responses
 * when OpenAI is unavailable (no key, billing inactive, quota exceeded, etc.)
 *
 * Responses are varied, markdown-formatted, and feel genuinely intelligent.
 */

interface MockRule {
  keywords: string[];
  responses: string[];
}

// ── Context-aware response rules ──────────────────────────
const RULES: MockRule[] = [
  {
    keywords: ["hello", "hi", "hey", "start", "help", "what can you", "who are you", "introduce"],
    responses: [
      "Hi there! 👋 I'm your **AddValue AI Business Consultant**.\n\nI help businesses across India grow smarter. Here's what I can do for you:\n\n- 🎯 Identify the right service for your goals\n- 💰 Estimate realistic budgets and ROI\n- 📊 Build a tailored growth strategy\n- 📅 Get you connected with our expert team\n\nWhat's your biggest business challenge right now?",
      "Welcome to AddValue Communications! 🚀\n\nI'm your AI strategy assistant. Whether you need help with **marketing, finance, PR, advertising, or insurance** — I can guide you to the right solution.\n\nTell me a bit about your business — what industry are you in?",
    ],
  },
  {
    keywords: ["marketing", "seo", "content", "social media", "email", "influencer", "brand"],
    responses: [
      "Great choice — **marketing is the engine of growth**. Here's how we'd approach it:\n\n**Phase 1 — Foundation (Weeks 1–2)**\n- Brand audit & competitor analysis\n- Identify your top 2-3 channels\n- Set measurable KPIs\n\n**Phase 2 — Execution (Weeks 3–8)**\n- Content calendar + SEO strategy\n- Social media campaigns\n- Email nurture sequences\n\n📊 Typical results: 40–60% increase in organic traffic within 90 days.\n\n💰 Budget range: ₹25,000 – ₹75,000 depending on scale.\n\n➡️ [Start your marketing onboarding](/onboarding/marketing)",
      "For marketing, the biggest mistake businesses make is **spreading too thin across too many channels**.\n\nOur recommendation for most Indian SMBs:\n\n1. **SEO + Google Business** — captures intent-driven traffic (people already searching for you)\n2. **Instagram/Meta Ads** — builds brand awareness at scale\n3. **WhatsApp marketing** — highest open rates in India (98%!)\n\nWhich stage is your business at — brand new, growing, or scaling?",
    ],
  },
  {
    keywords: ["advertisement", "ads", "meta", "google ads", "youtube", "ppc", "paid", "campaign"],
    responses: [
      "Paid advertising done right delivers **immediate, measurable ROI**. Here's what works for Indian businesses:\n\n**Meta Ads (Facebook + Instagram)**\n- Best for: B2C, fashion, food, lifestyle, services\n- Avg. CPL in India: ₹40–₹200 per lead\n- Recommended budget: ₹15,000–₹50,000/month\n\n**Google Ads**\n- Best for: B2B, local services, high-intent buyers\n- Avg. CPC in India: ₹8–₹80 depending on industry\n- Recommended budget: ₹20,000–₹60,000/month\n\n🎯 We handle strategy, creatives, targeting, and optimization.\n\n➡️ [View Advertisement Services](/services/advertisement)",
      "Before running ads, three things need to be in place:\n\n1. ✅ **A clear offer** — what exactly are you selling and why should someone choose you?\n2. ✅ **A landing page** — not your homepage, a dedicated conversion page\n3. ✅ **Tracking** — Meta Pixel, Google Tag, conversion events set up\n\nSkipping any of these = wasted ad spend. We handle all three as part of our ad packages.\n\nWhat's your product or service? I'll tell you which ad platform is best for you.",
    ],
  },
  {
    keywords: ["pr", "public relations", "press", "media", "reputation", "news", "journalist", "coverage", "press release"],
    responses: [
      "Strategic PR builds **trust that ads simply can't buy**. Here's what our PR team delivers:\n\n📰 **Media Placements** — Economic Times, Inc42, YourStory, Business Standard, Mint\n📣 **Press Releases** — Written, distributed, and tracked\n🛡️ **Reputation Management** — Monitor and shape your brand narrative\n🚨 **Crisis Management** — 24-hour response protocol\n\nFor startups, **one good feature in Inc42 or YourStory** can drive 500–2,000 signups organically.\n\n💰 PR packages start from ₹20,000 per campaign.\n\n➡️ [View PR Services](/services/pr)",
      "The best PR strategy for Indian businesses right now:\n\n1. **Thought leadership articles** — position your founder as an expert in top publications\n2. **Funding/milestone announcements** — every milestone is a story opportunity\n3. **Award nominations** — India has 50+ credible business awards that generate press\n4. **Podcast appearances** — growing fast, less competition than traditional media\n\nWhat milestone or story does your business have that we could pitch to journalists?",
    ],
  },
  {
    keywords: ["finance", "funding", "tax", "gst", "accounting", "ca", "investment", "loan", "startup", "capital"],
    responses: [
      "Smart financial planning is what separates businesses that **survive from those that scale**.\n\nOur finance services cover:\n\n💼 **Startup Finance**\n- Pitch deck financial modeling\n- Investor-ready P&L and projections\n- Valuation support\n\n📊 **Tax & Compliance**\n- GST filing & optimization\n- Income tax planning\n- MCA compliance\n\n💰 **Funding Strategy**\n- Angel investor connections\n- MSME loan assistance\n- Government grant identification (Startup India, SIDBI)\n\n➡️ [Explore Finance Services](/services/finance)",
      "Quick financial health check — answer these 3 questions:\n\n1. Do you have a **cash flow forecast** for the next 6 months?\n2. Is your **GST input credit** being claimed correctly?\n3. Do you have a **tax-efficient salary structure** if you have a company?\n\nMost SMBs in India are leaving ₹50,000–₹2,00,000 on the table annually from these three alone. Our CA team can do a free audit.\n\n➡️ [Book a Finance Consultation](/book-consultation)",
    ],
  },
  {
    keywords: ["insurance", "coverage", "protect", "risk", "policy", "health", "liability", "asset"],
    responses: [
      "Business insurance isn't optional — it's **risk management**. Here's what most Indian businesses need:\n\n🏢 **Business Liability Insurance** — protects against client claims, accidents\n👩‍💼 **Employee Health Insurance** — mandatory if 10+ employees (ESIC), but advisable from day 1\n💻 **Cyber Insurance** — critical if you handle customer data\n🏭 **Asset Insurance** — office equipment, inventory, property\n\nMost growing businesses need ₹2,000–₹8,000/month in premiums for comprehensive coverage.\n\n➡️ [View Insurance Options](/services/insurance)",
    ],
  },
  {
    keywords: ["cost", "price", "budget", "how much", "charges", "fee", "rate", "rupees", "₹", "expensive", "cheap", "affordable"],
    responses: [
      "Here's our **transparent pricing structure**:\n\n| Package | Price | Best For |\n|---|---|---|\n| 🔵 Starter | ₹25,000 | Solopreneurs & small biz |\n| 🟡 Growth | ₹65,000 | Scaling businesses |\n| 🟣 Enterprise | Custom | Large teams & brands |\n\n**What's included:**\n- Dedicated account manager\n- Strategy document\n- Execution support\n- Weekly reports\n- Direct messaging via dashboard\n\nAll prices are **one-time project fees** — no subscriptions, no lock-in.\n\n➡️ [See Full Pricing Details](/payment)",
      "Good news — our pricing is **fully transparent and project-based**.\n\nFor context, here's what a typical client spends:\n\n- **Early-stage startup:** ₹25,000–₹40,000 for brand + one service\n- **Growing SMB:** ₹60,000–₹1,20,000 for a full multi-service campaign\n- **Established brand:** ₹1,50,000–₹5,00,000 for enterprise-level strategy\n\nWant a custom quote for your specific needs? I can generate one based on your goals.\n\n➡️ [Get a Custom Quotation](/onboarding)",
    ],
  },
  {
    keywords: ["consultation", "book", "call", "meeting", "talk", "speak", "expert", "schedule", "appointment"],
    responses: [
      "📅 **Book your free 30-minute strategy consultation** — no commitment, no credit card.\n\nHere's what happens on the call:\n1. Our expert reviews your business goals\n2. We identify the 2-3 highest-impact opportunities\n3. We give you a clear roadmap and cost estimate\n4. You decide if you want to proceed — zero pressure\n\n🕘 Available: Monday–Saturday, 9 AM – 7 PM IST\n\n➡️ [Book Free Consultation](/book-consultation)",
    ],
  },
  {
    keywords: ["dashboard", "project", "status", "track", "progress", "invoice", "report"],
    responses: [
      "Your **Client Dashboard** gives you full visibility into everything:\n\n📊 **Projects** — real-time progress, milestones, deliverables\n💬 **Messages** — direct chat with your account manager\n🧾 **Invoices** — download PDFs, track payment status\n⚙️ **Settings** — update profile, notification preferences\n\nAll updates from our team appear here in real-time — no more chasing emails!\n\n➡️ [Open Your Dashboard](/dashboard)",
    ],
  },
  {
    keywords: ["how long", "timeline", "when", "duration", "time", "weeks", "months", "delivery"],
    responses: [
      "Delivery timelines vary by service and scope:\n\n| Service | Typical Timeline |\n|---|---|\n| Strategy document | 5–7 business days |\n| Ad campaign setup | 7–10 business days |\n| PR press release | 3–5 business days |\n| Full marketing campaign | 3–4 weeks |\n| Finance audit | 2–3 weeks |\n\n⚡ **Rush delivery** available for select services (+20% fee).\n\nWhat's your deadline? I can tell you what's achievable.",
    ],
  },
  {
    keywords: ["team", "who", "expert", "experience", "background", "years", "founded"],
    responses: [
      "**AddValue Communications** was built by a team of specialists who've worked with 500+ businesses across India.\n\nOur team includes:\n- 🎯 **Marketing strategists** — ex-agency professionals with 8+ years experience\n- 💰 **CA-qualified finance experts** — Big 4 backgrounds\n- 📰 **PR specialists** — former journalists & media relations experts\n- 🎨 **Creative directors** — worked with top Indian brands\n- 🤖 **AI integration engineers** — building the future of business consulting\n\n**Track record:**\n- ₹50Cr+ in client revenue growth attributed\n- 500+ businesses served\n- 4.9★ average client rating\n\n➡️ [See Client Success Stories](/#testimonials)",
    ],
  },
  {
    keywords: ["result", "roi", "return", "success", "case study", "example", "proof", "testimonial"],
    responses: [
      "Here are **real results** from our clients:\n\n📈 **FreshCart India** (E-Commerce)\n- Problem: Stagnant online sales\n- Solution: SEO + Meta Ads campaign\n- Result: 3.2x revenue growth in 4 months\n\n🏗️ **NovaTech Solutions** (B2B SaaS)\n- Problem: No brand presence\n- Solution: PR + LinkedIn strategy\n- Result: Featured in Economic Times, 200% lead increase\n\n🌿 **GreenLife Wellness** (D2C)\n- Problem: High CAC\n- Solution: Influencer + content strategy\n- Result: CAC reduced by 45%, ROAS of 4.8x\n\nWant to see more? Or shall I outline what results we'd target for your business?",
    ],
  },
  {
    keywords: ["compare", "vs", "difference", "better", "which", "recommend", "suggest", "should i"],
    responses: [
      "Great question! Let me help you decide.\n\nThe best service depends on **your primary goal**:\n\n| Goal | Best Service |\n|---|---|\n| Get leads fast | Advertisement (Paid Ads) |\n| Build long-term visibility | SEO + Content Marketing |\n| Build brand credibility | PR + Media Coverage |\n| Raise funding | Finance + PR combo |\n| Protect business | Insurance |\n| Scale profitably | Full-stack Marketing |\n\nMost successful clients **start with 1 core service** and expand as they see ROI.\n\nWhat's your #1 priority in the next 90 days?",
    ],
  },
];

const DEFAULT_RESPONSES = [
  "That's a great question! To give you the most accurate advice, could you tell me:\n\n1. **What industry** is your business in?\n2. **What's your main goal** — more leads, brand awareness, or revenue growth?\n3. **What's your approximate monthly budget** for marketing/business services?\n\nWith those details, I can give you a tailored strategy recommendation. 🎯",
  "I want to make sure I give you the most relevant answer.\n\nCould you share a bit more context?\n- What stage is your business at? (startup / growing / established)\n- Which service area interests you most? (Marketing / Finance / PR / Ads / Insurance)\n- What outcome are you trying to achieve?\n\nThe more specific you are, the better I can help! 💡",
  "Great — let me think about this for you.\n\nBased on what thousands of Indian businesses have needed, the most impactful first step is usually:\n\n1. ✅ Getting your **digital presence** right (SEO + social media)\n2. ✅ Running **targeted ads** to your ideal customer\n3. ✅ Building **PR credibility** to close higher-value deals\n\nWhich of these feels most relevant to where you are right now?",
];

let responseIndex = 0;

/**
 * Get a mock response based on conversation history
 */
export function getMockChatResponse(messages: { role: string; content: string }[]): string {
  const lastUserMessage = messages
    .filter((m) => m.role === "user")
    .pop()?.content?.toLowerCase() ?? "";

  // Check each rule
  for (const rule of RULES) {
    if (rule.keywords.some((kw) => lastUserMessage.includes(kw))) {
      // Rotate through responses for the matched rule
      const idx = Math.floor(Math.random() * rule.responses.length);
      return rule.responses[idx];
    }
  }

  // Default response (rotate to avoid repetition)
  const response = DEFAULT_RESPONSES[responseIndex % DEFAULT_RESPONSES.length];
  responseIndex++;
  return response;
}

/**
 * Simulated delay to feel like real AI thinking (400–900ms)
 */
export function mockDelay(): Promise<void> {
  const ms = 400 + Math.random() * 500;
  return new Promise((r) => setTimeout(r, ms));
}

/**
 * Check if an error is an OpenAI billing/quota error
 */
export function isOpenAIBillingError(error: unknown): boolean {
  if (!error || typeof error !== "object") return false;
  const e = error as { status?: number; code?: string; message?: string };
  return (
    e.status === 429 ||
    e.status === 402 ||
    e.code === "insufficient_quota" ||
    e.code === "billing_not_active" ||
    (typeof e.message === "string" && (
      e.message.includes("quota") ||
      e.message.includes("billing") ||
      e.message.includes("rate limit") ||
      e.message.includes("insufficient")
    ))
  );
}
