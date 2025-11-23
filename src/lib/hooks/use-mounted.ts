"use client";

import * as React from "react";

/**
 * Hook to detect if component has mounted (client-side only)
 * Useful for preventing hydration mismatches with client-only content
 *
 * @returns boolean indicating if component is mounted
 *
 * @example
 * const isMounted = useMounted();
 * if (!isMounted) return <ServerFallback />;
 * return <ClientOnlyComponent />;
 */
export function useMounted(): boolean {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}

/**
 * Component wrapper for client-only rendering
 * Prevents hydration mismatch by only rendering children after mount
 */
export interface ClientOnlyProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function ClientOnly({ children, fallback = null }: ClientOnlyProps): React.ReactNode {
  const mounted = useMounted();

  if (!mounted) {
    return fallback;
  }

  return children;
}

export default useMounted;
