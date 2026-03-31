import React from 'react';
import { XStack } from 'tamagui';
import { Text } from '../Text';
import { getDifficultyLabel, getDifficultyColor } from '../utils';

export interface DifficultyTagProps {
  difficulty: number;
}

// Colors that need darker text for contrast on their tinted backgrounds
const DARK_TEXT_OVERRIDES: Record<string, string> = {
  '#FFC800': '#946800', // Gold/yellow -> dark gold
  '#9bedff': '#0891b2', // Light blue -> dark cyan for contrast
};

export function DifficultyTag({ difficulty }: DifficultyTagProps) {
  const label = getDifficultyLabel(difficulty);
  const color = getDifficultyColor(difficulty);
  const textColor = DARK_TEXT_OVERRIDES[color] ?? color;
  return (
    <XStack
      backgroundColor={color + '18'}
      borderRadius={100}
      paddingHorizontal={12}
      paddingVertical={4}
      alignSelf="flex-start"
    >
      <Text fontSize={11} fontWeight="600" color={textColor}>{label}</Text>
    </XStack>
  );
}
