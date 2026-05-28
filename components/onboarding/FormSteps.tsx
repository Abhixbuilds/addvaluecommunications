"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, ArrowLeft, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ServiceData, Subcategory } from "@/lib/services-data";

// ── Schema ─────────────────────────────────────────────────
const formSchema = z.object({
  businessName: z.string().min(2, "Business name is required"),
  industry: z.string().min(2, "Industry is required"),
  website: z.string().optional(),
  socialLinks: z.string().optional(),
  goals: z.string().min(10, "Please describe your goals (min 10 characters)"),
  budget: z.string().min(1, "Please select a budget range"),
  timeline: z.string().min(1, "Please select a timeline"),
  campaignSize: z.string().min(1, "Please select a campaign size"),
  targetAudience: z.string().min(5, "Target audience is required"),
  existingAssets: z.string().optional(),
  additionalNotes: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

// ── Field Components ──────────────────────────────────────
function FieldInput({ label, error, ...props }: { label: string; error?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="block text-sm font-medium text-white/70 mb-1.5">{label}</label>
      <input
        {...props}
        className={cn(
          "w-full px-4 py-3 rounded-xl bg-white/5 border text-white text-sm outline-none transition-all",
          "placeholder:text-white/25 focus:bg-white/8",
          error ? "border-red-500/50 focus:border-red-500" : "border-white/10 focus:border-[#F5C518]/50"
        )}
      />
      {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
    </div>
  );
}

function FieldTextarea({ label, error, ...props }: { label: string; error?: string } & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div>
      <label className="block text-sm font-medium text-white/70 mb-1.5">{label}</label>
      <textarea
        {...props}
        rows={3}
        className={cn(
          "w-full px-4 py-3 rounded-xl bg-white/5 border text-white text-sm outline-none transition-all resize-none",
          "placeholder:text-white/25 focus:bg-white/8",
          error ? "border-red-500/50 focus:border-red-500" : "border-white/10 focus:border-[#F5C518]/50"
        )}
      />
      {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
    </div>
  );
}

function FieldSelect({ label, error, options, ...props }: { label: string; error?: string; options: string[] } & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div>
      <label className="block text-sm font-medium text-white/70 mb-1.5">{label}</label>
      <select
        {...props}
        className={cn(
          "w-full px-4 py-3 rounded-xl bg-white/5 border text-white text-sm outline-none transition-all",
          error ? "border-red-500/50 focus:border-red-500" : "border-white/10 focus:border-[#F5C518]/50",
          "focus:bg-white/8 appearance-none"
        )}
      >
        <option value="" className="bg-[#0F172A]">Select an option</option>
        {options.map((o) => (
          <option key={o} value={o} className="bg-[#0F172A]">{o}</option>
        ))}
      </select>
      {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
    </div>
  );
}

// ── Main Component ────────────────────────────────────────
interface Props {
  service: ServiceData;
  subcategory: Subcategory;
  currentStep: number;
  onStepChange: (step: number) => void;
}

const BUDGET_OPTIONS = [
  "Under ₹10,000",
  "₹10,000 – ₹25,000",
  "₹25,000 – ₹50,000",
  "₹50,000 – ₹1,00,000",
  "₹1,00,000 – ₹5,00,000",
  "₹5,00,000+",
];

const TIMELINE_OPTIONS = [
  "ASAP (within 1 week)",
  "2–4 weeks",
  "1–2 months",
  "3–6 months",
  "6+ months",
  "Ongoing / Retainer",
];

const CAMPAIGN_SIZE_OPTIONS = [
  "Solo / Freelancer",
  "Small Business (1–10 employees)",
  "Mid-size Business (11–50 employees)",
  "Growing Business (51–200 employees)",
  "Large Enterprise (200+ employees)",
];

const STEPS_META = [
  { title: "Business Information", subtitle: "Tell us about your business" },
  { title: "Service Details", subtitle: "Your goals for this service" },
  { title: "Budget & Timeline", subtitle: "Plan your investment" },
  { title: "Additional Context", subtitle: "Help us understand better" },
  { title: "Review & Submit", subtitle: "Confirm your details" },
];

const slideVariants = {
  enter: (direction: number) => ({ x: direction > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction > 0 ? -60 : 60, opacity: 0 }),
};

export default function FormSteps({ service, subcategory, currentStep, onStepChange }: Props) {
  const [step, setStep] = useState(currentStep);
  const [direction, setDirection] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const setStepSynced = (newStep: number) => {
    setStep(newStep);
    onStepChange(newStep);
  };

  const { register, handleSubmit, formState: { errors }, getValues, trigger } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { budget: "", timeline: "", campaignSize: "" },
  });

  const goNext = async () => {
    const fieldsPerStep: (keyof FormData)[][] = [
      ["businessName", "industry"],
      ["goals"],
      ["budget", "timeline", "campaignSize"],
      ["targetAudience"],
      [],
    ];
    const valid = await trigger(fieldsPerStep[step - 1]);
    if (!valid) return;
    setDirection(1);
    setStepSynced(Math.min(step + 1, 5));
  };

  const goPrev = () => {
    setDirection(-1);
    setStepSynced(Math.max(step - 1, 1));
  };

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    // Store in session for recommendation page
    sessionStorage.setItem("onboarding-data", JSON.stringify({
      ...data,
      service: service.id,
      serviceLabel: service.label,
      subcategory: subcategory.id,
      subcategoryLabel: subcategory.label,
    }));
    router.push("/recommendation");
  };

  const values = getValues();
  const stepMeta = STEPS_META[step - 1];

  return (
    <div>
      {/* Step header */}
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-black text-white mb-1">{stepMeta.title}</h2>
        <p className="text-sm text-white/50">{stepMeta.subtitle}</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="space-y-5"
          >
            {/* STEP 1 */}
            {step === 1 && (
              <>
                <div className="grid sm:grid-cols-2 gap-5">
                  <FieldInput
                    label="Business Name *"
                    placeholder="e.g. FreshCart India"
                    error={errors.businessName?.message}
                    {...register("businessName")}
                  />
                  <FieldInput
                    label="Industry *"
                    placeholder="e.g. E-Commerce, Healthcare"
                    error={errors.industry?.message}
                    {...register("industry")}
                  />
                </div>
                <FieldInput
                  label="Website (optional)"
                  placeholder="https://yourwebsite.com"
                  {...register("website")}
                />
                <FieldInput
                  label="Social Media Links (optional)"
                  placeholder="Instagram, LinkedIn, Facebook URLs"
                  {...register("socialLinks")}
                />
              </>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <>
                <div className="p-4 rounded-xl border border-white/8 bg-white/3">
                  <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Selected Service</p>
                  <p className="font-bold text-white">{service.label} → {subcategory.label}</p>
                </div>
                <FieldTextarea
                  label="What are your primary goals? *"
                  placeholder="e.g. I want to increase brand awareness, generate 500 leads per month, and improve my social media presence by Q3..."
                  error={errors.goals?.message}
                  {...register("goals")}
                />
                <FieldInput
                  label="Expected Results"
                  placeholder="e.g. 3x ROAS, 50% more organic traffic, 100 new clients"
                  {...register("existingAssets")}
                />
              </>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <>
                <FieldSelect
                  label="Budget Range *"
                  options={BUDGET_OPTIONS}
                  error={errors.budget?.message}
                  {...register("budget")}
                />
                <FieldSelect
                  label="Project Timeline *"
                  options={TIMELINE_OPTIONS}
                  error={errors.timeline?.message}
                  {...register("timeline")}
                />
                <FieldSelect
                  label="Business Scale *"
                  options={CAMPAIGN_SIZE_OPTIONS}
                  error={errors.campaignSize?.message}
                  {...register("campaignSize")}
                />
              </>
            )}

            {/* STEP 4 */}
            {step === 4 && (
              <>
                <FieldTextarea
                  label="Target Audience *"
                  placeholder="e.g. Urban women aged 25–40, interested in fitness and wellness, located in metro cities..."
                  error={errors.targetAudience?.message}
                  {...register("targetAudience")}
                />
                <FieldTextarea
                  label="Existing Assets / Resources (optional)"
                  placeholder="e.g. We have a brand style guide, existing ad creatives, and a product catalogue..."
                  {...register("additionalNotes")}
                />
              </>
            )}

            {/* STEP 5 — Review */}
            {step === 5 && (
              <div className="space-y-3">
                {[
                  { label: "Business", value: `${values.businessName} · ${values.industry}` },
                  { label: "Service", value: `${service.label} → ${subcategory.label}` },
                  { label: "Goals", value: values.goals },
                  { label: "Budget", value: values.budget },
                  { label: "Timeline", value: values.timeline },
                  { label: "Scale", value: values.campaignSize },
                  { label: "Audience", value: values.targetAudience },
                ].map(({ label, value }) => value && (
                  <div key={label} className="flex gap-4 p-4 rounded-xl bg-white/3 border border-white/8">
                    <span className="text-xs font-semibold text-white/40 uppercase tracking-wider w-20 flex-shrink-0 mt-0.5">{label}</span>
                    <span className="text-sm text-white/80">{value}</span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/8">
          <button
            type="button"
            onClick={goPrev}
            disabled={step === 1}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/15 text-white/60 text-sm font-medium hover:bg-white/8 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          {step < 5 ? (
            <button
              type="button"
              onClick={goNext}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl gradient-yellow text-[#0F172A] text-sm font-bold hover:scale-105 transition-all"
              style={{ background: service.color }}
            >
              Next Step
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={submitting}
              className="flex items-center gap-2 px-8 py-3 rounded-xl text-[#0F172A] text-sm font-bold hover:scale-105 transition-all disabled:opacity-70"
              style={{ background: service.color }}
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Generating Strategy...
                </>
              ) : (
                <>
                  Get My Strategy
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
