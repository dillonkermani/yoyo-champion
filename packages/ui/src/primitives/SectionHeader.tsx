import React from 'react';
import { XStack } from 'tamagui';
import { Text } from '../Text';

export interface SectionHeaderProps {
  title: string;
  onSeeAll?: (() => void) | undefined;
}

export function SectionHeader({ title, onSeeAll }: SectionHeaderProps) {
  return (
    <XStack justifyContent="space-between" alignItems="center" marginBottom={16}>
      <Text fontSize={18} fontWeight="700" letterSpacing={-0.3} color="#2d3436">{title}</Text>
      {onSeeAll && (
        <Text fontSize={13} fontWeight="600" color="$brandAqua" onPress={onSeeAll} cursor="pointer">
          See all
        </Text>
      )}
    </XStack>
  );
}
