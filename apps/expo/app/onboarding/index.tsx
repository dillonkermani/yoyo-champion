import { OnboardingScreen } from '@yoyo/ui';
import { useOnboardingStore, STEP_ORDER, SKILL_LEVEL_METADATA, GOAL_METADATA, STYLE_METADATA } from '@yoyo/store';
import { useRouter } from 'expo-router';

const STEP_CONFIG = [
  {
    id: 'skill-level' as const,
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
    id: 'goals' as const,
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
    id: 'styles' as const,
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

export default function OnboardingIndex() {
  const router = useRouter();
  const store = useOnboardingStore();
  const stepIndex = STEP_ORDER.indexOf(store.currentStep);
  const clampedIndex = Math.min(Math.max(stepIndex, 0), STEP_CONFIG.length - 1);
  const config = STEP_CONFIG[clampedIndex]!;

  const selectedChoiceIds = clampedIndex === 0
    ? (store.skillLevel ? [store.skillLevel] : [])
    : clampedIndex === 1
    ? (store.goals ?? [])
    : (store.preferredStyles ?? []);

  const handleChoicePress = (id: string) => {
    if (config.id === 'skill-level') store.setSkillLevel(id as any);
    else if (config.id === 'goals') store.toggleGoal(id as any);
    else store.togglePreferredStyle(id as any);
  };

  const handleNext = () => {
    if (clampedIndex < STEP_CONFIG.length - 1) {
      store.nextStep();
    } else {
      store.completeOnboarding();
      router.replace('/(tabs)');
    }
  };

  return (
    <OnboardingScreen
      stepIndex={clampedIndex}
      totalSteps={STEP_CONFIG.length}
      questionTitle={config.questionTitle}
      questionEmoji={config.questionEmoji}
      questionSubtitle={config.questionSubtitle}
      choices={config.getChoices()}
      selectedChoiceIds={selectedChoiceIds as string[]}
      multiSelect={config.multiSelect}
      onChoicePress={handleChoicePress}
      onNext={handleNext}
      onSkip={() => {
        store.completeOnboarding();
        router.replace('/(tabs)');
      }}
    />
  );
}
