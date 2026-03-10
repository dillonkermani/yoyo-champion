"use client";

import * as React from "react";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import superjson from "superjson";
import { trpc } from "@yoyo/api/client";
import { setStorage } from "@yoyo/store/storage";
import { hydrateAllStores } from "@yoyo/store";
import { TamaguiProvider } from "tamagui";
import { tamaguiConfig } from "@yoyo/ui";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: `${process.env['NEXT_PUBLIC_API_URL'] ?? "/api/trpc"}`,
          transformer: superjson,
        }),
      ],
    })
  );

  React.useEffect(() => {
    setStorage(localStorage);
    hydrateAllStores();
  }, []);

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <TamaguiProvider config={tamaguiConfig} defaultTheme="light">
          {children}
        </TamaguiProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default Providers;
