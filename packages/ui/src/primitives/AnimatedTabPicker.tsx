import { styled } from '@tamagui/core';
import { Stack, Text, XStack } from 'tamagui';

import { NEU } from '../tamagui.config';

// --- Types ---

export interface TabItem {
  key: string;
  label: string;
}

export interface AnimatedTabPickerProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (key: string) => void;
  variant?: 'pill' | 'underline';
}

// --- Styled primitives ---

const TabTrigger = styled(Stack, {
  cursor: 'pointer',
  alignItems: 'center',
  justifyContent: 'center',
  paddingHorizontal: '$3',
  paddingVertical: '$2',
  borderRadius: '$4',
  animation: 'quick',
  pressStyle: { opacity: 0.8 },
  hoverStyle: { opacity: 0.9 },

  variants: {
    active: {
      true: {},
      false: {},
    },
    variant: {
      pill: {},
      underline: {
        borderRadius: 0,
        paddingVertical: '$2.5',
      },
    },
  } as const,
});

const TabLabel = styled(Text, {
  fontSize: 14,
  animation: 'quick',

  variants: {
    active: {
      true: {
        fontWeight: '700',
        color: '$brandAqua',
      },
      false: {
        fontWeight: '400',
        color: '$gray10',
      },
    },
  } as const,
});

// --- Component ---

export function AnimatedTabPicker({
  tabs,
  activeTab,
  onTabChange,
  variant = 'pill',
}: AnimatedTabPickerProps) {
  const isPill = variant === 'pill';

  return (
    <XStack
      backgroundColor={isPill ? NEU.surface : 'transparent'}
      borderRadius={isPill ? '$5' : 0}
      borderBottomWidth={isPill ? 0 : 1}
      borderBottomColor={isPill ? 'transparent' : '$gray5'}
      padding={isPill ? '$1' : 0}
      gap={isPill ? '$1' : '$4'}
    >
      {tabs.map((tab) => {
        const isActive = tab.key === activeTab;

        return (
          <TabTrigger
            key={tab.key}
            active={isActive}
            variant={variant}
            flex={isPill ? 1 : undefined}
            backgroundColor={isPill && isActive ? '#fff' : 'transparent'}
            borderBottomWidth={!isPill && isActive ? 2 : 0}
            borderBottomColor={!isPill && isActive ? '$brandAqua' : 'transparent'}
            {...(isPill && isActive ? NEU.button : {})}
            onPress={() => onTabChange(tab.key)}
          >
            <TabLabel active={isActive}>{tab.label}</TabLabel>
          </TabTrigger>
        );
      })}
    </XStack>
  );
}
