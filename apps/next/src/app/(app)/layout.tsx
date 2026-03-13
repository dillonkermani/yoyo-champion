"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import { useOnboardingStore, selectIsComplete, useUserStore, selectIsAuthenticated } from "@yoyo/store";

export default function AppRootLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const isAuthenticated = useUserStore(selectIsAuthenticated);
  const isOnboardingComplete = useOnboardingStore(selectIsComplete);

  React.useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/login');
    } else if (!isOnboardingComplete) {
      router.replace('/onboarding');
    }
  }, [isAuthenticated, isOnboardingComplete, router]);

  return <>{children}</>;
}
