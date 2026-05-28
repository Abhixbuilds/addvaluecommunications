"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import {
  CheckCircle2, ArrowRight, Shield, Zap, Star,
  CreditCard, Lock, BadgeCheck
} from "lucide-react";

const PACKAGES = [
  {
    id: "starter",
    name: "Starter",
    tagline: "Best for small businesses",
    price: "25,000",
    priceNote: "One-time payment",
    color: "#38BDF8",
    features: [
      "1 service subcategory",
      "Strategy document",
      "2 revision rounds",
      "1 month execution",
      "Basic analytics report",
      "Email support",
    ],
    popular: false,
  },
  {
    id: "growth",
    name: "Growth",
    tagline: "Most popular choice",
    price: "65,000",
    priceNote: "One-time payment",
    color: "#F5C518",
    features: [
      "2 service subcategories",
      "Full strategy + budget plan",
      "5 revision rounds",
      "3 months execution",
      "Weekly reports & analytics",
      "Dedicated account manager",
      "Priority support",
      "Monthly review call",
    ],
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tagline: "For scaling businesses",
    price: "Custom",
    priceNote: "Tailored to your scope",
    color: "#A78BFA",
    features: [
      "Unlimited service categories",
      "Full business strategy",
      "Unlimited revisions",
      "Ongoing execution (retainer)",
      "Real-time dashboard access",
      "Dedicated expert team",
      "24/7 priority support",
      "Bi-weekly strategy calls",
      "Custom reporting",
    ],
    popular: false,
  },
];

const PAYMENT_METHODS = [
  { name: "Razorpay", description: "UPI, Net Banking, Cards, Wallets", badge: "Primary", color: "#3A95F0", badgeColor: "#F5C518" },
  { name: "Stripe", description: "International Cards & Wire Transfer", badge: "International", color: "#635BFF", badgeColor: "#38BDF8" },
];

export default function PaymentPage() {
  const router = useRouter();
  const [selected, setSelected] = useState("growth");
  const [paymentMethod, setPaymentMethod] = useState("razorpay");
  const [loading, setLoading] = useState(false);

  const selectedPkg = PACKAGES.find((p) => p.id === selected)!;

  // Amount in paise (₹1 = 100 paise)
  const amountInPaise =
    selectedPkg.price === "Custom" ? 0 : parseInt(selectedPkg.price.replace(",", "")) * 100;

  const handlePayment = async () => {
    if (selectedPkg.price === "Custom") {
      router.push("/book-consultation");
      return;
    }

    setLoading(true);
    try {
      if (paymentMethod === "razorpay") {
        const res = await fetch("/api/payments/razorpay/create-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: amountInPaise, packageName: selectedPkg.name }),
        });
        const { orderId, keyId, mock } = await res.json();

        if (mock) {
          // Mock mode — navigate to success
          router.push(`/payment/success?order_id=${orderId}&mock=true`);
          return;
        }

        // Real Razorpay checkout (SDK loaded dynamically)
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => {
          const rzp = new (window as any).Razorpay({
            key: keyId,
            amount: amountInPaise,
            currency: "INR",
            name: "AddValue Communications",
            description: `${selectedPkg.name} Package`,
            order_id: orderId,
            handler: async (response: any) => {
              await fetch("/api/payments/razorpay/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(response),
              });
              router.push(`/payment/success?order_id=${response.razorpay_order_id}`);
            },
            theme: { color: "#F5C518" },
          });
          rzp.open();
        };
        document.body.appendChild(script);
      } else {
        // Stripe
        const res = await fetch("/api/payments/stripe/create-session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: amountInPaise, packageName: selectedPkg.name }),
        });
        const { url, mock } = await res.json();
        if (mock || !url) {
          router.push("/payment/success?mock=true");
        } else {
          window.location.href = url;
        }
      }
    } catch (err) {
      console.error("Payment error:", err);
      alert("Payment could not be initiated. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#060D1A]">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-12 bg-gradient-to-b from-[#0C1F3A] to-[#060D1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#34D399]/30 bg-[#34D399]/8 text-[#34D399] text-xs font-semibold uppercase tracking-wider mb-5">
            <BadgeCheck className="w-3.5 h-3.5" /> Transparent Pricing
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
            Choose Your{" "}
            <span className="gradient-text-brand">Service Package</span>
          </h1>
          <p className="text-white/55 text-lg max-w-2xl mx-auto">
            Pay per project. No subscriptions. No hidden fees. Choose the package that fits your goals and budget.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-20 space-y-10">

        {/* Package Cards */}
        <div className="grid md:grid-cols-3 gap-5">
          {PACKAGES.map((pkg, i) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setSelected(pkg.id)}
              className={`relative rounded-2xl border cursor-pointer transition-all duration-300 ${
                selected === pkg.id
                  ? "scale-[1.02] shadow-2xl"
                  : "hover:scale-[1.01]"
              }`}
              style={{
                borderColor: selected === pkg.id ? pkg.color : "rgba(255,255,255,0.08)",
                background: selected === pkg.id ? `${pkg.color}10` : "rgba(255,255,255,0.03)",
                boxShadow: selected === pkg.id ? `0 0 30px ${pkg.color}20` : "none",
              }}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#F5C518] text-[#0F172A] text-[10px] font-black uppercase tracking-wider shadow-lg">
                  Most Popular
                </div>
              )}

              {/* Top accent */}
              <div className="h-1 rounded-t-2xl" style={{ background: pkg.color }} />

              <div className="p-6">
                {/* Header */}
                <div className="mb-5">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-xl font-black text-white">{pkg.name}</h3>
                    {selected === pkg.id && (
                      <CheckCircle2 className="w-5 h-5" style={{ color: pkg.color }} />
                    )}
                  </div>
                  <p className="text-xs text-white/40">{pkg.tagline}</p>
                </div>

                {/* Price */}
                <div className="mb-5">
                  {pkg.price === "Custom" ? (
                    <p className="text-3xl font-black text-white">Custom</p>
                  ) : (
                    <p className="text-3xl font-black" style={{ color: pkg.color }}>
                      ₹{pkg.price}
                    </p>
                  )}
                  <p className="text-xs text-white/40 mt-1">{pkg.priceNote}</p>
                </div>

                {/* Features */}
                <ul className="space-y-2.5">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: pkg.color }} />
                      <span className="text-xs text-white/65">{f}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={(e) => { e.stopPropagation(); setSelected(pkg.id); }}
                  className="mt-6 w-full py-2.5 rounded-xl text-sm font-bold transition-all"
                  style={{
                    background: selected === pkg.id ? pkg.color : `${pkg.color}15`,
                    color: selected === pkg.id ? "#0F172A" : pkg.color,
                  }}
                >
                  {selected === pkg.id ? "Selected ✓" : "Select Plan"}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quotation + Payment */}
        <div className="grid lg:grid-cols-5 gap-8">

          {/* Order Summary */}
          <div className="lg:col-span-3 rounded-2xl border border-white/10 bg-white/3 p-6">
            <h2 className="text-lg font-bold text-white mb-5">Order Summary</h2>
            <div className="space-y-3 mb-5">
              <div className="flex items-center justify-between py-3 border-b border-white/8">
                <span className="text-sm text-white/70">Package</span>
                <span className="text-sm font-semibold text-white">{selectedPkg.name} Plan</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-white/8">
                <span className="text-sm text-white/70">Service Scope</span>
                <span className="text-sm font-semibold text-white">As per consultation</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-white/8">
                <span className="text-sm text-white/70">GST (18%)</span>
                <span className="text-sm text-white/50">Calculated at checkout</span>
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="text-base font-bold text-white">Estimated Total</span>
                <span className="text-xl font-black" style={{ color: selectedPkg.color }}>
                  {selectedPkg.price === "Custom" ? "Custom Quote" : `₹${selectedPkg.price}`}
                </span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#34D399]/8 border border-[#34D399]/20 mb-5">
              <div className="flex items-start gap-2.5">
                <Shield className="w-4 h-4 text-[#34D399] flex-shrink-0 mt-0.5" />
                <p className="text-xs text-white/60 leading-relaxed">
                  <span className="text-[#34D399] font-semibold">30-Day Guarantee:</span>{" "}
                  If you&apos;re not satisfied with our initial strategy delivery, we offer a full revision or refund within 30 days.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs text-white/35">
              <Lock className="w-3.5 h-3.5" />
              Secure payment powered by Razorpay & Stripe. Your data is encrypted.
            </div>
          </div>

          {/* Payment Method */}
          <div className="lg:col-span-2 space-y-5">
            <div className="rounded-2xl border border-white/10 bg-white/3 p-6">
              <h2 className="text-lg font-bold text-white mb-4">Payment Method</h2>
              <div className="space-y-3">
                {PAYMENT_METHODS.map((method) => (
                  <div
                    key={method.name}
                    onClick={() => setPaymentMethod(method.name.toLowerCase())}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === method.name.toLowerCase()
                        ? "border-[#F5C518]/40 bg-[#F5C518]/8"
                        : "border-white/8 bg-white/3 hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          paymentMethod === method.name.toLowerCase() ? "border-[#F5C518]" : "border-white/20"
                        }`}>
                          {paymentMethod === method.name.toLowerCase() && (
                            <div className="w-2 h-2 rounded-full bg-[#F5C518]" />
                          )}
                        </div>
                        <span className="text-sm font-semibold text-white">{method.name}</span>
                      </div>
                      <span
                        className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                        style={{ background: `${method.badgeColor}20`, color: method.badgeColor }}
                      >
                        {method.badge}
                      </span>
                    </div>
                    <p className="text-xs text-white/40 pl-6">{method.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Pay Button */}
            <button
              id="payment-proceed-btn"
              onClick={handlePayment}
              disabled={loading}
              className="w-full py-4 rounded-xl gradient-yellow text-[#0F172A] font-black text-base shadow-xl hover:scale-105 disabled:opacity-70 disabled:scale-100 transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-[#0F172A]/30 border-t-[#0F172A] rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard className="w-5 h-5" />
                  {selectedPkg.price === "Custom" ? "Book Consultation" : "Proceed to Payment"}
                </>
              )}
            </button>
            <p className="text-center text-xs text-white/30">
              You&apos;ll be redirected to a secure payment gateway
            </p>

            {/* Trust badges */}
            <div className="flex items-center justify-center gap-4 pt-2">
              {[
                { icon: Lock, label: "256-bit SSL" },
                { icon: Shield, label: "PCI Compliant" },
                { icon: Star, label: "5★ Rated" },
              ].map((b) => (
                <div key={b.label} className="flex items-center gap-1.5 text-[10px] text-white/30">
                  <b.icon className="w-3 h-3" />
                  {b.label}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Not ready CTA */}
        <div className="text-center py-8">
          <p className="text-white/40 text-sm mb-4">Not ready to pay yet? Start with a free consultation.</p>
          <Link href="/book-consultation" className="inline-flex items-center gap-2 text-sm font-semibold text-[#38BDF8] hover:gap-3 transition-all">
            Book Free Consultation <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
