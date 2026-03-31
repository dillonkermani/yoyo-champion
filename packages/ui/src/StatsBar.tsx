import React from 'react';
import { XStack, YStack, Text } from 'tamagui';
// Clean shadow design - NEU removed

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
          backgroundColor="white"
          borderRadius={14}
          paddingVertical={12}
          paddingHorizontal={8}
          borderWidth={1}
          borderColor="#E1E8ED"
          shadowColor="#000"
          shadowOffset={{ width: 0, height: 2 }}
          shadowRadius={8}
          shadowOpacity={0.08}
          elevation={3}
        >
          <Text fontSize={20} fontWeight="700" color={stat.color ?? '#9bedff'}>
            {stat.value}
          </Text>
          <Text fontSize={10} color="#536471" textAlign="center" numberOfLines={1} textTransform="uppercase" letterSpacing={0.5} marginTop={2}>
            {stat.label}
          </Text>
        </YStack>
      ))}
    </XStack>
  );
}
