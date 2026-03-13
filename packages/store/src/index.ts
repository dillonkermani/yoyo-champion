// User Store
export {
  useUserStore,
  hydrateUserStore,
  selectUser,
  selectIsAuthenticated,
  selectIsLoading,
  selectUserDisplayName,
  selectUserAvatar,
  type User,
  type UserState,
  type UserActions,
  type UserStore,
} from './user-store';

// Progress Store
export {
  useProgressStore,
  hydrateProgressStore,
  selectTrickProgress,
  selectPathProgress,
  selectCurrentStreak,
  selectLongestStreak,
  selectTotalWatchTime,
  selectTotalTricksMastered,
  selectMasteredTricks,
  selectInProgressTricks,
  selectActivePaths,
  selectCompletedPaths,
  selectTotalXpFromProgress,
  type TrickStatus,
  type TrickProgress,
  type PathProgress,
  type ProgressState,
  type ProgressActions,
  type ProgressStore,
} from './progress-store';

// Gamification Store
export {
  useGamificationStore,
  hydrateGamificationStore,
  selectXp,
  selectLevel,
  selectLifetimeXp,
  selectBadges,
  selectRecentAchievements,
  selectBadgesByCategory,
  selectBadgesByRarity,
  selectBadgeCount,
  selectLevelProgress,
  LEVEL_THRESHOLDS,
  BADGE_DEFINITIONS,
  BADGE_XP_REWARDS,
  type BadgeCategory,
  type Badge,
  type Achievement,
  type AchievementContext,
  type GamificationState,
  type GamificationActions,
  type GamificationStore,
  type ReputationBadgeId,
  type PerkId,
  PERK_UNLOCK_LEVELS,
} from './gamification-store';

// UI Store
export {
  useUIStore,
  hydrateUIStore,
  selectSidebarOpen,
  selectCurrentView,
  selectFilters,
  selectSearchQuery,
  selectVideoSettings,
  selectMobileMenuOpen,
  selectActiveModal,
  selectToasts,
  selectHasActiveFilters,
  selectActiveFilterCount,
  selectPlaybackSpeed,
  selectPreferredAngle,
  defaultFilters,
  defaultVideoSettings,
  type Difficulty,
  type PlayStyle,
  type TrickGenre,
  type ViewMode,
  type Filters,
  type VideoSettings,
  type Toast,
  type UIState,
  type UIActions,
  type UIStore,
} from './ui-store';

// Onboarding Store
export {
  useOnboardingStore,
  hydrateOnboardingStore,
  selectCurrentStep,
  selectSkillLevel,
  selectGoals,
  selectPreferredStyles,
  selectIsComplete,
  selectRecommendedPathId,
  selectStepIndex,
  selectTotalSteps,
  selectStepProgress,
  selectCanProceed,
  selectIsFirstStep,
  selectIsLastStep,
  selectHasGoal,
  selectHasStyle,
  selectRecommendedPaths,
  STEP_ORDER,
  GOAL_METADATA,
  STYLE_METADATA,
  SKILL_LEVEL_METADATA,
  type SkillLevel,
  type Goal,
  type PreferredStyle,
  type OnboardingStep,
  type OnboardingState,
  type OnboardingActions,
  type OnboardingStore,
} from './onboarding-store';

// Social Store
export {
  useSocialStore,
  hydrateSocialStore,
  selectFollowedUserIds,
  selectLikedVideoIds,
  selectUploadReputation,
  selectTrainerStatus,
  selectApprovedVideoCount,
  selectFollowerCount,
  type SocialState,
  type SocialActions,
  type SocialStore,
} from './social-store';

// Video Store
export {
  useVideoStore,
  hydrateVideoStore,
  selectFeedTab,
  selectMyUploads,
  selectIsFeedLoading,
  selectApprovedUploads,
  selectPendingUploads,
  selectUploadCount,
  type FeedTab,
  type VideoUpload,
  type VideoState,
  type VideoActions,
  type VideoStore,
} from './video-store';

// Onboarding flow (shared config + hook)
export { useOnboardingFlow, ONBOARDING_STEPS } from './onboarding-flow';
export type { OnboardingStepConfig, OnboardingStepId } from './onboarding-flow';

// Storage abstraction
export { setStorage, getStorage } from './storage';

// Hydrate all stores - call once on app startup after setting storage
import { hydrateUserStore as _hydrateUserStore } from './user-store';
import { hydrateProgressStore as _hydrateProgressStore } from './progress-store';
import { hydrateGamificationStore as _hydrateGamificationStore } from './gamification-store';
import { hydrateUIStore as _hydrateUIStore } from './ui-store';
import { hydrateOnboardingStore as _hydrateOnboardingStore } from './onboarding-store';
import { hydrateSocialStore as _hydrateSocialStore } from './social-store';
import { hydrateVideoStore as _hydrateVideoStore } from './video-store';

export const hydrateAllStores = () => {
  _hydrateUserStore();
  _hydrateProgressStore();
  _hydrateGamificationStore();
  _hydrateUIStore();
  _hydrateOnboardingStore();
  _hydrateSocialStore();
  _hydrateVideoStore();
};
