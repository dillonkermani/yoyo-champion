import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { getStorage } from './storage';

export const MAX_COMPARE = 4;

export interface CompareState {
  handles: string[];
}

export interface CompareActions {
  toggleCompare: (handle: string) => void;
  removeFromCompare: (handle: string) => void;
  clearCompare: () => void;
}

export type CompareStore = CompareState & CompareActions;

export const useCompareStore = create<CompareStore>()(
  persist(
    (set, get) => ({
      handles: [],
      toggleCompare: (handle) => {
        const { handles } = get();
        if (handles.includes(handle)) {
          set({ handles: handles.filter((h) => h !== handle) });
          return;
        }
        if (handles.length >= MAX_COMPARE) return;
        set({ handles: [...handles, handle] });
      },
      removeFromCompare: (handle) => set({ handles: get().handles.filter((h) => h !== handle) }),
      clearCompare: () => set({ handles: [] }),
    }),
    {
      name: 'yoyo-compare',
      storage: createJSONStorage(() => getStorage()),
      skipHydration: true,
    },
  ),
);

export const hydrateCompareStore = () => {
  useCompareStore.persist.rehydrate();
};

export const selectCompareHandles = (s: CompareStore) => s.handles;
export const selectCompareCount = (s: CompareStore) => s.handles.length;
export const selectIsCompared = (handle: string) => (s: CompareStore) => s.handles.includes(handle);
export const selectCompareFull = (s: CompareStore) => s.handles.length >= MAX_COMPARE;
