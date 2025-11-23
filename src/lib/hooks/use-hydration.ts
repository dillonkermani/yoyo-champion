"use client";

import * as React from "react";
import type { StoreApi, UseBoundStore } from "zustand";

/**
 * Hook to handle SSR hydration for Zustand stores with persist middleware
 * Prevents hydration mismatch by waiting for client-side hydration
 *
 * @param store - Zustand store with persist middleware
 * @returns boolean indicating if the store has been hydrated
 *
 * @example
 * const isHydrated = useHydration(useUserStore);
 * if (!isHydrated) return <Loading />;
 */
export function useHydration<T>(
  store: UseBoundStore<StoreApi<T>> & {
    persist?: {
      hasHydrated: () => boolean;
      onHydrate: (fn: () => void) => () => void;
      onFinishHydration: (fn: () => void) => () => void;
    };
  }
): boolean {
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    // Check if store has persist middleware
    if (store.persist) {
      // If already hydrated, set state immediately
      if (store.persist.hasHydrated()) {
        setHydrated(true);
        return undefined;
      }

      // Otherwise, wait for hydration to finish
      const unsubscribe = store.persist.onFinishHydration(() => {
        setHydrated(true);
      });

      return unsubscribe;
    }

    // No persist middleware, consider it hydrated immediately
    setHydrated(true);
    return undefined;
  }, [store]);

  return hydrated;
}

/**
 * Hook to check if all specified stores are hydrated
 *
 * @param stores - Array of Zustand stores with persist middleware
 * @returns boolean indicating if all stores have been hydrated
 */
export function useAllHydrated(
  stores: Array<
    UseBoundStore<StoreApi<unknown>> & {
      persist?: {
        hasHydrated: () => boolean;
        onFinishHydration: (fn: () => void) => () => void;
      };
    }
  >
): boolean {
  const [allHydrated, setAllHydrated] = React.useState(false);

  React.useEffect(() => {
    const checkAllHydrated = () => {
      const hydrated = stores.every((store) => {
        if (store.persist) {
          return store.persist.hasHydrated();
        }
        return true;
      });
      setAllHydrated(hydrated);
    };

    // Initial check
    checkAllHydrated();

    // Set up listeners for each store
    const unsubscribes = stores.map((store) => {
      if (store.persist && !store.persist.hasHydrated()) {
        return store.persist.onFinishHydration(() => {
          checkAllHydrated();
        });
      }
      return () => {};
    });

    return () => {
      unsubscribes.forEach((unsub) => unsub());
    };
  }, [stores]);

  return allHydrated;
}

export default useHydration;
