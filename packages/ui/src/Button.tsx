import { styled } from '@tamagui/core';
import { Button as TamaguiButton } from 'tamagui';
import { NEU } from './tamagui.config';

export const Button = styled(TamaguiButton, {
  name: 'YoyoButton',
  borderRadius: 14,
  fontWeight: '600',
  letterSpacing: 0.3,
  borderWidth: 0,
  ...NEU.button,
  pressStyle: { opacity: 0.95, scale: 0.975, backgroundColor: '$neuSurfacePressed', ...NEU.pressed },

  variants: {
    variant: {
      primary: {
        backgroundColor: '$brandAqua',
        color: 'white',
        ...NEU.glowAqua,
        hoverStyle: { backgroundColor: '$brandAquaDark' },
        pressStyle: { backgroundColor: '$brandAquaDark', ...NEU.pressed },
      },
      secondary: {
        backgroundColor: '$brandPurple',
        color: 'white',
        ...NEU.glowPurple,
        hoverStyle: { backgroundColor: '$brandPurpleDark' },
        pressStyle: { backgroundColor: '$brandPurpleDark', ...NEU.pressed },
      },
      accent: {
        backgroundColor: '$brandOrange',
        color: 'white',
        shadowColor: '#FF9600',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 12,
        shadowOpacity: 0.35,
        elevation: 4,
        hoverStyle: { backgroundColor: '$brandOrangeDark' },
        pressStyle: { backgroundColor: '$brandOrangeDark', ...NEU.pressed },
      },
      outline: {
        backgroundColor: '$neuSurface',
        borderWidth: 1,
        borderColor: '$neuHighlightSubtle',
        color: '$brandAqua',
        ...NEU.button,
        pressStyle: { backgroundColor: '$neuSurfacePressed', ...NEU.pressed },
      },
      ghost: {
        backgroundColor: 'transparent',
        color: '$brandAqua',
        shadowOpacity: 0,
        elevation: 0,
      },
      glass: {
        backgroundColor: '$neuSurface',
        borderWidth: 0,
        color: '#2d3436',
        ...NEU.button,
        pressStyle: { backgroundColor: '$neuSurfacePressed', ...NEU.pressed },
      },
    },
    size: {
      sm: { paddingHorizontal: 14, paddingVertical: 8, fontSize: 14 },
      md: { paddingHorizontal: 18, paddingVertical: 12, fontSize: 16 },
      lg: { paddingHorizontal: 26, paddingVertical: 16, fontSize: 18 },
    },
  } as const,

  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});
