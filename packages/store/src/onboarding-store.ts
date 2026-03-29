import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { getStorage } from './storage';

// Types
export type SkillLevel = 'brand_new' | 'beginner_tricks' | 'can_bind' | 'advanced';

export type Goal = 'learn_first' | 'level_up' | 'compete' | 'other';

export type AccountUser = 'self' | 'child' | 'other';

export type CurrentYoyoType = 'none' | 'responsive' | 'unresponsive' | 'other';

export type OnboardingStep =
  | 'welcome' | 'account_user' | 'experience' | 'quick_info'
  | 'current_yoyo' | 'goal' | 'account_creation' | 'intro_video';

export interface OnboardingState {
  currentStep: OnboardingStep;
  // Step 2: Account user
  accountUser: AccountUser | null;
  isChildUnder13: boolean | null;
  parentEmail: string | null;
  // Step 3: Experience
  skillLevel: SkillLevel | null;
  // Step 4: Quick info
  handedness: 'left' | 'right' | null;
  videoMirror: boolean;
  country: string | null;
  region: string | null;
  // Step 5: Current yoyo
  currentYoyoType: CurrentYoyoType | null;
  currentYoyoOther: string | null;
  shouldRecommendMasterPack: boolean;
  // Step 6: Goal
  goal: Goal | null;
  goalText: string | null;
  // Completion
  isComplete: boolean;
  recommendedPathId: string | null;
  completedAt: string | null;
  startedAt: string | null;
}

export interface OnboardingActions {
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: OnboardingStep) => void;
  setAccountUser: (user: AccountUser) => void;
  setIsChildUnder13: (value: boolean) => void;
  setParentEmail: (email: string) => void;
  setSkillLevel: (level: SkillLevel) => void;
  setHandedness: (handedness: 'left' | 'right') => void;
  setVideoMirror: (mirror: boolean) => void;
  setCountry: (country: string) => void;
  setRegion: (region: string) => void;
  setCurrentYoyoType: (type: CurrentYoyoType) => void;
  setCurrentYoyoOther: (text: string) => void;
  setGoal: (goal: Goal) => void;
  setGoalText: (text: string) => void;
  setRecommendedPath: (pathId: string) => void;
  completeOnboarding: () => void;
  resetOnboarding: () => void;
  skipOnboarding: () => void;
}

export type OnboardingStore = OnboardingState & OnboardingActions;

const STEP_ORDER: OnboardingStep[] = [
  'welcome', 'account_user', 'experience', 'quick_info',
  'current_yoyo', 'goal', 'account_creation', 'intro_video',
];

export const SKILL_LEVEL_METADATA: Record<SkillLevel, { label: string; description: string }> = {
  brand_new: { label: "I'm brand new", description: "Never used a yo-yo before" },
  beginner_tricks: { label: 'I know a few beginner tricks', description: 'Can do basic throws and sleepers' },
  can_bind: { label: 'I can bind consistently', description: 'Comfortable with unresponsive play' },
  advanced: { label: 'I am an advanced player', description: 'Can do complex combos and tricks' },
};

const initialState: OnboardingState = {
  currentStep: 'welcome',
  accountUser: null,
  isChildUnder13: null,
  parentEmail: null,
  skillLevel: null,
  handedness: null,
  videoMirror: false,
  country: null,
  region: null,
  currentYoyoType: null,
  currentYoyoOther: null,
  shouldRecommendMasterPack: false,
  goal: null,
  goalText: null,
  isComplete: false,
  recommendedPathId: null,
  completedAt: null,
  startedAt: null,
};

export const useOnboardingStore = create<OnboardingStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      nextStep: () => {
        const state = get();
        const currentIndex = STEP_ORDER.indexOf(state.currentStep);
        if (currentIndex < STEP_ORDER.length - 1) {
          const nextStep = STEP_ORDER[currentIndex + 1];
          if (nextStep) set({ currentStep: nextStep, startedAt: state.startedAt || new Date().toISOString() });
        }
      },

      prevStep: () => {
        const state = get();
        const currentIndex = STEP_ORDER.indexOf(state.currentStep);
        if (currentIndex > 0) {
          const prevStep = STEP_ORDER[currentIndex - 1];
          if (prevStep) set({ currentStep: prevStep });
        }
      },

      goToStep: (step: OnboardingStep) => {
        const state = get();
        set({ currentStep: step, startedAt: state.startedAt || new Date().toISOString() });
      },

      setAccountUser: (user: AccountUser) => { set({ accountUser: user }); },
      setIsChildUnder13: (value: boolean) => { set({ isChildUnder13: value }); },
      setParentEmail: (email: string) => { set({ parentEmail: email }); },
      setSkillLevel: (level: SkillLevel) => { set({ skillLevel: level }); },
      setHandedness: (handedness: 'left' | 'right') => { set({ handedness }); },
      setVideoMirror: (mirror: boolean) => { set({ videoMirror: mirror }); },
      setCountry: (country: string) => { set({ country }); },
      setRegion: (region: string) => { set({ region }); },
      setCurrentYoyoType: (type: CurrentYoyoType) => {
        const shouldRecommend = type === 'none' || type === 'other';
        set({ currentYoyoType: type, shouldRecommendMasterPack: shouldRecommend });
      },
      setCurrentYoyoOther: (text: string) => { set({ currentYoyoOther: text }); },
      setGoal: (goal: Goal) => { set({ goal }); },
      setGoalText: (text: string) => { set({ goalText: text }); },
      setRecommendedPath: (pathId: string) => { set({ recommendedPathId: pathId }); },

      completeOnboarding: () => {
        set({ isComplete: true, currentStep: 'intro_video', completedAt: new Date().toISOString() });
      },

      resetOnboarding: () => {
        set({ ...initialState, startedAt: new Date().toISOString() });
      },

      skipOnboarding: () => {
        set({
          isComplete: true,
          currentStep: 'intro_video',
          completedAt: new Date().toISOString(),
          skillLevel: 'brand_new',
          goal: 'learn_first',
        });
      },
    }),
    {
      name: 'yoyo-onboarding-storage',
      storage: createJSONStorage(() => getStorage()),
      partialize: (state) => ({
        isComplete: state.isComplete,
        completedAt: state.completedAt,
        skillLevel: state.skillLevel,
        accountUser: state.accountUser,
        isChildUnder13: state.isChildUnder13,
        parentEmail: state.parentEmail,
        goal: state.goal,
        goalText: state.goalText,
        currentYoyoType: state.currentYoyoType,
        currentYoyoOther: state.currentYoyoOther,
        shouldRecommendMasterPack: state.shouldRecommendMasterPack,
        videoMirror: state.videoMirror,
        handedness: state.handedness,
        country: state.country,
        region: state.region,
        recommendedPathId: state.recommendedPathId,
      }),
      skipHydration: true,
    }
  )
);

// Selectors
export const selectCurrentStep = (state: OnboardingStore) => state.currentStep;
export const selectSkillLevel = (state: OnboardingStore) => state.skillLevel;
export const selectGoal = (state: OnboardingStore) => state.goal;
export const selectIsComplete = (state: OnboardingStore) => state.isComplete;
export const selectRecommendedPathId = (state: OnboardingStore) => state.recommendedPathId;
export const selectStepIndex = (state: OnboardingStore) => STEP_ORDER.indexOf(state.currentStep);
export const selectTotalSteps = () => STEP_ORDER.length;
export const selectStepProgress = (state: OnboardingStore) => {
  const currentIndex = STEP_ORDER.indexOf(state.currentStep);
  return { current: currentIndex + 1, total: STEP_ORDER.length, percentage: ((currentIndex + 1) / STEP_ORDER.length) * 100 };
};
export const selectCanProceed = (state: OnboardingStore): boolean => {
  switch (state.currentStep) {
    case 'welcome': return true;
    case 'account_user': return state.accountUser !== null;
    case 'experience': return state.skillLevel !== null;
    case 'quick_info': return true; // all fields optional (have defaults or "rather not say")
    case 'current_yoyo': return state.currentYoyoType !== null;
    case 'goal': return state.goal !== null;
    case 'account_creation': return true; // placeholder
    case 'intro_video': return true;
    default: return false;
  }
};
export const selectIsFirstStep = (state: OnboardingStore) => state.currentStep === STEP_ORDER[0];
export const selectIsLastStep = (state: OnboardingStore) => state.currentStep === STEP_ORDER[STEP_ORDER.length - 1];

export const selectRecommendedPaths = (state: OnboardingStore): string[] => {
  const { skillLevel, goal } = state;
  const recommendations: string[] = [];
  if (skillLevel === 'brand_new' || skillLevel === 'beginner_tricks') recommendations.push('absolute-beginner-path');
  if (skillLevel === 'can_bind') recommendations.push('intermediate-1a-path');
  if (skillLevel === 'advanced') recommendations.push('advanced-1a-path');
  if (goal === 'compete') recommendations.push('competition-prep-path');
  if (recommendations.length === 0) recommendations.push('getting-started-path');
  return recommendations;
};

export const hydrateOnboardingStore = () => { useOnboardingStore.persist.rehydrate(); };
export { STEP_ORDER };
