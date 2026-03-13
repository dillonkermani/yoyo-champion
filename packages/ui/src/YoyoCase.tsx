import React from 'react';
import { XStack, YStack, Text } from 'tamagui';

export interface YoyoSlot {
  id: string;
  name: string;
  color?: string;
  owned: boolean;
}

export interface YoyoCaseProps {
  yoyos: YoyoSlot[];
}

export function YoyoCase({ yoyos }: YoyoCaseProps) {
  return (
    <XStack flexWrap="wrap" gap={8} paddingHorizontal={8}>
      {yoyos.map((yoyo) => (
        <YStack
          key={yoyo.id}
          width={88}
          height={88}
          borderRadius={12}
          borderWidth={2}
          borderColor={yoyo.owned ? (yoyo.color ?? '#1CB0F6') : '$borderColor'}
          backgroundColor={yoyo.owned ? '#EBF8FF' : '$backgroundHover'}
          alignItems="center"
          justifyContent="center"
          padding={8}
          pressStyle={{ opacity: 0.8 }}
          cursor="pointer"
        >
          <Text fontSize={28}>{yoyo.owned ? '🪀' : '🔒'}</Text>
          <Text
            fontSize={10}
            textAlign="center"
            numberOfLines={1}
            color={yoyo.owned ? '$color' : '$colorSubtle'}
          >
            {yoyo.name}
          </Text>
        </YStack>
      ))}
    </XStack>
  );
}
