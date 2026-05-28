import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ServiceHero from "@/components/services/ServiceHero";
import SubcategoryCard from "@/components/services/SubcategoryCard";
import ServiceProcess from "@/components/services/ServiceProcess";
import { SERVICES_DATA } from "@/lib/services-data";

const service = SERVICES_DATA.insurance;

export const metadata: Metadata = {
  title: "Insurance Services — Business, Employee & Startup Risk Coverage",
  description: "Comprehensive business insurance solutions: business insurance, employee coverage, asset protection, liability insurance, and startup risk coverage.",
};

export default function InsurancePage() {
  return (
    <div className="min-h-screen bg-[#060D1A]">
      <Navbar />
      <ServiceHero service={service} />

      <section className="py-20 bg-[#0A1220]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">
              Our <span style={{ color: service.color }}>Insurance Services</span>
            </h2>
            <p className="text-white/50 max-w-lg mx-auto">
              Protect your business, employees, and assets with expert-structured insurance solutions.
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
