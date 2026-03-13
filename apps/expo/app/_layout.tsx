import { useEffect, useState } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { TamaguiProvider } from 'tamagui';
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

    if (!isAuthenticated && !inAuthGroup) {
      router.replace('/auth');
    } else if (isAuthenticated && !isOnboardingComplete && !inOnboarding) {
      router.replace('/onboarding');
    } else if (isAuthenticated && isOnboardingComplete && (inAuthGroup || inOnboarding)) {
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
    <TamaguiProvider config={tamaguiConfig} defaultTheme="light">
      <RootNavigator />
    </TamaguiProvider>
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
