import { createTamagui } from '@tamagui/core';
import { config as baseConfig } from '@tamagui/config/v3';

export const tamaguiConfig = createTamagui({
  ...baseConfig,
  tokens: {
    ...baseConfig.tokens,
    color: {
      ...baseConfig.tokens.color,
      // YoYoChampion brand colors
      brandAqua: '#1CB0F6',
      brandAquaLight: '#4DC4F9',
      brandAquaDark: '#0095DB',
      brandPurple: '#CE82FF',
      brandPurpleLight: '#E5B8FF',
      brandPurpleDark: '#A855F7',
      brandOrange: '#FF9600',
      brandOrangeLight: '#FFB84D',
      brandOrangeDark: '#E68600',
      xpGold: '#FFC800',
      xpGoldLight: '#FFD700',
      streakRed: '#FF4B4B',
    },
  },
});

export type TamaguiConfig = typeof tamaguiConfig;

declare module 'tamagui' {
  interface TamaguiCustomConfig extends TamaguiConfig {}
}

export default tamaguiConfig;
