import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import MetricsSection from "@/components/home/MetricsSection";
import ServicesGrid from "@/components/home/ServicesGrid";
import AIPreviewSection from "@/components/home/AIPreviewSection";
import HowItWorks from "@/components/home/HowItWorks";
import IndustriesSection from "@/components/home/IndustriesSection";
import SuccessStories from "@/components/home/SuccessStories";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import PricingCTA from "@/components/home/PricingCTA";
import FAQSection from "@/components/home/FAQSection";

export const metadata: Metadata = {
  title: "AddValue Communications | Expert Business Services",
  description:
    "Premium AI-assisted business services platform. Expert-led Finance, Advertisement, PR, Marketing & Insurance solutions. One platform. Real experts. Real growth.",
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#060D1A]">
      <Navbar />
      <main>
        {/* 1. Hero */}
        <HeroSection />
        {/* 2. Trusted Metrics */}
        <MetricsSection />
        {/* 3. Services Grid */}
        <ServicesGrid />
        {/* 4. AI Assistant Preview */}
        <AIPreviewSection />
        {/* 5. How It Works */}
        <HowItWorks />
        {/* 6. Industries */}
        <IndustriesSection />
        {/* 7. Success Stories */}
        <SuccessStories />
        {/* 8. Testimonials */}
        <TestimonialsSection />
        {/* 9. Pricing CTA */}
        <PricingCTA />
        {/* 10. FAQ */}
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}
