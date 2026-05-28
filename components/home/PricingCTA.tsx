"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

const FEATURES = [
  "Dedicated account manager",
  "Transparent pricing — no hidden fees",
  "Project dashboard from day one",
  "Expert team assigned within 24 hours",
  "Weekly progress reports",
  "30-day satisfaction guarantee",
];

export default function PricingCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} id="pricing-cta" className="section-padding bg-[#0A1220]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl overflow-hidden"
          style={{ background: "linear-gradient(135deg, #0C1F3A 0%, #0F2D50 50%, #0A1A30 100%)" }}
        >
          {/* Background glows */}
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#F5C518]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#38BDF8]/15 rounded-full blur-3xl pointer-events-none" />

          {/* Border gradient overlay */}
          <div className="absolute inset-0 rounded-3xl border border-white/10" />

          <div className="relative p-10 md:p-16 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#F5C518]/30 bg-[#F5C518]/10 mb-6">
              <Sparkles className="w-4 h-4 text-[#F5C518]" />
              <span className="text-sm font-semibold text-[#F5C518]">Service-Based Pricing · Pay Per Project</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-5 leading-tight">
              Ready to Grow Your Business?{" "}
              <span className="gradient-text-brand">Let&apos;s Talk.</span>
            </h2>

            <p className="text-lg text-white/55 max-w-2xl mx-auto mb-8 leading-relaxed">
              No fixed subscriptions. You pay per project based on service type, complexity, timeline, and scale.
              Get a transparent quotation before you commit.
            </p>

            {/* Feature list */}
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-10">
              {FEATURES.map((f) => (
                <div key={f} className="flex items-center gap-2 text-sm text-white/60">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#34D399] flex-shrink-0" />
                  {f}
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/onboarding"
                id="pricing-cta-primary"
                className="group flex items-center gap-2 px-8 py-4 rounded-xl gradient-yellow text-[#0F172A] font-bold text-sm shadow-xl hover:shadow-2xl hover:scale-105 transition-all glow-yellow"
              >
                Start Your Project
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/book-consultation"
                id="pricing-cta-secondary"
                className="flex items-center gap-2 px-8 py-4 rounded-xl border border-white/15 text-white/80 font-semibold text-sm hover:bg-white/8 hover:border-white/25 transition-all"
              >
                Book Free Consultation
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
