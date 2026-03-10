"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import { useOnboardingStore, selectIsComplete } from "@yoyo/store";

export default function AppRootLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const isComplete = useOnboardingStore(selectIsComplete);

  React.useEffect(() => {
    if (!isComplete) {
      router.replace('/onboarding');
    }
  }, [isComplete, router]);

  return <>{children}</>;
}
