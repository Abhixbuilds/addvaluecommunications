import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Calendar, Clock, Video, CheckCircle2, Phone, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Book a Free Consultation",
  description: "Schedule a free 30-minute consultation with our expert team. Discuss your business goals and get a personalised strategy.",
};

const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL ?? "https://calendly.com/addvaluecommunications";

const BENEFITS = [
  "Free 30-minute strategy session",
  "No commitment required",
  "Expert assigned to your industry",
  "Receive a written summary post-call",
  "Fast-track your project kickoff",
];

const FAQ = [
  { q: "How long is the consultation?", a: "30 minutes via Google Meet or phone call." },
  { q: "Is it really free?", a: "Yes, completely free. No credit card or commitment required." },
  { q: "What should I prepare?", a: "Have your business goals and rough budget in mind. We'll guide the conversation." },
  { q: "How soon can I book?", a: "Same-day and next-day slots are usually available." },
];

export default function BookConsultationPage() {
  return (
    <div className="min-h-screen bg-[#060D1A]">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-12 bg-gradient-to-b from-[#0C1F3A] to-[#060D1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#38BDF8]/30 bg-[#38BDF8]/8 text-[#38BDF8] text-xs font-semibold uppercase tracking-wider mb-5">
            <Calendar className="w-3.5 h-3.5" /> Free Consultation
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
            Book Your{" "}
            <span className="gradient-text-sky">Free 30-Minute</span>{" "}
            Consultation
          </h1>
          <p className="text-white/55 text-lg max-w-2xl mx-auto">
            Talk directly with our expert team. Share your business goals, ask questions, and get a personalised strategy — all in one free call.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        <div className="grid lg:grid-cols-5 gap-8">

          {/* Benefits Sidebar */}
          <div className="lg:col-span-2 space-y-6">
            {/* What to expect */}
            <div className="rounded-2xl border border-white/10 bg-white/3 p-6">
              <h2 className="text-lg font-bold text-white mb-4">What to Expect</h2>
              <ul className="space-y-3">
                {BENEFITS.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#34D399] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-white/70">{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Format */}
            <div className="rounded-2xl border border-white/10 bg-white/3 p-6">
              <h2 className="text-lg font-bold text-white mb-4">Session Format</h2>
              <div className="space-y-3">
                {[
                  { icon: Clock, label: "Duration", value: "30 minutes" },
                  { icon: Video, label: "Format", value: "Google Meet or Phone" },
                  { icon: Calendar, label: "Availability", value: "Mon–Sat, 9 AM–7 PM IST" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#38BDF8]/15 flex items-center justify-center">
                      <item.icon className="w-4 h-4 text-[#38BDF8]" />
                    </div>
                    <div>
                      <p className="text-[10px] text-white/40 uppercase tracking-wider">{item.label}</p>
                      <p className="text-sm font-semibold text-white">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div className="rounded-2xl border border-white/10 bg-white/3 p-6">
              <h2 className="text-lg font-bold text-white mb-4">Quick FAQ</h2>
              <div className="space-y-4">
                {FAQ.map((item) => (
                  <div key={item.q}>
                    <p className="text-sm font-semibold text-white mb-1">{item.q}</p>
                    <p className="text-xs text-white/50">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct contact */}
            <div className="rounded-2xl border border-white/10 bg-white/3 p-6">
              <h2 className="text-base font-bold text-white mb-3">Prefer to reach us directly?</h2>
              <div className="space-y-2.5">
                <a href="mailto:hello@addvaluecommunications.com" className="flex items-center gap-2.5 text-sm text-white/55 hover:text-white transition-colors">
                  <Mail className="w-4 h-4 text-[#F5C518]" />
                  hello@addvaluecommunications.com
                </a>
                <a href="tel:+919876543210" className="flex items-center gap-2.5 text-sm text-white/55 hover:text-white transition-colors">
                  <Phone className="w-4 h-4 text-[#F5C518]" />
                  +91 98765 43210
                </a>
              </div>
            </div>
          </div>

          {/* Calendly Embed */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-white/10 overflow-hidden bg-white/2">
              {/* Placeholder — Calendly embed goes here */}
              <div className="flex flex-col items-center justify-center py-20 px-8 text-center">
                <div className="w-16 h-16 rounded-2xl bg-[#38BDF8]/15 flex items-center justify-center mb-5">
                  <Calendar className="w-8 h-8 text-[#38BDF8]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Calendly Booking</h3>
                <p className="text-white/50 text-sm mb-6 max-w-sm">
                  The Calendly scheduling widget will appear here once configured. Add your Calendly URL to <code className="text-[#F5C518] bg-[#F5C518]/10 px-1.5 py-0.5 rounded text-xs">.env.local</code>
                </p>
                <div className="p-4 rounded-xl bg-white/4 border border-white/8 text-left w-full max-w-sm">
                  <p className="text-xs text-white/40 uppercase tracking-wider mb-2">Configuration</p>
                  <code className="text-xs text-[#38BDF8]">
                    NEXT_PUBLIC_CALENDLY_URL=<br />
                    https://calendly.com/your-link
                  </code>
                </div>
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="calendly-external-link"
                  className="mt-6 flex items-center gap-2 px-8 py-3.5 rounded-xl gradient-yellow text-[#0F172A] font-bold text-sm hover:scale-105 transition-all"
                >
                  <Calendar className="w-4 h-4" />
                  Open Calendly Booking
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
