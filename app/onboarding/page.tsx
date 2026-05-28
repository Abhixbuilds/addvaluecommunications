import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { SERVICES_DATA, ALL_SERVICE_IDS } from "@/lib/services-data";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Get Started — Choose Your Service",
  description: "Choose the business service you need and get a tailored strategy and quotation from our expert team.",
};

export default function OnboardingIndexPage() {
  return (
    <div className="min-h-screen bg-[#060D1A]">
      <Navbar />
      <section className="pt-28 pb-12 bg-gradient-to-b from-[#0C1F3A] to-[#060D1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#F5C518]/30 bg-[#F5C518]/8 text-[#F5C518] text-xs font-semibold uppercase tracking-wider mb-5">
            Get Started
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
            Which service does your{" "}
            <span className="gradient-text-brand">business need?</span>
          </h1>
          <p className="text-white/55 text-lg max-w-2xl mx-auto">
            Select a service category to get started. You&apos;ll then choose a specific subcategory and fill a quick onboarding form to receive your tailored strategy.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {ALL_SERVICE_IDS.map((id) => {
              const s = SERVICES_DATA[id];
              return (
                <Link
                  key={id}
                  href={`/onboarding/${id}`}
                  id={`onboarding-service-${id}`}
                  className="group relative rounded-2xl border p-6 hover:scale-[1.02] transition-all duration-300 overflow-hidden"
                  style={{ borderColor: s.borderColor, background: s.bgColor }}
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `radial-gradient(circle at 50% 0%, ${s.color}20, transparent 70%)` }}
                  />
                  <div className="relative">
                    <p className="text-4xl mb-4">{s.subcategories[0].icon}</p>
                    <h2 className="text-2xl font-black text-white mb-1">{s.label}</h2>
                    <p className="text-xs font-semibold mb-3" style={{ color: s.color }}>{s.tagline}</p>
                    <p className="text-sm text-white/55 mb-5 leading-relaxed">{s.description}</p>
                    <div className="flex items-center gap-2 text-sm font-semibold" style={{ color: s.color }}>
                      Choose {s.label}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
