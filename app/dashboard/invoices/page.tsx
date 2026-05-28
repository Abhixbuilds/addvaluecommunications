"use client";

import { motion } from "framer-motion";
import { Download, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { CLIENT_INVOICES } from "@/lib/dashboard-data";
import { cn } from "@/lib/utils";

const STATUS_MAP = {
  paid: { label: "Paid", color: "#34D399", bg: "#34D39915", icon: CheckCircle2 },
  pending: { label: "Pending", color: "#F5C518", bg: "#F5C51815", icon: Clock },
  overdue: { label: "Overdue", color: "#F87171", bg: "#F8717115", icon: AlertCircle },
};

const TOTAL_PAID = CLIENT_INVOICES.filter((i) => i.status === "paid").reduce((sum, i) => sum + i.amount, 0);
const TOTAL_PENDING = CLIENT_INVOICES.filter((i) => i.status !== "paid").reduce((sum, i) => sum + i.amount, 0);

export default function InvoicesPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-white mb-1">Invoices</h1>
        <p className="text-white/50">Track your billing history and payment status.</p>
      </div>

      {/* Summary cards */}
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        {[
          { label: "Total Invoiced", value: `₹${(TOTAL_PAID + TOTAL_PENDING).toLocaleString("en-IN")}`, color: "#F5C518", sub: "All time" },
          { label: "Amount Paid", value: `₹${TOTAL_PAID.toLocaleString("en-IN")}`, color: "#34D399", sub: "Settled" },
          { label: "Pending Payment", value: `₹${TOTAL_PENDING.toLocaleString("en-IN")}`, color: "#F87171", sub: "Awaiting" },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className="rounded-2xl border border-white/8 bg-white/3 p-5"
          >
            <p className="text-2xl font-black mb-0.5" style={{ color: s.color }}>{s.value}</p>
            <p className="text-sm text-white/60">{s.label}</p>
            <p className="text-xs text-white/30 mt-0.5">{s.sub}</p>
          </motion.div>
        ))}
      </div>

      {/* Invoice table */}
      <div className="rounded-2xl border border-white/8 bg-white/3 overflow-hidden">
        <div className="px-6 py-4 border-b border-white/8">
          <h2 className="text-sm font-bold text-white">Invoice History</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/6">
                {["Invoice ID", "Project", "Package", "Amount", "Date", "Due Date", "Status", ""].map((h) => (
                  <th key={h} className="px-5 py-3 text-left text-[10px] text-white/35 font-semibold uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {CLIENT_INVOICES.map((inv, i) => {
                const s = STATUS_MAP[inv.status];
                const StatusIcon = s.icon;
                return (
                  <motion.tr key={inv.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 + i * 0.07 }}
                    className="border-b border-white/5 hover:bg-white/3 transition-all"
                  >
                    <td className="px-5 py-4 text-sm font-mono text-[#38BDF8]">{inv.id}</td>
                    <td className="px-5 py-4 text-sm text-white/70 max-w-[160px] truncate">{inv.project}</td>
                    <td className="px-5 py-4 text-xs text-white/50">{inv.package}</td>
                    <td className="px-5 py-4 text-sm font-bold text-white">₹{inv.amount.toLocaleString("en-IN")}</td>
                    <td className="px-5 py-4 text-xs text-white/50">{inv.date}</td>
                    <td className="px-5 py-4 text-xs text-white/50">{inv.dueDate}</td>
                    <td className="px-5 py-4">
                      <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold w-fit"
                        style={{ background: s.bg, color: s.color }}>
                        <StatusIcon className="w-3 h-3" />{s.label}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <button className="flex items-center gap-1 text-xs text-white/30 hover:text-white/70 transition-colors">
                        <Download className="w-3.5 h-3.5" /> PDF
                      </button>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
