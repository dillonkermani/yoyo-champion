import React from 'react';
import { YStack, XStack } from 'tamagui';
import { Text } from '../Text';
import { Button } from '../Button';
import { TrickDetailHero } from '../cards/TrickDetailHero';
import { ScreenContainer } from '../primitives/ScreenContainer';

export interface TrickStep {
  id: string;
  order: number;
  title: string;
  description: string;
}

export interface TrickDetailScreenProps {
  name: string;
  difficulty: number;
  genre: string;
  style: string;
  xpReward: number;
  estimatedMinutes: number;
  description: string;
  steps: TrickStep[];
  completed?: boolean;
  onStartPracticing?: () => void;
  onMarkComplete?: () => void;
  paddingTop?: number;
}

export function TrickDetailScreen({
  name,
  difficulty,
  genre,
  style,
  xpReward,
  estimatedMinutes,
  description,
  steps,
  completed = false,
  onStartPracticing,
  onMarkComplete,
  paddingTop = 0,
}: TrickDetailScreenProps) {
  return (
    <ScreenContainer scrollable paddingTop={paddingTop}>
      <TrickDetailHero name={name} difficulty={difficulty} genre={genre} style={style} xpReward={xpReward} />

      <YStack padding={20} gap={16}>
        <XStack gap={8} alignItems="center">
          <Text fontSize={13} color="$colorSubtitle">Est. {estimatedMinutes} min</Text>
          {completed && (
            <XStack backgroundColor="#58CC0222" borderRadius={100} paddingHorizontal={10} paddingVertical={3}>
              <Text fontSize={12} fontWeight="700" color="#58CC02">Mastered</Text>
            </XStack>
          )}
        </XStack>

        <Text fontSize={15} color="$color" lineHeight={22}>{description}</Text>

        <Text fontSize={18} fontWeight="800" color="$color">Steps</Text>
        {steps.map((step) => (
          <YStack
            key={step.id}
            backgroundColor="$background"
            borderRadius={12}
            padding={14}
            borderWidth={1}
            borderColor="$borderColor"
            gap={6}
          >
            <XStack gap={10} alignItems="center">
              <YStack
                width={26}
                height={26}
                borderRadius={13}
                backgroundColor="$brandAqua"
                alignItems="center"
                justifyContent="center"
              >
                <Text fontSize={12} fontWeight="800" color="white">{step.order}</Text>
              </YStack>
              <Text fontSize={15} fontWeight="700" color="$color" flex={1}>{step.title}</Text>
            </XStack>
            <Text fontSize={13} color="$colorSubtitle" lineHeight={20} paddingLeft={36}>{step.description}</Text>
          </YStack>
        ))}

        <YStack gap={10} marginTop={8}>
          {!completed && onStartPracticing && (
            <Button onPress={onStartPracticing}>Start Practicing</Button>
          )}
          {!completed && onMarkComplete && (
            <Button onPress={onMarkComplete} variant="outline">Mark as Complete</Button>
          )}
        </YStack>
      </YStack>

      <YStack height={100} />
    </ScreenContainer>
  );
}
