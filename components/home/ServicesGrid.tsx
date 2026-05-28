"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  TrendingUp, Megaphone, Radio, BarChart3, Shield, ArrowRight,
  DollarSign, Target, Users, Zap
} from "lucide-react";

const SERVICES = [
  {
    id: "finance",
    icon: TrendingUp,
    label: "Finance",
    tagline: "Fund. Plan. Grow.",
    description:
      "Expert guidance on startup funding, taxation, budget planning, investment consulting, and accounting solutions.",
    href: "/services/finance",
    color: "#F5C518",
    bg: "from-[#F5C518]/15 to-[#F5C518]/5",
    border: "border-[#F5C518]/20",
    subcategories: ["Startup Funding", "Taxation", "Budget Planning", "Investment Consulting"],
    stat: { icon: DollarSign, value: "₹50Cr+", label: "Funds Raised" },
  },
  {
    id: "advertisement",
    icon: Megaphone,
    label: "Advertisement",
    tagline: "Reach. Convert. Scale.",
    description:
      "Poster, social media, billboard, video, Google Ads, Meta Ads, influencer campaigns and YouTube promotions.",
    href: "/services/advertisement",
    color: "#38BDF8",
    bg: "from-[#38BDF8]/15 to-[#38BDF8]/5",
    border: "border-[#38BDF8]/20",
    subcategories: ["Social Media Ads", "Google Ads", "Meta Ads", "Video Production"],
    stat: { icon: Target, value: "340%", label: "Avg. ROI" },
  },
  {
    id: "pr",
    icon: Radio,
    label: "Public Relations",
    tagline: "Build. Trust. Lead.",
    description:
      "Press releases, brand reputation management, crisis management, influencer PR and event publicity services.",
    href: "/services/pr",
    color: "#A78BFA",
    bg: "from-[#A78BFA]/15 to-[#A78BFA]/5",
    border: "border-[#A78BFA]/20",
    subcategories: ["Press Releases", "Brand Reputation", "Crisis Management", "Event Publicity"],
    stat: { icon: Users, value: "200+", label: "Media Placements" },
  },
  {
    id: "marketing",
    icon: BarChart3,
    label: "Marketing",
    tagline: "Attract. Retain. Win.",
    description:
      "SEO, email marketing, lead generation, growth marketing, affiliate, and performance marketing strategies.",
    href: "/services/marketing",
    color: "#34D399",
    bg: "from-[#34D399]/15 to-[#34D399]/5",
    border: "border-[#34D399]/20",
    subcategories: ["SEO Marketing", "Email Campaigns", "Lead Generation", "Performance Ads"],
    stat: { icon: Zap, value: "62%", label: "Avg. Growth" },
  },
  {
    id: "insurance",
    icon: Shield,
    label: "Insurance",
    tagline: "Protect. Secure. Prosper.",
    description:
      "Business, employee, asset, liability, and startup risk coverage solutions tailored to your business needs.",
    href: "/services/insurance",
    color: "#FB923C",
    bg: "from-[#FB923C]/15 to-[#FB923C]/5",
    border: "border-[#FB923C]/20",
    subcategories: ["Business Insurance", "Employee Coverage", "Asset Protection", "Liability Shield"],
    stat: { icon: Shield, value: "100%", label: "Coverage Rate" },
  },
];

export default function ServicesGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="services" ref={ref} className="section-padding bg-[#0A1220]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider border border-[#38BDF8]/30 text-[#38BDF8] bg-[#38BDF8]/8 mb-4">
            Our Services
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
            Everything Your Business{" "}
            <span className="gradient-text-brand">Needs to Grow</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto text-lg">
            Five core service verticals. Hundreds of subcategories. One expert team. Infinite possibilities.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`${i === 4 ? "md:col-span-2 lg:col-span-1" : ""}`}
            >
              <Link
                href={service.href}
                id={`service-card-${service.id}`}
                className={`group relative rounded-2xl border ${service.border} bg-gradient-to-br ${service.bg} p-6 hover:scale-[1.02] transition-all duration-300 hover:shadow-xl overflow-hidden flex flex-col h-full block`}
              >
                {/* Glow on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                  style={{ background: `radial-gradient(circle at 50% 0%, ${service.color}15, transparent 70%)` }}
                />

                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-lg relative"
                  style={{ background: `${service.color}20` }}
                >
                  <service.icon className="w-6 h-6" style={{ color: service.color }} />
                </div>

                {/* Label */}
                <div className="flex items-center justify-between mb-1 relative">
                  <h3 className="text-xl font-black text-white">{service.label}</h3>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: `${service.color}15`, color: service.color }}>
                    {service.tagline}
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm text-white/55 leading-relaxed mb-5 relative">
                  {service.description}
                </p>

                {/* Subcategories */}
                <div className="flex flex-wrap gap-1.5 mb-5 relative">
                  {service.subcategories.map((sub) => (
                    <span key={sub} className="text-[11px] px-2.5 py-1 rounded-full bg-white/6 text-white/50 border border-white/8">
                      {sub}
                    </span>
                  ))}
                </div>

                {/* Stat + CTA */}
                <div className="flex items-center justify-between mt-auto relative">
                  <div className="flex items-center gap-2 text-xs text-white/40">
                    <service.stat.icon className="w-3.5 h-3.5" style={{ color: service.color }} />
                    <span style={{ color: service.color }} className="font-bold">{service.stat.value}</span>
                    <span>{service.stat.label}</span>
                  </div>

                  {/* Explore CTA */}
                  <span
                    className="flex items-center gap-1.5 text-sm font-semibold group-hover:gap-2.5 transition-all"
                    style={{ color: service.color }}
                  >
                    Explore
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
