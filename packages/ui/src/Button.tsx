import { styled } from '@tamagui/core';
import { Button as TamaguiButton } from 'tamagui';
import { NEU } from './tamagui.config';

export const Button = styled(TamaguiButton, {
  name: 'YoyoButton',
  borderRadius: 9999,
  fontWeight: '700',
  fontSize: 16,
  letterSpacing: 0.2,
  borderWidth: 0,
  ...NEU.button,
  animation: 'quick',
  pressStyle: { opacity: 0.88, scale: 0.97, ...NEU.pressed },

  variants: {
    variant: {
      primary: {
        backgroundColor: '$brandAqua',
        color: '#0F1419',
        ...NEU.glowAqua,
        hoverStyle: { backgroundColor: '$brandAquaDark', scale: 1.02 },
        pressStyle: { backgroundColor: '$brandAquaDark', scale: 0.97, ...NEU.pressed },
      },
      secondary: {
        backgroundColor: '$brandPurple',
        color: 'white',
        ...NEU.glowPurple,
        hoverStyle: { backgroundColor: '$brandPurpleDark', scale: 1.02 },
        pressStyle: { backgroundColor: '$brandPurpleDark', scale: 0.97, ...NEU.pressed },
      },
      accent: {
        backgroundColor: '$brandOrange',
        color: 'white',
        ...NEU.glowAqua,
        shadowColor: '#FF9600',
        hoverStyle: { backgroundColor: '$brandOrangeDark', scale: 1.02 },
        pressStyle: { backgroundColor: '$brandOrangeDark', scale: 0.97, ...NEU.pressed },
      },
      outline: {
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: '$brandAqua',
        color: '$brandAqua',
        ...NEU.button,
        hoverStyle: { backgroundColor: '$brandAqua', color: 'white' },
        pressStyle: { scale: 0.97, ...NEU.pressed },
      },
      ghost: {
        backgroundColor: 'transparent',
        color: '$brandAqua',
        shadowOpacity: 0,
        elevation: 0,
        hoverStyle: { backgroundColor: '#F0F7FF' },
      },
      glass: {
        backgroundColor: '#F7F8FA',
        borderWidth: 1,
        borderColor: '#E1E8ED',
        color: '#0F1419',
        ...NEU.button,
        hoverStyle: { backgroundColor: '#EEF1F4' },
        pressStyle: { scale: 0.97, ...NEU.pressed },
      },
      destructive: {
        backgroundColor: '$streakRed',
        color: 'white',
        ...NEU.glowRed,
        hoverStyle: { opacity: 0.9, scale: 1.02 },
        pressStyle: { scale: 0.97, ...NEU.pressed },
      },
    },
    size: {
      sm: { paddingHorizontal: 16, paddingVertical: 10, fontSize: 14, height: 40 },
      md: { paddingHorizontal: 20, paddingVertical: 12, fontSize: 16, height: 48 },
      lg: { paddingHorizontal: 28, paddingVertical: 16, fontSize: 18, height: 56 },
    },
  } as const,

  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});
