import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Types
export type SkillLevel = 'never' | 'beginner' | 'intermediate' | 'advanced' | 'expert';

export type Goal =
  | 'learn_basics'
  | 'master_string_tricks'
  | 'compete'
  | 'perform'
  | 'teach_others'
  | 'just_fun'
  | 'fitness'
  | 'stress_relief';

export type PreferredStyle = '1A' | '2A' | '3A' | '4A' | '5A' | 'responsive';

export type OnboardingStep =
  | 'welcome'
  | 'skill_level'
  | 'goals'
  | 'preferred_styles'
  | 'recommended_path'
  | 'complete';

export interface OnboardingState {
  currentStep: OnboardingStep;
  skillLevel: SkillLevel | null;
  goals: Goal[];
  preferredStyles: PreferredStyle[];
  isComplete: boolean;
  recommendedPathId: string | null;
  completedAt: string | null;
  startedAt: string | null;
}

export interface OnboardingActions {
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: OnboardingStep) => void;
  setSkillLevel: (level: SkillLevel) => void;
  setGoals: (goals: Goal[]) => void;
  toggleGoal: (goal: Goal) => void;
  setPreferredStyles: (styles: PreferredStyle[]) => void;
  togglePreferredStyle: (style: PreferredStyle) => void;
  setRecommendedPath: (pathId: string) => void;
  completeOnboarding: () => void;
  resetOnboarding: () => void;
  skipOnboarding: () => void;
}

export type OnboardingStore = OnboardingState & OnboardingActions;

// Step order for navigation
const STEP_ORDER: OnboardingStep[] = [
  'welcome',
  'skill_level',
  'goals',
  'preferred_styles',
  'recommended_path',
  'complete',
];

// Goal metadata for display
export const GOAL_METADATA: Record<Goal, { label: string; description: string; icon: string }> = {
  learn_basics: {
    label: 'Learn the Basics',
    description: 'Start from scratch and build a solid foundation',
    icon: 'book-open',
  },
  master_string_tricks: {
    label: 'Master String Tricks',
    description: 'Learn advanced 1A string manipulation',
    icon: 'target',
  },
  compete: {
    label: 'Compete',
    description: 'Prepare for yo-yo competitions',
    icon: 'trophy',
  },
  perform: {
    label: 'Perform',
    description: 'Create routines for shows and events',
    icon: 'star',
  },
  teach_others: {
    label: 'Teach Others',
    description: 'Learn to instruct and mentor',
    icon: 'users',
  },
  just_fun: {
    label: 'Just for Fun',
    description: 'Casual learning at your own pace',
    icon: 'smile',
  },
  fitness: {
    label: 'Fitness & Coordination',
    description: 'Improve dexterity and hand-eye coordination',
    icon: 'activity',
  },
  stress_relief: {
    label: 'Stress Relief',
    description: 'Relax and unwind with yo-yo',
    icon: 'coffee',
  },
};

// Style metadata for display
export const STYLE_METADATA: Record<PreferredStyle, { label: string; description: string }> = {
  '1A': {
    label: '1A - Single String',
    description: 'Classic yo-yo play with string tricks',
  },
  '2A': {
    label: '2A - Double Looping',
    description: 'Two yo-yos doing looping tricks',
  },
  '3A': {
    label: '3A - Double String',
    description: 'Two yo-yos doing string tricks',
  },
  '4A': {
    label: '4A - Offstring',
    description: 'Yo-yo detached from string',
  },
  '5A': {
    label: '5A - Counterweight',
    description: 'Dice or weight on string end',
  },
  responsive: {
    label: 'Responsive',
    description: 'Traditional yo-yo that returns easily',
  },
};

// Skill level metadata
export const SKILL_LEVEL_METADATA: Record<SkillLevel, { label: string; description: string }> = {
  never: {
    label: 'Never Played',
    description: "I've never used a yo-yo before",
  },
  beginner: {
    label: 'Beginner',
    description: 'I can do basic throws and catches',
  },
  intermediate: {
    label: 'Intermediate',
    description: 'I know some string tricks like Trapeze',
  },
  advanced: {
    label: 'Advanced',
    description: 'I can do complex combos and advanced tricks',
  },
  expert: {
    label: 'Expert',
    description: 'I compete or have extensive experience',
  },
};

// Initial state
const initialState: OnboardingState = {
  currentStep: 'welcome',
  skillLevel: null,
  goals: [],
  preferredStyles: [],
  isComplete: false,
  recommendedPathId: null,
  completedAt: null,
  startedAt: null,
};

// Store
export const useOnboardingStore = create<OnboardingStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      nextStep: () => {
        const state = get();
        const currentIndex = STEP_ORDER.indexOf(state.currentStep);

        if (currentIndex < STEP_ORDER.length - 1) {
          const nextStep = STEP_ORDER[currentIndex + 1];
          if (nextStep) {
            set({
              currentStep: nextStep,
              startedAt: state.startedAt || new Date().toISOString(),
            });
          }
        }
      },

      prevStep: () => {
        const state = get();
        const currentIndex = STEP_ORDER.indexOf(state.currentStep);

        if (currentIndex > 0) {
          const prevStep = STEP_ORDER[currentIndex - 1];
          if (prevStep) {
            set({ currentStep: prevStep });
          }
        }
      },

      goToStep: (step: OnboardingStep) => {
        const state = get();
        set({
          currentStep: step,
          startedAt: state.startedAt || new Date().toISOString(),
        });
      },

      setSkillLevel: (level: SkillLevel) => {
        set({ skillLevel: level });
      },

      setGoals: (goals: Goal[]) => {
        set({ goals });
      },

      toggleGoal: (goal: Goal) => {
        const state = get();
        const exists = state.goals.includes(goal);

        set({
          goals: exists
            ? state.goals.filter((g) => g !== goal)
            : [...state.goals, goal],
        });
      },

      setPreferredStyles: (styles: PreferredStyle[]) => {
        set({ preferredStyles: styles });
      },

      togglePreferredStyle: (style: PreferredStyle) => {
        const state = get();
        const exists = state.preferredStyles.includes(style);

        set({
          preferredStyles: exists
            ? state.preferredStyles.filter((s) => s !== style)
            : [...state.preferredStyles, style],
        });
      },

      setRecommendedPath: (pathId: string) => {
        set({ recommendedPathId: pathId });
      },

      completeOnboarding: () => {
        set({
          isComplete: true,
          currentStep: 'complete',
          completedAt: new Date().toISOString(),
        });
      },

      resetOnboarding: () => {
        set({
          ...initialState,
          startedAt: new Date().toISOString(),
        });
      },

      skipOnboarding: () => {
        set({
          isComplete: true,
          currentStep: 'complete',
          completedAt: new Date().toISOString(),
          // Set defaults for skipped onboarding
          skillLevel: 'beginner',
          goals: ['learn_basics'],
          preferredStyles: ['1A'],
        });
      },
    }),
    {
      name: 'yoyo-onboarding-storage',
      storage: createJSONStorage(() => localStorage),
      // Only persist completion status and user selections
      partialize: (state) => ({
        isComplete: state.isComplete,
        completedAt: state.completedAt,
        skillLevel: state.skillLevel,
        goals: state.goals,
        preferredStyles: state.preferredStyles,
        recommendedPathId: state.recommendedPathId,
      }),
      skipHydration: true,
    }
  )
);

// Selectors
export const selectCurrentStep = (state: OnboardingStore) => state.currentStep;
export const selectSkillLevel = (state: OnboardingStore) => state.skillLevel;
export const selectGoals = (state: OnboardingStore) => state.goals;
export const selectPreferredStyles = (state: OnboardingStore) => state.preferredStyles;
export const selectIsComplete = (state: OnboardingStore) => state.isComplete;
export const selectRecommendedPathId = (state: OnboardingStore) => state.recommendedPathId;

// Derived selectors
export const selectStepIndex = (state: OnboardingStore) =>
  STEP_ORDER.indexOf(state.currentStep);

export const selectTotalSteps = () => STEP_ORDER.length;

export const selectStepProgress = (state: OnboardingStore) => {
  const currentIndex = STEP_ORDER.indexOf(state.currentStep);
  return {
    current: currentIndex + 1,
    total: STEP_ORDER.length,
    percentage: ((currentIndex + 1) / STEP_ORDER.length) * 100,
  };
};

export const selectCanProceed = (state: OnboardingStore): boolean => {
  switch (state.currentStep) {
    case 'welcome':
      return true;
    case 'skill_level':
      return state.skillLevel !== null;
    case 'goals':
      return state.goals.length > 0;
    case 'preferred_styles':
      return state.preferredStyles.length > 0;
    case 'recommended_path':
      return true;
    case 'complete':
      return true;
    default:
      return false;
  }
};

// URL-based canProceed check - use this for URL-based navigation
export const selectCanProceedForStep = (step: OnboardingStep) => (state: OnboardingStore): boolean => {
  switch (step) {
    case 'welcome':
      return true;
    case 'skill_level':
      return state.skillLevel !== null;
    case 'goals':
      return state.goals.length > 0;
    case 'preferred_styles':
      return state.preferredStyles.length > 0;
    case 'recommended_path':
      return true;
    case 'complete':
      return true;
    default:
      return false;
  }
};

export const selectIsFirstStep = (state: OnboardingStore) =>
  state.currentStep === STEP_ORDER[0];

export const selectIsLastStep = (state: OnboardingStore) =>
  state.currentStep === STEP_ORDER[STEP_ORDER.length - 1];

export const selectHasGoal = (goal: Goal) => (state: OnboardingStore) =>
  state.goals.includes(goal);

export const selectHasStyle = (style: PreferredStyle) => (state: OnboardingStore) =>
  state.preferredStyles.includes(style);

// Recommendation logic selector
export const selectRecommendedPaths = (state: OnboardingStore): string[] => {
  const { skillLevel, goals, preferredStyles } = state;
  const recommendations: string[] = [];

  // Basic logic for path recommendations based on user input
  if (skillLevel === 'never' || skillLevel === 'beginner') {
    recommendations.push('absolute-beginner-path');
  }

  if (goals.includes('master_string_tricks') || preferredStyles.includes('1A')) {
    if (skillLevel === 'intermediate') {
      recommendations.push('intermediate-1a-path');
    } else if (skillLevel === 'advanced' || skillLevel === 'expert') {
      recommendations.push('advanced-1a-path');
    }
  }

  if (preferredStyles.includes('2A')) {
    recommendations.push('looping-fundamentals-path');
  }

  if (preferredStyles.includes('4A')) {
    recommendations.push('offstring-basics-path');
  }

  if (preferredStyles.includes('5A')) {
    recommendations.push('counterweight-intro-path');
  }

  if (goals.includes('compete')) {
    recommendations.push('competition-prep-path');
  }

  // Default fallback
  if (recommendations.length === 0) {
    recommendations.push('getting-started-path');
  }

  return recommendations;
};

// Hydration helper for SSR
export const hydrateOnboardingStore = () => {
  if (typeof window !== 'undefined') {
    useOnboardingStore.persist.rehydrate();
  }
};

// Export constants
export { STEP_ORDER };
