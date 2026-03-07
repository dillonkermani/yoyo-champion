import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Types
export type BadgeCategory =
  | 'streak'
  | 'mastery'
  | 'explorer'
  | 'social'
  | 'milestone'
  | 'special';

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: BadgeCategory;
  unlockedAt: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
}

export interface Achievement {
  id: string;
  badge: Badge;
  timestamp: string;
  xpAwarded: number;
}

export interface GamificationState {
  xp: number;
  level: number;
  badges: Badge[];
  recentAchievements: Achievement[];
  lifetimeXp: number;
}

export interface GamificationActions {
  addXP: (amount: number, source?: string) => { leveledUp: boolean; newLevel?: number | undefined };
  unlockBadge: (badge: Omit<Badge, 'unlockedAt'>) => boolean;
  checkAchievements: (context: AchievementContext) => Achievement[];
  clearRecentAchievements: () => void;
  getXpForLevel: (level: number) => number;
  getXpProgress: () => { current: number; required: number; percentage: number };
  hasBadge: (badgeId: string) => boolean;
  reset: () => void;
}

export interface AchievementContext {
  tricksWatched?: number;
  tricksMastered?: number;
  currentStreak?: number;
  pathsCompleted?: number;
  totalWatchTime?: number;
  totalXp?: number;
}

export type GamificationStore = GamificationState & GamificationActions;

// Level thresholds - exponential curve to Level 50
// Formula: XP = 100 * (level - 1)^1.5
const calculateXpForLevel = (level: number): number => {
  if (level <= 1) return 0;
  return Math.floor(100 * Math.pow(level - 1, 1.5));
};

// Pre-calculate level thresholds for quick lookup
const LEVEL_THRESHOLDS: number[] = Array.from({ length: 51 }, (_, i) =>
  calculateXpForLevel(i)
);

// Badge definitions for achievement checking
const BADGE_DEFINITIONS = {
  // Streak badges
  streak_3: {
    id: 'streak_3',
    name: 'Consistent',
    description: '3 day streak',
    icon: 'flame',
    category: 'streak' as BadgeCategory,
    rarity: 'common' as const,
    condition: (ctx: AchievementContext) => (ctx.currentStreak ?? 0) >= 3,
  },
  streak_7: {
    id: 'streak_7',
    name: 'Week Warrior',
    description: '7 day streak',
    icon: 'flame',
    category: 'streak' as BadgeCategory,
    rarity: 'uncommon' as const,
    condition: (ctx: AchievementContext) => (ctx.currentStreak ?? 0) >= 7,
  },
  streak_30: {
    id: 'streak_30',
    name: 'Monthly Master',
    description: '30 day streak',
    icon: 'flame',
    category: 'streak' as BadgeCategory,
    rarity: 'rare' as const,
    condition: (ctx: AchievementContext) => (ctx.currentStreak ?? 0) >= 30,
  },
  streak_100: {
    id: 'streak_100',
    name: 'Legendary Dedication',
    description: '100 day streak',
    icon: 'crown',
    category: 'streak' as BadgeCategory,
    rarity: 'legendary' as const,
    condition: (ctx: AchievementContext) => (ctx.currentStreak ?? 0) >= 100,
  },
  // Mastery badges
  first_trick: {
    id: 'first_trick',
    name: 'First Steps',
    description: 'Master your first trick',
    icon: 'star',
    category: 'mastery' as BadgeCategory,
    rarity: 'common' as const,
    condition: (ctx: AchievementContext) => (ctx.tricksMastered ?? 0) >= 1,
  },
  tricks_10: {
    id: 'tricks_10',
    name: 'Getting Good',
    description: 'Master 10 tricks',
    icon: 'trophy',
    category: 'mastery' as BadgeCategory,
    rarity: 'uncommon' as const,
    condition: (ctx: AchievementContext) => (ctx.tricksMastered ?? 0) >= 10,
  },
  tricks_50: {
    id: 'tricks_50',
    name: 'Trick Master',
    description: 'Master 50 tricks',
    icon: 'trophy',
    category: 'mastery' as BadgeCategory,
    rarity: 'rare' as const,
    condition: (ctx: AchievementContext) => (ctx.tricksMastered ?? 0) >= 50,
  },
  tricks_100: {
    id: 'tricks_100',
    name: 'Yo-Yo Legend',
    description: 'Master 100 tricks',
    icon: 'crown',
    category: 'mastery' as BadgeCategory,
    rarity: 'legendary' as const,
    condition: (ctx: AchievementContext) => (ctx.tricksMastered ?? 0) >= 100,
  },
  // Explorer badges
  first_path: {
    id: 'first_path',
    name: 'Path Finder',
    description: 'Complete your first learning path',
    icon: 'map',
    category: 'explorer' as BadgeCategory,
    rarity: 'uncommon' as const,
    condition: (ctx: AchievementContext) => (ctx.pathsCompleted ?? 0) >= 1,
  },
  paths_5: {
    id: 'paths_5',
    name: 'Journey Master',
    description: 'Complete 5 learning paths',
    icon: 'compass',
    category: 'explorer' as BadgeCategory,
    rarity: 'rare' as const,
    condition: (ctx: AchievementContext) => (ctx.pathsCompleted ?? 0) >= 5,
  },
  // Watch time badges
  watch_1h: {
    id: 'watch_1h',
    name: 'Dedicated Learner',
    description: 'Watch 1 hour of tutorials',
    icon: 'clock',
    category: 'milestone' as BadgeCategory,
    rarity: 'common' as const,
    condition: (ctx: AchievementContext) => (ctx.totalWatchTime ?? 0) >= 3600,
  },
  watch_10h: {
    id: 'watch_10h',
    name: 'Study Champion',
    description: 'Watch 10 hours of tutorials',
    icon: 'clock',
    category: 'milestone' as BadgeCategory,
    rarity: 'rare' as const,
    condition: (ctx: AchievementContext) => (ctx.totalWatchTime ?? 0) >= 36000,
  },
  // XP milestones
  xp_1000: {
    id: 'xp_1000',
    name: 'Rising Star',
    description: 'Earn 1,000 XP',
    icon: 'zap',
    category: 'milestone' as BadgeCategory,
    rarity: 'common' as const,
    condition: (ctx: AchievementContext) => (ctx.totalXp ?? 0) >= 1000,
  },
  xp_10000: {
    id: 'xp_10000',
    name: 'XP Hunter',
    description: 'Earn 10,000 XP',
    icon: 'zap',
    category: 'milestone' as BadgeCategory,
    rarity: 'rare' as const,
    condition: (ctx: AchievementContext) => (ctx.totalXp ?? 0) >= 10000,
  },
  xp_50000: {
    id: 'xp_50000',
    name: 'XP Legend',
    description: 'Earn 50,000 XP',
    icon: 'crown',
    category: 'milestone' as BadgeCategory,
    rarity: 'legendary' as const,
    condition: (ctx: AchievementContext) => (ctx.totalXp ?? 0) >= 50000,
  },
} as const;

// XP awarded per badge rarity
const BADGE_XP_REWARDS: Record<Badge['rarity'], number> = {
  common: 25,
  uncommon: 50,
  rare: 100,
  epic: 200,
  legendary: 500,
};

// Initial state
const initialState: GamificationState = {
  xp: 0,
  level: 1,
  badges: [],
  recentAchievements: [],
  lifetimeXp: 0,
};

// Store
export const useGamificationStore = create<GamificationStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      addXP: (amount: number, _source?: string) => {
        const state = get();
        const newXp = state.xp + amount;
        const newLifetimeXp = state.lifetimeXp + amount;

        // Calculate new level
        let newLevel = state.level;
        while (newLevel < 50) {
          const nextThreshold = LEVEL_THRESHOLDS[newLevel + 1];
          if (nextThreshold === undefined || newXp < nextThreshold) break;
          newLevel++;
        }

        const leveledUp = newLevel > state.level;

        set({
          xp: newXp,
          level: newLevel,
          lifetimeXp: newLifetimeXp,
        });

        return {
          leveledUp,
          newLevel: leveledUp ? newLevel : undefined,
        };
      },

      unlockBadge: (badge: Omit<Badge, 'unlockedAt'>) => {
        const state = get();

        // Check if already unlocked
        if (state.badges.some((b) => b.id === badge.id)) {
          return false;
        }

        const now = new Date().toISOString();
        const fullBadge: Badge = {
          ...badge,
          unlockedAt: now,
        };

        const xpAwarded = BADGE_XP_REWARDS[badge.rarity];
        const achievement: Achievement = {
          id: `${badge.id}_${Date.now()}`,
          badge: fullBadge,
          timestamp: now,
          xpAwarded,
        };

        set({
          badges: [...state.badges, fullBadge],
          recentAchievements: [achievement, ...state.recentAchievements].slice(0, 10),
        });

        // Award XP for the badge
        get().addXP(xpAwarded, `badge:${badge.id}`);

        return true;
      },

      checkAchievements: (context: AchievementContext) => {
        const state = get();
        const unlockedAchievements: Achievement[] = [];

        for (const [_, definition] of Object.entries(BADGE_DEFINITIONS)) {
          // Skip if already unlocked
          if (state.badges.some((b) => b.id === definition.id)) {
            continue;
          }

          // Check if condition is met
          if (definition.condition(context)) {
            const { condition: _, ...badgeData } = definition;
            const unlocked = get().unlockBadge(badgeData);

            if (unlocked) {
              const recentAchievements = get().recentAchievements;
              const latest = recentAchievements.find((a) => a.badge.id === definition.id);
              if (latest) {
                unlockedAchievements.push(latest);
              }
            }
          }
        }

        return unlockedAchievements;
      },

      clearRecentAchievements: () => {
        set({ recentAchievements: [] });
      },

      getXpForLevel: (level: number): number => {
        const threshold = LEVEL_THRESHOLDS[Math.min(level, 50)];
        const maxThreshold = LEVEL_THRESHOLDS[50];
        return threshold ?? maxThreshold ?? 0;
      },

      getXpProgress: () => {
        const state = get();
        const currentLevelXp = LEVEL_THRESHOLDS[state.level] ?? 0;
        const nextLevelXp = LEVEL_THRESHOLDS[Math.min(state.level + 1, 50)] ?? currentLevelXp;

        const current = state.xp - currentLevelXp;
        const required = nextLevelXp - currentLevelXp;
        const percentage = required > 0 ? (current / required) * 100 : 100;

        return {
          current,
          required,
          percentage: Math.min(percentage, 100),
        };
      },

      hasBadge: (badgeId: string) => {
        return get().badges.some((b) => b.id === badgeId);
      },

      reset: () => {
        set(initialState);
      },
    }),
    {
      name: 'yoyo-gamification-storage',
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
    }
  )
);

// Selectors
export const selectXp = (state: GamificationStore) => state.xp;
export const selectLevel = (state: GamificationStore) => state.level;
export const selectLifetimeXp = (state: GamificationStore) => state.lifetimeXp;
export const selectBadges = (state: GamificationStore) => state.badges;
export const selectRecentAchievements = (state: GamificationStore) => state.recentAchievements;

export const selectBadgesByCategory = (category: BadgeCategory) => (state: GamificationStore) =>
  state.badges.filter((b) => b.category === category);

export const selectBadgesByRarity = (rarity: Badge['rarity']) => (state: GamificationStore) =>
  state.badges.filter((b) => b.rarity === rarity);

export const selectBadgeCount = (state: GamificationStore) => state.badges.length;

export const selectLevelProgress = (state: GamificationStore) => {
  const currentLevelXp = LEVEL_THRESHOLDS[state.level] ?? 0;
  const nextLevelXp = LEVEL_THRESHOLDS[Math.min(state.level + 1, 50)] ?? currentLevelXp;
  return {
    current: state.xp - currentLevelXp,
    required: nextLevelXp - currentLevelXp,
    level: state.level,
    isMaxLevel: state.level >= 50,
  };
};

// Hydration helper for SSR
export const hydrateGamificationStore = () => {
  if (typeof window !== 'undefined') {
    useGamificationStore.persist.rehydrate();
  }
};

// Export level thresholds for reference
export { LEVEL_THRESHOLDS, BADGE_DEFINITIONS, BADGE_XP_REWARDS };
