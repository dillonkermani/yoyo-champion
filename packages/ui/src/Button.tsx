import { styled } from '@tamagui/core';
import { Button as TamaguiButton } from 'tamagui';

export const Button = styled(TamaguiButton, {
  name: 'YoyoButton',
  borderRadius: 12,
  fontWeight: '700',
  pressStyle: { opacity: 0.8, scale: 0.97 },

  variants: {
    variant: {
      primary: {
        backgroundColor: '$brandAqua',
        color: 'white',
        hoverStyle: { backgroundColor: '$brandAquaDark' },
      },
      secondary: {
        backgroundColor: '$brandPurple',
        color: 'white',
        hoverStyle: { backgroundColor: '$brandPurpleDark' },
      },
      accent: {
        backgroundColor: '$brandOrange',
        color: 'white',
        hoverStyle: { backgroundColor: '$brandOrangeDark' },
      },
      outline: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: '$brandAqua',
        color: '$brandAqua',
      },
      ghost: {
        backgroundColor: 'transparent',
        color: '$brandAqua',
      },
    },
    size: {
      sm: { paddingHorizontal: 12, paddingVertical: 6, fontSize: 14 },
      md: { paddingHorizontal: 16, paddingVertical: 10, fontSize: 16 },
      lg: { paddingHorizontal: 24, paddingVertical: 14, fontSize: 18 },
    },
  } as const,

  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});
