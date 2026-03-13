import React from 'react';
import { YStack, XStack } from 'tamagui';
import { Text } from '../Text';
import { DifficultyTag } from '../primitives/DifficultyTag';
import { ProgressBar } from '../primitives/ProgressBar';
import { NEU } from '../tamagui.config';

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
      backgroundColor="$neuSurface"
      borderRadius={20}
      padding={18}
      marginBottom={14}
      onPress={onPress}
      pressStyle={{ scale: 0.985, backgroundColor: '$neuSurfacePressed', ...NEU.pressed }}
      cursor="pointer"
      {...NEU.card}
    >
      <XStack justifyContent="space-between" alignItems="center" marginBottom={8}>
        <Text fontSize={15} fontWeight="600" color="#2d3436" flex={1} marginRight={8}>{title}</Text>
        <Text fontSize={13} fontWeight="700" color="#FFC800">+{totalXp} XP</Text>
      </XStack>
      <XStack alignItems="center" gap={8} marginBottom={10}>
        <DifficultyTag difficulty={difficulty} />
        <Text fontSize={12} color="#636e72">{Math.round(progressPercent)}% complete</Text>
      </XStack>
      <ProgressBar value={progressPercent} color="#1CB0F6" height={6} />
    </YStack>
  );
}
