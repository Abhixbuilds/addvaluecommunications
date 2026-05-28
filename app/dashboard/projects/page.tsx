"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  FolderKanban, Calendar, User, Tag, ArrowRight,
  Clock, Zap, AlertCircle, CheckCircle2, Pause
} from "lucide-react";
import { CLIENT_PROJECTS } from "@/lib/dashboard-data";
import { cn } from "@/lib/utils";

const STATUS_CONFIG = {
  planning: { label: "Planning", color: "#A78BFA", bg: "#A78BFA15", icon: Clock },
  active: { label: "Active", color: "#38BDF8", bg: "#38BDF815", icon: Zap },
  review: { label: "In Review", color: "#F5C518", bg: "#F5C51815", icon: AlertCircle },
  completed: { label: "Completed", color: "#34D399", bg: "#34D39915", icon: CheckCircle2 },
  paused: { label: "Paused", color: "#6B7280", bg: "#6B728015", icon: Pause },
};

const FILTERS = ["All", "Active", "Review", "Planning", "Completed"];

export default function ProjectsPage() {
  const [filter, setFilter] = useState("All");

  const filtered = CLIENT_PROJECTS.filter((p) =>
    filter === "All" ? true : p.status.toLowerCase() === filter.toLowerCase()
  );

  return (
    <div className="p-8">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-white mb-1">Projects</h1>
          <p className="text-white/50">Track all your ongoing and completed projects.</p>
        </div>
        <Link href="/onboarding"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-yellow text-[#0F172A] text-sm font-bold hover:scale-105 transition-all"
        >
          New Project <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 mb-6 flex-wrap">
        {FILTERS.map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={cn(
              "px-4 py-1.5 rounded-full text-xs font-semibold transition-all",
              filter === f
                ? "bg-[#F5C518] text-[#0F172A]"
                : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white border border-white/8"
            )}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Project Cards */}
      <div className="space-y-4">
        {filtered.map((project, i) => {
          const sc = STATUS_CONFIG[project.status];
          const StatusIcon = sc.icon;
          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="rounded-2xl border border-white/8 bg-white/3 hover:bg-white/5 transition-all overflow-hidden group"
            >
              {/* Left accent */}
              <div className="flex">
                <div className="w-1 flex-shrink-0" style={{ background: project.color }} />
                <div className="flex-1 p-6">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-base font-bold text-white">{project.name}</h3>
                        <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold"
                          style={{ background: sc.bg, color: sc.color }}>
                          <StatusIcon className="w-3 h-3" />{sc.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-white/40">
                        <span className="flex items-center gap-1.5">
                          <User className="w-3 h-3" /> {project.manager}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3 h-3" /> Due {project.dueDate}
                        </span>
                        <span className="font-semibold" style={{ color: project.color }}>{project.budget}</span>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-2xl font-black text-white">{project.progress}%</p>
                      <p className="text-[10px] text-white/40">Complete</p>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="h-2 bg-white/8 rounded-full overflow-hidden mb-3">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${project.progress}%` }}
                      transition={{ duration: 0.9, delay: 0.2 + i * 0.07 }}
                      className="h-full rounded-full"
                      style={{ background: project.color }}
                    />
                  </div>

                  {/* Tags + last update */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {project.tags.map((tag) => (
                        <span key={tag} className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] text-white/50 bg-white/5 border border-white/8">
                          <Tag className="w-2.5 h-2.5" />{tag}
                        </span>
                      ))}
                    </div>
                    <span className="text-[10px] text-white/30">Updated {project.lastUpdate}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <FolderKanban className="w-10 h-10 text-white/15 mx-auto mb-3" />
            <p className="text-white/40">No projects found for this filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}
