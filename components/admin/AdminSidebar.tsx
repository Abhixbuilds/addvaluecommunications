"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Users, FolderKanban, BarChart3,
  Settings, Sparkles, ChevronRight, LogOut, Bell, Shield
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const NAV_ITEMS = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/clients", label: "Clients", icon: Users, badge: 142 },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban, badge: 28 },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-full w-64 z-30 flex flex-col border-r border-white/8"
      style={{ background: "rgba(6,13,26,0.98)", backdropFilter: "blur(20px)" }}
    >
      {/* Logo */}
      <div className="px-5 py-5 border-b border-white/8">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#A78BFA] to-[#38BDF8] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
            <Shield className="w-4 h-4 text-white" />
          </div>
          <div>
            <span className="font-black text-sm text-white">Admin Panel</span>
            <span className="block text-[9px] text-white/40 font-medium tracking-widest uppercase">AddValue</span>
          </div>
        </Link>
      </div>

      {/* Admin badge */}
      <div className="px-5 py-3 border-b border-white/8">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#A78BFA] to-[#38BDF8] flex items-center justify-center text-xs font-black text-white">
            A
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-white">Admin User</p>
            <p className="text-[10px] text-[#A78BFA] font-semibold">Super Admin</p>
          </div>
          <button className="ml-auto relative">
            <Bell className="w-4 h-4 text-white/40 hover:text-white transition-colors" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500" />
          </button>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
          return (
            <Link key={item.href} href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group relative",
                isActive
                  ? "bg-[#A78BFA]/15 text-[#A78BFA]"
                  : "text-white/50 hover:text-white hover:bg-white/6"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="admin-nav-indicator"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full bg-[#A78BFA]"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <item.icon className={cn("w-4 h-4 flex-shrink-0", isActive ? "text-[#A78BFA]" : "text-white/40 group-hover:text-white/70")} />
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span className="px-2 py-0.5 rounded-full bg-white/10 text-white/50 text-[10px] font-bold">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t border-white/8 space-y-1">
        <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/40 hover:text-white hover:bg-white/6 transition-all">
          <LayoutDashboard className="w-4 h-4" /> Client View
        </Link>
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/40 hover:text-red-400 hover:bg-red-500/8 transition-all">
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </div>
    </aside>
  );
}
