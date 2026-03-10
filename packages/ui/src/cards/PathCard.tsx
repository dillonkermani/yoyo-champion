import React from 'react';
import { YStack, XStack } from 'tamagui';
import { Text } from '../Text';
import { DifficultyTag } from '../primitives/DifficultyTag';
import { ProgressBar } from '../primitives/ProgressBar';

export interface PathCardProps {
  title: string;
  difficulty: number;
  progressPercent: number;
  totalXp: number;
  onPress?: (() => void) | undefined;
}

export function PathCard({ title, difficulty, progressPercent, totalXp, onPress }: PathCardProps) {
  return (
    <YStack
      backgroundColor="$background"
      borderRadius={16}
      padding={16}
      marginBottom={10}
      borderWidth={1}
      borderColor="$borderColor"
      onPress={onPress}
      pressStyle={{ opacity: 0.85 }}
      cursor="pointer"
    >
      <XStack justifyContent="space-between" alignItems="center" marginBottom={8}>
        <Text fontSize={15} fontWeight="700" color="$color" flex={1} marginRight={8}>{title}</Text>
        <Text fontSize={13} fontWeight="700" color="$xpGold">+{totalXp} XP</Text>
      </XStack>
      <XStack alignItems="center" gap={8} marginBottom={10}>
        <DifficultyTag difficulty={difficulty} />
        <Text fontSize={12} color="$colorSubtitle">{Math.round(progressPercent)}% complete</Text>
      </XStack>
      <ProgressBar value={progressPercent} color="#1CB0F6" height={6} />
    </YStack>
  );
}
