import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Types
export type TrickStatus = 'not_started' | 'watching' | 'practicing' | 'mastered';

export interface TrickProgress {
  trickId: string;
  status: TrickStatus;
  watchTime: number; // seconds watched
  lastWatched: string | null;
  masteredAt: string | null;
  notes: string[];
  xpEarned: number;
}

export interface PathProgress {
  pathId: string;
  startedAt: string;
  completedModules: string[];
  currentModuleId: string | null;
  completedAt: string | null;
}

export interface ProgressState {
  trickProgress: Record<string, TrickProgress>;
  pathProgress: Record<string, PathProgress>;
  currentStreak: number;
  longestStreak: number;
  lastActivityDate: string | null;
  totalWatchTime: number;
  totalTricksMastered: number;
}

export interface ProgressActions {
  markTrickWatched: (trickId: string) => { xpGained: number };
  markTrickMastered: (trickId: string) => { xpGained: number };
  updateWatchTime: (trickId: string, seconds: number) => void;
  addNote: (trickId: string, note: string) => void;
  removeNote: (trickId: string, noteIndex: number) => void;
  startPath: (pathId: string, firstModuleId: string) => void;
  completeModule: (pathId: string, moduleId: string, nextModuleId?: string) => { xpGained: number };
  completePath: (pathId: string) => { xpGained: number };
  getTrickProgress: (trickId: string) => TrickProgress | undefined;
  getPathProgress: (pathId: string) => PathProgress | undefined;
  checkAndUpdateStreak: () => void;
  resetProgress: () => void;
}

export type ProgressStore = ProgressState & ProgressActions;

// XP Constants
const XP_REWARDS = {
  TRICK_WATCHED: 10,
  TRICK_MASTERED: 50,
  MODULE_COMPLETED: 25,
  PATH_COMPLETED: 100,
  WATCH_TIME_BONUS: 5, // per 5 minutes watched
} as const;

// Initial state
const initialState: ProgressState = {
  trickProgress: {},
  pathProgress: {},
  currentStreak: 0,
  longestStreak: 0,
  lastActivityDate: null,
  totalWatchTime: 0,
  totalTricksMastered: 0,
};

// Helper functions
const createDefaultTrickProgress = (trickId: string): TrickProgress => ({
  trickId,
  status: 'not_started',
  watchTime: 0,
  lastWatched: null,
  masteredAt: null,
  notes: [],
  xpEarned: 0,
});

const isWithin24Hours = (dateString: string | null): boolean => {
  if (!dateString) return false;
  const lastActivity = new Date(dateString);
  const now = new Date();
  const hoursDiff = (now.getTime() - lastActivity.getTime()) / (1000 * 60 * 60);
  return hoursDiff <= 24;
};

const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

// Store
export const useProgressStore = create<ProgressStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      markTrickWatched: (trickId: string) => {
        const state = get();
        const existing = state.trickProgress[trickId] || createDefaultTrickProgress(trickId);
        const now = new Date().toISOString();

        // Only award XP if this is the first time watching
        const isFirstWatch = existing.status === 'not_started';
        const xpGained = isFirstWatch ? XP_REWARDS.TRICK_WATCHED : 0;

        set({
          trickProgress: {
            ...state.trickProgress,
            [trickId]: {
              ...existing,
              status: existing.status === 'not_started' ? 'watching' : existing.status,
              lastWatched: now,
              xpEarned: existing.xpEarned + xpGained,
            },
          },
          lastActivityDate: now,
        });

        get().checkAndUpdateStreak();
        return { xpGained };
      },

      markTrickMastered: (trickId: string) => {
        const state = get();
        const existing = state.trickProgress[trickId] || createDefaultTrickProgress(trickId);
        const now = new Date().toISOString();

        // Only award XP if not already mastered
        const isNewMastery = existing.status !== 'mastered';
        const xpGained = isNewMastery ? XP_REWARDS.TRICK_MASTERED : 0;

        set({
          trickProgress: {
            ...state.trickProgress,
            [trickId]: {
              ...existing,
              status: 'mastered',
              masteredAt: existing.masteredAt || now,
              xpEarned: existing.xpEarned + xpGained,
            },
          },
          totalTricksMastered: isNewMastery
            ? state.totalTricksMastered + 1
            : state.totalTricksMastered,
          lastActivityDate: now,
        });

        get().checkAndUpdateStreak();
        return { xpGained };
      },

      updateWatchTime: (trickId: string, seconds: number) => {
        const state = get();
        const existing = state.trickProgress[trickId] || createDefaultTrickProgress(trickId);
        const newWatchTime = existing.watchTime + seconds;

        // Calculate bonus XP for watch time milestones (every 5 minutes)
        const previousMilestones = Math.floor(existing.watchTime / 300);
        const newMilestones = Math.floor(newWatchTime / 300);
        const bonusXp = (newMilestones - previousMilestones) * XP_REWARDS.WATCH_TIME_BONUS;

        set({
          trickProgress: {
            ...state.trickProgress,
            [trickId]: {
              ...existing,
              watchTime: newWatchTime,
              lastWatched: new Date().toISOString(),
              xpEarned: existing.xpEarned + bonusXp,
            },
          },
          totalWatchTime: state.totalWatchTime + seconds,
        });
      },

      addNote: (trickId: string, note: string) => {
        const state = get();
        const existing = state.trickProgress[trickId] || createDefaultTrickProgress(trickId);

        set({
          trickProgress: {
            ...state.trickProgress,
            [trickId]: {
              ...existing,
              notes: [...existing.notes, note],
            },
          },
        });
      },

      removeNote: (trickId: string, noteIndex: number) => {
        const state = get();
        const existing = state.trickProgress[trickId];
        if (!existing) return;

        set({
          trickProgress: {
            ...state.trickProgress,
            [trickId]: {
              ...existing,
              notes: existing.notes.filter((_, i) => i !== noteIndex),
            },
          },
        });
      },

      startPath: (pathId: string, firstModuleId: string) => {
        const state = get();
        const now = new Date().toISOString();

        set({
          pathProgress: {
            ...state.pathProgress,
            [pathId]: {
              pathId,
              startedAt: now,
              completedModules: [],
              currentModuleId: firstModuleId,
              completedAt: null,
            },
          },
          lastActivityDate: now,
        });

        get().checkAndUpdateStreak();
      },

      completeModule: (pathId: string, moduleId: string, nextModuleId?: string) => {
        const state = get();
        const existing = state.pathProgress[pathId];
        if (!existing) return { xpGained: 0 };

        const now = new Date().toISOString();
        const isNewCompletion = !existing.completedModules.includes(moduleId);
        const xpGained = isNewCompletion ? XP_REWARDS.MODULE_COMPLETED : 0;

        set({
          pathProgress: {
            ...state.pathProgress,
            [pathId]: {
              ...existing,
              completedModules: isNewCompletion
                ? [...existing.completedModules, moduleId]
                : existing.completedModules,
              currentModuleId: nextModuleId || null,
            },
          },
          lastActivityDate: now,
        });

        get().checkAndUpdateStreak();
        return { xpGained };
      },

      completePath: (pathId: string) => {
        const state = get();
        const existing = state.pathProgress[pathId];
        if (!existing || existing.completedAt) return { xpGained: 0 };

        const now = new Date().toISOString();

        set({
          pathProgress: {
            ...state.pathProgress,
            [pathId]: {
              ...existing,
              completedAt: now,
              currentModuleId: null,
            },
          },
          lastActivityDate: now,
        });

        get().checkAndUpdateStreak();
        return { xpGained: XP_REWARDS.PATH_COMPLETED };
      },

      getTrickProgress: (trickId: string) => {
        return get().trickProgress[trickId];
      },

      getPathProgress: (pathId: string) => {
        return get().pathProgress[pathId];
      },

      checkAndUpdateStreak: () => {
        const state = get();
        const now = new Date();
        const today = now.toISOString().split('T')[0];

        if (!state.lastActivityDate) {
          set({ currentStreak: 1, lastActivityDate: now.toISOString() });
          return;
        }

        const lastActivity = new Date(state.lastActivityDate);
        const lastActivityDay = state.lastActivityDate.split('T')[0];

        // Already logged activity today
        if (lastActivityDay === today) {
          return;
        }

        // Check if last activity was yesterday (continue streak)
        const yesterday = new Date(now);
        yesterday.setDate(yesterday.getDate() - 1);

        if (isSameDay(lastActivity, yesterday)) {
          const newStreak = state.currentStreak + 1;
          set({
            currentStreak: newStreak,
            longestStreak: Math.max(newStreak, state.longestStreak),
          });
        } else if (isWithin24Hours(state.lastActivityDate)) {
          // Within 24 hours but not yesterday - maintain streak
          const newStreak = state.currentStreak + 1;
          set({
            currentStreak: newStreak,
            longestStreak: Math.max(newStreak, state.longestStreak),
          });
        } else {
          // Streak broken
          set({ currentStreak: 1 });
        }
      },

      resetProgress: () => {
        set(initialState);
      },
    }),
    {
      name: 'yoyo-progress-storage',
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
    }
  )
);

// Selectors
export const selectTrickProgress = (trickId: string) => (state: ProgressStore) =>
  state.trickProgress[trickId];

export const selectPathProgress = (pathId: string) => (state: ProgressStore) =>
  state.pathProgress[pathId];

export const selectCurrentStreak = (state: ProgressStore) => state.currentStreak;
export const selectLongestStreak = (state: ProgressStore) => state.longestStreak;
export const selectTotalWatchTime = (state: ProgressStore) => state.totalWatchTime;
export const selectTotalTricksMastered = (state: ProgressStore) => state.totalTricksMastered;

export const selectMasteredTricks = (state: ProgressStore) =>
  Object.values(state.trickProgress).filter((t) => t.status === 'mastered');

export const selectInProgressTricks = (state: ProgressStore) =>
  Object.values(state.trickProgress).filter(
    (t) => t.status === 'watching' || t.status === 'practicing'
  );

export const selectActivePaths = (state: ProgressStore) =>
  Object.values(state.pathProgress).filter((p) => !p.completedAt);

export const selectCompletedPaths = (state: ProgressStore) =>
  Object.values(state.pathProgress).filter((p) => p.completedAt);

export const selectTotalXpFromProgress = (state: ProgressStore) =>
  Object.values(state.trickProgress).reduce((sum, t) => sum + t.xpEarned, 0);

// Hydration helper for SSR
export const hydrateProgressStore = () => {
  if (typeof window !== 'undefined') {
    useProgressStore.persist.rehydrate();
  }
};
