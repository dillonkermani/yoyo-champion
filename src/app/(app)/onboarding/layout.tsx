"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  useOnboardingStore,
  selectIsComplete,
  hydrateOnboardingStore,
} from "@/stores";

// Step configuration for URL-based navigation
const ONBOARDING_STEPS = [
  { path: "/onboarding/welcome", label: "Welcome" },
  { path: "/onboarding/skill-level", label: "Skill Level" },
  { path: "/onboarding/goals", label: "Goals" },
  { path: "/onboarding/styles", label: "Styles" },
  { path: "/onboarding/recommendation", label: "Recommendation" },
] as const;

// Progress indicator showing step dots
function StepIndicator({ currentIndex }: { currentIndex: number }) {
  const displaySteps = ONBOARDING_STEPS.length;

  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: displaySteps }).map((_, index) => (
        <motion.div
          key={index}
          className={cn(
            "h-2 rounded-full transition-all duration-300",
            index === currentIndex
              ? "w-8 bg-xp"
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

interface OnboardingLayoutProps {
  children: React.ReactNode;
}

export default function OnboardingLayout({ children }: OnboardingLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isHydrated, setIsHydrated] = React.useState(false);
  const isComplete = useOnboardingStore(selectIsComplete);
  const skipOnboarding = useOnboardingStore((state) => state.skipOnboarding);

  // Hydrate store on mount
  React.useEffect(() => {
    hydrateOnboardingStore();
    setIsHydrated(true);
  }, []);

  // Redirect if onboarding is complete
  React.useEffect(() => {
    if (isHydrated && isComplete) {
      router.replace("/dashboard");
    }
  }, [isHydrated, isComplete, router]);

  // Find current step index based on pathname
  const currentIndex = React.useMemo(() => {
    const index = ONBOARDING_STEPS.findIndex((step) => step.path === pathname);
    return index >= 0 ? index : 0;
  }, [pathname]);

  // Check if we should show skip button (not on recommendation page)
  const showSkip = pathname !== "/onboarding/recommendation";

  const handleSkip = React.useCallback(() => {
    skipOnboarding();
    router.push("/dashboard");
  }, [skipOnboarding, router]);

  // Show loading state while hydrating
  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-surface-secondary flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  // Don't render if already complete
  if (isComplete) {
    return null;
  }

  return (
    <div className="min-h-screen bg-surface-secondary">
      <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8">
        <div className="w-full max-w-lg mx-auto">
          {/* Skip button */}
          {showSkip && (
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
            <StepIndicator currentIndex={currentIndex} />
          </motion.div>

          {/* Step content with animation */}
          <div className="relative overflow-hidden min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={pathname}
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="w-full"
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

