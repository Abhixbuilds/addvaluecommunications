"use client";

import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
  { id: 1, label: "Business Info" },
  { id: 2, label: "Service Details" },
  { id: 3, label: "Budget & Timeline" },
  { id: 4, label: "Context" },
  { id: 5, label: "Review" },
];

interface Props {
  currentStep: number;
}

export default function StepIndicator({ currentStep }: Props) {
  return (
    <div className="flex items-center justify-center gap-0 w-full max-w-2xl mx-auto mb-10">
      {STEPS.map((step, i) => {
        const isCompleted = currentStep > step.id;
        const isActive = currentStep === step.id;
        return (
          <div key={step.id} className="flex items-center flex-1">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={cn(
                  "w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-300",
                  isCompleted
                    ? "bg-[#F5C518] border-[#F5C518] text-[#0F172A]"
                    : isActive
                    ? "bg-[#F5C518]/20 border-[#F5C518] text-[#F5C518]"
                    : "bg-white/5 border-white/15 text-white/30"
                )}
              >
                {isCompleted ? <CheckCircle2 className="w-4.5 h-4.5" /> : step.id}
              </div>
              <span
                className={cn(
                  "text-[10px] font-medium whitespace-nowrap hidden sm:block",
                  isActive ? "text-[#F5C518]" : isCompleted ? "text-white/60" : "text-white/25"
                )}
              >
                {step.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={cn(
                  "flex-1 h-0.5 mx-2 mt-[-18px] transition-all duration-500",
                  currentStep > step.id ? "bg-[#F5C518]" : "bg-white/10"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
