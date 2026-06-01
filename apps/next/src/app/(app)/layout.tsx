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

  // Pending tab target — set on click, cleared once the route actually commits.
  // This drives instant tab-bar highlight even while React is suspending on the
  // new route. We don't gate the rest of the UI on it; loading.tsx handles that.
  const [pendingPath, setPendingPath] = React.useState<string | null>(null);
  const [isPending, startTransition] = React.useTransition();

  React.useEffect(() => {
    if (pendingPath && pathname && pathname.startsWith(pendingPath)) {
      setPendingPath(null);
    }
  }, [pathname, pendingPath]);

  const handleNavigate = React.useCallback(
    (path: string) => {
      if (pathname === path) return;
      setPendingPath(path);
      startTransition(() => {
        router.push(path);
      });
    },
    [router, pathname],
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

  const activePath = pendingPath ?? pathname;

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
            <WebTabBar pathname={activePath} onNavigate={handleNavigate} isPending={isPending} />
          </div>
        </div>
      )}
    </div>
  );
}
