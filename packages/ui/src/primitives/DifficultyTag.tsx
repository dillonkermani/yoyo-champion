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
      backgroundColor={color + '18'}
      borderRadius={100}
      paddingHorizontal={12}
      paddingVertical={4}
      alignSelf="flex-start"
    >
      <Text fontSize={11} fontWeight="600" color={color}>{label}</Text>
    </XStack>
  );
}
