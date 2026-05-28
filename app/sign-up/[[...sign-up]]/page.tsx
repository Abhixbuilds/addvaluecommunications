"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Sparkles, Mail, Lock, ArrowRight, Eye, EyeOff, User, GitBranch, Globe2 } from "lucide-react";

/**
 * Sign-Up Page
 *
 * Dev mode: Shows a functional-looking form with a bypass to dashboard.
 * Production: Replace form with <SignUp afterSignUpUrl="/dashboard" /> from @clerk/nextjs
 */

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#060D1A] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background orbs */}
      <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-[#38BDF8]/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-[#F5C518]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 group">
            <div className="w-11 h-11 rounded-xl gradient-brand flex items-center justify-center shadow-xl group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-[#0F172A]" />
            </div>
            <span className="text-2xl font-black text-white">AddValue</span>
          </Link>
          <p className="text-white/40 text-sm mt-2.5">Create your free account</p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8"
          style={{ boxShadow: "0 25px 50px rgba(0,0,0,0.4), 0 0 0 1px rgba(56,189,248,0.06)" }}
        >
          {/* Dev notice */}
          <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-[#38BDF8]/8 border border-[#38BDF8]/20 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] animate-pulse flex-shrink-0" />
            <p className="text-xs text-[#38BDF8]/80">
              <span className="font-semibold text-[#38BDF8]">Dev mode</span> — account creation bypasses Clerk
            </p>
          </div>

          {/* Social buttons */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {[
              { icon: Globe2, label: "Google" },
              { icon: GitBranch, label: "GitHub" },
            ].map((btn) => (
              <button
                key={btn.label}
                onClick={() => router.push("/dashboard")}
                className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white/70 text-sm font-medium hover:bg-white/8 hover:border-white/20 transition-all"
              >
                <btn.icon className="w-4 h-4" />
                {btn.label}
              </button>
            ))}
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-white/8" />
            <span className="text-xs text-white/25">or sign up with email</span>
            <div className="flex-1 h-px bg-white/8" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-xs font-medium text-white/50 mb-1.5">Full name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
                <input
                  type="text"
                  id="signup-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Arjun Mehta"
                  autoComplete="name"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#38BDF8]/40 transition-all caret-white [&:-webkit-autofill]:[-webkit-text-fill-color:white] [&:-webkit-autofill]:[transition:background-color_5000s_ease-in-out_0s]"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-medium text-white/50 mb-1.5">Email address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
                <input
                  type="email"
                  id="signup-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  autoComplete="email"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#38BDF8]/40 transition-all caret-white [&:-webkit-autofill]:[-webkit-text-fill-color:white] [&:-webkit-autofill]:[transition:background-color_5000s_ease-in-out_0s]"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-medium text-white/50 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="signup-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 8 characters"
                  autoComplete="new-password"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#38BDF8]/40 transition-all caret-white [&:-webkit-autofill]:[-webkit-text-fill-color:white] [&:-webkit-autofill]:[transition:background-color_5000s_ease-in-out_0s]"
                />
                <button type="button" onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/60 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Terms */}
            <p className="text-[11px] text-white/25 leading-relaxed">
              By creating an account, you agree to our{" "}
              <Link href="/" className="text-[#38BDF8]/70 hover:underline">Terms of Service</Link>{" "}
              and{" "}
              <Link href="/" className="text-[#38BDF8]/70 hover:underline">Privacy Policy</Link>.
            </p>

            {/* Submit */}
            <button
              type="submit"
              id="signup-submit"
              disabled={loading}
              className="w-full py-3 rounded-xl gradient-yellow text-[#0F172A] font-bold text-sm shadow-lg hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:scale-100 transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-[#0F172A]/30 border-t-[#0F172A] rounded-full animate-spin" />
              ) : (
                <>Create Account <ArrowRight className="w-4 h-4" /></>
              )}
            </button>

            <button
              type="button"
              onClick={() => router.push("/dashboard")}
              className="w-full py-2.5 rounded-xl border border-white/8 text-white/40 text-xs font-medium hover:bg-white/5 hover:text-white/60 transition-all"
            >
              Skip → Go directly to Dashboard (dev only)
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-white/25 mt-5">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-[#F5C518] hover:underline font-medium">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
