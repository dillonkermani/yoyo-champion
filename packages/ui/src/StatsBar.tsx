import React from 'react';
import { XStack, YStack, Text } from 'tamagui';
import { NEU } from './tamagui.config';

export interface StatItem {
  label: string;
  value: string | number;
  color?: string;
}

export interface StatsBarProps {
  stats: StatItem[];
}

export function StatsBar({ stats }: StatsBarProps) {
  return (
    <XStack justifyContent="space-around" paddingVertical={8} paddingHorizontal={4} gap={10}>
      {stats.map((stat, i) => (
        <YStack
          key={i}
          alignItems="center"
          flex={1}
          backgroundColor="$neuSurface"
          borderRadius={14}
          paddingVertical={12}
          paddingHorizontal={8}
          {...NEU.card}
        >
          <Text fontSize={20} fontWeight="700" color={stat.color ?? '#1CB0F6'}>
            {stat.value}
          </Text>
          <Text fontSize={10} color="#636e72" textAlign="center" numberOfLines={1} textTransform="uppercase" letterSpacing={0.5} marginTop={2}>
            {stat.label}
          </Text>
        </YStack>
      ))}
    </XStack>
  );
}
