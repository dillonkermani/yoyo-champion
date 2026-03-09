import type { StateStorage } from 'zustand/middleware';

let _storage: StateStorage | null = null;

// Default no-op storage for SSR / environments without storage
const noopStorage: StateStorage = {
  getItem: () => null,
  setItem: () => undefined,
  removeItem: () => undefined,
};

// Lazy proxy so createJSONStorage captures this singleton once but always
// delegates to whatever _storage is currently set to. This ensures stores
// can be hydrated after setStorage() is called on app startup.
const lazyStorage: StateStorage = {
  getItem: (name) => (_storage ?? noopStorage).getItem(name),
  setItem: (name, value) => (_storage ?? noopStorage).setItem(name, value),
  removeItem: (name) => (_storage ?? noopStorage).removeItem(name),
};

/**
 * Set the storage adapter. Call this once on app startup:
 * - Web: setStorage(localStorage)
 * - Expo: setStorage(AsyncStorage adapter)
 */
export const setStorage = (storage: StateStorage): void => {
  _storage = storage;
};

export const getStorage = (): StateStorage => {
  return lazyStorage;
};
