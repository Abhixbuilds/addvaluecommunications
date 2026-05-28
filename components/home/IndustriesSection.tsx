"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Rocket, ShoppingCart, Heart, Building2, Tv, Wheat, Landmark, Globe } from "lucide-react";

const INDUSTRIES = [
  { label: "Startups", icon: Rocket, color: "#F5C518" },
  { label: "E-Commerce", icon: ShoppingCart, color: "#38BDF8" },
  { label: "Healthcare", icon: Heart, color: "#FB7185" },
  { label: "Real Estate", icon: Building2, color: "#A78BFA" },
  { label: "Media & Entertainment", icon: Tv, color: "#34D399" },
  { label: "FMCG & Retail", icon: ShoppingCart, color: "#FB923C" },
  { label: "Finance & Banking", icon: Landmark, color: "#F5C518" },
  { label: "Global Enterprises", icon: Globe, color: "#38BDF8" },
];

export default function IndustriesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} id="industries" className="section-padding bg-[#060D1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider border border-[#34D399]/30 text-[#34D399] bg-[#34D399]/8 mb-4">
            Industries
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            We Serve <span className="gradient-text-brand">Every Industry</span>
          </h2>
          <p className="text-white/50 max-w-lg mx-auto">
            From day-one startups to multinational enterprises, our experts deliver measurable results across all sectors.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {INDUSTRIES.map((ind, i) => (
            <motion.div
              key={ind.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="group flex flex-col items-center gap-3 p-6 rounded-2xl border border-white/8 bg-white/3 hover:bg-white/6 hover:border-white/15 transition-all cursor-default"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 duration-300"
                style={{ background: `${ind.color}20` }}
              >
                <ind.icon className="w-5.5 h-5.5" style={{ color: ind.color }} />
              </div>
              <span className="text-sm font-semibold text-white/70 group-hover:text-white text-center transition-colors">
                {ind.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
