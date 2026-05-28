"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle, X, Send, Sparkles, Minimize2, Loader2, ExternalLink
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const WELCOME_MESSAGE: Message = {
  id: "welcome",
  role: "assistant",
  content: "👋 Hi! I'm your **AddValue AI Assistant**.\n\nI can help you:\n- 🎯 Choose the right service for your business\n- 💰 Estimate budgets and ROI\n- 📊 Build a growth strategy\n- 📅 Book a consultation\n\nWhat business challenge can I help you solve today?",
};

const QUICK_PROMPTS = [
  "Which service do I need?",
  "Estimate my ad budget",
  "Best marketing strategy?",
  "How do I book a consultation?",
];

// Lightweight markdown renderer
function RenderContent({ text }: { text: string }) {
  const lines = text.split("\n");
  return (
    <div className="space-y-0.5">
      {lines.map((line, i) => {
        if (!line.trim()) return <div key={i} className="h-1" />;
        if (line.startsWith("- ") || line.startsWith("• ")) {
          return (
            <div key={i} className="flex items-start gap-1.5">
              <span className="text-[#F5C518] text-[10px] mt-0.5 flex-shrink-0">•</span>
              <span className="text-xs text-white/75 leading-relaxed">{renderInline(line.slice(2))}</span>
            </div>
          );
        }
        if (line.match(/^\d+\./)) {
          const num = line.match(/^\d+/)?.[0];
          return (
            <div key={i} className="flex items-start gap-1.5">
              <span className="text-[#38BDF8] text-[10px] font-bold mt-0.5 flex-shrink-0">{num}.</span>
              <span className="text-xs text-white/75 leading-relaxed">{renderInline(line.replace(/^\d+\./, "").trim())}</span>
            </div>
          );
        }
        // Link lines starting with ➡️
        const linkMatch = line.match(/\[(.+?)\]\((.+?)\)/);
        if (linkMatch) {
          const before = line.slice(0, line.indexOf("[")).replace("➡️", "").trim();
          return (
            <div key={i} className="flex items-center gap-1.5 mt-1">
              {before && <span className="text-xs text-white/50">{before}</span>}
              <Link href={linkMatch[2]} className="flex items-center gap-1 text-xs text-[#38BDF8] hover:underline font-medium">
                <ExternalLink className="w-2.5 h-2.5" />{linkMatch[1]}
              </Link>
            </div>
          );
        }
        return (
          <p key={i} className="text-xs text-white/80 leading-relaxed">
            {renderInline(line)}
          </p>
        );
      })}
    </div>
  );
}

function renderInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) =>
    part.startsWith("**") && part.endsWith("**")
      ? <strong key={i} className="text-white font-semibold">{part.slice(2, -2)}</strong>
      : part
  );
}

export default function FloatingAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [unread, setUnread] = useState(0);
  const [mounted, setMounted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (isOpen) {
      setUnread(0);
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isMinimized]);

  const handleSend = async (text?: string) => {
    const messageText = text ?? input.trim();
    if (!messageText || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageText,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const apiMessages = [...messages, userMessage]
        .filter((m) => m.id !== "welcome")
        .map((m) => ({ role: m.role, content: m.content }));

      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages }),
      });

      const { data } = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString() + "_ai",
          role: "assistant",
          content: data?.content ?? "I'm having trouble responding. Please try again.",
        },
      ]);
      if (!isOpen) setUnread((n) => n + 1);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString() + "_err",
          role: "assistant",
          content: "I'm having trouble connecting right now. Please [contact our team](/book-consultation) directly.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Don't render on server — this widget is entirely client-side interactive
  if (!mounted) return null;

  return (
    <>
      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="ai-assistant-panel"
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={
              isMinimized
                ? { opacity: 1, scale: 1, y: 0, height: "56px" }
                : { opacity: 1, scale: 1, y: 0, height: "520px" }
            }
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={cn(
              "fixed bottom-24 right-6 z-50 w-[360px] rounded-2xl overflow-hidden",
              "border border-white/12 shadow-2xl",
              "bg-[#0A1220]/97 backdrop-blur-xl",
              "flex flex-col"
            )}
            style={{
              boxShadow:
                "0 25px 50px -12px rgba(0,0,0,0.6), 0 0 0 1px rgba(245,197,24,0.12), 0 0 50px rgba(56,189,248,0.06)",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/8 bg-gradient-to-r from-[#F5C518]/8 to-[#38BDF8]/8">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-9 h-9 rounded-xl gradient-brand flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-[#0F172A]" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-[#34D399] rounded-full border-2 border-[#0A1220] animate-pulse" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">AddValue AI</p>
                  <p className="text-[10px] text-white/45">Business Consultant · Online</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsMinimized((v) => !v)}
                  className="p-1.5 rounded-lg hover:bg-white/10 text-white/40 hover:text-white transition-all"
                  aria-label="Minimize"
                >
                  <Minimize2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-white/10 text-white/40 hover:text-white transition-all"
                  aria-label="Close"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className={cn("flex gap-2", msg.role === "user" ? "flex-row-reverse" : "flex-row")}
                    >
                      {msg.role === "assistant" && (
                        <div className="w-7 h-7 rounded-xl gradient-brand flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Sparkles className="w-3.5 h-3.5 text-[#0F172A]" />
                        </div>
                      )}
                      <div
                        className={cn(
                          "max-w-[82%] rounded-2xl px-3 py-2.5",
                          msg.role === "user"
                            ? "bg-[#F5C518]/20 border border-[#F5C518]/25 rounded-tr-sm"
                            : "bg-white/6 border border-white/8 rounded-tl-sm"
                        )}
                      >
                        {msg.role === "assistant" ? (
                          <RenderContent text={msg.content} />
                        ) : (
                          <p className="text-xs text-white/90 leading-relaxed">{msg.content}</p>
                        )}
                      </div>
                    </motion.div>
                  ))}

                  {/* Typing indicator */}
                  {isLoading && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2">
                      <div className="w-7 h-7 rounded-xl gradient-brand flex items-center justify-center flex-shrink-0">
                        <Sparkles className="w-3.5 h-3.5 text-[#0F172A]" />
                      </div>
                      <div className="bg-white/6 border border-white/8 rounded-2xl rounded-tl-sm px-3 py-2.5">
                        <div className="flex items-center gap-1">
                          {[0, 0.2, 0.4].map((d, i) => (
                            <motion.span
                              key={i}
                              className="w-1.5 h-1.5 rounded-full bg-[#F5C518]"
                              animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                              transition={{ repeat: Infinity, duration: 0.9, delay: d }}
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Prompts */}
                {messages.length <= 1 && (
                  <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                    {QUICK_PROMPTS.map((prompt) => (
                      <button
                        key={prompt}
                        onClick={() => handleSend(prompt)}
                        className="text-[10px] px-2.5 py-1 rounded-full border border-[#38BDF8]/25 text-[#38BDF8]/80 hover:bg-[#38BDF8]/10 hover:text-[#38BDF8] transition-all"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                )}

                {/* Input */}
                <div className="p-3 border-t border-white/8">
                  <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2 focus-within:border-[#F5C518]/40 transition-all">
                    <input
                      ref={inputRef}
                      id="ai-chat-input"
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSend();
                        }
                      }}
                      placeholder="Ask about our services..."
                      className="flex-1 bg-transparent text-xs text-white placeholder:text-white/25 outline-none"
                    />
                    <button
                      onClick={() => handleSend()}
                      disabled={!input.trim() || isLoading}
                      className="w-7 h-7 rounded-lg gradient-yellow flex items-center justify-center flex-shrink-0 disabled:opacity-30 hover:scale-110 transition-all"
                      aria-label="Send message"
                    >
                      {isLoading
                        ? <Loader2 className="w-3.5 h-3.5 text-[#0F172A] animate-spin" />
                        : <Send className="w-3.5 h-3.5 text-[#0F172A]" />
                      }
                    </button>
                  </div>
                  <p className="text-center text-[9px] text-white/20 mt-1.5">
                    Powered by AddValue AI · GPT-4o
                  </p>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB Trigger */}
      <motion.button
        id="ai-assistant-trigger"
        onClick={() => { setIsOpen((v) => !v); setIsMinimized(false); }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-2xl gradient-brand flex items-center justify-center shadow-xl focus:outline-none"
        style={{ boxShadow: "0 0 30px rgba(245,197,24,0.3), 0 0 60px rgba(56,189,248,0.12)" }}
        aria-label="Open AI Assistant"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X className="w-6 h-6 text-[#0F172A]" />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }} className="relative">
              <MessageCircle className="w-6 h-6 text-[#0F172A]" />
              {unread > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center">
                  {unread}
                </span>
              )}
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#38BDF8] rounded-full flex items-center justify-center">
                <Sparkles className="w-1.5 h-1.5 text-white" />
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Pulse ring */}
      {!isOpen && (
        <span className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-2xl gradient-brand opacity-25 animate-ping pointer-events-none" />
      )}
    </>
  );
}
