import { styled } from '@tamagui/core';
import { Text as TamaguiText } from 'tamagui';

export const Text = styled(TamaguiText, {
  name: 'YoyoText',

  variants: {
    variant: {
      heading: {
        fontSize: 28,
        fontWeight: '800',
        lineHeight: 34,
        color: '$color',
      },
      subheading: {
        fontSize: 20,
        fontWeight: '700',
        lineHeight: 26,
        color: '$color',
      },
      body: {
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 22,
        color: '$color',
      },
      caption: {
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 16,
        color: '$colorSubtle',
      },
      label: {
        fontSize: 14,
        fontWeight: '600',
        lineHeight: 18,
        color: '$color',
      },
    },
  } as const,

  defaultVariants: {
    variant: 'body',
  },
});
