import React from 'react';
import { XStack } from 'tamagui';
import { Text } from '../Text';

export interface SectionHeaderProps {
  title: string;
  onSeeAll?: (() => void) | undefined;
}

export function SectionHeader({ title, onSeeAll }: SectionHeaderProps) {
  return (
    <XStack justifyContent="space-between" alignItems="center" marginBottom={12}>
      <Text fontSize={18} fontWeight="800" color="$color">{title}</Text>
      {onSeeAll && (
        <Text fontSize={13} fontWeight="700" color="$brandAqua" onPress={onSeeAll} cursor="pointer">
          See all
        </Text>
      )}
    </XStack>
  );
}
