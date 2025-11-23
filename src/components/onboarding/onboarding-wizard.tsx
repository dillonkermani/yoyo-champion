"use client";

import { useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  useOnboardingStore,
  selectCurrentStep,
  selectCanProceed,
  selectIsFirstStep,
  selectStepProgress,
  STEP_ORDER,
  type OnboardingStep,
} from "@/stores";
import { WelcomeStep } from "./steps/welcome-step";
import { SkillLevelStep } from "./steps/skill-level-step";
import { GoalsStep } from "./steps/goals-step";
import { StyleStep } from "./steps/style-step";
import { RecommendationStep } from "./steps/recommendation-step";

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
  }),
};

interface StepConfig {
  component: React.ComponentType;
  showNavigation: boolean;
  showSkip: boolean;
}

const STEP_COMPONENTS: Record<OnboardingStep, StepConfig> = {
  welcome: {
    component: WelcomeStep,
    showNavigation: false,
    showSkip: true,
  },
  skill_level: {
    component: SkillLevelStep,
    showNavigation: true,
    showSkip: true,
  },
  goals: {
    component: GoalsStep,
    showNavigation: true,
    showSkip: true,
  },
  preferred_styles: {
    component: StyleStep,
    showNavigation: true,
    showSkip: true,
  },
  recommended_path: {
    component: RecommendationStep,
    showNavigation: false,
    showSkip: false,
  },
  complete: {
    component: () => null,
    showNavigation: false,
    showSkip: false,
  },
};

// Progress indicator showing step dots
function StepIndicator({
  currentIndex,
  totalSteps,
}: {
  currentIndex: number;
  totalSteps: number;
}) {
  // Filter out 'complete' step from display
  const displaySteps = totalSteps - 1;

  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: displaySteps }).map((_, index) => (
        <motion.div
          key={index}
          className={cn(
            "h-2 rounded-full transition-all duration-300",
            index === currentIndex
              ? "w-8 bg-brand-teal"
              : index < currentIndex
              ? "w-2 bg-brand-blue"
              : "w-2 bg-gray-300"
          )}
          initial={false}
          animate={{
            scale: index === currentIndex ? 1.1 : 1,
          }}
          transition={{ duration: 0.2 }}
        />
      ))}
    </div>
  );
}

export function OnboardingWizard() {
  const router = useRouter();
  const currentStep = useOnboardingStore(selectCurrentStep);
  const canProceed = useOnboardingStore(selectCanProceed);
  const isFirstStep = useOnboardingStore(selectIsFirstStep);
  const { total } = useOnboardingStore(selectStepProgress);

  const nextStep = useOnboardingStore((state) => state.nextStep);
  const prevStep = useOnboardingStore((state) => state.prevStep);
  const skipOnboarding = useOnboardingStore((state) => state.skipOnboarding);

  const currentIndex = STEP_ORDER.indexOf(currentStep);
  const stepConfig = STEP_COMPONENTS[currentStep];
  const StepComponent = stepConfig.component;

  // Track direction for animation
  const direction = useMemo(() => {
    return 1; // Default forward
  }, []);

  const handleNext = useCallback(() => {
    if (canProceed) {
      nextStep();
    }
  }, [canProceed, nextStep]);

  const handleBack = useCallback(() => {
    prevStep();
  }, [prevStep]);

  const handleSkip = useCallback(() => {
    skipOnboarding();
    router.push("/dashboard");
  }, [skipOnboarding, router]);

  // Don't render if on complete step
  if (currentStep === "complete") {
    router.push("/dashboard");
    return null;
  }

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Skip button */}
      {stepConfig.showSkip && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-end mb-4"
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSkip}
            className="text-muted-foreground hover:text-brand-black"
          >
            Skip
            <X className="ml-1 h-4 w-4" />
          </Button>
        </motion.div>
      )}

      {/* Progress indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <StepIndicator currentIndex={currentIndex} totalSteps={total} />
      </motion.div>

      {/* Step content */}
      <div className="relative overflow-hidden min-h-[400px]">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="w-full"
          >
            <StepComponent />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation buttons */}
      {stepConfig.showNavigation && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-between mt-8"
        >
          <Button
            variant="ghost"
            onClick={handleBack}
            disabled={isFirstStep}
            className={cn(isFirstStep && "invisible")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <Button
            variant="brand"
            onClick={handleNext}
            disabled={!canProceed}
            size="lg"
          >
            Continue
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      )}
    </div>
  );
}
