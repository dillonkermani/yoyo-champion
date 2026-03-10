import React from 'react';
import { YStack, XStack } from 'tamagui';
import { Text } from '../Text';
import { DifficultyTag } from '../primitives/DifficultyTag';

export interface TrickDetailHeroProps {
  name: string;
  difficulty: number;
  genre: string;
  style: string;
  xpReward: number;
}

export function TrickDetailHero({ name, difficulty, genre, style, xpReward }: TrickDetailHeroProps) {
  return (
    <YStack padding={20} gap={12}>
      <Text fontSize={26} fontWeight="900" color="$color">{name}</Text>
      <XStack gap={8} alignItems="center" flexWrap="wrap">
        <DifficultyTag difficulty={difficulty} />
        <XStack backgroundColor="$backgroundHover" borderRadius={100} paddingHorizontal={10} paddingVertical={3}>
          <Text fontSize={11} fontWeight="600" color="$colorSubtitle">{genre}</Text>
        </XStack>
        <XStack backgroundColor="$backgroundHover" borderRadius={100} paddingHorizontal={10} paddingVertical={3}>
          <Text fontSize={11} fontWeight="600" color="$colorSubtitle">{style}</Text>
        </XStack>
      </XStack>
      <XStack
        backgroundColor="#FFC80022"
        borderRadius={12}
        paddingHorizontal={14}
        paddingVertical={8}
        alignSelf="flex-start"
      >
        <Text fontSize={15} fontWeight="800" color="#FFC800">+{xpReward} XP</Text>
      </XStack>
    </YStack>
  );
}
