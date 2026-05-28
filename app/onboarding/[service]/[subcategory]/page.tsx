import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StepIndicator from "@/components/onboarding/StepIndicator";
import OnboardingClient from "@/components/onboarding/OnboardingClient";
import { SERVICES_DATA, type ServiceId } from "@/lib/services-data";

interface Props {
  params: Promise<{ service: string; subcategory: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { service: serviceId, subcategory: subcategoryId } = await params;
  const service = SERVICES_DATA[serviceId as ServiceId];
  if (!service) return { title: "Get Started" };
  const sub = service.subcategories.find((s) => s.id === subcategoryId);
  return {
    title: `Get Started — ${sub?.label ?? service.label}`,
    description: `Fill in your details to get a tailored strategy and quotation for ${sub?.label ?? service.label}.`,
  };
}

export default async function OnboardingPage({ params }: Props) {
  const { service: serviceId, subcategory: subcategoryId } = await params;
  const service = SERVICES_DATA[serviceId as ServiceId];
  if (!service) notFound();

  const subcategory = service.subcategories.find((s) => s.id === subcategoryId);
  if (!subcategory) notFound();

  return (
    <div className="min-h-screen bg-[#060D1A]">
      <Navbar />

      {/* Hero */}
      <section
        className="pt-28 pb-8 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0F172A 0%, #0C1F3A 100%)" }}
      >
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-10 pointer-events-none"
          style={{ background: service.color }}
        />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-semibold uppercase tracking-wider mb-6"
            style={{ borderColor: `${service.color}40`, color: service.color, background: `${service.color}12` }}
          >
            {service.label} → {subcategory.label}
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-3">
            Let&apos;s Build Your{" "}
            <span style={{ color: service.color }}>{subcategory.label}</span> Strategy
          </h1>
          <p className="text-white/55 max-w-lg mx-auto">
            Complete the 5-step form below. Takes less than 5 minutes. You&apos;ll receive a tailored strategy instantly.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <OnboardingClient service={service} subcategory={subcategory} />
        </div>
      </section>

      <Footer />
    </div>
  );
}
