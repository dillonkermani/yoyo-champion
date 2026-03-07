import { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { TamaguiProvider } from 'tamagui';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import superjson from 'superjson';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setStorage } from '@yoyo/store/storage';
import { hydrateAllStores } from '@yoyo/store';
import { trpc } from '@yoyo/api/client';
import { tamaguiConfig } from '@yoyo/ui';

const queryClient = new QueryClient();

const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: `${process.env['EXPO_PUBLIC_API_URL'] ?? 'http://localhost:3000/api/trpc'}`,
      transformer: superjson,
    }),
  ],
});

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
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <TamaguiProvider config={tamaguiConfig}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="onboarding" options={{ headerShown: false }} />
          </Stack>
        </TamaguiProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
}
