"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Phone, Globe, Building2, Save, Bell, Shield, KeyRound } from "lucide-react";

function FieldRow({ label, defaultValue, type = "text", icon: Icon }: {
  label: string; defaultValue: string; type?: string; icon: React.ElementType;
}) {
  const [val, setVal] = useState(defaultValue);
  return (
    <div>
      <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-1.5">{label}</label>
      <div className="relative">
        <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
        <input
          type={type}
          value={val}
          onChange={(e) => setVal(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-white/25 outline-none focus:border-[#F5C518]/50 transition-all"
        />
      </div>
    </div>
  );
}

export default function SettingsPage() {
  const [notifs, setNotifs] = useState({ projectUpdates: true, invoices: true, messages: true, marketing: false });

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-white mb-1">Settings</h1>
        <p className="text-white/50">Manage your profile, notifications, and account security.</p>
      </div>

      {/* Profile */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-white/8 bg-white/3 p-6 mb-5"
      >
        <h2 className="text-base font-bold text-white mb-5 flex items-center gap-2">
          <User className="w-4 h-4 text-[#F5C518]" /> Profile Information
        </h2>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#F5C518] to-[#38BDF8] flex items-center justify-center text-2xl font-black text-[#0F172A]">
            Y
          </div>
          <div>
            <p className="text-sm font-bold text-white">Your Business</p>
            <p className="text-xs text-white/40">client@business.com</p>
            <button className="mt-1 text-xs text-[#38BDF8] hover:underline">Change avatar</button>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <FieldRow label="Full Name" defaultValue="Business Owner" icon={User} />
          <FieldRow label="Business Name" defaultValue="Your Business" icon={Building2} />
          <FieldRow label="Email Address" defaultValue="client@business.com" type="email" icon={Mail} />
          <FieldRow label="Phone Number" defaultValue="+91 98765 43210" icon={Phone} />
          <FieldRow label="Website" defaultValue="https://yourbusiness.com" icon={Globe} />
          <FieldRow label="Industry" defaultValue="E-Commerce" icon={Building2} />
        </div>
        <button className="mt-5 flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-yellow text-[#0F172A] text-sm font-bold hover:scale-105 transition-all">
          <Save className="w-4 h-4" /> Save Changes
        </button>
      </motion.div>

      {/* Notifications */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="rounded-2xl border border-white/8 bg-white/3 p-6 mb-5"
      >
        <h2 className="text-base font-bold text-white mb-5 flex items-center gap-2">
          <Bell className="w-4 h-4 text-[#38BDF8]" /> Notification Preferences
        </h2>
        <div className="space-y-4">
          {[
            { key: "projectUpdates", label: "Project Updates", desc: "Get notified when your project status changes" },
            { key: "invoices", label: "Invoice Alerts", desc: "Receive reminders for due and overdue invoices" },
            { key: "messages", label: "New Messages", desc: "Get alerted when your team sends a message" },
            { key: "marketing", label: "Tips & Updates", desc: "Receive platform updates and strategy tips" },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between gap-4 py-2 border-b border-white/6 last:border-0">
              <div>
                <p className="text-sm font-semibold text-white">{item.label}</p>
                <p className="text-xs text-white/40">{item.desc}</p>
              </div>
              <button
                onClick={() => setNotifs((prev) => ({ ...prev, [item.key]: !prev[item.key as keyof typeof prev] }))}
                className={`w-10 h-5.5 rounded-full transition-all flex-shrink-0 relative ${notifs[item.key as keyof typeof notifs] ? "bg-[#F5C518]" : "bg-white/15"}`}
                style={{ height: "22px", width: "40px" }}
              >
                <span className={`absolute top-0.5 w-4.5 h-4.5 rounded-full bg-white shadow transition-all`}
                  style={{
                    width: "18px", height: "18px",
                    left: notifs[item.key as keyof typeof notifs] ? "20px" : "2px"
                  }}
                />
              </button>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Security */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="rounded-2xl border border-white/8 bg-white/3 p-6"
      >
        <h2 className="text-base font-bold text-white mb-5 flex items-center gap-2">
          <Shield className="w-4 h-4 text-[#A78BFA]" /> Security
        </h2>
        <div className="space-y-3">
          {[
            { label: "Change Password", desc: "Update your account password", icon: KeyRound, action: "Update" },
            { label: "Two-Factor Authentication", desc: "Add extra security to your account", icon: Shield, action: "Enable" },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between gap-4 py-3 border-b border-white/6 last:border-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#A78BFA]/15 flex items-center justify-center">
                  <item.icon className="w-4 h-4 text-[#A78BFA]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{item.label}</p>
                  <p className="text-xs text-white/40">{item.desc}</p>
                </div>
              </div>
              <button className="px-4 py-1.5 rounded-xl border border-white/15 text-xs font-semibold text-white/60 hover:bg-white/8 hover:text-white transition-all">
                {item.action}
              </button>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
