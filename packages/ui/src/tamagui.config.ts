import { createTamagui } from '@tamagui/core';
import { config as baseConfig } from '@tamagui/config/v3';

// Modern design system — clean, bold, high-contrast, premium feel.
// Inspired by STNDRD (Chris Bumstead) with gamification accents.
// Replaces the old neumorphic (NEU) approach for better readability
// and WCAG-compliant contrast ratios.

export const THEME = {
  // Surface colors — clean white cards on subtle gray backgrounds
  surface: '#FFFFFF',
  surfaceSecondary: '#F7F8FA',
  surfacePressed: '#F0F2F5',
  surfaceMuted: '#E8ECF1',

  // Text — high contrast, WCAG AAA compliant
  text: '#0F1419',          // near-black for maximum readability
  textSecondary: '#536471', // medium gray, 4.6:1 contrast on white
  textMuted: '#8899A6',     // lighter gray for captions
  textInverse: '#FFFFFF',   // white on dark backgrounds

  // Borders
  border: '#E1E8ED',
  borderFocus: '#1CB0F6',

  // Shadow presets — modern, clean depth (not neumorphic)
  shadow: {
    sm: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowRadius: 3, shadowOpacity: 0.08, elevation: 2 },
    md: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowRadius: 8, shadowOpacity: 0.12, elevation: 4 },
    lg: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowRadius: 16, shadowOpacity: 0.12, elevation: 8 },
    xl: { shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowRadius: 24, shadowOpacity: 0.14, elevation: 12 },
  },

  // Colored glow shadows — great for gamification accents
  glow: {
    aqua: { shadowColor: '#1CB0F6', shadowOffset: { width: 0, height: 2 }, shadowRadius: 14, shadowOpacity: 0.35, elevation: 4 },
    purple: { shadowColor: '#CE82FF', shadowOffset: { width: 0, height: 2 }, shadowRadius: 14, shadowOpacity: 0.35, elevation: 4 },
    gold: { shadowColor: '#FFC800', shadowOffset: { width: 0, height: 2 }, shadowRadius: 12, shadowOpacity: 0.4, elevation: 3 },
    red: { shadowColor: '#FF4B4B', shadowOffset: { width: 0, height: 2 }, shadowRadius: 14, shadowOpacity: 0.35, elevation: 4 },
    green: { shadowColor: '#58CC02', shadowOffset: { width: 0, height: 2 }, shadowRadius: 12, shadowOpacity: 0.35, elevation: 3 },
    rare: { shadowColor: '#3B82F6', shadowOffset: { width: 0, height: 2 }, shadowRadius: 14, shadowOpacity: 0.35, elevation: 4 },
    epic: { shadowColor: '#9333EA', shadowOffset: { width: 0, height: 2 }, shadowRadius: 14, shadowOpacity: 0.35, elevation: 4 },
    legendary: { shadowColor: '#FBBF24', shadowOffset: { width: 0, height: 4 }, shadowRadius: 18, shadowOpacity: 0.5, elevation: 6 },
  },
} as const;

// Backwards compatibility — maps old NEU keys to new THEME equivalents
export const NEU = {
  surface: THEME.surface,
  surfaceLight: THEME.surfaceSecondary,
  surfacePressed: THEME.surfacePressed,
  shadowDark: '#000',
  shadowLight: '#fff',
  highlight: 'rgba(255,255,255,0.6)',
  highlightSubtle: 'rgba(255,255,255,0.35)',
  card: THEME.shadow.md,
  cardLifted: THEME.shadow.lg,
  button: THEME.shadow.sm,
  pressed: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowRadius: 2, shadowOpacity: 0.06, elevation: 1 },
  inset: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowRadius: 2, shadowOpacity: 0.06, elevation: 1 },
  glowAqua: THEME.glow.aqua,
  glowPurple: THEME.glow.purple,
  glowGold: THEME.glow.gold,
  glowRed: THEME.glow.red,
  glowGreen: THEME.glow.green,
  glowRare: THEME.glow.rare,
  glowEpic: THEME.glow.epic,
  glowLegendary: THEME.glow.legendary,
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
      xpGoldDark: '#A07800',
      xpGoldLight: '#FFD700',
      streakRed: '#FF4B4B',
      successGreen: '#58CC02',
      // Rarity colors
      rarityCommon: '#6B7280',
      rarityUncommon: '#1CB0F6',
      rarityRare: '#3B82F6',
      rarityEpic: '#9333EA',
      rarityLegendary: '#FBBF24',
      // Modern surface system (new)
      surface: '#FFFFFF',
      surfaceSecondary: '#F7F8FA',
      surfacePressed: '#F0F2F5',
      surfaceMuted: '#E8ECF1',
      // Text colors — high contrast
      textPrimary: '#0F1419',
      textSecondary: '#536471',
      textMuted: '#8899A6',
      // Borders
      border: '#E1E8ED',
      // Backwards-compatible neumorphic tokens (updated to modern values)
      neuSurface: '#FFFFFF',
      neuSurfaceLight: '#F7F8FA',
      neuSurfacePressed: '#F0F2F5',
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
