"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Users, FolderKanban, TrendingUp, AlertCircle, ArrowRight,
  CheckCircle2, Clock, Zap
} from "lucide-react";
import {
  ADMIN_STATS, ADMIN_CLIENTS, ADMIN_PROJECTS, ADMIN_REVENUE_DATA
} from "@/lib/dashboard-data";
import AdminRevenueChart from "@/components/admin/AdminRevenueChart";
import { cn } from "@/lib/utils";

const STATUS_COLOR = {
  planning: "#A78BFA", active: "#38BDF8", review: "#F5C518", completed: "#34D399",
};

export default function AdminPage() {
  return (
    <div className="p-8">
      <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <p className="text-sm text-white/40 mb-1">Platform Overview</p>
        <h1 className="text-3xl font-black text-white">Admin Dashboard</h1>
        <p className="text-white/50 mt-1">Real-time platform metrics and operations.</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {[
          { label: "Total Clients", value: ADMIN_STATS.totalClients, color: "#38BDF8", sub: "+12 this month", icon: Users },
          { label: "Active Projects", value: ADMIN_STATS.activeProjects, color: "#F5C518", sub: "Across all services", icon: FolderKanban },
          { label: "Monthly Revenue", value: ADMIN_STATS.monthlyRevenue, color: "#34D399", sub: "+32% vs last month", icon: TrendingUp },
          { label: "Pending Inquiries", value: ADMIN_STATS.pendingInquiries, color: "#FB923C", sub: "Awaiting response", icon: AlertCircle },
          { label: "Team Members", value: ADMIN_STATS.teamMembers, color: "#A78BFA", sub: "Across all departments", icon: Users },
          { label: "Client Satisfaction", value: ADMIN_STATS.clientSatisfaction, color: "#34D399", sub: "Based on reviews", icon: CheckCircle2 },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
            className="rounded-2xl border border-white/8 bg-white/3 p-5 hover:bg-white/5 transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${s.color}20` }}>
                <s.icon className="w-4 h-4" style={{ color: s.color }} />
              </div>
            </div>
            <p className="text-2xl font-black text-white mb-0.5">{s.value}</p>
            <p className="text-sm text-white/50">{s.label}</p>
            <p className="text-xs mt-1" style={{ color: s.color }}>{s.sub}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        {/* Revenue chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="lg:col-span-2 rounded-2xl border border-white/8 bg-white/3 p-6"
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-base font-bold text-white">Revenue Trend</h2>
              <p className="text-xs text-white/40 mt-0.5">Last 6 months</p>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full bg-[#34D399]/15 text-[#34D399] font-semibold">+32% MoM</span>
          </div>
          <AdminRevenueChart data={ADMIN_REVENUE_DATA} />
        </motion.div>

        {/* Top clients */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
          className="rounded-2xl border border-white/8 bg-white/3 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-white">Top Clients</h2>
            <Link href="/admin/clients" className="text-xs text-[#A78BFA] hover:underline">All</Link>
          </div>
          <div className="space-y-3">
            {ADMIN_CLIENTS.slice(0, 4).map((client) => (
              <div key={client.id} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                  style={{ background: `${client.color}25`, color: client.color }}>
                  {client.avatar}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-white truncate">{client.business}</p>
                  <p className="text-[10px] text-white/40">{client.industry}</p>
                </div>
                <p className="text-xs font-bold text-white/70 flex-shrink-0">{client.totalValue}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Active Projects */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="rounded-2xl border border-white/8 bg-white/3 overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-white/8 flex items-center justify-between">
          <h2 className="text-base font-bold text-white">Active Projects</h2>
          <Link href="/admin/projects" className="flex items-center gap-1 text-xs text-[#A78BFA] hover:underline">
            Manage all <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/6">
                {["Project", "Client", "Service", "Manager", "Progress", "Value", "Due"].map((h) => (
                  <th key={h} className="px-5 py-3 text-left text-[10px] text-white/35 font-semibold uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ADMIN_PROJECTS.map((proj, i) => (
                <motion.tr key={proj.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 + i * 0.06 }}
                  className="border-b border-white/5 hover:bg-white/3 transition-all"
                >
                  <td className="px-5 py-3.5">
                    <p className="text-sm font-semibold text-white">{proj.name}</p>
                  </td>
                  <td className="px-5 py-3.5 text-xs text-white/60">{proj.client}</td>
                  <td className="px-5 py-3.5">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-white/8 text-white/60">{proj.service}</span>
                  </td>
                  <td className="px-5 py-3.5 text-xs text-white/60">{proj.manager}</td>
                  <td className="px-5 py-3.5 w-32">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-white/8 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${proj.progress}%`, background: proj.color }} />
                      </div>
                      <span className="text-[10px] text-white/40">{proj.progress}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-sm font-bold" style={{ color: proj.color }}>{proj.value}</td>
                  <td className="px-5 py-3.5 text-xs text-white/50">{proj.dueDate}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
