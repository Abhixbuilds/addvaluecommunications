"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { ServiceData } from "@/lib/services-data";

interface Props {
  service: ServiceData;
}

export default function ServiceHero({ service }: Props) {
  return (
    <section
      className="relative min-h-[55vh] flex items-center pt-24 pb-16 overflow-hidden"
      style={{
        background: `linear-gradient(135deg, #0F172A 0%, #0C1F3A 60%, #0F172A 100%)`,
      }}
    >
      {/* Background orbs */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ background: service.color }}
      />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#38BDF8]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-2 text-sm text-white/40 mb-8"
        >
          <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/#services" className="hover:text-white/70 transition-colors">Services</Link>
          <span>/</span>
          <span style={{ color: service.color }}>{service.label}</span>
        </motion.div>

        <div className="max-w-3xl">
          {/* Tag */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6"
            style={{ borderColor: `${service.color}40`, background: `${service.color}12` }}
          >
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: service.color }} />
            <span className="text-xs font-semibold tracking-wide uppercase" style={{ color: service.color }}>
              {service.tagline}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight"
          >
            Expert{" "}
            <span style={{ color: service.color }}>{service.label}</span>{" "}
            Services for Your Business
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="text-lg text-white/60 leading-relaxed mb-8 max-w-2xl"
          >
            {service.heroDescription}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              href={`/onboarding/${service.id}`}
              id={`${service.id}-hero-cta`}
              className="group flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm shadow-xl hover:scale-105 transition-all text-[#0F172A]"
              style={{ background: service.color }}
            >
              Get Started
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/book-consultation"
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl border border-white/15 text-white/80 font-semibold text-sm hover:bg-white/8 transition-all"
            >
              Free Consultation
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
