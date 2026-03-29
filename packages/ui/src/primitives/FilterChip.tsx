import React from 'react';
import { XStack } from 'tamagui';
import { Text } from '../Text';

export interface FilterChipProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
}

export function FilterChip({ label, selected = false, onPress }: FilterChipProps) {
  return (
    <XStack
      backgroundColor={selected ? '$brandAqua' : 'white'}
      borderRadius={100}
      paddingHorizontal={16}
      paddingVertical={8}
      borderWidth={1.5}
      borderColor={selected ? '$brandAqua' : '#E1E8ED'}
      onPress={onPress}
      animation="quick"
      pressStyle={{ scale: 0.96, opacity: 0.9 }}
      cursor="pointer"
      {...(selected ? { shadowColor: '#1CB0F6', shadowOffset: { width: 0, height: 2 }, shadowRadius: 14, shadowOpacity: 0.35, elevation: 4 } : {})}
    >
      <Text fontSize={13} fontWeight="600" color={selected ? 'white' : '#0F1419'}>{label}</Text>
    </XStack>
  );
}
