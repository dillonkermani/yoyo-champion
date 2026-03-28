import React from 'react';
import { styled } from '@tamagui/core';
import { YStack, XStack, Text, Stack } from 'tamagui';
import { NEU } from '../tamagui.config';

export interface OnboardingWizardProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onBack: () => void;
  onSkip?: () => void;
  canProceed: boolean;
  children: React.ReactNode;
}

const Dot = styled(Stack, {
  name: 'WizardDot',
  height: 8,
  borderRadius: 4,
  animation: 'quick',
  variants: {
    state: {
      active: {
        width: 24,
        backgroundColor: '$xpGold',
        ...NEU.glowGold,
      },
      completed: {
        width: 8,
        backgroundColor: '$brandAqua',
      },
      future: {
        width: 8,
        backgroundColor: '#c5cad1',
      },
    },
  } as const,
  defaultVariants: {
    state: 'future',
  },
});

const WizardButton = styled(Stack, {
  name: 'WizardButton',
  paddingHorizontal: 24,
  paddingVertical: 14,
  borderRadius: 14,
  alignItems: 'center',
  justifyContent: 'center',
  animation: 'quick',
  cursor: 'pointer',
  ...NEU.button,
  variants: {
    variant: {
      primary: {
        backgroundColor: '$brandAqua',
        ...NEU.glowAqua,
        pressStyle: { opacity: 0.92, scale: 0.97, backgroundColor: '$brandAquaDark', ...NEU.pressed },
      },
      outline: {
        backgroundColor: '$neuSurface',
        borderWidth: 1.5,
        borderColor: '$brandAqua',
        pressStyle: { opacity: 0.92, scale: 0.97, backgroundColor: '$neuSurfacePressed', ...NEU.pressed },
      },
    },
    disabled: {
      true: {
        opacity: 0.45,
        cursor: 'not-allowed',
      },
    },
  } as const,
  defaultVariants: {
    variant: 'primary',
  },
});

export function OnboardingWizard({
  currentStep,
  totalSteps,
  onNext,
  onBack,
  onSkip,
  canProceed,
  children,
}: OnboardingWizardProps) {
  const isFirstStep = currentStep === 0;

  return (
    <YStack flex={1} backgroundColor={NEU.surface} padding="$4">
      {/* Header: dots + skip */}
      <XStack alignItems="center" justifyContent="center" paddingVertical="$3">
        <XStack gap={6} alignItems="center" flex={1} justifyContent="center">
          {Array.from({ length: totalSteps }, (_, i) => (
            <Dot
              key={i}
              state={i === currentStep ? 'active' : i < currentStep ? 'completed' : 'future'}
            />
          ))}
        </XStack>
        {onSkip && (
          <Text
            position="absolute"
            right={0}
            color="$brandAqua"
            fontSize={15}
            fontWeight="600"
            onPress={onSkip}
            cursor="pointer"
            pressStyle={{ opacity: 0.7 }}
          >
            Skip
          </Text>
        )}
      </XStack>

      {/* Step content */}
      <YStack
        flex={1}
        animation="quick"
        enterStyle={{ opacity: 0, x: 20 }}
        opacity={1}
        x={0}
      >
        {children}
      </YStack>

      {/* Footer: Back + Continue */}
      <XStack gap="$3" paddingTop="$3">
        {!isFirstStep && (
          <WizardButton variant="outline" flex={1} onPress={onBack}>
            <Text color="$brandAqua" fontSize={16} fontWeight="600">
              Back
            </Text>
          </WizardButton>
        )}
        <WizardButton
          variant="primary"
          flex={isFirstStep ? 1 : 1}
          disabled={!canProceed}
          onPress={canProceed ? onNext : undefined}
        >
          <Text color="white" fontSize={16} fontWeight="600">
            Continue
          </Text>
        </WizardButton>
      </XStack>
    </YStack>
  );
}
