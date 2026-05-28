"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "How does the service-based pricing model work?",
    a: "We charge per project based on service type, complexity, campaign size, and timeline. After you fill the onboarding form, you'll receive a detailed quotation before any commitment. There are no hidden fees or surprise charges.",
  },
  {
    q: "How long does it take to start a project?",
    a: "Once payment is confirmed, your dedicated account manager is assigned within 24 hours. Project kickoff typically happens within 2–3 business days. You'll have full visibility in your client dashboard from day one.",
  },
  {
    q: "Do I need to have a large budget to work with you?",
    a: "No. We work with businesses of all sizes — from early-stage startups to large enterprises. Our quotations are tailored to your budget and goals. Book a free consultation to discuss what's possible.",
  },
  {
    q: "What happens after I submit the onboarding form?",
    a: "You'll receive a tailored strategy recommendation instantly. You can then book a consultation with our expert team to discuss the strategy, ask questions, review the quotation, and confirm your project.",
  },
  {
    q: "Can I track my project progress in real time?",
    a: "Yes. Your client dashboard gives you real-time visibility into project status, deliverables, analytics reports, file uploads, team messages, and payment history — all in one place.",
  },
  {
    q: "How is the AI assistant different from your expert team?",
    a: "The AI assistant helps you choose services, estimate budgets, and answer quick questions. But all actual project execution is handled by real human experts — strategists, designers, media buyers, and consultants. AI assists; experts deliver.",
  },
  {
    q: "Do you offer consultations before I commit?",
    a: "Absolutely. You can book a free 30-minute consultation with our experts using Calendly. No commitment required. We'll discuss your goals, recommend services, and answer all questions.",
  },
];

function FAQItem({ item, index }: { item: (typeof FAQS)[0]; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className={`rounded-xl border transition-all duration-300 overflow-hidden ${
        open ? "border-[#F5C518]/30 bg-[#F5C518]/5" : "border-white/8 bg-white/3 hover:bg-white/5"
      }`}
    >
      <button
        id={`faq-${index}`}
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
      >
        <span className="font-semibold text-white/90 text-sm leading-relaxed">{item.q}</span>
        <ChevronDown
          className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${open ? "rotate-180 text-[#F5C518]" : "text-white/30"}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="px-6 pb-5 text-sm text-white/55 leading-relaxed">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="faq" ref={ref} className="section-padding bg-[#060D1A]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider border border-[#F5C518]/30 text-[#F5C518] bg-[#F5C518]/8 mb-4">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            Frequently Asked <span className="gradient-text-brand">Questions</span>
          </h2>
          <p className="text-white/50">Everything you need to know before getting started.</p>
        </motion.div>

        {inView && (
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <FAQItem key={faq.q} item={faq} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
