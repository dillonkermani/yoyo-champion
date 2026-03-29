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
      screenType={flow.config.type}
      choices={flow.config.choices ?? []}
      selectedChoiceIds={flow.selectedChoiceIds}
      multiSelect={flow.config.multiSelect}
      onChoicePress={flow.handleChoicePress}
      onNext={flow.handleNext}
      onBack={flow.handleBack}
      onSkip={flow.handleSkip}
      isNextDisabled={flow.isNextDisabled}
      nextButtonText={flow.nextButtonText}
      hasTextInput={flow.config.hasTextInput}
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
    />
  );
}
