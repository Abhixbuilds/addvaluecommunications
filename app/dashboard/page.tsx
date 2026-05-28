"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  TrendingUp, FolderKanban, MessageSquare, Receipt,
  ArrowRight, CheckCircle2, Clock, AlertCircle, Zap
} from "lucide-react";
import {
  CLIENT_STATS, CLIENT_PROJECTS, CLIENT_MESSAGES, CLIENT_INVOICES, REVENUE_CHART_DATA
} from "@/lib/dashboard-data";
import DashboardChart from "@/components/dashboard/DashboardChart";
import { cn } from "@/lib/utils";

const STATUS_CONFIG = {
  planning: { label: "Planning", color: "#A78BFA", bg: "#A78BFA15", icon: Clock },
  active: { label: "Active", color: "#38BDF8", bg: "#38BDF815", icon: Zap },
  review: { label: "In Review", color: "#F5C518", bg: "#F5C51815", icon: AlertCircle },
  completed: { label: "Completed", color: "#34D399", bg: "#34D39915", icon: CheckCircle2 },
  paused: { label: "Paused", color: "#6B7280", bg: "#6B728015", icon: Clock },
};

export default function DashboardPage() {
  const activeProjects = CLIENT_PROJECTS.filter((p) => p.status !== "completed");
  const unreadMessages = CLIENT_MESSAGES.filter((m) => m.unread);

  return (
    <div className="p-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <p className="text-sm text-white/40 mb-1">Welcome back 👋</p>
        <h1 className="text-3xl font-black text-white">Your Business Dashboard</h1>
        <p className="text-white/50 mt-1">Here&apos;s an overview of your projects and activity.</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Active Projects", value: CLIENT_STATS.activeProjects, icon: FolderKanban, color: "#38BDF8", change: "+1 this month" },
          { label: "Completed", value: CLIENT_STATS.completedProjects, icon: CheckCircle2, color: "#34D399", change: "All on time" },
          { label: "Total Invested", value: CLIENT_STATS.totalSpend, icon: TrendingUp, color: "#F5C518", change: "ROI: 3.2x avg" },
          { label: "Unread Messages", value: CLIENT_STATS.messagesUnread, icon: MessageSquare, color: "#A78BFA", change: "4 awaiting reply" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="rounded-2xl border border-white/8 bg-white/3 p-5 hover:bg-white/5 transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${stat.color}20` }}>
                <stat.icon className="w-4 h-4" style={{ color: stat.color }} />
              </div>
            </div>
            <p className="text-2xl font-black text-white mb-0.5">{stat.value}</p>
            <p className="text-sm text-white/50">{stat.label}</p>
            <p className="text-xs mt-1.5" style={{ color: stat.color }}>{stat.change}</p>
          </motion.div>
        ))}
      </div>

      {/* Alert Banner */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
        className="mb-8 p-4 rounded-xl border border-[#F5C518]/25 bg-[#F5C518]/8 flex items-center justify-between gap-4"
      >
        <div className="flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-[#F5C518] flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold text-white">Upcoming Deliverable</p>
            <p className="text-xs text-white/55">{CLIENT_STATS.nextDeliverable}</p>
          </div>
        </div>
        <Link href="/dashboard/projects" className="text-xs font-bold text-[#F5C518] hover:underline whitespace-nowrap">
          View Project →
        </Link>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="lg:col-span-2 rounded-2xl border border-white/8 bg-white/3 p-6"
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-base font-bold text-white">Investment vs. Returns</h2>
              <p className="text-xs text-white/40 mt-0.5">Last 6 months</p>
            </div>
            <div className="flex items-center gap-3 text-xs text-white/50">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#F5C518]" />Spend</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#38BDF8]" />ROI</span>
            </div>
          </div>
          <DashboardChart data={REVENUE_CHART_DATA} />
        </motion.div>

        {/* Messages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
          className="rounded-2xl border border-white/8 bg-white/3 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-white">Messages</h2>
            <Link href="/dashboard/messages" className="text-xs text-[#38BDF8] hover:underline">View all</Link>
          </div>
          <div className="space-y-3">
            {CLIENT_MESSAGES.slice(0, 3).map((msg) => (
              <Link key={msg.id} href="/dashboard/messages"
                className="flex gap-3 p-3 rounded-xl hover:bg-white/5 transition-all group cursor-pointer"
              >
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0",
                  msg.unread ? "bg-[#38BDF8] text-white" : "bg-white/10 text-white/60"
                )}>
                  {msg.avatar}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-white truncate">{msg.from}</p>
                    <span className="text-[10px] text-white/30 flex-shrink-0 ml-2">{msg.time}</span>
                  </div>
                  <p className="text-[11px] text-white/50 truncate mt-0.5">{msg.content}</p>
                  {msg.unread && <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#38BDF8] mt-1" />}
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Active Projects */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="rounded-2xl border border-white/8 bg-white/3 p-6 mb-6"
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-bold text-white">Active Projects</h2>
          <Link href="/dashboard/projects" className="flex items-center gap-1 text-xs text-[#F5C518] hover:underline">
            All projects <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="space-y-4">
          {activeProjects.map((project) => {
            const sc = STATUS_CONFIG[project.status];
            return (
              <div key={project.id} className="flex items-center gap-4">
                <div className="w-1.5 h-8 rounded-full flex-shrink-0" style={{ background: project.color }} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <p className="text-sm font-semibold text-white truncate">{project.name}</p>
                    <span className="flex-shrink-0 px-2 py-0.5 rounded-full text-[10px] font-semibold"
                      style={{ background: sc.bg, color: sc.color }}>
                      {sc.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-1.5 bg-white/8 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${project.progress}%` }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="h-full rounded-full"
                        style={{ background: project.color }}
                      />
                    </div>
                    <span className="text-xs text-white/40 flex-shrink-0">{project.progress}%</span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0 hidden sm:block">
                  <p className="text-xs text-white/40">Due</p>
                  <p className="text-xs font-semibold text-white/70">{project.dueDate}</p>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Recent Invoices */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
        className="rounded-2xl border border-white/8 bg-white/3 p-6"
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-bold text-white">Recent Invoices</h2>
          <Link href="/dashboard/invoices" className="text-xs text-[#F5C518] hover:underline">View all</Link>
        </div>
        <div className="space-y-3">
          {CLIENT_INVOICES.slice(0, 3).map((inv) => (
            <div key={inv.id} className="flex items-center justify-between gap-4 py-2.5 border-b border-white/6 last:border-0">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white truncate">{inv.id}</p>
                <p className="text-xs text-white/40 truncate">{inv.project}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-sm font-bold text-white">₹{inv.amount.toLocaleString("en-IN")}</p>
                <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full",
                  inv.status === "paid" ? "bg-[#34D399]/15 text-[#34D399]" :
                  inv.status === "pending" ? "bg-[#F5C518]/15 text-[#F5C518]" :
                  "bg-red-500/15 text-red-400"
                )}>
                  {inv.status.charAt(0).toUpperCase() + inv.status.slice(1)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
