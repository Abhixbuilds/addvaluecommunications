"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Sparkles, Mail, Lock, ArrowRight, Eye, EyeOff, GitBranch, Globe2 } from "lucide-react";

/**
 * Sign-In Page
 *
 * Dev mode: Shows a functional-looking form with a "Continue to Dashboard" bypass.
 * Production: Uncomment the <SignIn> component and remove the form below.
 *
 * To activate Clerk:
 * 1. Add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_xxx to .env.local
 * 2. Add CLERK_SECRET_KEY=sk_live_xxx to .env.local
 * 3. Uncomment: import { SignIn } from "@clerk/nextjs";
 * 4. Replace the form JSX with: <SignIn afterSignInUrl="/dashboard" />
 */

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const clerkConfigured =
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.startsWith("pk_live") ||
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.startsWith("pk_test_") &&
    !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.includes("placeholder");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate loading then navigate to dashboard
    await new Promise((r) => setTimeout(r, 800));
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#060D1A] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background orbs */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-[#F5C518]/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#38BDF8]/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#0EA5E9]/4 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 group">
            <div className="w-11 h-11 rounded-xl gradient-brand flex items-center justify-center shadow-xl group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-[#0F172A]" />
            </div>
            <span className="text-2xl font-black text-white">AddValue</span>
          </Link>
          <p className="text-white/40 text-sm mt-2.5">Sign in to your dashboard</p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8"
          style={{ boxShadow: "0 25px 50px rgba(0,0,0,0.4), 0 0 0 1px rgba(245,197,24,0.06)" }}
        >
          {clerkConfigured ? (
            // ── CLERK SIGN-IN (activate by adding real keys) ──
            // <SignIn afterSignInUrl="/dashboard" />
            <div className="text-center py-4">
              <p className="text-white font-semibold">Clerk sign-in loading...</p>
            </div>
          ) : (
            <>
              {/* Dev mode notice */}
              <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-[#F5C518]/8 border border-[#F5C518]/20 mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-[#F5C518] animate-pulse flex-shrink-0" />
                <p className="text-xs text-[#F5C518]/80">
                  <span className="font-semibold text-[#F5C518]">Dev mode</span> — any credentials will sign you in
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
                <span className="text-xs text-white/25">or continue with email</span>
                <div className="flex-1 h-px bg-white/8" />
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email */}
                <div>
                  <label className="block text-xs font-medium text-white/50 mb-1.5">Email address</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
                    <input
                      type="email"
                      id="signin-email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#F5C518]/40 focus:bg-white/8 transition-all"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-medium text-white/50">Password</label>
                    <button type="button" className="text-xs text-[#38BDF8] hover:underline">Forgot password?</button>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
                    <input
                      type={showPassword ? "text" : "password"}
                      id="signin-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#F5C518]/40 focus:bg-white/8 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/60 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  id="signin-submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl gradient-yellow text-[#0F172A] font-bold text-sm shadow-lg hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:scale-100 transition-all flex items-center justify-center gap-2 mt-2"
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-[#0F172A]/30 border-t-[#0F172A] rounded-full animate-spin" />
                  ) : (
                    <>Sign In <ArrowRight className="w-4 h-4" /></>
                  )}
                </button>

                {/* Dashboard bypass */}
                <button
                  type="button"
                  onClick={() => router.push("/dashboard")}
                  className="w-full py-2.5 rounded-xl border border-white/8 text-white/40 text-xs font-medium hover:bg-white/5 hover:text-white/60 transition-all"
                >
                  Skip → Go directly to Dashboard (dev only)
                </button>
              </form>
            </>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-white/25 mt-5">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="text-[#F5C518] hover:underline font-medium">Sign up free</Link>
        </p>
        <p className="text-center text-xs text-white/15 mt-3">
          Protected by AddValue Communications · <Link href="/" className="hover:text-white/30">Privacy Policy</Link>
        </p>
      </div>
    </div>
  );
}
