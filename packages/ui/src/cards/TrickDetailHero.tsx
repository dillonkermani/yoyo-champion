import React from 'react';
import { YStack, XStack } from 'tamagui';
import { Text } from '../Text';
import { DifficultyTag } from '../primitives/DifficultyTag';
import { NEU } from '../tamagui.config';

export interface TrickDetailHeroProps {
  name: string;
  difficulty: number;
  genre: string;
  style: string;
  xpReward: number;
}

export function TrickDetailHero({ name, difficulty, genre, style, xpReward }: TrickDetailHeroProps) {
  return (
    <YStack padding={24} gap={14}>
      <Text fontSize={26} fontWeight="800" letterSpacing={-0.5} color="#2d3436">{name}</Text>
      <XStack gap={8} alignItems="center" flexWrap="wrap">
        <DifficultyTag difficulty={difficulty} />
        <XStack backgroundColor="$neuSurfacePressed" borderRadius={100} paddingHorizontal={10} paddingVertical={3}>
          <Text fontSize={11} fontWeight="600" color="#636e72">{genre}</Text>
        </XStack>
        <XStack backgroundColor="$neuSurfacePressed" borderRadius={100} paddingHorizontal={10} paddingVertical={3}>
          <Text fontSize={11} fontWeight="600" color="#636e72">{style}</Text>
        </XStack>
      </XStack>
      <XStack
        backgroundColor="$neuSurface"
        borderRadius={12}
        paddingHorizontal={14}
        paddingVertical={8}
        alignSelf="flex-start"
        {...NEU.button}
        shadowColor="#FFC800"
        shadowOpacity={0.3}
      >
        <Text fontSize={15} fontWeight="700" color="#FFC800">+{xpReward} XP</Text>
      </XStack>
    </YStack>
  );
}
