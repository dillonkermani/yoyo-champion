import React from 'react';
import { YStack, XStack } from 'tamagui';
import { Text } from '../Text';
import { Button } from '../Button';
import { ProgressBar } from '../primitives/ProgressBar';
import { NEU } from '../tamagui.config';

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
    <YStack flex={1} backgroundColor="$neuSurface" padding={28} gap={28}>
      {/* Progress */}
      <YStack gap={6}>
        <XStack justifyContent="space-between">
          <Text fontSize={13} color="#636e72">Step {stepIndex + 1} of {totalSteps}</Text>
          {onSkip && (
            <Text fontSize={13} color="#636e72" onPress={onSkip} cursor="pointer">Skip</Text>
          )}
        </XStack>
        <ProgressBar value={progressValue} color="#1CB0F6" />
      </YStack>

      {/* Question */}
      <YStack gap={8}>
        {questionEmoji && <Text fontSize={40}>{questionEmoji}</Text>}
        <Text fontSize={24} fontWeight="800" color="#2d3436">{questionTitle}</Text>
        {questionSubtitle && (
          <Text fontSize={15} color="#636e72" lineHeight={22}>{questionSubtitle}</Text>
        )}
      </YStack>

      {/* Choices */}
      <YStack gap={12} flex={1}>
        {choices.map((choice) => {
          const isSelected = selectedChoiceIds.includes(choice.id);
          return (
            <XStack
              key={choice.id}
              backgroundColor={isSelected ? '$brandAqua' : '$neuSurfaceLight'}
              borderRadius={18}
              padding={16}
              onPress={() => onChoicePress(choice.id)}
              animation="quick"
              pressStyle={{ scaleY: 0.97, scaleX: 1.005, opacity: 0.92, ...NEU.pressed }}
              cursor="pointer"
              gap={12}
              alignItems="center"
              {...(isSelected ? NEU.glowAqua : NEU.card)}
            >
              {choice.emoji && <Text fontSize={24}>{choice.emoji}</Text>}
              <YStack flex={1} gap={2}>
                <Text fontSize={15} fontWeight="600" color={isSelected ? 'white' : '#2d3436'}>{choice.label}</Text>
                {choice.description && (
                  <Text fontSize={12} color={isSelected ? 'rgba(255,255,255,0.8)' : '#636e72'}>{choice.description}</Text>
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
