import React from 'react';
import { YStack, ScrollView } from 'tamagui';
import type { YStackProps } from 'tamagui';

export interface ScreenContainerProps {
  children: React.ReactNode;
  scrollable?: boolean;
  paddingTop?: number;
  backgroundColor?: string;
}

export function ScreenContainer({ children, scrollable = false, paddingTop = 0, backgroundColor = '$background' }: ScreenContainerProps) {
  if (scrollable) {
    return (
      <YStack flex={1} backgroundColor={backgroundColor as YStackProps['backgroundColor']}>
        <ScrollView flex={1} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingTop }}>
          {children}
        </ScrollView>
      </YStack>
    );
  }
  return (
    <YStack flex={1} backgroundColor={backgroundColor as YStackProps['backgroundColor']} paddingTop={paddingTop}>
      {children}
    </YStack>
  );
}
