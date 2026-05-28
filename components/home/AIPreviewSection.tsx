"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Bot, Sparkles, ArrowRight, MessageSquare } from "lucide-react";
import Link from "next/link";

const SAMPLE_CHATS = [
  { role: "user", text: "Which marketing service is best for my e-commerce startup?" },
  { role: "ai", text: "For an e-commerce startup, I'd recommend starting with Performance Marketing + SEO. Performance ads give you immediate traffic while SEO builds long-term organic growth. With your stage, Meta Ads typically deliver the strongest ROAS. Want me to generate a tailored strategy?" },
  { role: "user", text: "What's a realistic budget for social media ads?" },
  { role: "ai", text: "For early-stage e-commerce, ₹30,000–₹80,000/month is a solid starting range. I'd allocate 60% to Meta Ads, 30% to Google Shopping, and 10% to testing new channels. This typically delivers 2–4x ROAS within 90 days." },
];

export default function AIPreviewSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} id="ai-preview" className="section-padding bg-[#060D1A] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-0 w-96 h-96 bg-[#F5C518]/6 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-[#38BDF8]/6 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Chat UI Preview */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="rounded-2xl border border-white/10 overflow-hidden shadow-2xl" style={{ background: "rgba(15,23,42,0.9)" }}>
              {/* Header */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-white/8 bg-gradient-to-r from-[#F5C518]/8 to-[#38BDF8]/8">
                <div className="w-9 h-9 rounded-full gradient-brand flex items-center justify-center">
                  <Bot className="w-4.5 h-4.5 text-[#0F172A]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">AddValue AI Assistant</p>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-xs text-white/40">Business Consultant · Online</span>
                  </div>
                </div>
                <div className="ml-auto flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#F5C518]" />
                  <span className="text-xs text-[#F5C518] font-semibold">AI-Powered</span>
                </div>
              </div>

              {/* Messages */}
              <div className="p-5 space-y-4">
                {SAMPLE_CHATS.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.2 }}
                    className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                  >
                    {msg.role === "ai" && (
                      <div className="w-7 h-7 rounded-full gradient-brand flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Bot className="w-3.5 h-3.5 text-[#0F172A]" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] rounded-xl px-4 py-3 text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "bg-[#F5C518] text-[#0F172A] font-medium rounded-tr-sm"
                          : "bg-white/8 text-white/80 border border-white/8 rounded-tl-sm"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}

                {/* Input */}
                <div className="flex items-center gap-2 mt-4 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                  <MessageSquare className="w-4 h-4 text-white/20" />
                  <span className="text-sm text-white/25 flex-1">Ask about services, budgets, strategies...</span>
                  <div className="w-7 h-7 rounded-lg gradient-yellow flex items-center justify-center">
                    <ArrowRight className="w-3.5 h-3.5 text-[#0F172A]" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider border border-[#F5C518]/30 text-[#F5C518] bg-[#F5C518]/8 mb-6">
              Coming Soon
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-5 leading-tight">
              Meet Your{" "}
              <span className="gradient-text-yellow">AI Business</span>{" "}
              Consultant
            </h2>
            <p className="text-white/55 text-lg leading-relaxed mb-8">
              Get instant answers on service selection, budget estimation, marketing strategy, and business growth — powered by AI that understands your industry.
            </p>

            <div className="space-y-4 mb-8">
              {[
                "Which service do I need for my startup?",
                "How much should I budget for digital ads?",
                "What marketing strategy fits my niche?",
                "Which insurance should my company have?",
              ].map((q) => (
                <div key={q} className="flex items-center gap-3 text-sm text-white/50">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#F5C518]" />
                  {q}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/6 border border-white/10">
                <Bot className="w-4 h-4 text-[#38BDF8]" />
                <span className="text-sm text-white/60">AI Launching Soon</span>
              </div>
              <Link href="/onboarding" className="flex items-center gap-2 text-sm font-semibold text-[#F5C518] hover:gap-3 transition-all">
                Get Expert Help Now <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
