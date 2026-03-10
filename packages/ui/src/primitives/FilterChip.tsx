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
      backgroundColor={selected ? '$brandAqua' : '$backgroundHover'}
      borderRadius={100}
      paddingHorizontal={14}
      paddingVertical={6}
      onPress={onPress}
      pressStyle={{ opacity: 0.8 }}
      cursor="pointer"
    >
      <Text fontSize={13} fontWeight="700" color={selected ? 'white' : '$color'}>{label}</Text>
    </XStack>
  );
}
