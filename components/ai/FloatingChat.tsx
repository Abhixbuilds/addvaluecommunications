"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare, X, Send, Sparkles, Loader2, ChevronDown,
  Minimize2, ExternalLink
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  time: string;
}

const QUICK_ACTIONS = [
  "What services do you offer?",
  "How much does it cost?",
  "Book a free consultation",
  "Help me choose a service",
];

function formatContent(text: string) {
  // Convert markdown-lite to JSX
  const lines = text.split("\n");
  return lines.map((line, i) => {
    if (line.startsWith("## ")) return <h3 key={i} className="text-sm font-bold text-white mt-2 mb-1">{line.slice(3)}</h3>;
    if (line.startsWith("**") && line.endsWith("**")) return <p key={i} className="text-sm font-bold text-white">{line.slice(2, -2)}</p>;
    if (line.startsWith("- ") || line.startsWith("• ")) return <p key={i} className="text-xs text-white/70 flex gap-1.5"><span className="text-[#F5C518] flex-shrink-0">•</span>{line.slice(2)}</p>;
    if (line.startsWith("➡️ ")) {
      const match = line.match(/\[(.+?)\]\((.+?)\)/);
      if (match) return <Link key={i} href={match[2]} className="flex items-center gap-1.5 text-xs text-[#38BDF8] hover:underline mt-1"><ExternalLink className="w-3 h-3" />{match[1]}</Link>;
    }
    if (line.includes("[") && line.includes("](")) {
      const match = line.match(/\[(.+?)\]\((.+?)\)/);
      if (match) {
        const before = line.slice(0, line.indexOf("["));
        return <p key={i} className="text-xs text-white/70">{before}<Link href={match[2]} className="text-[#38BDF8] hover:underline">{match[1]}</Link></p>;
      }
    }
    if (line.includes("**")) {
      const parts = line.split(/\*\*(.*?)\*\*/g);
      return (
        <p key={i} className="text-xs text-white/70 leading-relaxed">
          {parts.map((part, j) => j % 2 === 1 ? <strong key={j} className="text-white font-semibold">{part}</strong> : part)}
        </p>
      );
    }
    if (line.trim() === "") return <div key={i} className="h-1" />;
    if (line.startsWith("| ")) return <p key={i} className="text-xs text-white/50 font-mono">{line}</p>;
    if (line.match(/^\d+\./)) return <p key={i} className="text-xs text-white/70 flex gap-1.5"><span className="text-[#F5C518] font-bold flex-shrink-0">{line.match(/^\d+/)?.[0]}.</span>{line.replace(/^\d+\./, "").trim()}</p>;
    return <p key={i} className="text-xs text-white/70 leading-relaxed">{line}</p>;
  });
}

const INITIAL_MESSAGE: Message = {
  id: "welcome",
  role: "assistant",
  content: "Hi! 👋 I'm your **AddValue AI Assistant**.\n\nI can help you:\n- 🎯 Choose the right service for your business\n- 💰 Estimate budgets and ROI\n- 📊 Build a growth strategy\n- 📅 Book a consultation with our experts\n\nWhat business challenge can I help you solve today?",
  time: "now",
};

export default function FloatingChat() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [unread, setUnread] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setUnread(0);
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [open]);

  useEffect(() => {
    if (open && !minimized) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open, minimized]);

  const sendMessage = async (text?: string) => {
    const content = text ?? input.trim();
    if (!content || loading) return;
    setInput("");

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      time: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const apiMessages = [...messages, userMsg]
        .filter((m) => m.id !== "welcome")
        .map((m) => ({ role: m.role, content: m.content }));

      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages }),
      });
      const { data } = await res.json();

      const assistantMsg: Message = {
        id: Date.now().toString() + "_ai",
        role: "assistant",
        content: data?.content ?? "I'm having trouble responding right now. Please try again.",
        time: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
      if (!open) setUnread((n) => n + 1);
    } catch {
      setMessages((prev) => [...prev, {
        id: Date.now().toString() + "_err",
        role: "assistant",
        content: "Oops — something went wrong. Please try again or [contact us directly](/book-consultation).",
        time: "now",
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: minimized ? 0 : 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[340px] sm:w-[380px] rounded-2xl border border-white/15 shadow-2xl overflow-hidden"
            style={{ background: "rgba(10,18,32,0.97)", backdropFilter: "blur(24px)" }}
          >
            {/* Header */}
            <div className="gradient-brand p-[1px] rounded-t-2xl">
              <div className="bg-[#0A1220] rounded-t-2xl px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg gradient-brand flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-4 h-4 text-[#0F172A]" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">AddValue AI</p>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#34D399] animate-pulse" />
                      <p className="text-[10px] text-white/50">Business Consultant</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => setMinimized((m) => !m)} className="w-7 h-7 rounded-lg hover:bg-white/10 flex items-center justify-center transition-all">
                    <Minimize2 className="w-3.5 h-3.5 text-white/50" />
                  </button>
                  <button onClick={() => setOpen(false)} className="w-7 h-7 rounded-lg hover:bg-white/10 flex items-center justify-center transition-all">
                    <X className="w-3.5 h-3.5 text-white/50" />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="h-80 overflow-y-auto px-4 py-3 space-y-3 scrollbar-thin">
              {messages.map((msg) => (
                <div key={msg.id} className={cn("flex gap-2", msg.role === "user" ? "flex-row-reverse" : "flex-row")}>
                  {msg.role === "assistant" && (
                    <div className="w-6 h-6 rounded-full gradient-brand flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Sparkles className="w-3 h-3 text-[#0F172A]" />
                    </div>
                  )}
                  <div className={cn(
                    "max-w-[85%] rounded-2xl px-3 py-2.5 space-y-0.5",
                    msg.role === "user"
                      ? "bg-[#F5C518]/20 border border-[#F5C518]/20 rounded-tr-sm"
                      : "bg-white/6 border border-white/8 rounded-tl-sm"
                  )}>
                    {msg.role === "assistant" ? formatContent(msg.content) : (
                      <p className="text-xs text-white/85">{msg.content}</p>
                    )}
                    <p className="text-[9px] text-white/25 text-right pt-0.5">{msg.time}</p>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex gap-2">
                  <div className="w-6 h-6 rounded-full gradient-brand flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-3 h-3 text-[#0F172A]" />
                  </div>
                  <div className="bg-white/6 border border-white/8 rounded-2xl rounded-tl-sm px-3 py-2.5">
                    <div className="flex items-center gap-1">
                      {[0, 0.2, 0.4].map((d, i) => (
                        <motion.span key={i} className="w-1.5 h-1.5 rounded-full bg-[#F5C518]"
                          animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: d }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Quick Actions */}
            {messages.length <= 2 && (
              <div className="px-4 pb-3 flex gap-2 flex-wrap">
                {QUICK_ACTIONS.map((action) => (
                  <button key={action} onClick={() => sendMessage(action)}
                    className="text-[10px] px-2.5 py-1 rounded-full border border-white/10 text-white/55 hover:bg-white/8 hover:text-white transition-all"
                  >
                    {action}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="px-3 pb-3">
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2 focus-within:border-[#F5C518]/40 transition-all">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-transparent text-xs text-white placeholder:text-white/25 outline-none"
                />
                <button
                  onClick={() => sendMessage()}
                  disabled={!input.trim() || loading}
                  className="w-7 h-7 rounded-lg gradient-yellow flex items-center justify-center flex-shrink-0 disabled:opacity-40 hover:scale-110 transition-all"
                >
                  {loading ? <Loader2 className="w-3.5 h-3.5 text-[#0F172A] animate-spin" /> : <Send className="w-3.5 h-3.5 text-[#0F172A]" />}
                </button>
              </div>
              <p className="text-center text-[9px] text-white/20 mt-1.5">Powered by AddValue AI · GPT-4o</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB Button */}
      <button
        id="ai-chat-fab"
        onClick={() => { setOpen((o) => !o); setMinimized(false); }}
        className="fixed bottom-5 right-4 sm:right-6 z-50 w-14 h-14 rounded-2xl gradient-brand shadow-2xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center"
        style={{ boxShadow: "0 0 30px rgba(245,197,24,0.3), 0 0 60px rgba(56,189,248,0.15)" }}
        aria-label="Open AI Assistant"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <ChevronDown className="w-6 h-6 text-[#0F172A]" />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} className="relative">
              <Sparkles className="w-6 h-6 text-[#0F172A]" />
              {unread > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center">
                  {unread}
                </span>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </>
  );
}
