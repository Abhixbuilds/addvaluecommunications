"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Play, Star, CheckCircle2 } from "lucide-react";

const HERO_BADGES = [
  "500+ Businesses Served",
  "98% Client Satisfaction",
  "50+ Expert Team",
];

const FLOATING_CARDS = [
  {
    id: "card-roi",
    label: "Campaign ROI",
    value: "+340%",
    sub: "avg. return",
    color: "#F5C518",
    x: "left-4",
    y: "top-16",
  },
  {
    id: "card-clients",
    label: "Active Projects",
    value: "128",
    sub: "this month",
    color: "#38BDF8",
    x: "right-4",
    y: "top-8",
  },
  {
    id: "card-growth",
    label: "Revenue Growth",
    value: "+62%",
    sub: "YoY average",
    color: "#34D399",
    x: "right-4",
    y: "bottom-20",
  },
];

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  // Gate looping animations to client-only to prevent hydration mismatch
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden gradient-hero pt-24"
    >
      {/* Background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-[#F5C518]/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] bg-[#38BDF8]/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#0EA5E9]/4 rounded-full blur-3xl" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — Copy */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#F5C518]/30 bg-[#F5C518]/8 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-[#F5C518] animate-pulse" />
              <span className="text-xs font-semibold text-[#F5C518] tracking-wide uppercase">
                AI-Assisted Business Services Platform
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-6"
            >
              Grow Your Business With{" "}
              <span className="gradient-text-brand">Expert-Led</span>{" "}
              Solutions
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-white/60 leading-relaxed mb-8 max-w-lg"
            >
              One platform. Multiple business solutions. AI-powered recommendations.{" "}
              <span className="text-white/80 font-medium">Real experts. Real growth.</span>
            </motion.p>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-3 mb-8"
            >
              {HERO_BADGES.map((badge) => (
                <div key={badge} className="flex items-center gap-1.5 text-sm text-white/60">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#34D399]" />
                  {badge}
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                href="/onboarding"
                id="hero-cta-primary"
                className="group flex items-center gap-2 px-7 py-3.5 rounded-xl gradient-yellow text-[#0F172A] font-bold text-sm shadow-xl hover:shadow-2xl hover:scale-105 transition-all glow-yellow"
              >
                Get Started Free
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="#services"
                id="hero-cta-secondary"
                className="group flex items-center gap-2 px-7 py-3.5 rounded-xl border border-white/15 text-white/80 font-semibold text-sm hover:bg-white/8 hover:border-white/25 transition-all"
              >
                <Play className="w-4 h-4 text-[#38BDF8]" />
                Explore Services
              </Link>
            </motion.div>

            {/* Social Proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-10 flex items-center gap-4"
            >
              <div className="flex -space-x-3">
                {["A", "B", "C", "D", "E"].map((l, i) => (
                  <div
                    key={l}
                    className="w-9 h-9 rounded-full border-2 border-[#0F172A] flex items-center justify-center text-xs font-bold text-white"
                    style={{
                      background: ["#F5C518", "#38BDF8", "#A78BFA", "#34D399", "#FB923C"][i],
                      color: i === 0 ? "#0F172A" : "white",
                    }}
                  >
                    {l}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1 mb-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#F5C518] text-[#F5C518]" />
                  ))}
                </div>
                <p className="text-xs text-white/40">
                  Trusted by <span className="text-white/70 font-semibold">500+</span> businesses
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right — Dashboard Visual */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            {/* Main dashboard mockup */}
            <div className="relative mx-auto w-full max-w-lg">
              <div
                className="rounded-2xl border border-white/10 overflow-hidden shadow-2xl"
                style={{ background: "rgba(15,23,42,0.8)", backdropFilter: "blur(20px)" }}
              >
                {/* Window chrome */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/8">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-500/70" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
                    <span className="w-3 h-3 rounded-full bg-green-500/70" />
                  </div>
                  <div className="flex-1 mx-4 px-3 py-1 rounded-md bg-white/5 text-xs text-white/30 text-center">
                    dashboard.addvaluecommunications.com
                  </div>
                </div>

                {/* Dashboard content */}
                <div className="p-5">
                  {/* Stats row */}
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {[
                      { label: "Revenue", value: "₹4.2L", change: "+24%", color: "#F5C518" },
                      { label: "Projects", value: "28", change: "+6", color: "#38BDF8" },
                      { label: "Clients", value: "142", change: "+12%", color: "#34D399" },
                    ].map((stat) => (
                      <div key={stat.label} className="bg-white/5 rounded-xl p-3">
                        <p className="text-[10px] text-white/40 mb-1">{stat.label}</p>
                        <p className="text-lg font-black text-white">{stat.value}</p>
                        <p className="text-[10px] font-semibold" style={{ color: stat.color }}>
                          {stat.change}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Chart */}
                  <div className="bg-white/5 rounded-xl p-4 mb-4">
                    <p className="text-xs font-semibold text-white/50 mb-3">Campaign Performance</p>
                    <div className="flex items-end gap-1.5 h-16">
                      {[40, 65, 45, 80, 55, 90, 70, 95, 75, 85, 60, 100].map((h, i) => (
                        <div
                          key={i}
                          className="flex-1 rounded-t-sm"
                          style={{
                            height: `${h}%`,
                            background: i === 11
                              ? "linear-gradient(to top, #F5C518, #FFD84D)"
                              : `rgba(56,189,248,${0.2 + i * 0.05})`,
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Active projects */}
                  <div className="space-y-2">
                    {[
                      { name: "Meta Ads Campaign", status: "Active", progress: 72, color: "#38BDF8" },
                      { name: "SEO Strategy Q3", status: "Review", progress: 90, color: "#F5C518" },
                      { name: "Brand PR Rollout", status: "Planning", progress: 30, color: "#A78BFA" },
                    ].map((p) => (
                      <div key={p.name} className="flex items-center gap-3 bg-white/5 rounded-xl p-3">
                        <div className="w-1.5 h-8 rounded-full" style={{ background: p.color }} />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-white/80 truncate">{p.name}</p>
                          <div className="mt-1 h-1 bg-white/10 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all"
                              style={{ width: `${p.progress}%`, background: p.color }}
                            />
                          </div>
                        </div>
                        <span
                          className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                          style={{ background: `${p.color}20`, color: p.color }}
                        >
                          {p.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating metric cards — looping animation only runs client-side */}
              {FLOATING_CARDS.map((card, i) => (
                <motion.div
                  key={card.id}
                  animate={mounted ? { y: [0, -8, 0] } : { y: 0 }}
                  transition={{ duration: 4 + i, repeat: mounted ? Infinity : 0, ease: "easeInOut", delay: i * 1.2 }}
                  className={`absolute ${card.x} ${card.y} glass rounded-xl px-4 py-3 shadow-xl border border-white/10`}
                >
                  <p className="text-[10px] text-white/40 mb-0.5">{card.label}</p>
                  <p className="text-xl font-black" style={{ color: card.color }}>{card.value}</p>
                  <p className="text-[10px] text-white/30">{card.sub}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator — looping animation only runs client-side */}
      <motion.div
        animate={mounted ? { y: [0, 8, 0] } : { y: 0 }}
        transition={{ duration: 2, repeat: mounted ? Infinity : 0 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-white/30 uppercase tracking-widest">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent" />
      </motion.div>
    </section>
  );
}
