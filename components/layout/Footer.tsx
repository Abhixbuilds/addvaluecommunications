"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles, Mail, Phone, MapPin, ArrowRight,
  TrendingUp, Megaphone, Radio, BarChart3, Shield, Globe
} from "lucide-react";
import { FaXTwitter, FaLinkedinIn, FaInstagram, FaYoutube } from "react-icons/fa6";

const FOOTER_SERVICES = [
  { label: "Finance", href: "/services/finance" },
  { label: "Advertisement", href: "/services/advertisement" },
  { label: "Public Relations", href: "/services/pr" },
  { label: "Marketing", href: "/services/marketing" },
  { label: "Insurance", href: "/services/insurance" },
];

const FOOTER_COMPANY = [
  { label: "About Us", href: "#" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Success Stories", href: "#success" },
  { label: "Blog", href: "#" },
  { label: "Careers", href: "#" },
];

const FOOTER_LEGAL = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Cookie Policy", href: "#" },
  { label: "Refund Policy", href: "#" },
];

const SOCIAL = [
  { icon: FaXTwitter, href: "#", label: "Twitter / X" },
  { icon: FaLinkedinIn, href: "#", label: "LinkedIn" },
  { icon: FaInstagram, href: "#", label: "Instagram" },
  { icon: FaYoutube, href: "#", label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#060D1A] border-t border-white/8 overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#F5C518]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#38BDF8]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-8">
        {/* Newsletter CTA */}
        <div className="mb-16 p-8 rounded-2xl border border-white/10 bg-white/3 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">Stay ahead of the curve</h3>
              <p className="text-white/50 text-sm">Get weekly insights on business growth, marketing trends, and expert tips.</p>
            </div>
            <form className="flex gap-3 w-full md:w-auto" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-64 px-4 py-2.5 rounded-xl bg-white/8 border border-white/10 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#F5C518]/50 transition-colors"
              />
              <button type="submit" className="px-5 py-2.5 rounded-xl gradient-yellow text-[#0F172A] text-sm font-bold hover:opacity-90 transition-opacity flex items-center gap-2">
                Subscribe <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>

        {/* Main footer grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-xl gradient-brand flex items-center justify-center shadow-lg">
                <Sparkles className="w-4.5 h-4.5 text-[#0F172A]" />
              </div>
              <div>
                <span className="font-black text-lg text-white">AddValue</span>
                <span className="block text-[10px] text-white/40 font-medium tracking-widest uppercase">Communications</span>
              </div>
            </Link>
            <p className="text-sm text-white/50 leading-relaxed mb-6 max-w-xs">
              Premium AI-assisted business services platform. Expert-led Finance, Advertisement, PR, Marketing & Insurance solutions for startups and enterprises.
            </p>
            {/* Contact */}
            <div className="space-y-2.5">
              {[
                { icon: Mail, text: "hello@addvaluecommunications.com" },
                { icon: Phone, text: "+91 98765 43210" },
                { icon: MapPin, text: "Mumbai, Maharashtra, India" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2.5 text-sm text-white/40">
                  <Icon className="w-3.5 h-3.5 text-[#F5C518]/70 flex-shrink-0" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Services</h4>
            <ul className="space-y-2.5">
              {FOOTER_SERVICES.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-white/50 hover:text-white hover:translate-x-1 transition-all inline-block">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Company</h4>
            <ul className="space-y-2.5">
              {FOOTER_COMPANY.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-white/50 hover:text-white hover:translate-x-1 transition-all inline-block">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Legal</h4>
            <ul className="space-y-2.5">
              {FOOTER_LEGAL.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-white/50 hover:text-white hover:translate-x-1 transition-all inline-block">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} AddValue Communications. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            {SOCIAL.map(({ icon: Icon, href, label }) => (
              <Link
                key={label}
                href={href}
                aria-label={label}
                className="w-8 h-8 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all"
              >
                <Icon className="w-3.5 h-3.5" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
