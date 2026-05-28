"use client";

import { useState } from "react";
import StepIndicator from "@/components/onboarding/StepIndicator";
import FormSteps from "@/components/onboarding/FormSteps";
import type { ServiceData, Subcategory } from "@/lib/services-data";

interface Props {
  service: ServiceData;
  subcategory: Subcategory;
}

export default function OnboardingClient({ service, subcategory }: Props) {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div>
      <StepIndicator currentStep={currentStep} />
      <div
        className="rounded-2xl border border-white/10 p-6 sm:p-8"
        style={{ background: "rgba(15,23,42,0.6)", backdropFilter: "blur(20px)" }}
      >
        <FormSteps
          service={service}
          subcategory={subcategory}
          currentStep={currentStep}
          onStepChange={setCurrentStep}
        />
      </div>
    </div>
  );
}
