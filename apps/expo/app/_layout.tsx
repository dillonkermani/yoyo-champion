import { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { TamaguiProvider } from 'tamagui';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setStorage } from '@yoyo/store/storage';
import { hydrateAllStores } from '@yoyo/store';
import { tamaguiConfig } from '../tamagui.config';

export default function RootLayout() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Wire AsyncStorage as the Zustand storage adapter, then hydrate
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
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
      </Stack>
    </TamaguiProvider>
  );
}
