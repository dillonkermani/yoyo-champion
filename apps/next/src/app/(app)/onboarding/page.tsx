"use client";
import { OnboardingScreen } from '@yoyo/ui';
import { useOnboardingFlow, useUserStore, selectIsAuthenticated } from '@yoyo/store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function OnboardingPage() {
  const router = useRouter();
  const isAuthenticated = useUserStore(selectIsAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) router.replace('/login');
  }, [isAuthenticated, router]);

  const flow = useOnboardingFlow(() => router.replace('/dashboard'));

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
