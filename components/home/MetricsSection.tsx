"use client";

import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";

const METRICS = [
  { value: 500, suffix: "+", label: "Businesses Served", color: "#F5C518" },
  { value: 98, suffix: "%", label: "Client Satisfaction", color: "#38BDF8" },
  { value: 50, suffix: "+", label: "Expert Team Members", color: "#A78BFA" },
  { value: 12, suffix: "+", label: "Service Categories", color: "#34D399" },
];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / 60;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref} suppressHydrationWarning>
      {count}
      {suffix}
    </span>
  );
}

export default function MetricsSection() {
  return (
    <section id="metrics" className="py-16 bg-[#060D1A] border-y border-white/6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {METRICS.map((m, i) => (
            <div
              key={m.label}
              className="relative text-center p-6 rounded-2xl border border-white/8 bg-white/3 hover:bg-white/5 transition-colors group overflow-hidden"
            >
              {/* Accent */}
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-px"
                style={{ background: `linear-gradient(to right, transparent, ${m.color}, transparent)` }}
              />
              <p className="text-4xl lg:text-5xl font-black mb-2" style={{ color: m.color }}>
                <AnimatedCounter target={m.value} suffix={m.suffix} />
              </p>
              <p className="text-sm text-white/50 font-medium">{m.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
