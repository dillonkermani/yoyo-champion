import { useOnboardingStore, STEP_ORDER } from './onboarding-store';
import type { OnboardingStep, SkillLevel, Goal, AccountUser, CurrentYoyoType } from './onboarding-store';

export interface OnboardingChoice {
  id: string;
  label: string;
  emoji: string;
  description?: string;
}

export type OnboardingScreenType = 'welcome' | 'choices' | 'quick_info' | 'auth' | 'video';

export interface OnboardingStepConfig {
  key: OnboardingStep;
  questionTitle: string;
  questionEmoji: string;
  questionSubtitle: string;
  type: OnboardingScreenType;
  choices?: OnboardingChoice[];
  multiSelect?: boolean;
  hasTextInput?: boolean;
  hasSubQuestion?: boolean;
}

export const ONBOARDING_STEPS: OnboardingStepConfig[] = [
  {
    key: 'welcome',
    questionTitle: 'Learn Yoyo the Right Way',
    questionEmoji: '🪀',
    questionSubtitle: 'Built by a 2x World Champion.',
    type: 'welcome',
  },
  {
    key: 'account_user',
    questionTitle: 'Who will be using this account?',
    questionEmoji: '👤',
    questionSubtitle: 'Help us set up the right experience.',
    type: 'choices',
    choices: [
      { id: 'self', label: 'I will be using it', emoji: '👤' },
      { id: 'child', label: 'My child will be using it', emoji: '👶' },
      { id: 'other', label: "I'm setting this up for someone else", emoji: '🎁' },
    ],
    hasSubQuestion: true,
  },
  {
    key: 'experience',
    questionTitle: 'What is your yoyo experience level?',
    questionEmoji: '🎯',
    questionSubtitle: 'This helps us tailor your learning path.',
    type: 'choices',
    choices: [
      { id: 'brand_new', label: "I'm brand new", emoji: '🌱' },
      { id: 'beginner_tricks', label: 'I know a few beginner tricks', emoji: '🎈' },
      { id: 'can_bind', label: 'I can bind consistently', emoji: '🔄' },
      { id: 'advanced', label: 'I am an advanced player', emoji: '🏆' },
    ],
  },
  {
    key: 'quick_info',
    questionTitle: 'A few quick questions',
    questionEmoji: '📋',
    questionSubtitle: 'Help us personalize your experience.',
    type: 'quick_info',
  },
  {
    key: 'current_yoyo',
    questionTitle: 'What kind of yoyo are you using?',
    questionEmoji: '🪀',
    questionSubtitle: 'This helps us recommend the right gear.',
    type: 'choices',
    choices: [
      { id: 'none', label: "I don't have a yoyo yet", emoji: '🛒' },
      { id: 'responsive', label: 'Responsive beginner yoyo', emoji: '🟢' },
      { id: 'unresponsive', label: 'Unresponsive yoyo', emoji: '🔵' },
      { id: 'other', label: 'Other', emoji: '🤔' },
    ],
    hasTextInput: true,
  },
  {
    key: 'goal',
    questionTitle: 'What do you want to achieve?',
    questionEmoji: '🎯',
    questionSubtitle: 'Pick the one that fits you best.',
    type: 'choices',
    choices: [
      { id: 'learn_first', label: 'Learn my first tricks', emoji: '🌟' },
      { id: 'level_up', label: 'Level up to advanced tricks', emoji: '📈' },
      { id: 'compete', label: 'Compete or perform', emoji: '🏅' },
      { id: 'other', label: 'Other', emoji: '💭' },
    ],
    hasTextInput: true,
  },
  {
    key: 'account_creation',
    questionTitle: 'Create Your Account',
    questionEmoji: '🔐',
    questionSubtitle: 'Sign up to save your progress.',
    type: 'auth',
  },
  {
    key: 'intro_video',
    questionTitle: 'One Last Thing...',
    questionEmoji: '🎬',
    questionSubtitle: 'Watch this quick intro to unlock the full app.',
    type: 'video',
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

  // Map store state to selected choice IDs for the current step
  const getSelectedChoiceIds = (): string[] => {
    switch (config.key) {
      case 'account_user':
        return store.accountUser ? [store.accountUser] : [];
      case 'experience':
        return store.skillLevel ? [store.skillLevel] : [];
      case 'current_yoyo':
        return store.currentYoyoType ? [store.currentYoyoType] : [];
      case 'goal':
        return store.goal ? [store.goal] : [];
      default:
        return [];
    }
  };

  const selectedChoiceIds = getSelectedChoiceIds();

  // Handle choice selection for the current step
  const handleChoicePress = (id: string) => {
    switch (config.key) {
      case 'account_user':
        store.setAccountUser(id as AccountUser);
        // Reset sub-question when changing main selection
        if (id === 'self') {
          store.setIsChildUnder13(false);
        }
        break;
      case 'experience':
        store.setSkillLevel(id as SkillLevel);
        break;
      case 'current_yoyo':
        store.setCurrentYoyoType(id as CurrentYoyoType);
        if (id !== 'other') {
          store.setCurrentYoyoOther('');
        }
        break;
      case 'goal':
        store.setGoal(id as Goal);
        if (id !== 'other') {
          store.setGoalText('');
        }
        break;
    }
  };

  // Sub-question for account_user step (under-13 check)
  const showSubQuestion = config.key === 'account_user' &&
    (store.accountUser === 'child' || store.accountUser === 'other');

  const subQuestionTitle = store.accountUser === 'child'
    ? 'Is your child under 13?'
    : 'Is the person under 13?';

  const subQuestionChoices = [
    { id: 'yes', label: 'Yes' },
    { id: 'no', label: 'No' },
  ];

  const selectedSubChoiceId = store.isChildUnder13 === null
    ? null
    : store.isChildUnder13 ? 'yes' : 'no';

  const handleSubChoicePress = (id: string) => {
    store.setIsChildUnder13(id === 'yes');
  };

  // Text input state for "Other" options
  const getTextInputValue = (): string => {
    if (config.key === 'current_yoyo') return store.currentYoyoOther ?? '';
    if (config.key === 'goal') return store.goalText ?? '';
    return '';
  };

  const handleTextInputChange = (text: string) => {
    if (config.key === 'current_yoyo') store.setCurrentYoyoOther(text);
    if (config.key === 'goal') store.setGoalText(text);
  };

  const getTextInputPlaceholder = (): string => {
    if (config.key === 'current_yoyo') return 'What yoyo do you have?';
    if (config.key === 'goal') return 'What is your goal?';
    return '';
  };

  // Show text input only when "other" is selected
  const shouldShowTextInput = config.hasTextInput === true && selectedChoiceIds.includes('other');

  // Determine if next is disabled
  const getIsNextDisabled = (): boolean => {
    switch (config.key) {
      case 'welcome':
        return false;
      case 'account_user':
        if (!store.accountUser) return true;
        if (showSubQuestion && store.isChildUnder13 === null) return true;
        return false;
      case 'experience':
        return store.skillLevel === null;
      case 'quick_info':
        return false; // all optional
      case 'current_yoyo':
        return store.currentYoyoType === null;
      case 'goal':
        return store.goal === null;
      case 'account_creation':
        return false; // placeholder
      case 'intro_video':
        return false;
      default:
        return true;
    }
  };

  // Get appropriate button text
  const getNextButtonText = (): string => {
    if (config.key === 'welcome') return 'Start';
    if (config.key === 'intro_video') return 'Continue';
    if (config.key === 'account_creation') return 'Continue';
    return 'Next';
  };

  const handleNext = () => {
    if (clampedIndex < ONBOARDING_STEPS.length - 1) {
      store.nextStep();
    } else {
      store.completeOnboarding();
      onComplete();
    }
  };

  const handleBack = () => {
    if (clampedIndex > 0) {
      store.prevStep();
    }
  };

  const handleSkip = () => {
    store.skipOnboarding();
    onComplete();
  };

  return {
    stepIndex: clampedIndex,
    totalSteps: ONBOARDING_STEPS.length,
    config,
    selectedChoiceIds,
    handleChoicePress,
    handleNext,
    handleBack,
    handleSkip,
    // Sub-question
    showSubQuestion,
    subQuestionTitle,
    subQuestionChoices,
    selectedSubChoiceId,
    handleSubChoicePress,
    // Text input
    shouldShowTextInput,
    textInputValue: getTextInputValue(),
    handleTextInputChange,
    textInputPlaceholder: getTextInputPlaceholder(),
    // Quick info
    handedness: store.handedness,
    handleHandednessChange: store.setHandedness,
    videoMirror: store.videoMirror,
    handleVideoMirrorToggle: () => store.setVideoMirror(!store.videoMirror),
    country: store.country,
    handleCountryChange: store.setCountry,
    region: store.region,
    handleRegionChange: store.setRegion,
    // Auth
    isChildUnder13: store.isChildUnder13,
    // Navigation state
    isNextDisabled: getIsNextDisabled(),
    nextButtonText: getNextButtonText(),
  };
}
