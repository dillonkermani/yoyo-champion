"use client";
import { OnboardingScreen } from '@yoyo/ui';
import { useOnboardingFlow, useUserStore, selectIsAuthenticated } from '@yoyo/store';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function OnboardingPage() {
  const router = useRouter();
  const isAuthenticated = useUserStore(selectIsAuthenticated);
  const [hydrated, setHydrated] = useState(() => useUserStore.persist.hasHydrated());

  useEffect(() => {
    const unsub = useUserStore.persist.onFinishHydration(() => setHydrated(true));
    if (useUserStore.persist.hasHydrated()) setHydrated(true);
    return unsub;
  }, []);

  useEffect(() => {
    if (hydrated && !isAuthenticated) router.replace('/login');
  }, [hydrated, isAuthenticated, router]);

  const flow = useOnboardingFlow(() => router.replace('/dashboard'));

  return (
    <OnboardingScreen
      stepIndex={flow.stepIndex}
      totalSteps={flow.totalSteps}
      screenType={flow.config.type}
      questionTitle={flow.config.questionTitle}
      questionEmoji={flow.config.questionEmoji}
      questionSubtitle={flow.config.questionSubtitle}
      choices={flow.config.choices}
      selectedChoiceIds={flow.selectedChoiceIds}
      multiSelect={flow.config.multiSelect}
      onChoicePress={flow.handleChoicePress}
      hasTextInput={flow.shouldShowTextInput}
      textInputValue={flow.textInputValue}
      onTextInputChange={flow.handleTextInputChange}
      textInputPlaceholder={flow.textInputPlaceholder}
      showSubQuestion={flow.showSubQuestion}
      subQuestionTitle={flow.subQuestionTitle}
      subQuestionChoices={flow.subQuestionChoices}
      selectedSubChoiceId={flow.selectedSubChoiceId}
      onSubChoicePress={flow.handleSubChoicePress}
      handedness={flow.handedness}
      onHandednessChange={flow.handleHandednessChange}
      videoMirror={flow.videoMirror}
      onVideoMirrorToggle={flow.handleVideoMirrorToggle}
      country={flow.country}
      onCountryChange={flow.handleCountryChange}
      region={flow.region}
      onRegionChange={flow.handleRegionChange}
      isChildUnder13={flow.isChildUnder13}
      isNextDisabled={flow.isNextDisabled}
      nextButtonText={flow.nextButtonText}
      onNext={flow.handleNext}
      onBack={flow.handleBack}
      onSkip={flow.handleSkip}
    />
  );
}
