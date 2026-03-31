import React from 'react';
import { YStack, XStack, Input, ScrollView, Stack } from 'tamagui';
import { Switch as RNSwitch } from 'react-native';
import { Text } from '../Text';

export interface OnboardingChoice {
  id: string;
  label: string;
  emoji?: string;
  description?: string;
}

export interface OnboardingScreenProps {
  stepIndex: number;
  totalSteps: number;
  questionTitle: string;
  questionEmoji?: string;
  questionSubtitle?: string;
  screenType: 'welcome' | 'choices' | 'quick_info' | 'video';
  choices?: OnboardingChoice[];
  selectedChoiceIds?: string[];
  multiSelect?: boolean;
  onChoicePress?: (id: string) => void;
  hasTextInput?: boolean;
  textInputValue?: string;
  onTextInputChange?: (text: string) => void;
  textInputPlaceholder?: string;
  showSubQuestion?: boolean;
  subQuestionTitle?: string;
  subQuestionChoices?: { id: string; label: string }[];
  selectedSubChoiceId?: string | null;
  onSubChoicePress?: (id: string) => void;
  handedness?: 'left' | 'right' | null;
  onHandednessChange?: (h: 'left' | 'right') => void;
  videoMirror?: boolean;
  onVideoMirrorToggle?: () => void;
  country?: string | null;
  onCountryChange?: (c: string) => void;
  region?: string | null;
  onRegionChange?: (r: string) => void;
  isChildUnder13?: boolean | null;
  onNext: () => void;
  onSkip?: () => void;
  onBack?: () => void;
  paddingTop?: number;
  isNextDisabled?: boolean;
  nextButtonText?: string;
}

// ── Design Tokens ──────────────────────────────────────────────────────
const T = {
  bg: '#F7F8FA',
  cardBg: '#FFFFFF',
  text: '#0F1419',
  textSub: '#536471',
  muted: '#8899A6',
  border: '#E1E8ED',
  accent: '#1CB0F6',
  accentDark: '#0095DB',
  accentLight: '#E8F7FE',
  accentDisabled: '#B8E4FA',
  gold: '#FFC800',
  green: '#58CC02',
  white: '#FFFFFF',
  black: '#0F1419',
  warningBg: '#FEF3C7',
  warningText: '#92400E',
} as const;

// ── Progress Dots ──────────────────────────────────────────────────────
function ProgressDots({ current, total }: { current: number; total: number }) {
  return (
    <XStack gap={6} justifyContent="center" alignItems="center">
      {Array.from({ length: total }, (_, i) => (
        <Stack
          key={i}
          height={6}
          borderRadius={3}
          animation="quick"
          width={i === current ? 28 : i < current ? 8 : 6}
          backgroundColor={
            i === current ? T.accent : i < current ? T.accentDark : T.border
          }
          opacity={i === current ? 1 : i < current ? 0.7 : 0.4}
        />
      ))}
    </XStack>
  );
}

// ── Top Nav Bar ────────────────────────────────────────────────────────
function NavBar({
  stepIndex,
  totalSteps,
  onSkip,
  onBack,
}: {
  stepIndex: number;
  totalSteps: number;
  onSkip?: () => void;
  onBack?: () => void;
}) {
  return (
    <YStack gap={16} paddingBottom={8}>
      <XStack justifyContent="space-between" alignItems="center" height={40}>
        {onBack && stepIndex > 0 ? (
          <XStack
            onPress={onBack}
            cursor="pointer"
            animation="quick"
            pressStyle={{ opacity: 0.6 }}
            paddingVertical={8}
            paddingRight={12}
            gap={4}
            alignItems="center"
          >
            <Text fontSize={18} color={T.accent}>{'\u2190'}</Text>
            <Text fontSize={15} fontWeight="700" color={T.accent}>Back</Text>
          </XStack>
        ) : (
          <Stack width={60} />
        )}
        <Text fontSize={13} fontWeight="600" color={T.muted} letterSpacing={0.5}>
          {stepIndex + 1} / {totalSteps}
        </Text>
        {onSkip ? (
          <Text
            fontSize={14}
            color={T.muted}
            onPress={onSkip}
            cursor="pointer"
            fontWeight="600"
            animation="quick"
            pressStyle={{ opacity: 0.6 }}
          >
            Skip
          </Text>
        ) : (
          <Stack width={40} />
        )}
      </XStack>
      <ProgressDots current={stepIndex} total={totalSteps} />
    </YStack>
  );
}

// ── CTA Button ─────────────────────────────────────────────────────────
function CTAButton({
  label,
  onPress,
  disabled,
}: {
  label: string;
  onPress: () => void;
  disabled?: boolean;
}) {
  return (
    <YStack
      backgroundColor={disabled ? T.accentDisabled : T.accent}
      borderRadius={18}
      height={58}
      justifyContent="center"
      alignItems="center"
      onPress={disabled ? undefined : onPress}
      animation="quick"
      pressStyle={disabled ? {} : { scale: 0.97, opacity: 0.9, backgroundColor: T.accentDark }}
      cursor={disabled ? 'default' : 'pointer'}
      opacity={disabled ? 0.5 : 1}
      {...(disabled ? {} : {
        shadowColor: '#1CB0F6',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 14,
        shadowOpacity: 0.35,
        elevation: 4,
      })}
      marginTop={16}
    >
      <Text fontSize={18} fontWeight="800" color={T.white} letterSpacing={0.3}>
        {label}
      </Text>
    </YStack>
  );
}

// ── Choice Card ────────────────────────────────────────────────────────
function ChoiceCard({
  choice,
  isSelected,
  onPress,
}: {
  choice: OnboardingChoice;
  isSelected: boolean;
  onPress: () => void;
}) {
  return (
    <XStack
      backgroundColor={isSelected ? T.accentLight : T.cardBg}
      borderRadius={20}
      padding={18}
      paddingHorizontal={20}
      borderWidth={2.5}
      borderColor={isSelected ? T.accent : T.border}
      onPress={onPress}
      animation="quick"
      pressStyle={{ scale: 0.97, opacity: 0.9 }}
      hoverStyle={{ borderColor: isSelected ? T.accent : '#C4CDD5', scale: 1.01 }}
      cursor="pointer"
      gap={14}
      alignItems="center"
      {...(isSelected ? {
        shadowColor: '#1CB0F6',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 14,
        shadowOpacity: 0.35,
        elevation: 4,
      } : {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 4,
        shadowOpacity: 0.06,
        elevation: 2,
      })}
    >
      {choice.emoji && (
        <Stack
          width={52}
          height={52}
          borderRadius={16}
          backgroundColor={isSelected ? T.accent : '#EEF0F3'}
          justifyContent="center"
          alignItems="center"
        >
          <Text fontSize={24} lineHeight={28}>{choice.emoji}</Text>
        </Stack>
      )}
      <YStack flex={1} gap={2}>
        <Text
          fontSize={16}
          fontWeight="700"
          color={isSelected ? T.accent : T.text}
        >
          {choice.label}
        </Text>
        {choice.description && (
          <Text fontSize={13} color={T.textSub} lineHeight={18}>
            {choice.description}
          </Text>
        )}
      </YStack>
      {/* Checkmark */}
      {isSelected && (
        <Stack
          width={26}
          height={26}
          borderRadius={13}
          backgroundColor={T.accent}
          justifyContent="center"
          alignItems="center"
        >
          <Text fontSize={14} color={T.white} fontWeight="900">{'\u2713'}</Text>
        </Stack>
      )}
    </XStack>
  );
}

// ── Pill Button ────────────────────────────────────────────────────────
function PillButton({
  label,
  isSelected,
  onPress,
}: {
  label: string;
  isSelected: boolean;
  onPress: () => void;
}) {
  return (
    <YStack
      flex={1}
      backgroundColor={isSelected ? T.accent : T.cardBg}
      borderRadius={28}
      paddingVertical={14}
      paddingHorizontal={24}
      borderWidth={2.5}
      borderColor={isSelected ? T.accent : T.border}
      onPress={onPress}
      animation="quick"
      pressStyle={{ scale: 0.96, opacity: 0.9 }}
      hoverStyle={{ borderColor: isSelected ? T.accent : '#C4CDD5' }}
      cursor="pointer"
      alignItems="center"
      {...(isSelected ? {
        shadowColor: '#1CB0F6',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 14,
        shadowOpacity: 0.35,
        elevation: 4,
      } : {})}
    >
      <Text
        fontSize={16}
        fontWeight="700"
        color={isSelected ? T.white : T.text}
      >
        {label}
      </Text>
    </YStack>
  );
}

// ── Question Header ────────────────────────────────────────────────────
function QuestionHeader({
  emoji,
  title,
  subtitle,
  centered,
}: {
  emoji?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
}) {
  return (
    <YStack gap={10} alignItems={centered ? 'center' : 'flex-start'}>
      {emoji && (
        <Stack
          width={72}
          height={72}
          borderRadius={22}
          backgroundColor={T.accentLight}
          justifyContent="center"
          alignItems="center"
          marginBottom={4}
        >
          <Text fontSize={30} lineHeight={36}>{emoji}</Text>
        </Stack>
      )}
      <Text
        fontSize={28}
        fontWeight="900"
        color={T.text}
        letterSpacing={-0.8}
        textAlign={centered ? 'center' : 'left'}
        lineHeight={34}
      >
        {title}
      </Text>
      {subtitle && (
        <Text
          fontSize={16}
          color={T.textSub}
          lineHeight={24}
          textAlign={centered ? 'center' : 'left'}
        >
          {subtitle}
        </Text>
      )}
    </YStack>
  );
}

// ── Welcome Screen ─────────────────────────────────────────────────────
function WelcomeContent({
  questionEmoji,
  questionTitle,
  questionSubtitle,
}: {
  questionEmoji?: string;
  questionTitle: string;
  questionSubtitle?: string;
}) {
  return (
    <YStack flex={1} justifyContent="center" alignItems="center" gap={24} paddingHorizontal={16}>
      {/* Mascot circle */}
      <Stack
        width={120}
        height={120}
        borderRadius={60}
        backgroundColor={T.accentLight}
        justifyContent="center"
        alignItems="center"
        shadowColor="#1CB0F6"
        shadowOffset={{ width: 0, height: 2 }}
        shadowRadius={14}
        shadowOpacity={0.35}
        elevation={4}
      >
        <Text fontSize={48} lineHeight={56}>{questionEmoji || '\uD83E\uDE80'}</Text>
      </Stack>

      <YStack gap={12} alignItems="center">
        <Text
          fontSize={34}
          fontWeight="900"
          color={T.text}
          textAlign="center"
          letterSpacing={-1}
          lineHeight={40}
        >
          {questionTitle}
        </Text>
        {questionSubtitle && (
          <Text
            fontSize={18}
            color={T.textSub}
            textAlign="center"
            lineHeight={26}
          >
            {questionSubtitle}
          </Text>
        )}
      </YStack>

      {/* Feature pills */}
      <XStack gap={8} flexWrap="wrap" justifyContent="center" marginTop={8}>
        {[
          { emoji: '\uD83C\uDFAC', label: 'Video Tutorials' },
          { emoji: '\uD83C\uDFC6', label: 'Achievements' },
          { emoji: '\uD83D\uDD25', label: 'Daily Streaks' },
        ].map((f) => (
          <XStack
            key={f.label}
            backgroundColor={T.accentLight}
            borderRadius={20}
            paddingHorizontal={14}
            paddingVertical={8}
            gap={6}
            alignItems="center"
          >
            <Text fontSize={16} lineHeight={20}>{f.emoji}</Text>
            <Text fontSize={13} fontWeight="600" color={T.accentDark}>{f.label}</Text>
          </XStack>
        ))}
      </XStack>
    </YStack>
  );
}

// ── Choices Screen ─────────────────────────────────────────────────────
function ChoicesContent({
  questionEmoji,
  questionTitle,
  questionSubtitle,
  choices,
  selectedChoiceIds,
  onChoicePress,
  hasTextInput,
  textInputValue,
  onTextInputChange,
  textInputPlaceholder,
  showSubQuestion,
  subQuestionTitle,
  subQuestionChoices,
  selectedSubChoiceId,
  onSubChoicePress,
}: {
  questionEmoji?: string;
  questionTitle: string;
  questionSubtitle?: string;
  choices: OnboardingChoice[];
  selectedChoiceIds: string[];
  onChoicePress: (id: string) => void;
  hasTextInput?: boolean;
  textInputValue?: string;
  onTextInputChange?: (text: string) => void;
  textInputPlaceholder?: string;
  showSubQuestion?: boolean;
  subQuestionTitle?: string;
  subQuestionChoices?: { id: string; label: string }[];
  selectedSubChoiceId?: string | null;
  onSubChoicePress?: (id: string) => void;
}) {
  return (
    <YStack gap={28} flex={1}>
      <QuestionHeader emoji={questionEmoji} title={questionTitle} subtitle={questionSubtitle} />

      <YStack gap={12}>
        {choices.map((choice) => (
          <ChoiceCard
            key={choice.id}
            choice={choice}
            isSelected={selectedChoiceIds.includes(choice.id)}
            onPress={() => onChoicePress(choice.id)}
          />
        ))}
      </YStack>

      {hasTextInput && selectedChoiceIds.includes('other') && (
        <Input
          value={textInputValue ?? ''}
          onChangeText={onTextInputChange}
          placeholder={textInputPlaceholder ?? 'Please specify...'}
          borderRadius={16}
          borderWidth={2}
          borderColor={T.border}
          height={52}
          paddingHorizontal={16}
          fontSize={15}
          color={T.text}
          placeholderTextColor={T.muted}
          backgroundColor={T.cardBg}
          focusStyle={{ borderColor: T.accent }}
        />
      )}

      {showSubQuestion && subQuestionTitle && (
        <YStack gap={12}>
          <Text fontSize={17} fontWeight="700" color={T.text}>
            {subQuestionTitle}
          </Text>
          <XStack gap={12}>
            {subQuestionChoices?.map((sub) => (
              <PillButton
                key={sub.id}
                label={sub.label}
                isSelected={selectedSubChoiceId === sub.id}
                onPress={() => onSubChoicePress?.(sub.id)}
              />
            ))}
          </XStack>
        </YStack>
      )}
    </YStack>
  );
}

// ── Quick Info Screen ──────────────────────────────────────────────────
function QuickInfoContent({
  questionEmoji,
  questionTitle,
  questionSubtitle,
  handedness,
  onHandednessChange,
  videoMirror,
  onVideoMirrorToggle,
  country,
  onCountryChange,
  region,
  onRegionChange,
}: {
  questionEmoji?: string;
  questionTitle: string;
  questionSubtitle?: string;
  handedness?: 'left' | 'right' | null;
  onHandednessChange?: (h: 'left' | 'right') => void;
  videoMirror?: boolean;
  onVideoMirrorToggle?: () => void;
  country?: string | null;
  onCountryChange?: (c: string) => void;
  region?: string | null;
  onRegionChange?: (r: string) => void;
}) {
  return (
    <YStack gap={28} flex={1}>
      <QuestionHeader emoji={questionEmoji} title={questionTitle} subtitle={questionSubtitle} />

      {/* Handedness */}
      <YStack gap={10}>
        <Text fontSize={16} fontWeight="700" color={T.text}>
          Are you right or left handed?
        </Text>
        <XStack gap={12}>
          <PillButton label={'\u270B Left'} isSelected={handedness === 'left'} onPress={() => onHandednessChange?.('left')} />
          <PillButton label={'\u270B Right'} isSelected={handedness === 'right'} onPress={() => onHandednessChange?.('right')} />
        </XStack>
      </YStack>

      {/* Video mirroring */}
      <XStack
        justifyContent="space-between"
        alignItems="center"
        backgroundColor={T.cardBg}
        borderRadius={20}
        padding={18}
        borderWidth={2}
        borderColor={T.border}
        shadowColor="#000"
        shadowOffset={{ width: 0, height: 1 }}
        shadowRadius={4}
        shadowOpacity={0.06}
        elevation={2}
      >
        <YStack flex={1} gap={4}>
          <Text fontSize={16} fontWeight="700" color={T.text}>
            Mirror tutorial videos
          </Text>
          <Text fontSize={13} color={T.textSub}>
            Flip videos for left-handed viewing
          </Text>
        </YStack>
        <RNSwitch
          value={videoMirror ?? false}
          onValueChange={() => onVideoMirrorToggle?.()}
          trackColor={{ false: T.border, true: T.accent }}
          thumbColor={T.white}
        />
      </XStack>

      {/* Location */}
      <YStack gap={10}>
        <XStack justifyContent="space-between" alignItems="center">
          <Text fontSize={16} fontWeight="700" color={T.text}>
            Where are you from?
          </Text>
          <Text
            fontSize={13}
            color={T.muted}
            onPress={() => { onCountryChange?.(''); onRegionChange?.(''); }}
            cursor="pointer"
          >
            Rather not say
          </Text>
        </XStack>
        <Input
          value={country ?? ''}
          onChangeText={onCountryChange}
          placeholder="Country"
          borderRadius={16}
          borderWidth={2}
          borderColor={T.border}
          height={52}
          paddingHorizontal={16}
          fontSize={15}
          color={T.text}
          placeholderTextColor={T.muted}
          backgroundColor={T.cardBg}
          focusStyle={{ borderColor: T.accent }}
        />
        <Input
          value={region ?? ''}
          onChangeText={onRegionChange}
          placeholder="State / Region"
          borderRadius={16}
          borderWidth={2}
          borderColor={T.border}
          height={52}
          paddingHorizontal={16}
          fontSize={15}
          color={T.text}
          placeholderTextColor={T.muted}
          backgroundColor={T.cardBg}
          focusStyle={{ borderColor: T.accent }}
        />
      </YStack>
    </YStack>
  );
}

// ── Video Screen ───────────────────────────────────────────────────────
function VideoContent({
  questionEmoji,
  questionTitle,
  questionSubtitle,
}: {
  questionEmoji?: string;
  questionTitle: string;
  questionSubtitle?: string;
}) {
  return (
    <YStack gap={24} flex={1}>
      <QuestionHeader emoji={questionEmoji} title={questionTitle} subtitle={questionSubtitle} />

      <YStack
        backgroundColor="#EEF0F3"
        borderRadius={20}
        aspectRatio={16 / 9}
        width="100%"
        justifyContent="center"
        alignItems="center"
        shadowColor="#000"
        shadowOffset={{ width: 0, height: 1 }}
        shadowRadius={4}
        shadowOpacity={0.06}
        elevation={2}
        overflow="hidden"
      >
        <Stack
          width={72}
          height={72}
          borderRadius={36}
          backgroundColor="rgba(28,176,246,0.9)"
          justifyContent="center"
          alignItems="center"
          shadowColor="#1CB0F6"
          shadowOffset={{ width: 0, height: 2 }}
          shadowRadius={14}
          shadowOpacity={0.35}
          elevation={4}
        >
          <Text fontSize={32} color={T.white} marginLeft={4}>
            {'\u25B6'}
          </Text>
        </Stack>
      </YStack>
    </YStack>
  );
}

// ── Main Component ─────────────────────────────────────────────────────
export function OnboardingScreen({
  stepIndex,
  totalSteps,
  questionTitle,
  questionEmoji,
  questionSubtitle,
  screenType,
  choices = [],
  selectedChoiceIds = [],
  multiSelect: _multiSelect = false,
  onChoicePress,
  hasTextInput,
  textInputValue,
  onTextInputChange,
  textInputPlaceholder,
  showSubQuestion,
  subQuestionTitle,
  subQuestionChoices,
  selectedSubChoiceId,
  onSubChoicePress,
  handedness,
  onHandednessChange,
  videoMirror,
  onVideoMirrorToggle,
  country,
  onCountryChange,
  region,
  onRegionChange,
  isChildUnder13,
  onNext,
  onSkip,
  onBack,
  paddingTop = 0,
  isNextDisabled = false,
  nextButtonText = 'Next',
}: OnboardingScreenProps) {
  const isWelcome = screenType === 'welcome';

  return (
    <YStack
      flex={1}
      minHeight="100%"
      backgroundColor={T.bg}
      maxWidth={520}
      alignSelf="center"
      width="100%"
    >
      {/* Nav bar — hidden on welcome */}
      {!isWelcome && (
        <YStack paddingHorizontal={24} paddingTop={paddingTop + 20}>
          <NavBar
            stepIndex={stepIndex}
            totalSteps={totalSteps}
            onSkip={onSkip}
            onBack={onBack}
          />
        </YStack>
      )}

      {/* Scrollable content */}
      <ScrollView
        flex={1}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, paddingTop: isWelcome ? 0 : 20, paddingHorizontal: 24, paddingBottom: 32, paddingTop: isWelcome ? paddingTop + 20 : 20 }}
      >
        {screenType === 'welcome' && (
          <WelcomeContent
            questionEmoji={questionEmoji}
            questionTitle={questionTitle}
            questionSubtitle={questionSubtitle}
          />
        )}

        {screenType === 'choices' && onChoicePress && (
          <ChoicesContent
            questionEmoji={questionEmoji}
            questionTitle={questionTitle}
            questionSubtitle={questionSubtitle}
            choices={choices}
            selectedChoiceIds={selectedChoiceIds}
            onChoicePress={onChoicePress}
            hasTextInput={hasTextInput}
            textInputValue={textInputValue}
            onTextInputChange={onTextInputChange}
            textInputPlaceholder={textInputPlaceholder}
            showSubQuestion={showSubQuestion}
            subQuestionTitle={subQuestionTitle}
            subQuestionChoices={subQuestionChoices}
            selectedSubChoiceId={selectedSubChoiceId}
            onSubChoicePress={onSubChoicePress}
          />
        )}

        {screenType === 'quick_info' && (
          <QuickInfoContent
            questionEmoji={questionEmoji}
            questionTitle={questionTitle}
            questionSubtitle={questionSubtitle}
            handedness={handedness}
            onHandednessChange={onHandednessChange}
            videoMirror={videoMirror}
            onVideoMirrorToggle={onVideoMirrorToggle}
            country={country}
            onCountryChange={onCountryChange}
            region={region}
            onRegionChange={onRegionChange}
          />
        )}

        {screenType === 'video' && (
          <VideoContent
            questionEmoji={questionEmoji}
            questionTitle={questionTitle}
            questionSubtitle={questionSubtitle}
          />
        )}
      </ScrollView>

      <YStack paddingHorizontal={24} paddingBottom={32}>
        <CTAButton
          label={nextButtonText}
          onPress={onNext}
          disabled={isNextDisabled}
        />
      </YStack>
    </YStack>
  );
}
