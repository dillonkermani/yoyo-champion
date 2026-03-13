import React from 'react';
import { XStack, YStack, Text } from 'tamagui';
import { getDifficultyLabel, getDifficultyColor } from './utils';
import { NEU } from './tamagui.config';

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
      backgroundColor={completed ? '#e6f5e8' : '$neuSurface'}
      borderRadius={16}
      padding={14}
      marginBottom={12}
      alignItems="center"
      onPress={onPress}
      pressStyle={{ scale: 0.985, backgroundColor: '$neuSurfacePressed', ...NEU.pressed }}
      cursor="pointer"
      {...(completed ? { ...NEU.card, shadowColor: '#58CC02', shadowOpacity: 0.25 } : NEU.card)}
    >
      <YStack flex={1}>
        <Text fontWeight="600" fontSize={15} color="#2d3436">{name}</Text>
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
          <Text fontSize={11} color="#636e72">{genre}</Text>
        </XStack>
      </YStack>
      {xpReward !== undefined && (
        <Text fontWeight="700" color="#FFC800" fontSize={13}>+{xpReward} XP</Text>
      )}
      {completed && <Text fontSize={16} marginLeft={8}>✓</Text>}
    </XStack>
  );
}
