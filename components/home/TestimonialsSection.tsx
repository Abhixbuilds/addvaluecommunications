"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Arjun Mehta",
    role: "Founder, FreshCart India",
    initials: "AM",
    color: "#F5C518",
    rating: 5,
    text: "AddValue Communications transformed our advertising strategy completely. Their Meta Ads expertise delivered 340% ROAS in just 3 months. The client dashboard made tracking everything transparent and effortless.",
    service: "Advertisement",
  },
  {
    name: "Priya Sharma",
    role: "CEO, NovaTech Solutions",
    initials: "PS",
    color: "#38BDF8",
    rating: 5,
    text: "Getting our seed funding was a dream come true. The finance team structured our pitch deck, connected us with the right investors, and guided us through every step. Couldn't have done it without them.",
    service: "Finance",
  },
  {
    name: "Rahul Verma",
    role: "Marketing Head, GreenLife Wellness",
    initials: "RV",
    color: "#34D399",
    rating: 5,
    text: "The SEO and PR combination they built for us was phenomenal. Traffic grew 420% organically and our brand got featured in 45+ media outlets. Our CAC dropped by 60%. Absolutely world-class team.",
    service: "Marketing + PR",
  },
  {
    name: "Sneha Kapoor",
    role: "Director, SafeNest Realty",
    initials: "SK",
    color: "#A78BFA",
    rating: 5,
    text: "Their insurance advisory team helped us structure comprehensive coverage for our entire business operations. Professional, responsive, and genuinely caring about our business safety.",
    service: "Insurance",
  },
];

export default function TestimonialsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [active, setActive] = useState(0);

  const prev = () => setActive((a) => (a - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setActive((a) => (a + 1) % TESTIMONIALS.length);
  const t = TESTIMONIALS[active];

  return (
    <section ref={ref} id="testimonials" className="section-padding bg-[#060D1A] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#38BDF8]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider border border-[#38BDF8]/30 text-[#38BDF8] bg-[#38BDF8]/8 mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            What Our <span className="gradient-text-brand">Clients Say</span>
          </h2>
        </motion.div>

        {/* Testimonial Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
              className="relative rounded-2xl border border-white/10 bg-white/3 p-8 md:p-10 text-center"
            >
              <Quote className="w-10 h-10 mx-auto mb-6 opacity-20" style={{ color: t.color }} />

              <p className="text-lg md:text-xl text-white/75 leading-relaxed mb-8 italic">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Stars */}
              <div className="flex items-center justify-center gap-1 mb-6">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#F5C518] text-[#F5C518]" />
                ))}
              </div>

              {/* Author */}
              <div className="flex items-center justify-center gap-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold text-[#0F172A]"
                  style={{ background: t.color }}
                >
                  {t.initials}
                </div>
                <div className="text-left">
                  <p className="font-bold text-white">{t.name}</p>
                  <p className="text-sm text-white/40">{t.role}</p>
                </div>
                <span className="ml-2 text-[10px] px-2.5 py-1 rounded-full font-semibold" style={{ background: `${t.color}20`, color: t.color }}>
                  {t.service}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button onClick={prev} id="testimonial-prev" className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition-all">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`h-2 rounded-full transition-all ${i === active ? "w-8 bg-[#F5C518]" : "w-2 bg-white/20"}`}
                />
              ))}
            </div>
            <button onClick={next} id="testimonial-next" className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition-all">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
