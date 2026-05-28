"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, LayoutDashboard, Receipt, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

function SuccessContent() {
  const params = useSearchParams();
  const sessionId = params.get("session_id");
  const orderId = params.get("order_id");
  const ref = sessionId ?? orderId;

  return (
    <div className="text-center max-w-md">
      {/* Success icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
        className="w-20 h-20 rounded-full bg-[#34D399]/20 border-2 border-[#34D399]/40 flex items-center justify-center mx-auto mb-6"
      >
        <CheckCircle2 className="w-10 h-10 text-[#34D399]" />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <h1 className="text-3xl font-black text-white mb-3">Payment Successful!</h1>
        <p className="text-white/55 mb-2">Your payment has been confirmed.</p>
        {ref && (
          <p className="text-xs text-white/30 font-mono mb-6">Ref: {ref}</p>
        )}
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
        className="p-5 rounded-2xl border border-white/8 bg-white/3 mb-8 text-left"
      >
        <h3 className="text-sm font-bold text-white mb-3">What happens next?</h3>
        <ul className="space-y-2.5">
          {[
            "You'll receive a confirmation email within 5 minutes",
            "Your dedicated account manager will contact you within 24 hours",
            "Project kickoff call scheduled within 48 hours",
            "Access your project timeline in the dashboard",
          ].map((step) => (
            <li key={step} className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#34D399] flex-shrink-0 mt-0.5" />
              <span className="text-sm text-white/65">{step}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
        className="flex flex-col sm:flex-row gap-3 justify-center"
      >
        <Link href="/dashboard"
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl gradient-yellow text-[#0F172A] font-bold text-sm hover:scale-105 transition-all"
        >
          <LayoutDashboard className="w-4 h-4" /> Go to Dashboard
        </Link>
        <Link href="/dashboard/invoices"
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-white/15 text-white/70 font-semibold text-sm hover:bg-white/8 transition-all"
        >
          <Receipt className="w-4 h-4" /> View Invoice
        </Link>
      </motion.div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen bg-[#060D1A] flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center p-4">
        <Suspense
          fallback={
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="w-8 h-8 text-[#F5C518] animate-spin" />
              <p className="text-white/40 text-sm">Loading...</p>
            </div>
          }
        >
          <SuccessContent />
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}
