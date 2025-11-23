"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  useOnboardingStore,
  selectIsComplete,
  hydrateOnboardingStore,
} from "@/stores";

export default function OnboardingPage() {
  const router = useRouter();
  const isComplete = useOnboardingStore(selectIsComplete);

  useEffect(() => {
    hydrateOnboardingStore();
  }, []);

  useEffect(() => {
    // Redirect to dashboard if onboarding is already complete
    if (isComplete) {
      router.replace("/dashboard");
    } else {
      // Redirect to the first step of onboarding
      router.replace("/onboarding/welcome");
    }
  }, [isComplete, router]);

  // Show loading while redirecting
  return (
    <div className="min-h-screen bg-surface-secondary flex items-center justify-center">
      <div className="animate-pulse text-muted-foreground">Loading...</div>
    </div>
  );
}
