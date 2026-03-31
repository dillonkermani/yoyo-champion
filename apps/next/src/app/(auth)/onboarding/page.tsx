"use client";
import { Suspense } from 'react';
import { OnboardingScreen } from '@yoyo/ui';
import { useOnboardingFlow, ONBOARDING_STEPS, useOnboardingStore } from '@yoyo/store';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';

export default function OnboardingPage() {
  return (
    <Suspense>
      <OnboardingContent />
    </Suspense>
  );
}

function OnboardingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const didSyncFromUrl = useRef(false);

  const flow = useOnboardingFlow(() => router.replace('/signup'));

  // On mount, restore step from URL if present
  useEffect(() => {
    const urlStep = searchParams.get('step');
    if (urlStep && !didSyncFromUrl.current) {
      const step = ONBOARDING_STEPS.find((s) => s.key === urlStep);
      if (step) {
        useOnboardingStore.getState().goToStep(step.key);
      }
      didSyncFromUrl.current = true;
    }
  }, [searchParams]);

  // Sync step index to URL
  useEffect(() => {
    const stepKey = ONBOARDING_STEPS[flow.stepIndex]?.key;
    if (stepKey) {
      const currentUrlStep = searchParams.get('step');
      if (currentUrlStep !== stepKey) {
        router.replace(`/onboarding?step=${stepKey}`, { scroll: false });
      }
    }
  }, [flow.stepIndex, searchParams, router]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#F7F8FA' }}>
    <OnboardingScreen
      stepIndex={flow.stepIndex}
      totalSteps={flow.totalSteps}
      questionTitle={flow.config.questionTitle}
      questionEmoji={flow.config.questionEmoji}
      questionSubtitle={flow.config.questionSubtitle}
      screenType={flow.config.type}
      choices={flow.config.choices ?? []}
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
