import { OnboardingScreen } from '@yoyo/ui';
import { useOnboardingFlow } from '@yoyo/store';
import { useRouter } from 'expo-router';

export default function OnboardingIndex() {
  const router = useRouter();
  const flow = useOnboardingFlow(() => router.replace('/(tabs)'));

  return (
    <OnboardingScreen
      stepIndex={flow.stepIndex}
      totalSteps={flow.totalSteps}
      questionTitle={flow.config.questionTitle}
      questionEmoji={flow.config.questionEmoji}
      questionSubtitle={flow.config.questionSubtitle}
      choices={flow.config.getChoices()}
      selectedChoiceIds={flow.selectedChoiceIds}
      multiSelect={flow.config.multiSelect}
      onChoicePress={flow.handleChoicePress}
      onNext={flow.handleNext}
      onSkip={flow.handleSkip}
    />
  );
}
