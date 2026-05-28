"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, FolderKanban, MessageSquare,
  Receipt, Settings, LogOut, Sparkles, Bell, ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/projects", label: "Projects", icon: FolderKanban, badge: 3 },
  { href: "/dashboard/messages", label: "Messages", icon: MessageSquare, badge: 4 },
  { href: "/dashboard/invoices", label: "Invoices", icon: Receipt },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-full w-64 z-30 flex flex-col border-r border-white/8"
      style={{ background: "rgba(6,13,26,0.98)", backdropFilter: "blur(20px)" }}
    >
      {/* Logo */}
      <div className="px-5 py-5 border-b border-white/8">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg gradient-brand flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
            <Sparkles className="w-4 h-4 text-[#0F172A]" />
          </div>
          <div>
            <span className="font-black text-sm text-white">AddValue</span>
            <span className="block text-[9px] text-white/40 font-medium tracking-widest uppercase">Dashboard</span>
          </div>
        </Link>
      </div>

      {/* User Info */}
      <div className="px-5 py-4 border-b border-white/8">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#F5C518] to-[#38BDF8] flex items-center justify-center text-sm font-black text-[#0F172A]">
            U
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-white truncate">Your Business</p>
            <p className="text-[10px] text-white/40 truncate">client@business.com</p>
          </div>
          <button className="ml-auto relative" aria-label="Notifications">
            <Bell className="w-4 h-4 text-white/40 hover:text-white transition-colors" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#F5C518]" />
          </button>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
          return (
            <Link key={item.href} href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group relative",
                isActive
                  ? "bg-[#F5C518]/15 text-[#F5C518]"
                  : "text-white/50 hover:text-white hover:bg-white/6"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="dashboard-nav-indicator"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full bg-[#F5C518]"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <item.icon className={cn("w-4 h-4 flex-shrink-0", isActive ? "text-[#F5C518]" : "text-white/40 group-hover:text-white/70")} />
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span className="w-5 h-5 rounded-full bg-[#38BDF8] text-white text-[10px] font-bold flex items-center justify-center">
                  {item.badge}
                </span>
              )}
              {isActive && <ChevronRight className="w-3.5 h-3.5" />}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="px-3 py-4 border-t border-white/8 space-y-1">
        <Link href="/book-consultation"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[#38BDF8] hover:bg-[#38BDF8]/10 transition-all"
        >
          <MessageSquare className="w-4 h-4" />
          Book Consultation
        </Link>
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/40 hover:text-red-400 hover:bg-red-500/8 transition-all">
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
