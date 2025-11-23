"use client";

import * as React from "react";
import { hydrateAllStores } from "@/stores";
import { ToastContainer } from "@/components/toast-container";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  // Hydrate all Zustand stores on mount (client-side only)
  React.useEffect(() => {
    hydrateAllStores();
  }, []);

  return (
    <>
      {children}
      <ToastContainer />
    </>
  );
}

export default Providers;
