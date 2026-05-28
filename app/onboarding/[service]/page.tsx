import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { SERVICES_DATA, type ServiceId } from "@/lib/services-data";
import { ArrowRight } from "lucide-react";

interface Props {
  params: Promise<{ service: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { service: serviceId } = await params;
  const service = SERVICES_DATA[serviceId as ServiceId];
  if (!service) return { title: "Choose a Service" };
  return {
    title: `${service.label} Services — Choose a Category`,
    description: `Browse ${service.label} subcategories and get started with a tailored strategy and quotation.`,
  };
}

export default async function OnboardingServicePage({ params }: Props) {
  const { service: serviceId } = await params;
  const service = SERVICES_DATA[serviceId as ServiceId];
  if (!service) notFound();

  return (
    <div className="min-h-screen bg-[#060D1A]">
      <Navbar />
      <section
        className="pt-28 pb-12 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0F172A 0%, #0C1F3A 100%)" }}
      >
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-15 pointer-events-none"
          style={{ background: service.color }}
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-semibold uppercase tracking-wider mb-5"
            style={{ borderColor: `${service.color}40`, color: service.color, background: `${service.color}12` }}
          >
            {service.tagline}
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
            Choose Your{" "}
            <span style={{ color: service.color }}>{service.label}</span>{" "}
            Service
          </h1>
          <p className="text-white/55 text-lg max-w-2xl mx-auto">
            Select the specific service that matches your goal. Each subcategory has a dedicated expert team and tailored strategy.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {service.subcategories.map((sub) => (
              <Link
                key={sub.id}
                href={`/onboarding/${service.id}/${sub.id}`}
                id={`onboarding-sub-${sub.id}`}
                className="group relative rounded-2xl border p-6 hover:scale-[1.02] transition-all duration-300 overflow-hidden"
                style={{ borderColor: service.borderColor, background: service.bgColor }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `radial-gradient(circle at 50% 0%, ${service.color}20, transparent 70%)` }}
                />
                <div className="relative">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-xl mb-4"
                    style={{ background: `${service.color}20` }}
                  >
                    {sub.icon}
                  </div>
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-bold text-white flex-1 pr-3">{sub.label}</h3>
                    <div className="text-right flex-shrink-0">
                      <p className="text-base font-black" style={{ color: service.color }}>{sub.stat}</p>
                      <p className="text-[10px] text-white/40">{sub.statLabel}</p>
                    </div>
                  </div>
                  <p className="text-sm text-white/55 leading-relaxed mb-4">{sub.description}</p>
                  <div className="flex items-center justify-between pt-3 border-t border-white/8">
                    <div>
                      <p className="text-[10px] text-white/30 uppercase tracking-wider">Starting at</p>
                      <p className="text-sm font-bold text-white">{sub.startingAt}</p>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm font-semibold group-hover:gap-2.5 transition-all" style={{ color: service.color }}>
                      Select <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Back link */}
          <div className="mt-10 text-center">
            <Link href="/onboarding" className="text-sm text-white/40 hover:text-white/70 transition-colors">
              ← Back to all services
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
