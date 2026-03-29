import { OnboardingScreen } from '@yoyo/ui';
import { useOnboardingFlow } from '@yoyo/store';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function OnboardingIndex() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const flow = useOnboardingFlow(() => router.replace('/auth'));

  return (
    <OnboardingScreen
      paddingTop={insets.top}
      stepIndex={flow.stepIndex}
      totalSteps={flow.totalSteps}
      questionTitle={flow.config.questionTitle}
      questionEmoji={flow.config.questionEmoji}
      questionSubtitle={flow.config.questionSubtitle}
      choices={flow.config.choices ?? []}
      selectedChoiceIds={flow.selectedChoiceIds}
      multiSelect={flow.config.multiSelect}
      onChoicePress={flow.handleChoicePress}
      onNext={flow.handleNext}
      onSkip={flow.handleSkip}
    />
  );
}
