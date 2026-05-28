"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import {
  Menu, X, Sun, Moon, ChevronDown,
  TrendingUp, Megaphone, Radio, BarChart3, Shield, Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";

const SERVICES = [
  { label: "Finance", icon: TrendingUp, href: "/services/finance", color: "#F5C518" },
  { label: "Advertisement", icon: Megaphone, href: "/services/advertisement", color: "#38BDF8" },
  { label: "Public Relations", icon: Radio, href: "/services/pr", color: "#A78BFA" },
  { label: "Marketing", icon: BarChart3, href: "/services/marketing", color: "#34D399" },
  { label: "Insurance", icon: Shield, href: "/services/insurance", color: "#FB923C" },
];

const NAV_LINKS = [
  { label: "Services", href: "#services", hasDropdown: true },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Success Stories", href: "#success" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
          isScrolled
            ? "glass border-b border-white/10 py-3"
            : "bg-transparent py-5"
        )}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl gradient-brand flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <Sparkles className="w-4.5 h-4.5 text-[#0F172A]" />
            </div>
            <div className="leading-none">
              <span className="font-black text-lg text-white tracking-tight">
                AddValue
              </span>
              <span className="block text-[10px] text-white/40 font-medium tracking-widest uppercase">
                Communications
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) =>
              link.hasDropdown ? (
                <div key={link.label} className="relative">
                  <button
                    id="services-dropdown-btn"
                    onClick={() => setServicesOpen((v) => !v)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium text-white/70 hover:text-white hover:bg-white/8 transition-all"
                  >
                    {link.label}
                    <ChevronDown className={cn("w-3.5 h-3.5 transition-transform", servicesOpen && "rotate-180")} />
                  </button>
                  <AnimatePresence>
                    {servicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 mt-2 w-56 glass rounded-2xl border border-white/10 p-2 shadow-2xl"
                        onMouseLeave={() => setServicesOpen(false)}
                      >
                        {SERVICES.map((s) => (
                          <Link
                            key={s.label}
                            href={s.href}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/8 transition-all group"
                            onClick={() => setServicesOpen(false)}
                          >
                            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `${s.color}20` }}>
                              <s.icon className="w-3.5 h-3.5" style={{ color: s.color }} />
                            </div>
                            <span className="text-sm font-medium text-white/70 group-hover:text-white transition-colors">{s.label}</span>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="px-4 py-2 rounded-xl text-sm font-medium text-white/70 hover:text-white hover:bg-white/8 transition-all"
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              id="theme-toggle"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="hidden sm:flex w-9 h-9 rounded-xl items-center justify-center text-white/50 hover:text-white hover:bg-white/8 transition-all"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <Link
              href="/sign-in"
              className="hidden sm:block px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/onboarding"
              id="navbar-cta"
              className="px-5 py-2.5 rounded-xl text-sm font-bold text-[#0F172A] gradient-yellow shadow-lg hover:shadow-xl hover:scale-105 transition-all glow-sm-yellow"
            >
              Get Started
            </Link>

            {/* Mobile Menu Button */}
            <button
              id="mobile-menu-btn"
              className="lg:hidden w-9 h-9 rounded-xl flex items-center justify-center text-white/70 hover:text-white hover:bg-white/8 transition-all"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle mobile menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed top-16 left-0 right-0 z-30 glass border-b border-white/10 overflow-hidden lg:hidden"
          >
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
              {SERVICES.map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-white/8 transition-all"
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${s.color}20` }}>
                    <s.icon className="w-4 h-4" style={{ color: s.color }} />
                  </div>
                  <span className="font-medium text-white/80">{s.label}</span>
                </Link>
              ))}
              <div className="pt-3 border-t border-white/10 flex gap-3">
                <Link href="/sign-in" className="flex-1 py-2.5 text-center rounded-xl border border-white/10 text-sm font-medium text-white/70">
                  Sign In
                </Link>
                <Link href="/onboarding" className="flex-1 py-2.5 text-center rounded-xl gradient-yellow text-sm font-bold text-[#0F172A]">
                  Get Started
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
