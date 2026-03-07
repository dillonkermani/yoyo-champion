import type { StateStorage } from 'zustand/middleware';

let _storage: StateStorage | null = null;

// Default no-op storage for SSR / environments without storage
const noopStorage: StateStorage = {
  getItem: () => null,
  setItem: () => undefined,
  removeItem: () => undefined,
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
  return _storage ?? noopStorage;
};
