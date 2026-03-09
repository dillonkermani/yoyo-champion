import React from 'react';
import { YStack, Text } from 'tamagui';

export interface AvatarDisplayProps {
  displayName?: string;
  level?: number;
  color?: string;
  size?: number;
}

export function AvatarDisplay({
  displayName = 'Player',
  level = 1,
  color = '#1CB0F6',
  size = 80,
}: AvatarDisplayProps) {
  const initials =
    displayName
      .split(' ')
      .map((n) => n[0] ?? '')
      .join('')
      .toUpperCase()
      .slice(0, 2) || '?';

  return (
    <YStack alignItems="center" gap={8}>
      <YStack
        width={size}
        height={size}
        borderRadius={size / 2}
        backgroundColor={color}
        alignItems="center"
        justifyContent="center"
        borderWidth={3}
        borderColor="white"
      >
        <Text fontSize={size * 0.35} fontWeight="800" color="white">
          {initials}
        </Text>
      </YStack>
      <YStack
        backgroundColor="#FFC800"
        paddingHorizontal={10}
        paddingVertical={3}
        borderRadius={20}
      >
        <Text fontSize={12} fontWeight="700" color="white">
          LV.{level}
        </Text>
      </YStack>
    </YStack>
  );
}
