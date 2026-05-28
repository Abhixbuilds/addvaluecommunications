"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TrendingUp, Users, DollarSign } from "lucide-react";

const STORIES = [
  {
    company: "FreshCart India",
    industry: "E-Commerce",
    service: "Performance Marketing",
    result: "340% ROAS",
    description: "Scaled from ₹2L to ₹18L monthly revenue in 90 days through targeted Meta & Google Ads strategy.",
    stats: [
      { icon: TrendingUp, label: "ROAS", value: "340%" },
      { icon: Users, label: "New Customers", value: "4,200+" },
      { icon: DollarSign, label: "Revenue Growth", value: "9x" },
    ],
    color: "#38BDF8",
    tag: "Advertisement",
  },
  {
    company: "NovaTech Solutions",
    industry: "SaaS Startup",
    service: "Startup Funding Guidance",
    result: "₹2.5Cr Raised",
    description: "Helped structure pitch deck, investor outreach, and financial models that secured seed funding.",
    stats: [
      { icon: DollarSign, label: "Funds Raised", value: "₹2.5Cr" },
      { icon: Users, label: "Investors", value: "8" },
      { icon: TrendingUp, label: "Valuation", value: "₹15Cr" },
    ],
    color: "#F5C518",
    tag: "Finance",
  },
  {
    company: "GreenLife Wellness",
    industry: "Healthcare",
    service: "SEO + PR Strategy",
    result: "+420% Traffic",
    description: "Built brand authority and organic traffic through coordinated SEO and PR campaign over 6 months.",
    stats: [
      { icon: TrendingUp, label: "Traffic Growth", value: "420%" },
      { icon: Users, label: "Media Features", value: "45+" },
      { icon: DollarSign, label: "Lead Value", value: "₹60L" },
    ],
    color: "#34D399",
    tag: "Marketing + PR",
  },
];

export default function SuccessStories() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="success" ref={ref} className="section-padding bg-[#0A1220]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider border border-[#34D399]/30 text-[#34D399] bg-[#34D399]/8 mb-4">
            Success Stories
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
            Real Businesses. <span className="gradient-text-brand">Real Results.</span>
          </h2>
          <p className="text-white/50 max-w-lg mx-auto">
            Numbers don&apos;t lie. Here&apos;s what our clients achieved.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {STORIES.map((story, i) => (
            <motion.div
              key={story.company}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="relative rounded-2xl border border-white/10 bg-white/3 p-6 overflow-hidden group hover:bg-white/5 transition-all"
            >
              {/* Top accent */}
              <div className="h-1 w-full rounded-full mb-6" style={{ background: `linear-gradient(to right, ${story.color}, transparent)` }} />

              {/* Tag */}
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full" style={{ background: `${story.color}20`, color: story.color }}>
                {story.tag}
              </span>

              {/* Headline result */}
              <p className="text-3xl font-black mt-4 mb-1" style={{ color: story.color }}>{story.result}</p>
              <h3 className="text-lg font-bold text-white mb-1">{story.company}</h3>
              <p className="text-xs text-white/40 mb-4">{story.industry} · {story.service}</p>
              <p className="text-sm text-white/55 leading-relaxed mb-6">{story.description}</p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2">
                {story.stats.map((stat) => (
                  <div key={stat.label} className="text-center p-2.5 rounded-xl bg-white/5">
                    <p className="text-base font-black text-white">{stat.value}</p>
                    <p className="text-[10px] text-white/40 mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
