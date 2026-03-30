import { useOnboardingStore, STEP_ORDER, SKILL_LEVEL_METADATA, GOAL_METADATA, STYLE_METADATA } from './onboarding-store';
import type { SkillLevel, Goal, PreferredStyle } from './onboarding-store';

export type OnboardingStepId =
  | 'intro_video'
  | 'skill-level'
  | 'yoyo_experience'
  | 'goals'
  | 'favorite_yoyo'
  | 'styles'
  | 'handedness';

export interface OnboardingStepConfig {
  id: OnboardingStepId;
  questionTitle: string;
  questionEmoji: string;
  questionSubtitle: string;
  multiSelect: boolean;
  getChoices: () => { id: string; label: string; description: string }[];
}

export const ONBOARDING_STEPS: OnboardingStepConfig[] = [
  {
    id: 'intro_video',
    questionTitle: 'Welcome to YoYo Champion',
    questionEmoji: '🪀',
    questionSubtitle: 'Watch our intro to get started',
    multiSelect: false,
    getChoices: () => [
      { id: 'continue', label: 'Continue', description: '' },
    ],
  },
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
    id: 'yoyo_experience',
    questionTitle: 'How long have you been yo-yoing?',
    questionEmoji: '⏳',
    questionSubtitle: 'This helps us find the right content for you.',
    multiSelect: false,
    getChoices: () => [
      { id: 'just_starting', label: 'Just starting', description: '' },
      { id: 'few_months', label: 'A few months', description: '' },
      { id: '1_2_years', label: '1-2 years', description: '' },
      { id: '3_plus_years', label: '3+ years', description: '' },
      { id: '5_plus_years', label: '5+ years', description: '' },
    ],
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
    id: 'favorite_yoyo',
    questionTitle: "What's your favorite YoYo Champion yoyo?",
    questionEmoji: '🪀',
    questionSubtitle: 'Help us learn about your preferences.',
    multiSelect: false,
    getChoices: () => [
      { id: 'none_yet', label: "Haven't tried one yet", description: '' },
      { id: 'shutter', label: 'Shutter', description: '' },
      { id: 'replay_pro', label: 'Replay Pro', description: '' },
      { id: 'edge', label: 'Edge', description: '' },
      { id: 'other', label: 'Other', description: '' },
    ],
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
  {
    id: 'handedness',
    questionTitle: 'Which hand do you throw with?',
    questionEmoji: '🤚',
    questionSubtitle: "We'll mirror tutorial videos for left-handers",
    multiSelect: false,
    getChoices: () => [
      { id: 'right', label: 'Right hand', description: '' },
      { id: 'left', label: 'Left hand', description: '' },
    ],
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

  const getSelectedChoiceIds = (): string[] => {
    switch (config.id) {
      case 'intro_video':
        return ['continue']; // Always "selected" so Next is enabled
      case 'skill-level':
        return store.skillLevel ? [store.skillLevel] : [];
      case 'yoyo_experience':
        // Store experience in favoriteYoyo temporarily (reused field)
        return store.favoriteYoyo ? [store.favoriteYoyo] : [];
      case 'goals':
        return store.goals ?? [];
      case 'favorite_yoyo':
        return store.favoriteYoyo ? [store.favoriteYoyo] : [];
      case 'styles':
        return store.preferredStyles ?? [];
      case 'handedness':
        return store.handedness ? [store.handedness] : [];
      default:
        return [];
    }
  };

  const selectedChoiceIds = getSelectedChoiceIds();

  const handleChoicePress = (id: string) => {
    switch (config.id) {
      case 'intro_video':
        // No-op, just proceed
        break;
      case 'skill-level':
        store.setSkillLevel(id as SkillLevel);
        break;
      case 'yoyo_experience':
        store.setFavoriteYoyo(id);
        break;
      case 'goals':
        store.toggleGoal(id as Goal);
        break;
      case 'favorite_yoyo':
        store.setFavoriteYoyo(id);
        break;
      case 'styles':
        store.togglePreferredStyle(id as PreferredStyle);
        break;
      case 'handedness':
        store.setHandedness(id as 'left' | 'right');
        break;
    }
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
    selectedChoiceIds,
    handleChoicePress,
    handleNext,
    handleSkip,
  };
}
