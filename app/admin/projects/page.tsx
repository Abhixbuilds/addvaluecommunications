"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Plus, Zap, Clock, AlertCircle, CheckCircle2 } from "lucide-react";
import { ADMIN_PROJECTS } from "@/lib/dashboard-data";
import { cn } from "@/lib/utils";

const STATUS_CONFIG = {
  planning: { label: "Planning", color: "#A78BFA", icon: Clock },
  active: { label: "Active", color: "#38BDF8", icon: Zap },
  review: { label: "In Review", color: "#F5C518", icon: AlertCircle },
  completed: { label: "Completed", color: "#34D399", icon: CheckCircle2 },
};

export default function AdminProjectsPage() {
  const [search, setSearch] = useState("");

  const filtered = ADMIN_PROJECTS.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.client.toLowerCase().includes(search.toLowerCase()) ||
    p.service.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-white mb-1">Projects</h1>
          <p className="text-white/50">{ADMIN_PROJECTS.length} active projects</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#A78BFA]/20 border border-[#A78BFA]/30 text-[#A78BFA] text-sm font-bold hover:bg-[#A78BFA]/30 transition-all">
          <Plus className="w-4 h-4" /> New Project
        </button>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by project name, client, or service..."
          className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-white/25 outline-none focus:border-[#A78BFA]/40 transition-all"
        />
      </div>

      <div className="rounded-2xl border border-white/8 bg-white/3 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/8">
                {["Project", "Client", "Service", "Manager", "Progress", "Status", "Value", "Due", "Actions"].map((h) => (
                  <th key={h} className="px-5 py-3.5 text-left text-[10px] text-white/35 font-semibold uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((proj, i) => {
                const s = STATUS_CONFIG[proj.status];
                const StatusIcon = s.icon;
                return (
                  <motion.tr key={proj.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.07 }}
                    className="border-b border-white/5 hover:bg-white/3 transition-all group"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-8 rounded-full flex-shrink-0" style={{ background: proj.color }} />
                        <p className="text-sm font-semibold text-white">{proj.name}</p>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-xs text-white/60">{proj.client}</td>
                    <td className="px-5 py-4">
                      <span className="text-xs px-2 py-1 rounded-full bg-white/8 text-white/60">{proj.service}</span>
                    </td>
                    <td className="px-5 py-4 text-xs text-white/60">{proj.manager}</td>
                    <td className="px-5 py-4 w-32">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-white/8 rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${proj.progress}%`, background: proj.color }} />
                        </div>
                        <span className="text-[10px] text-white/40">{proj.progress}%</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full w-fit"
                        style={{ background: `${s.color}15`, color: s.color }}>
                        <StatusIcon className="w-3 h-3" />{s.label}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm font-bold" style={{ color: proj.color }}>{proj.value}</td>
                    <td className="px-5 py-4 text-xs text-white/50">{proj.dueDate}</td>
                    <td className="px-5 py-4">
                      <button className="text-xs text-[#A78BFA] hover:underline opacity-0 group-hover:opacity-100 transition-opacity">Edit</button>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-white/30">No projects match &quot;{search}&quot;</p>
          </div>
        )}
      </div>
    </div>
  );
}
