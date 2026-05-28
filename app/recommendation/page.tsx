"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  CheckCircle2, ArrowRight, Calendar, Download,
  TrendingUp, Users, DollarSign, Zap, Loader2, Sparkles
} from "lucide-react";

interface OnboardingData {
  businessName: string;
  industry: string;
  goals: string;
  budget: string;
  timeline: string;
  campaignSize: string;
  targetAudience: string;
  service: string;
  serviceLabel: string;
  subcategory: string;
  subcategoryLabel: string;
}

// Mock recommendation output (replaced by OpenAI in future phase)
function generateRecommendation(data: OnboardingData) {
  const budgetBreakdown = [
    { label: "Strategy & Planning", percentage: 20, color: "#F5C518" },
    { label: "Creative Production", percentage: 35, color: "#38BDF8" },
    { label: "Campaign Management", percentage: 30, color: "#A78BFA" },
    { label: "Analytics & Reporting", percentage: 15, color: "#34D399" },
  ];
  const timeline = [
    { phase: "Discovery & Strategy", duration: "Week 1–2", deliverables: ["Brand audit", "Strategy document", "Competitor analysis"] },
    { phase: "Creation & Setup", duration: "Week 3–4", deliverables: ["Creative assets", "Campaign setup", "Tracking installation"] },
    { phase: "Launch & Optimize", duration: "Week 5–8", deliverables: ["Campaign launch", "A/B testing", "Weekly reports"] },
    { phase: "Scale & Report", duration: "Week 9–12", deliverables: ["Scale winning channels", "ROI analysis", "Final report"] },
  ];
  const expectedResults = [
    "3x increase in brand awareness within 60 days",
    "40% growth in qualified leads month-over-month",
    "25% reduction in cost per acquisition",
    "Measurable ROI within 90 days of launch",
  ];
  const nextSteps = [
    "Book a free consultation with our expert team",
    "Review and approve the strategy document",
    "Make initial project payment",
    "Get onboarded to your client dashboard",
  ];
  return { budgetBreakdown, timeline, expectedResults, nextSteps };
}

export default function RecommendationPage() {
  const router = useRouter();
  const [data, setData] = useState<OnboardingData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const raw = sessionStorage.getItem("onboarding-data");
    if (!raw) {
      // Demo mode — use placeholder data
      setData({
        businessName: "Your Business",
        industry: "E-Commerce",
        goals: "Increase brand awareness and drive qualified leads",
        budget: "₹25,000 – ₹50,000",
        timeline: "1–2 months",
        campaignSize: "Small Business (1–10 employees)",
        targetAudience: "Urban professionals aged 25–40",
        service: "marketing",
        serviceLabel: "Marketing",
        subcategory: "seo-marketing",
        subcategoryLabel: "SEO Marketing",
      });
    } else {
      setData(JSON.parse(raw));
    }
    setTimeout(() => setLoading(false), 1200);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#060D1A] flex items-center justify-center">
        <div className="text-center">
          <div className="relative mb-6">
            <div className="w-16 h-16 rounded-full gradient-brand flex items-center justify-center mx-auto">
              <Sparkles className="w-7 h-7 text-[#0F172A]" />
            </div>
            <span className="absolute inset-0 rounded-full gradient-brand opacity-30 animate-ping" />
          </div>
          <p className="text-lg font-bold text-white mb-2">Generating Your Strategy...</p>
          <p className="text-sm text-white/40">Our AI is analysing your requirements</p>
        </div>
      </div>
    );
  }

  if (!data) return null;
  const rec = generateRecommendation(data);

  return (
    <div className="min-h-screen bg-[#060D1A]">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-12 bg-gradient-to-b from-[#0C1F3A] to-[#060D1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
            <div className="w-16 h-16 rounded-2xl gradient-brand flex items-center justify-center mx-auto mb-6 shadow-xl">
              <Sparkles className="w-7 h-7 text-[#0F172A]" />
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#F5C518]/30 bg-[#F5C518]/8 text-[#F5C518] text-xs font-semibold uppercase tracking-wider mb-5">
              <CheckCircle2 className="w-3.5 h-3.5" /> Strategy Ready
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
              Your{" "}
              <span className="gradient-text-yellow">{data.subcategoryLabel}</span>{" "}
              Strategy is Ready
            </h1>
            <p className="text-white/55 text-lg max-w-2xl mx-auto">
              Based on your inputs, here&apos;s a tailored strategy for{" "}
              <span className="text-white font-semibold">{data.businessName}</span>.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-20 space-y-8">

        {/* Summary card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="rounded-2xl border border-white/10 bg-white/3 p-6"
        >
          <h2 className="text-lg font-bold text-white mb-4">Strategy Overview</h2>
          <div className="grid sm:grid-cols-3 gap-4 mb-4">
            {[
              { icon: TrendingUp, label: "Service", value: `${data.serviceLabel} · ${data.subcategoryLabel}`, color: "#F5C518" },
              { icon: DollarSign, label: "Budget Range", value: data.budget, color: "#38BDF8" },
              { icon: Users, label: "Business Scale", value: data.campaignSize, color: "#A78BFA" },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-3 p-4 rounded-xl bg-white/4">
                <item.icon className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: item.color }} />
                <div>
                  <p className="text-[10px] text-white/40 uppercase tracking-wider mb-0.5">{item.label}</p>
                  <p className="text-sm font-semibold text-white">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 rounded-xl bg-[#F5C518]/8 border border-[#F5C518]/20">
            <p className="text-sm text-white/70 leading-relaxed">
              <span className="text-[#F5C518] font-semibold">AI Strategy: </span>
              Based on your {data.industry} business and focus on {data.subcategoryLabel}, we recommend a phased approach starting with brand awareness and moving toward targeted conversion campaigns. Your budget of <strong className="text-white">{data.budget}</strong> over <strong className="text-white">{data.timeline}</strong> allows for a solid foundation with measurable ROI.
            </p>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Budget Breakdown */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="rounded-2xl border border-white/10 bg-white/3 p-6"
          >
            <h2 className="text-lg font-bold text-white mb-5">Budget Allocation</h2>
            <div className="space-y-3">
              {rec.budgetBreakdown.map((item) => (
                <div key={item.label}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm text-white/70">{item.label}</span>
                    <span className="text-sm font-bold" style={{ color: item.color }}>{item.percentage}%</span>
                  </div>
                  <div className="h-2 bg-white/8 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.percentage}%` }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      className="h-full rounded-full"
                      style={{ background: item.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Expected Results */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="rounded-2xl border border-white/10 bg-white/3 p-6"
          >
            <h2 className="text-lg font-bold text-white mb-5">Expected Results</h2>
            <div className="space-y-3">
              {rec.expectedResults.map((result) => (
                <div key={result} className="flex items-start gap-3">
                  <Zap className="w-4 h-4 text-[#F5C518] flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-white/70 leading-relaxed">{result}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 p-3 rounded-xl bg-[#34D399]/8 border border-[#34D399]/20">
              <p className="text-xs text-[#34D399] font-semibold">Estimated Project Range</p>
              <p className="text-2xl font-black text-white mt-1">₹25,000 – ₹75,000</p>
              <p className="text-xs text-white/40">Final quotation after consultation</p>
            </div>
          </motion.div>
        </div>

        {/* Timeline */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
          className="rounded-2xl border border-white/10 bg-white/3 p-6"
        >
          <h2 className="text-lg font-bold text-white mb-5">Delivery Timeline</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {rec.timeline.map((phase, i) => (
              <div key={phase.phase} className="relative">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-full gradient-brand flex items-center justify-center text-[10px] font-black text-[#0F172A]">
                    {i + 1}
                  </div>
                  <span className="text-xs text-white/40">{phase.duration}</span>
                </div>
                <h4 className="text-sm font-bold text-white mb-2">{phase.phase}</h4>
                <ul className="space-y-1">
                  {phase.deliverables.map((d) => (
                    <li key={d} className="text-xs text-white/50 flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-[#F5C518]/60 flex-shrink-0" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Next Steps CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
          className="rounded-2xl border border-[#F5C518]/20 bg-gradient-to-br from-[#F5C518]/10 to-[#38BDF8]/5 p-8 text-center"
        >
          <h2 className="text-2xl font-black text-white mb-3">Ready to Make It Happen?</h2>
          <p className="text-white/55 mb-8 max-w-lg mx-auto">
            Your strategy is ready. The next step is a free 30-minute consultation with our expert team to finalize scope and pricing.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/book-consultation"
              id="rec-book-btn"
              className="group flex items-center gap-2 px-8 py-4 rounded-xl gradient-yellow text-[#0F172A] font-bold text-sm shadow-xl hover:scale-105 transition-all"
            >
              <Calendar className="w-4 h-4" />
              Book Free Consultation
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/payment"
              id="rec-payment-btn"
              className="flex items-center gap-2 px-8 py-4 rounded-xl border border-white/15 text-white/80 font-semibold text-sm hover:bg-white/8 transition-all"
            >
              View Pricing Packages
            </Link>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}
