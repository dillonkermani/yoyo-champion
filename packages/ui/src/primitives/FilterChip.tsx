import React from 'react';
import { XStack } from 'tamagui';
import { Text } from '../Text';
import { NEU } from '../tamagui.config';

export interface FilterChipProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
}

export function FilterChip({ label, selected = false, onPress }: FilterChipProps) {
  return (
    <XStack
      backgroundColor={selected ? '$brandAqua' : '$neuSurface'}
      borderRadius={100}
      paddingHorizontal={16}
      paddingVertical={8}
      onPress={onPress}
      animation="quick"
      pressStyle={{ scaleY: 0.97, scaleX: 1.005, opacity: 0.92, ...NEU.pressed }}
      cursor="pointer"
      {...(selected ? NEU.glowAqua : NEU.button)}
    >
      <Text fontSize={13} fontWeight="600" color={selected ? 'white' : '#2d3436'}>{label}</Text>
    </XStack>
  );
}
