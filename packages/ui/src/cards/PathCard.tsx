import React from 'react';
import { YStack, XStack } from 'tamagui';
import { Text } from '../Text';
import { DifficultyTag } from '../primitives/DifficultyTag';
import { ProgressBar } from '../primitives/ProgressBar';
// Clean shadow design - NEU removed

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
      backgroundColor="white"
      borderRadius={20}
      padding={18}
      marginBottom={14}
      onPress={onPress}
      animation="quick"
      pressStyle={{ opacity: 0.9, scale: 0.98 }}
      cursor="pointer"
      borderWidth={1}
      borderColor="#E1E8ED"
      shadowColor="#000"
      shadowOffset={{ width: 0, height: 2 }}
      shadowRadius={8}
      shadowOpacity={0.08}
      elevation={3}
    >
      <XStack justifyContent="space-between" alignItems="center" marginBottom={8}>
        <Text fontSize={15} fontWeight="600" color="#0F1419" flex={1} marginRight={8}>{title}</Text>
        <Text fontSize={13} fontWeight="700" color="$xpGoldDark">+{totalXp} XP</Text>
      </XStack>
      <XStack alignItems="center" gap={8} marginBottom={10}>
        <DifficultyTag difficulty={difficulty} />
        <Text fontSize={12} color="#536471">{Math.round(progressPercent)}% complete</Text>
      </XStack>
      <ProgressBar value={progressPercent} color="#9bedff" height={6} />
    </YStack>
  );
}
