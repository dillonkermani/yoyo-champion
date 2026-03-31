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
      <YStack flex={1} minHeight="100%" backgroundColor={bg}>
        <ScrollView flex={1} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingTop, flexGrow: 1 }}>
          <YStack maxWidth={640} alignSelf="center" width="100%" flex={1}>
            {children}
          </YStack>
        </ScrollView>
      </YStack>
    );
  }
  return (
    <YStack flex={1} minHeight="100%" backgroundColor={bg} paddingTop={paddingTop}>
      <YStack maxWidth={640} alignSelf="center" width="100%">
        {children}
      </YStack>
    </YStack>
  );
}
