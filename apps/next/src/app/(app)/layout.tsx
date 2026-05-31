"use client";
import * as React from "react";
import { useRouter, usePathname } from "next/navigation";
import { useOnboardingStore, selectIsComplete, useUserStore, selectIsAuthenticated } from "@yoyo/store";
import { WebTabBar } from "@/components/web-tab-bar";

export default function AppRootLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const isAuthenticated = useUserStore(selectIsAuthenticated);
  const isOnboardingComplete = useOnboardingStore(selectIsComplete);
  const isOnboarding = pathname?.startsWith('/onboarding') ?? false;
  const [hydrated, setHydrated] = React.useState(
    () => useUserStore.persist.hasHydrated() && useOnboardingStore.persist.hasHydrated(),
  );

  React.useEffect(() => {
    const check = () => {
      if (useUserStore.persist.hasHydrated() && useOnboardingStore.persist.hasHydrated()) {
        setHydrated(true);
      }
    };
    const unsubU = useUserStore.persist.onFinishHydration(check);
    const unsubO = useOnboardingStore.persist.onFinishHydration(check);
    check();
    return () => { unsubU(); unsubO(); };
  }, []);

  React.useEffect(() => {
    if (!hydrated) return;
    if (!isAuthenticated || !isOnboardingComplete) {
      if (!isOnboarding) router.replace('/onboarding');
    }
  }, [hydrated, isAuthenticated, isOnboardingComplete, isOnboarding, router]);

  // Prefetch all tab routes so first navigation is instant
  React.useEffect(() => {
    ['/dashboard', '/library', '/shop', '/profile', '/for-you'].forEach((path) => {
      router.prefetch(path);
    });
  }, [router]);

  return (
    <div className="min-h-screen w-full bg-[#F7F8FA] flex flex-col items-center">
      <div
        className="w-full max-w-[640px] flex flex-col"
        style={{ paddingBottom: isOnboarding ? 0 : 96 }}
      >
        {children}
      </div>
      {!isOnboarding && (
        <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center">
          <div className="pointer-events-auto w-full max-w-[640px]">
            <WebTabBar pathname={pathname} onNavigate={(path) => router.push(path)} />
          </div>
        </div>
      )}
    </div>
  );
}
