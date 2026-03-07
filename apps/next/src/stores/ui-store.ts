import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Types
export type Difficulty = 'beginner' | 'intermediate' | 'advanced' | 'expert';
export type PlayStyle = '1A' | '2A' | '3A' | '4A' | '5A';
export type TrickGenre = 'string' | 'looping' | 'offstring' | 'counterweight' | 'responsive';
export type ViewMode = 'grid' | 'list' | 'compact';

export interface Filters {
  difficulty: Difficulty[];
  style: PlayStyle[];
  genre: TrickGenre[];
  showMastered: boolean;
  showInProgress: boolean;
  showNotStarted: boolean;
}

export interface VideoSettings {
  playbackSpeed: number;
  preferredAngle: 'front' | 'side' | 'pov' | 'auto';
  autoplay: boolean;
  loop: boolean;
  showCaptions: boolean;
  quality: 'auto' | '1080p' | '720p' | '480p';
}

export interface UIState {
  sidebarOpen: boolean;
  currentView: ViewMode;
  filters: Filters;
  searchQuery: string;
  videoSettings: VideoSettings;
  mobileMenuOpen: boolean;
  activeModal: string | null;
  toasts: Toast[];
}

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
}

export interface UIActions {
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setCurrentView: (view: ViewMode) => void;
  setFilters: (filters: Partial<Filters>) => void;
  resetFilters: () => void;
  toggleFilter: <K extends keyof Filters>(
    key: K,
    value: Filters[K] extends (infer U)[] ? U : never
  ) => void;
  setSearchQuery: (query: string) => void;
  clearSearch: () => void;
  updateVideoSettings: (settings: Partial<VideoSettings>) => void;
  resetVideoSettings: () => void;
  toggleMobileMenu: () => void;
  setMobileMenuOpen: (open: boolean) => void;
  openModal: (modalId: string) => void;
  closeModal: () => void;
  addToast: (toast: Omit<Toast, 'id'>) => string;
  removeToast: (id: string) => void;
}

export type UIStore = UIState & UIActions;

// Default values
const defaultFilters: Filters = {
  difficulty: [],
  style: [],
  genre: [],
  showMastered: true,
  showInProgress: true,
  showNotStarted: true,
};

const defaultVideoSettings: VideoSettings = {
  playbackSpeed: 1,
  preferredAngle: 'auto',
  autoplay: false,
  loop: false,
  showCaptions: true,
  quality: 'auto',
};

// Initial state
const initialState: UIState = {
  sidebarOpen: true,
  currentView: 'grid',
  filters: defaultFilters,
  searchQuery: '',
  videoSettings: defaultVideoSettings,
  mobileMenuOpen: false,
  activeModal: null,
  toasts: [],
};

// Generate unique ID
const generateId = () => `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

// Store - Split into persisted and non-persisted parts
export const useUIStore = create<UIStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      toggleSidebar: () => {
        set((state) => ({ sidebarOpen: !state.sidebarOpen }));
      },

      setSidebarOpen: (open: boolean) => {
        set({ sidebarOpen: open });
      },

      setCurrentView: (view: ViewMode) => {
        set({ currentView: view });
      },

      setFilters: (newFilters: Partial<Filters>) => {
        set((state) => ({
          filters: {
            ...state.filters,
            ...newFilters,
          },
        }));
      },

      resetFilters: () => {
        set({ filters: defaultFilters });
      },

      toggleFilter: <K extends keyof Filters>(
        key: K,
        value: Filters[K] extends (infer U)[] ? U : never
      ) => {
        set((state) => {
          const currentValue = state.filters[key];

          if (!Array.isArray(currentValue)) {
            // Handle boolean filters
            return {
              filters: {
                ...state.filters,
                [key]: !currentValue,
              },
            };
          }

          const valueExists = currentValue.includes(value as never);
          return {
            filters: {
              ...state.filters,
              [key]: valueExists
                ? currentValue.filter((v) => v !== value)
                : [...currentValue, value],
            },
          };
        });
      },

      setSearchQuery: (query: string) => {
        set({ searchQuery: query });
      },

      clearSearch: () => {
        set({ searchQuery: '' });
      },

      updateVideoSettings: (settings: Partial<VideoSettings>) => {
        set((state) => ({
          videoSettings: {
            ...state.videoSettings,
            ...settings,
          },
        }));
      },

      resetVideoSettings: () => {
        set({ videoSettings: defaultVideoSettings });
      },

      toggleMobileMenu: () => {
        set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen }));
      },

      setMobileMenuOpen: (open: boolean) => {
        set({ mobileMenuOpen: open });
      },

      openModal: (modalId: string) => {
        set({ activeModal: modalId });
      },

      closeModal: () => {
        set({ activeModal: null });
      },

      addToast: (toast: Omit<Toast, 'id'>) => {
        const id = generateId();
        const newToast: Toast = {
          ...toast,
          id,
          duration: toast.duration ?? 5000,
        };

        set((state) => ({
          toasts: [...state.toasts, newToast],
        }));

        // Auto-remove toast after duration
        if (newToast.duration && newToast.duration > 0) {
          setTimeout(() => {
            get().removeToast(id);
          }, newToast.duration);
        }

        return id;
      },

      removeToast: (id: string) => {
        set((state) => ({
          toasts: state.toasts.filter((t) => t.id !== id),
        }));
      },
    }),
    {
      name: 'yoyo-ui-storage',
      storage: createJSONStorage(() => localStorage),
      // Only persist video settings
      partialize: (state) => ({
        videoSettings: state.videoSettings,
        currentView: state.currentView,
        sidebarOpen: state.sidebarOpen,
      }),
      skipHydration: true,
    }
  )
);

// Selectors
export const selectSidebarOpen = (state: UIStore) => state.sidebarOpen;
export const selectCurrentView = (state: UIStore) => state.currentView;
export const selectFilters = (state: UIStore) => state.filters;
export const selectSearchQuery = (state: UIStore) => state.searchQuery;
export const selectVideoSettings = (state: UIStore) => state.videoSettings;
export const selectMobileMenuOpen = (state: UIStore) => state.mobileMenuOpen;
export const selectActiveModal = (state: UIStore) => state.activeModal;
export const selectToasts = (state: UIStore) => state.toasts;

// Derived selectors
export const selectHasActiveFilters = (state: UIStore) => {
  const { filters } = state;
  return (
    filters.difficulty.length > 0 ||
    filters.style.length > 0 ||
    filters.genre.length > 0 ||
    !filters.showMastered ||
    !filters.showInProgress ||
    !filters.showNotStarted
  );
};

export const selectActiveFilterCount = (state: UIStore) => {
  const { filters } = state;
  let count = 0;
  count += filters.difficulty.length;
  count += filters.style.length;
  count += filters.genre.length;
  if (!filters.showMastered) count++;
  if (!filters.showInProgress) count++;
  if (!filters.showNotStarted) count++;
  return count;
};

export const selectPlaybackSpeed = (state: UIStore) => state.videoSettings.playbackSpeed;
export const selectPreferredAngle = (state: UIStore) => state.videoSettings.preferredAngle;

// Hydration helper for SSR
export const hydrateUIStore = () => {
  if (typeof window !== 'undefined') {
    useUIStore.persist.rehydrate();
  }
};

// Export defaults for reference
export { defaultFilters, defaultVideoSettings };
