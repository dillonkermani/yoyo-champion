import React from 'react';
import { YStack, XStack } from 'tamagui';
import { Text } from '../Text';
import { Button } from '../Button';
import { ProgressBar } from '../primitives/ProgressBar';

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
  choices: OnboardingChoice[];
  selectedChoiceIds: string[];
  multiSelect?: boolean;
  onChoicePress: (id: string) => void;
  onNext?: () => void;
  onSkip?: () => void;
}

export function OnboardingScreen({
  stepIndex,
  totalSteps,
  questionTitle,
  questionEmoji,
  questionSubtitle,
  choices,
  selectedChoiceIds,
  multiSelect: _multiSelect = false,
  onChoicePress,
  onNext,
  onSkip,
}: OnboardingScreenProps) {
  const progressValue = ((stepIndex + 1) / totalSteps) * 100;

  return (
    <YStack flex={1} backgroundColor="$background" padding={24} gap={24}>
      {/* Progress */}
      <YStack gap={6}>
        <XStack justifyContent="space-between">
          <Text fontSize={13} color="$colorSubtitle">Step {stepIndex + 1} of {totalSteps}</Text>
          {onSkip && (
            <Text fontSize={13} color="$colorSubtitle" onPress={onSkip} cursor="pointer">Skip</Text>
          )}
        </XStack>
        <ProgressBar value={progressValue} color="#1CB0F6" />
      </YStack>

      {/* Question */}
      <YStack gap={8}>
        {questionEmoji && <Text fontSize={40}>{questionEmoji}</Text>}
        <Text fontSize={24} fontWeight="900" color="$color">{questionTitle}</Text>
        {questionSubtitle && (
          <Text fontSize={15} color="$colorSubtitle" lineHeight={22}>{questionSubtitle}</Text>
        )}
      </YStack>

      {/* Choices */}
      <YStack gap={10} flex={1}>
        {choices.map((choice) => {
          const isSelected = selectedChoiceIds.includes(choice.id);
          return (
            <XStack
              key={choice.id}
              backgroundColor={isSelected ? '$brandAqua' : '$background'}
              borderRadius={16}
              padding={16}
              borderWidth={2}
              borderColor={isSelected ? '$brandAqua' : '$borderColor'}
              onPress={() => onChoicePress(choice.id)}
              pressStyle={{ opacity: 0.85 }}
              cursor="pointer"
              gap={12}
              alignItems="center"
            >
              {choice.emoji && <Text fontSize={24}>{choice.emoji}</Text>}
              <YStack flex={1} gap={2}>
                <Text fontSize={15} fontWeight="700" color={isSelected ? 'white' : '$color'}>{choice.label}</Text>
                {choice.description && (
                  <Text fontSize={12} color={isSelected ? 'rgba(255,255,255,0.8)' : '$colorSubtitle'}>{choice.description}</Text>
                )}
              </YStack>
            </XStack>
          );
        })}
      </YStack>

      {/* Next button */}
      {onNext && (
        <Button
          onPress={onNext}
          disabled={selectedChoiceIds.length === 0}
        >
          {stepIndex === totalSteps - 1 ? "Get Started" : "Next"}
        </Button>
      )}
    </YStack>
  );
}
