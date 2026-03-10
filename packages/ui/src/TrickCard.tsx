import React from 'react';
import { XStack, YStack, Text } from 'tamagui';
import { getDifficultyLabel, getDifficultyColor } from './utils';

export interface TrickCardProps {
  name: string;
  difficulty: number;
  genre: string;
  completed?: boolean;
  xpReward?: number;
  onPress?: (() => void) | undefined;
}

export function TrickCard({ name, difficulty, genre, completed, xpReward, onPress }: TrickCardProps) {
  const color = getDifficultyColor(difficulty);
  const label = getDifficultyLabel(difficulty);

  return (
    <XStack
      backgroundColor={completed ? '#F0FFF4' : 'white'}
      borderRadius={12}
      padding={12}
      marginBottom={8}
      borderWidth={1}
      borderColor={completed ? '#58CC02' : '#E5E7EB'}
      alignItems="center"
      onPress={onPress}
      pressStyle={{ opacity: 0.85 }}
      cursor="pointer"
    >
      <YStack flex={1}>
        <Text fontWeight="700" fontSize={15}>{name}</Text>
        <XStack marginTop={4} gap={8} alignItems="center">
          <Text
            fontSize={11}
            color="white"
            backgroundColor={color}
            paddingHorizontal={8}
            paddingVertical={2}
            borderRadius={20}
          >
            {label}
          </Text>
          <Text fontSize={11} color="$colorSubtle">{genre}</Text>
        </XStack>
      </YStack>
      {xpReward !== undefined && (
        <Text fontWeight="700" color="#FFC800" fontSize={13}>+{xpReward} XP</Text>
      )}
      {completed && <Text fontSize={16} marginLeft={8}>✓</Text>}
    </XStack>
  );
}
