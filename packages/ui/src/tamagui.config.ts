import { createTamagui } from '@tamagui/core';
import { config as baseConfig } from '@tamagui/config/v3';

// Neumorphic surface: #e8ecf1 (cool blue-gray)
// Light shadow (top-left highlight): #ffffff
// Dark shadow (bottom-right depth): #b8c0cc
// Shadows are TINTED to match the surface — never pure black.
// React Native only supports one shadow per view, so we use the dark shadow
// and rely on background color + border highlight for the dual effect.

export const NEU = {
  surface: '#e8ecf1',
  surfaceLight: '#eef1f5',
  surfacePressed: '#dfe3e9',
  shadowDark: '#b8c0cc',
  shadowLight: '#ffffff',
  highlight: 'rgba(255,255,255,0.6)',  // inner top-left edge glow
  highlightSubtle: 'rgba(255,255,255,0.35)',
  // Shadow presets (dark shadow only — RN limitation)
  card: { shadowColor: '#b8c0cc', shadowOffset: { width: 4, height: 4 }, shadowRadius: 10, shadowOpacity: 0.6, elevation: 4 },
  cardLifted: { shadowColor: '#b8c0cc', shadowOffset: { width: 6, height: 6 }, shadowRadius: 16, shadowOpacity: 0.7, elevation: 6 },
  button: { shadowColor: '#b8c0cc', shadowOffset: { width: 3, height: 3 }, shadowRadius: 8, shadowOpacity: 0.5, elevation: 3 },
  pressed: { shadowColor: '#b8c0cc', shadowOffset: { width: 1, height: 1 }, shadowRadius: 3, shadowOpacity: 0.3, elevation: 1 },
  inset: { shadowColor: '#b8c0cc', shadowOffset: { width: 2, height: 2 }, shadowRadius: 4, shadowOpacity: 0.4, elevation: 1 },
  // Glow presets for accent colors
  glowAqua: { shadowColor: '#1CB0F6', shadowOffset: { width: 0, height: 2 }, shadowRadius: 12, shadowOpacity: 0.35, elevation: 4 },
  glowPurple: { shadowColor: '#CE82FF', shadowOffset: { width: 0, height: 2 }, shadowRadius: 12, shadowOpacity: 0.35, elevation: 4 },
  glowGold: { shadowColor: '#FFC800', shadowOffset: { width: 0, height: 2 }, shadowRadius: 10, shadowOpacity: 0.4, elevation: 3 },
} as const;

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
      // Neumorphic surface system
      neuSurface: '#e8ecf1',
      neuSurfaceLight: '#eef1f5',
      neuSurfacePressed: '#dfe3e9',
      neuHighlight: 'rgba(255,255,255,0.6)',
      neuHighlightSubtle: 'rgba(255,255,255,0.35)',
    },
  },
});

export type TamaguiConfig = typeof tamaguiConfig;

declare module 'tamagui' {
  interface TamaguiCustomConfig extends TamaguiConfig {}
}

export default tamaguiConfig;
