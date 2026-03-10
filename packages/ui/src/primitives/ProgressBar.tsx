import React from 'react';
import { XStack, YStack } from 'tamagui';

export interface ProgressBarProps {
  value: number; // 0-100
  color?: string;
  height?: number;
  backgroundColor?: string;
}

export function ProgressBar({ value, color = '#1CB0F6', height = 8, backgroundColor = '#E5E7EB' }: ProgressBarProps) {
  const clampedValue = Math.min(100, Math.max(0, value));
  return (
    <XStack height={height} backgroundColor={backgroundColor} borderRadius={height / 2} overflow="hidden">
      <YStack
        height={height}
        width={`${clampedValue}%`}
        backgroundColor={color}
        borderRadius={height / 2}
      />
    </XStack>
  );
}
