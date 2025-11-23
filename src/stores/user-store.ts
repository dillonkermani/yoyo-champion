import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Types
export interface User {
  id: string;
  email: string;
  username: string;
  displayName: string;
  avatarUrl?: string;
  bio?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface UserActions {
  login: (user: User) => void;
  loginWithCredentials: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<Pick<User, 'displayName' | 'bio' | 'username'>>) => void;
  updateAvatar: (avatarUrl: string) => void;
  setLoading: (isLoading: boolean) => void;
}

export type UserStore = UserState & UserActions;

// Initial state
const initialState: UserState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
};

// Store
export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      login: (user: User) => {
        set({
          user,
          isAuthenticated: true,
          isLoading: false,
        });
      },

      loginWithCredentials: async (email: string, password: string) => {
        set({ isLoading: true });

        // Mock authentication - simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));

        // For demo purposes, accept any email/password combo
        // In production, this would validate against a backend
        if (email && password) {
          const username = email.split('@')[0] ?? 'user';
          const mockUser: User = {
            id: `user_${Date.now()}`,
            email,
            username,
            displayName: username,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };

          set({
            user: mockUser,
            isAuthenticated: true,
            isLoading: false,
          });
          return true;
        }

        set({ isLoading: false });
        return false;
      },

      signup: async (name: string, email: string, password: string) => {
        set({ isLoading: true });

        // Mock signup - simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // For demo purposes, create user with provided details
        // In production, this would create account via backend
        if (name && email && password) {
          const mockUser: User = {
            id: `user_${Date.now()}`,
            email,
            username: email.split('@')[0] ?? 'user',
            displayName: name,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };

          set({
            user: mockUser,
            isAuthenticated: true,
            isLoading: false,
          });
          return true;
        }

        set({ isLoading: false });
        return false;
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
      },

      updateProfile: (updates) => {
        const currentUser = get().user;
        if (!currentUser) return;

        set({
          user: {
            ...currentUser,
            ...updates,
            updatedAt: new Date().toISOString(),
          },
        });
      },

      updateAvatar: (avatarUrl: string) => {
        const currentUser = get().user;
        if (!currentUser) return;

        set({
          user: {
            ...currentUser,
            avatarUrl,
            updatedAt: new Date().toISOString(),
          },
        });
      },

      setLoading: (isLoading: boolean) => {
        set({ isLoading });
      },
    }),
    {
      name: 'yoyo-user-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
      skipHydration: true, // SSR compatibility - manually hydrate on client
    }
  )
);

// Selectors
export const selectUser = (state: UserStore) => state.user;
export const selectIsAuthenticated = (state: UserStore) => state.isAuthenticated;
export const selectIsLoading = (state: UserStore) => state.isLoading;
export const selectUserDisplayName = (state: UserStore) =>
  state.user?.displayName || state.user?.username || 'Guest';
export const selectUserAvatar = (state: UserStore) => state.user?.avatarUrl;

// Hydration helper for SSR
export const hydrateUserStore = () => {
  if (typeof window !== 'undefined') {
    useUserStore.persist.rehydrate();
  }
};
