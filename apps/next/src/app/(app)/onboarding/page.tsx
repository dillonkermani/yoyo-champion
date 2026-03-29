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
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'stretch', minHeight: '100vh' }}>
    <OnboardingScreen
      stepIndex={flow.stepIndex}
      totalSteps={flow.totalSteps}
      questionTitle={flow.config.questionTitle}
      questionEmoji={flow.config.questionEmoji}
      questionSubtitle={flow.config.questionSubtitle}
      screenType={flow.config.type}
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
      onNext={flow.handleNext}
      onSkip={flow.handleSkip}
      onBack={flow.handleBack}
      isNextDisabled={flow.isNextDisabled}
      nextButtonText={flow.nextButtonText}
    />
    </div>
  );
}
