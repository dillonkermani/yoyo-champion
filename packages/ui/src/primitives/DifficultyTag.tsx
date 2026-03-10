import React from 'react';
import { XStack } from 'tamagui';
import { Text } from '../Text';
import { getDifficultyLabel, getDifficultyColor } from '../utils';

export interface DifficultyTagProps {
  difficulty: number;
}

export function DifficultyTag({ difficulty }: DifficultyTagProps) {
  const label = getDifficultyLabel(difficulty);
  const color = getDifficultyColor(difficulty);
  return (
    <XStack
      backgroundColor={color + '22'}
      borderRadius={100}
      paddingHorizontal={10}
      paddingVertical={3}
      alignSelf="flex-start"
    >
      <Text fontSize={11} fontWeight="700" color={color}>{label}</Text>
    </XStack>
  );
}
