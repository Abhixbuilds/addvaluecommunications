import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ServiceHero from "@/components/services/ServiceHero";
import SubcategoryCard from "@/components/services/SubcategoryCard";
import ServiceProcess from "@/components/services/ServiceProcess";
import { SERVICES_DATA } from "@/lib/services-data";

const service = SERVICES_DATA.finance;

export const metadata: Metadata = {
  title: "Finance Services — Startup Funding, Taxation & More",
  description: "Expert finance services for businesses: startup funding guidance, taxation, budget planning, investment consulting, loan assistance, and accounting solutions.",
};

export default function FinancePage() {
  return (
    <div className="min-h-screen bg-[#060D1A]">
      <Navbar />
      <ServiceHero service={service} />

      {/* Subcategories */}
      <section className="py-20 bg-[#0A1220]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">
              Our <span style={{ color: service.color }}>Finance Services</span>
            </h2>
            <p className="text-white/50 max-w-lg mx-auto">
              Choose the financial service that fits your business needs and goals.
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
