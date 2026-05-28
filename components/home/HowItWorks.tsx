"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ClipboardList, Calendar, Zap, LineChart } from "lucide-react";

const STEPS = [
  {
    step: "01",
    icon: ClipboardList,
    title: "Choose Your Service",
    description: "Browse our five service verticals and select the subcategory that matches your business goal.",
    color: "#F5C518",
  },
  {
    step: "02",
    icon: Calendar,
    title: "Fill the Onboarding Form",
    description: "Tell us about your business, budget, target audience, and goals. Takes less than 5 minutes.",
    color: "#38BDF8",
  },
  {
    step: "03",
    icon: Zap,
    title: "Get Your Strategy & Quote",
    description: "Receive a tailored strategy recommendation and transparent project quotation instantly.",
    color: "#A78BFA",
  },
  {
    step: "04",
    icon: LineChart,
    title: "Track Growth in Dashboard",
    description: "Once your project begins, monitor progress, analytics, files, and expert communications in real time.",
    color: "#34D399",
  },
];

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="how-it-works" ref={ref} className="section-padding bg-[#0A1220]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider border border-[#A78BFA]/30 text-[#A78BFA] bg-[#A78BFA]/8 mb-4">
            Process
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
            From Idea to <span className="gradient-text-brand">Results</span> in 4 Steps
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            A streamlined, transparent process designed to get you real business outcomes fast.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connector line */}
          <div className="hidden lg:block absolute top-14 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-[#F5C518]/30 via-[#38BDF8]/30 to-[#34D399]/30" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="relative text-center group"
              >
                {/* Icon circle */}
                <div className="relative mx-auto mb-6">
                  <div
                    className="w-[72px] h-[72px] rounded-full mx-auto flex items-center justify-center border-2 transition-transform group-hover:scale-110 duration-300"
                    style={{ borderColor: `${step.color}40`, background: `${step.color}15` }}
                  >
                    <step.icon className="w-7 h-7" style={{ color: step.color }} />
                  </div>
                  <span
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full text-[10px] font-black flex items-center justify-center text-[#0F172A]"
                    style={{ background: step.color }}
                  >
                    {i + 1}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
