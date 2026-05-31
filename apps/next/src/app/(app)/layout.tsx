"use client";
import * as React from "react";
import { useRouter, usePathname } from "next/navigation";
import { useOnboardingStore, selectIsComplete, useUserStore, selectIsAuthenticated } from "@yoyo/store";
import { WebTabBar } from "@yoyo/ui";
import { View, StyleSheet } from "react-native";

export default function AppRootLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const isAuthenticated = useUserStore(selectIsAuthenticated);
  const isOnboardingComplete = useOnboardingStore(selectIsComplete);
  const isOnboarding = pathname?.startsWith('/onboarding') ?? false;

  React.useEffect(() => {
    if (!isAuthenticated || !isOnboardingComplete) {
      if (!isOnboarding) router.replace('/onboarding');
    }
  }, [isAuthenticated, isOnboardingComplete, isOnboarding, router]);

  // Prefetch all tab routes so first navigation is instant
  React.useEffect(() => {
    ['/dashboard', '/library', '/shop', '/profile', '/for-you'].forEach((path) => {
      router.prefetch(path);
    });
  }, [router]);

  return (
    <View style={isOnboarding ? styles.rootOnboarding : styles.root}>
      <View style={isOnboarding ? styles.contentFull : styles.content}>
        {children}
      </View>
      {!isOnboarding && (
        <WebTabBar pathname={pathname} onNavigate={(path) => router.push(path)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    minHeight: '100vh' as any,
    position: 'relative',
  },
  rootOnboarding: {
    height: '100vh' as any,
    position: 'relative',
  },
  content: {
    flex: 1,
    paddingBottom: 80,
  },
  contentFull: {
    flex: 1,
    minHeight: 0 as any,
    overflow: 'hidden' as any,
  },
});
