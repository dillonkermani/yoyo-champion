import { useOnboardingStore, STEP_ORDER, SKILL_LEVEL_METADATA, GOAL_METADATA, STYLE_METADATA } from './onboarding-store';
import type { SkillLevel, Goal, PreferredStyle } from './onboarding-store';

export interface OnboardingStepConfig {
  id: 'skill-level' | 'goals' | 'styles';
  questionTitle: string;
  questionEmoji: string;
  questionSubtitle: string;
  multiSelect: boolean;
  getChoices: () => { id: string; label: string; description: string }[];
}

export const ONBOARDING_STEPS: OnboardingStepConfig[] = [
  {
    id: 'skill-level',
    questionTitle: "What's your yo-yo skill level?",
    questionEmoji: '🎯',
    questionSubtitle: 'This helps us tailor your learning path.',
    multiSelect: false,
    getChoices: () => Object.entries(SKILL_LEVEL_METADATA).map(([id, meta]) => ({
      id,
      label: meta.label,
      description: meta.description,
    })),
  },
  {
    id: 'goals',
    questionTitle: 'What are your goals?',
    questionEmoji: '🏆',
    questionSubtitle: 'Select all that apply.',
    multiSelect: true,
    getChoices: () => Object.entries(GOAL_METADATA).map(([id, meta]) => ({
      id,
      label: meta.label,
      description: meta.description,
    })),
  },
  {
    id: 'styles',
    questionTitle: 'Which yo-yo styles interest you?',
    questionEmoji: '✨',
    questionSubtitle: 'Select all that apply.',
    multiSelect: true,
    getChoices: () => Object.entries(STYLE_METADATA).map(([id, meta]) => ({
      id,
      label: meta.label,
      description: meta.description,
    })),
  },
];

/**
 * Shared onboarding flow logic — returns everything the OnboardingScreen needs.
 * Caller provides `onComplete` callback to handle platform-specific navigation.
 */
export function useOnboardingFlow(onComplete: () => void) {
  const store = useOnboardingStore();
  const stepIndex = STEP_ORDER.indexOf(store.currentStep);
  const clampedIndex = Math.min(Math.max(stepIndex, 0), ONBOARDING_STEPS.length - 1);
  const config = ONBOARDING_STEPS[clampedIndex]!;

  const selectedChoiceIds = clampedIndex === 0
    ? (store.skillLevel ? [store.skillLevel] : [])
    : clampedIndex === 1
    ? (store.goals ?? [])
    : (store.preferredStyles ?? []);

  const handleChoicePress = (id: string) => {
    if (config.id === 'skill-level') store.setSkillLevel(id as SkillLevel);
    else if (config.id === 'goals') store.toggleGoal(id as Goal);
    else store.togglePreferredStyle(id as PreferredStyle);
  };

  const handleNext = () => {
    if (clampedIndex < ONBOARDING_STEPS.length - 1) {
      store.nextStep();
    } else {
      store.completeOnboarding();
      onComplete();
    }
  };

  const handleSkip = () => {
    store.completeOnboarding();
    onComplete();
  };

  return {
    stepIndex: clampedIndex,
    totalSteps: ONBOARDING_STEPS.length,
    config,
    selectedChoiceIds: selectedChoiceIds as string[],
    handleChoicePress,
    handleNext,
    handleSkip,
  };
}
