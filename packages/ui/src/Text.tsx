import { styled } from '@tamagui/core';
import { Text as TamaguiText } from 'tamagui';

export const Text = styled(TamaguiText, {
  name: 'YoyoText',

  variants: {
    variant: {
      heading: {
        fontSize: 28,
        fontWeight: '700',
        lineHeight: 34,
        letterSpacing: -0.5,
        color: '#2d3436',
      },
      subheading: {
        fontSize: 20,
        fontWeight: '600',
        lineHeight: 26,
        letterSpacing: -0.3,
        color: '#2d3436',
      },
      body: {
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 22,
        letterSpacing: 0.1,
        color: '#2d3436',
      },
      caption: {
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 16,
        letterSpacing: 0.2,
        color: '#636e72',
      },
      label: {
        fontSize: 14,
        fontWeight: '500',
        lineHeight: 18,
        letterSpacing: 0.3,
        color: '#2d3436',
      },
    },
  } as const,

  defaultVariants: {
    variant: 'body',
  },
});
