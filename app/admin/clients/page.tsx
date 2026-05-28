"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Plus, Mail, ExternalLink } from "lucide-react";
import { ADMIN_CLIENTS } from "@/lib/dashboard-data";
import { cn } from "@/lib/utils";

const STATUS_CONFIG = {
  active: { label: "Active", color: "#34D399", bg: "#34D39915" },
  onboarding: { label: "Onboarding", color: "#F5C518", bg: "#F5C51815" },
  churned: { label: "Churned", color: "#F87171", bg: "#F8717115" },
};

export default function AdminClientsPage() {
  const [search, setSearch] = useState("");

  const filtered = ADMIN_CLIENTS.filter((c) =>
    c.business.toLowerCase().includes(search.toLowerCase()) ||
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.industry.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-white mb-1">Clients</h1>
          <p className="text-white/50">{ADMIN_CLIENTS.length} registered clients</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#A78BFA]/20 border border-[#A78BFA]/30 text-[#A78BFA] text-sm font-bold hover:bg-[#A78BFA]/30 transition-all">
          <Plus className="w-4 h-4" /> Add Client
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search clients by name, business or industry..."
          className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-white/25 outline-none focus:border-[#A78BFA]/40 transition-all"
        />
      </div>

      {/* Client Cards */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((client, i) => {
          const s = STATUS_CONFIG[client.status];
          return (
            <motion.div
              key={client.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="rounded-2xl border border-white/8 bg-white/3 p-5 hover:bg-white/5 hover:border-white/15 transition-all group"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black"
                    style={{ background: `${client.color}25`, color: client.color }}>
                    {client.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{client.business}</p>
                    <p className="text-xs text-white/40">{client.industry}</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                  style={{ background: s.bg, color: s.color }}>{s.label}</span>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                {[
                  { label: "Projects", value: client.projects },
                  { label: "Value", value: client.totalValue },
                  { label: "Since", value: client.joinDate },
                ].map((item) => (
                  <div key={item.label} className="text-center p-2 rounded-lg bg-white/4">
                    <p className="text-sm font-bold text-white">{item.value}</p>
                    <p className="text-[10px] text-white/35">{item.label}</p>
                  </div>
                ))}
              </div>

              {/* Contact */}
              <p className="text-xs text-white/40 mb-3">{client.name}</p>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-3 border-t border-white/8">
                <button className="flex items-center gap-1.5 flex-1 justify-center py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-white/60 hover:text-white transition-all">
                  <Mail className="w-3.5 h-3.5" /> Contact
                </button>
                <button className="flex items-center gap-1.5 flex-1 justify-center py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-white/60 hover:text-white transition-all">
                  <ExternalLink className="w-3.5 h-3.5" /> View
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-white/30">No clients found for &quot;{search}&quot;</p>
        </div>
      )}
    </div>
  );
}
