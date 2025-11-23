"use client";

import * as React from "react";
import { useRouter, usePathname } from "next/navigation";
import { AppLayout } from "@/components/layout";
import { useOnboardingStore, selectIsComplete } from "@/stores";
import { hydrateAllStores } from "@/stores";

// Loading skeleton component
function AppLayoutSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header skeleton */}
      <div className="h-16 bg-white border-b border-gray-200 animate-pulse" />

      <div className="flex">
        {/* Sidebar skeleton - desktop only */}
        <div className="hidden lg:block w-64 bg-white border-r border-gray-200 h-[calc(100vh-4rem)] animate-pulse" />

        {/* Content skeleton */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
            <div className="h-64 bg-gray-200 rounded animate-pulse" />
          </div>
        </main>
      </div>
    </div>
  );
}

interface AppRootLayoutProps {
  children: React.ReactNode;
}

export default function AppRootLayout({ children }: AppRootLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isHydrated, setIsHydrated] = React.useState(false);
  const [isChecking, setIsChecking] = React.useState(true);

  // Get onboarding completion status
  const isOnboardingComplete = useOnboardingStore(selectIsComplete);

  // Check if current path is an onboarding route
  const isOnboardingRoute = React.useMemo(() => {
    return pathname?.startsWith("/onboarding");
  }, [pathname]);

  // Hydrate all stores on mount
  React.useEffect(() => {
    hydrateAllStores();

    // Mark as hydrated after a tick to ensure store updates
    const timer = setTimeout(() => {
      setIsHydrated(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  // Check onboarding status after hydration
  React.useEffect(() => {
    if (!isHydrated) return;

    // If on any onboarding route, skip redirect logic and let onboarding layout handle it
    if (isOnboardingRoute) {
      setIsChecking(false);
      return;
    }

    // Redirect to onboarding if not complete and not on onboarding pages
    if (!isOnboardingComplete) {
      router.replace("/onboarding/welcome");
      return;
    }

    setIsChecking(false);
  }, [isHydrated, isOnboardingComplete, isOnboardingRoute, router]);

  // Show loading skeleton while checking onboarding status
  // But not for onboarding routes - they handle their own loading state
  if (!isHydrated || (isChecking && !isOnboardingRoute)) {
    return <AppLayoutSkeleton />;
  }

  // For onboarding routes, render children directly (onboarding has its own layout)
  if (isOnboardingRoute) {
    return <>{children}</>;
  }

  // Render the app layout with children for non-onboarding routes
  return (
    <AppLayout showSidebar={true} showMobileNav={true}>
      {children}
    </AppLayout>
  );
}
