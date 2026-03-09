import React from 'react';
import { XStack, YStack, Text } from 'tamagui';

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
    <XStack justifyContent="space-around" paddingVertical={8} paddingHorizontal={12}>
      {stats.map((stat, i) => (
        <YStack key={i} alignItems="center" flex={1}>
          <Text fontSize={18} fontWeight="800" color={stat.color ?? '#1CB0F6'}>
            {stat.value}
          </Text>
          <Text fontSize={11} color="$colorSubtle" textAlign="center" numberOfLines={1}>
            {stat.label}
          </Text>
        </YStack>
      ))}
    </XStack>
  );
}
