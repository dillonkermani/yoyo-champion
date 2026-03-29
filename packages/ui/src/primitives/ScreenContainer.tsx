import React from 'react';
import { YStack, ScrollView } from 'tamagui';
import type { YStackProps } from 'tamagui';

export interface ScreenContainerProps {
  children: React.ReactNode;
  scrollable?: boolean;
  paddingTop?: number;
  backgroundColor?: string;
}

export function ScreenContainer({ children, scrollable = false, paddingTop = 0, backgroundColor }: ScreenContainerProps) {
  // Clean off-white default background
  const bg = (backgroundColor ?? '#F7F8FA') as YStackProps['backgroundColor'];

  if (scrollable) {
    return (
      <YStack flex={1} backgroundColor={bg}>
        <ScrollView flex={1} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingTop }}>
          {children}
        </ScrollView>
      </YStack>
    );
  }
  return (
    <YStack flex={1} backgroundColor={bg} paddingTop={paddingTop}>
      {children}
    </YStack>
  );
}
