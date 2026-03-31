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

  React.useEffect(() => {
    if (!isAuthenticated || !isOnboardingComplete) {
      router.replace('/onboarding');
    }
  }, [isAuthenticated, isOnboardingComplete, router]);

  // Prefetch all tab routes so first navigation is instant
  React.useEffect(() => {
    ['/dashboard', '/library', '/shop', '/profile', '/for-you'].forEach((path) => {
      router.prefetch(path);
    });
  }, [router]);

  return (
    <View style={styles.root}>
      <View style={styles.content}>
        {children}
      </View>
      <WebTabBar pathname={pathname} onNavigate={(path) => router.push(path)} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    minHeight: '100vh' as any,
    position: 'relative',
  },
  content: {
    flex: 1,
    paddingBottom: 80,
  },
});
