import { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { Stack, useRouter, useSegments } from 'expo-router';
import { TamaguiProvider } from 'tamagui';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setStorage } from '@yoyo/store/storage';
import { hydrateAllStores, useUserStore, selectIsAuthenticated, useOnboardingStore, selectIsComplete } from '@yoyo/store';
import { tamaguiConfig } from '../tamagui.config';

function useProtectedRoute() {
  const router = useRouter();
  const segments = useSegments();
  const isAuthenticated = useUserStore(selectIsAuthenticated);
  const isOnboardingComplete = useOnboardingStore(selectIsComplete);

  useEffect(() => {
    const inAuthGroup = segments[0] === 'auth';
    const inOnboarding = segments[0] === 'onboarding';

    if (!isOnboardingComplete && !inOnboarding) {
      // Onboarding first — no auth required
      router.replace('/onboarding');
    } else if (isOnboardingComplete && !isAuthenticated && !inAuthGroup) {
      // Onboarding done, need auth
      router.replace('/auth');
    } else if (isOnboardingComplete && isAuthenticated && (inAuthGroup || inOnboarding)) {
      // Fully set up, go to app
      router.replace('/(tabs)');
    }
  }, [isAuthenticated, isOnboardingComplete, segments, router]);
}

export default function RootLayout() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setStorage({
      getItem: (key) => AsyncStorage.getItem(key),
      setItem: (key, value) => AsyncStorage.setItem(key, value),
      removeItem: (key) => AsyncStorage.removeItem(key),
    });
    hydrateAllStores();
    setReady(true);
  }, []);

  if (!ready) return null;

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />
      <TamaguiProvider config={tamaguiConfig} defaultTheme="light">
        <RootNavigator />
      </TamaguiProvider>
    </SafeAreaProvider>
  );
}

function RootNavigator() {
  useProtectedRoute();

  return (
    <Stack>
      <Stack.Screen name="auth" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="onboarding" options={{ headerShown: false }} />
    </Stack>
  );
}
