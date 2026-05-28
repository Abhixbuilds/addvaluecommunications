import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ServiceHero from "@/components/services/ServiceHero";
import SubcategoryCard from "@/components/services/SubcategoryCard";
import ServiceProcess from "@/components/services/ServiceProcess";
import { SERVICES_DATA } from "@/lib/services-data";

const service = SERVICES_DATA.pr;

export const metadata: Metadata = {
  title: "Public Relations Services — Brand Reputation, Press & Crisis Management",
  description: "Strategic PR services: press releases, brand reputation management, crisis management, influencer PR, and event publicity for businesses of all sizes.",
};

export default function PRPage() {
  return (
    <div className="min-h-screen bg-[#060D1A]">
      <Navbar />
      <ServiceHero service={service} />

      <section className="py-20 bg-[#0A1220]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">
              Our <span style={{ color: service.color }}>PR Services</span>
            </h2>
            <p className="text-white/50 max-w-lg mx-auto">
              Strategic communications that build trust, authority, and brand recognition.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {service.subcategories.map((sub, i) => (
              <SubcategoryCard key={sub.id} subcategory={sub} service={service} index={i} />
            ))}
          </div>
        </div>
      </section>

      <ServiceProcess service={service} />
      <Footer />
    </div>
  );
}
