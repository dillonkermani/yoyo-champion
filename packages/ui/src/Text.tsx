import { styled } from '@tamagui/core';
import { Text as TamaguiText } from 'tamagui';

export const Text = styled(TamaguiText, {
  name: 'YoyoText',

  variants: {
    variant: {
      display: {
        fontSize: 34,
        fontWeight: '900',
        lineHeight: 40,
        letterSpacing: -1,
        color: '#0F1419',
      },
      heading: {
        fontSize: 28,
        fontWeight: '800',
        lineHeight: 34,
        letterSpacing: -0.5,
        color: '#0F1419',
      },
      subheading: {
        fontSize: 20,
        fontWeight: '700',
        lineHeight: 26,
        letterSpacing: -0.3,
        color: '#0F1419',
      },
      body: {
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 24,
        letterSpacing: 0,
        color: '#0F1419',
      },
      label: {
        fontSize: 14,
        fontWeight: '600',
        lineHeight: 18,
        letterSpacing: 0.2,
        color: '#0F1419',
      },
      caption: {
        fontSize: 12,
        fontWeight: '500',
        lineHeight: 16,
        letterSpacing: 0.1,
        color: '#536471',
      },
      overline: {
        fontSize: 11,
        fontWeight: '700',
        lineHeight: 14,
        letterSpacing: 1,
        textTransform: 'uppercase',
        color: '#8899A6',
      },
    },
  } as const,

  defaultVariants: {
    variant: 'body',
  },
});
