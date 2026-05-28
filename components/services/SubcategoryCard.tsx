"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { Subcategory, ServiceData } from "@/lib/services-data";

interface Props {
  subcategory: Subcategory;
  service: ServiceData;
  index: number;
}

export default function SubcategoryCard({ subcategory, service, index }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className="group relative rounded-2xl border overflow-hidden hover:scale-[1.02] transition-all duration-300"
      style={{ borderColor: service.borderColor, background: service.bgColor }}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `radial-gradient(circle at 50% 0%, ${service.color}20, transparent 70%)` }}
      />

      {/* Top accent */}
      <div className="h-0.5 w-full" style={{ background: `linear-gradient(to right, ${service.color}, transparent)` }} />

      <div className="relative p-6">
        {/* Icon + stat */}
        <div className="flex items-start justify-between mb-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-xl"
            style={{ background: `${service.color}20` }}
          >
            {subcategory.icon}
          </div>
          <div className="text-right">
            <p className="text-lg font-black" style={{ color: service.color }}>
              {subcategory.stat}
            </p>
            <p className="text-[10px] text-white/40">{subcategory.statLabel}</p>
          </div>
        </div>

        {/* Label */}
        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-white transition-colors">
          {subcategory.label}
        </h3>

        {/* Description */}
        <p className="text-sm text-white/55 leading-relaxed mb-5">
          {subcategory.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-white/8">
          <div>
            <p className="text-[10px] text-white/30 uppercase tracking-wider">Starting at</p>
            <p className="text-sm font-bold text-white">{subcategory.startingAt}</p>
          </div>
          <Link
            href={`/onboarding/${service.id}/${subcategory.id}`}
            id={`subcategory-cta-${subcategory.id}`}
            className="flex items-center gap-1.5 text-sm font-semibold group/btn px-4 py-2 rounded-xl transition-all"
            style={{ color: service.color, background: `${service.color}15` }}
          >
            Get Started
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
