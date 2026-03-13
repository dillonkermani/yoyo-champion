import React from 'react';
import { YStack, Text } from 'tamagui';
import { NEU } from './tamagui.config';

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
        // Colored glow shadow matching avatar color
        shadowColor={color}
        shadowOffset={{ width: 0, height: 4 }}
        shadowRadius={16}
        shadowOpacity={0.4}
        elevation={6}
      >
        <Text fontSize={size * 0.35} fontWeight="700" color="white">
          {initials}
        </Text>
      </YStack>
      <YStack
        backgroundColor="$neuSurface"
        paddingHorizontal={12}
        paddingVertical={4}
        borderRadius={20}
        {...NEU.button}
      >
        <Text fontSize={12} fontWeight="600" color="#FFC800">
          LV.{level}
        </Text>
      </YStack>
    </YStack>
  );
}
