"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Send } from "lucide-react";
import { CLIENT_MESSAGES } from "@/lib/dashboard-data";
import { cn } from "@/lib/utils";

export default function MessagesPage() {
  const [selected, setSelected] = useState(CLIENT_MESSAGES[0].id);
  const [reply, setReply] = useState("");
  const selectedMsg = CLIENT_MESSAGES.find((m) => m.id === selected)!;

  return (
    <div className="p-8 h-screen flex flex-col">
      <div className="mb-6">
        <h1 className="text-3xl font-black text-white mb-1">Messages</h1>
        <p className="text-white/50">Direct communication with your project team.</p>
      </div>

      <div className="flex-1 grid grid-cols-5 gap-5 min-h-0">
        {/* Conversation list */}
        <div className="col-span-2 rounded-2xl border border-white/8 bg-white/3 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-white/8">
            <p className="text-sm font-bold text-white">Conversations</p>
          </div>
          <div className="flex-1 overflow-y-auto">
            {CLIENT_MESSAGES.map((msg, i) => (
              <motion.button
                key={msg.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => setSelected(msg.id)}
                className={cn(
                  "w-full flex items-start gap-3 p-4 border-b border-white/5 text-left transition-all",
                  selected === msg.id ? "bg-[#F5C518]/8" : "hover:bg-white/4"
                )}
              >
                <div className={cn(
                  "w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0",
                  msg.unread ? "bg-[#38BDF8] text-white" : "bg-white/10 text-white/60"
                )}>
                  {msg.avatar}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between mb-0.5">
                    <p className={cn("text-xs font-bold truncate", msg.unread ? "text-white" : "text-white/60")}>
                      {msg.from}
                    </p>
                    <span className="text-[10px] text-white/30">{msg.time}</span>
                  </div>
                  <p className="text-[11px] text-white/45 truncate">{msg.content}</p>
                  {msg.unread && (
                    <span className="inline-block mt-1 px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-[#38BDF8] text-white">New</span>
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Message view */}
        <div className="col-span-3 rounded-2xl border border-white/8 bg-white/3 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b border-white/8 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#38BDF8] flex items-center justify-center text-xs font-bold text-white">
              {selectedMsg.avatar}
            </div>
            <div>
              <p className="text-sm font-bold text-white">{selectedMsg.from}</p>
              <p className="text-xs text-white/40">{selectedMsg.role} · {selectedMsg.project}</p>
            </div>
          </div>

          {/* Message body */}
          <div className="flex-1 p-5 overflow-y-auto space-y-4">
            {/* Received message */}
            <div className="flex items-start gap-3 max-w-lg">
              <div className="w-8 h-8 rounded-full bg-[#38BDF8] flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0">
                {selectedMsg.avatar}
              </div>
              <div>
                <div className="bg-white/8 rounded-2xl rounded-tl-sm px-4 py-3">
                  <p className="text-sm text-white/80 leading-relaxed">{selectedMsg.content}</p>
                </div>
                <p className="text-[10px] text-white/30 mt-1 ml-1">{selectedMsg.time}</p>
              </div>
            </div>
            {/* Placeholder reply */}
            <div className="flex items-start gap-3 max-w-lg ml-auto flex-row-reverse">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#F5C518] to-[#38BDF8] flex items-center justify-center text-[11px] font-bold text-[#0F172A] flex-shrink-0">
                U
              </div>
              <div>
                <div className="bg-[#F5C518]/15 border border-[#F5C518]/20 rounded-2xl rounded-tr-sm px-4 py-3">
                  <p className="text-sm text-white/80">Thanks for the update! Looking forward to reviewing the creatives.</p>
                </div>
                <p className="text-[10px] text-white/30 mt-1 mr-1 text-right">1h ago</p>
              </div>
            </div>
          </div>

          {/* Reply box */}
          <div className="p-4 border-t border-white/8">
            <div className="flex items-center gap-3">
              <input
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/25 outline-none focus:border-[#F5C518]/40 transition-all"
              />
              <button
                onClick={() => setReply("")}
                className="w-10 h-10 rounded-xl gradient-yellow flex items-center justify-center flex-shrink-0 hover:scale-105 transition-all"
              >
                <Send className="w-4 h-4 text-[#0F172A]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
