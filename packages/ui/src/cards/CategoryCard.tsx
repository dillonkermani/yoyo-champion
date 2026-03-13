import React from 'react';
import { YStack, XStack } from 'tamagui';
import { Text } from '../Text';
import { NEU } from '../tamagui.config';

const ICON_EMOJI: Record<string, string> = {
  Target: '🎯',
  Sparkles: '✨',
  Zap: '⚡',
  Cpu: '🔧',
  Wind: '🌀',
  RotateCcw: '🔄',
  Rocket: '🚀',
  Hand: '🤚',
};

const COLOR_HEX: Record<string, string> = {
  teal: '#58CC02',
  blue: '#1CB0F6',
  purple: '#CE82FF',
  cyan: '#00BCD4',
  pink: '#FF6B9D',
  yellow: '#FFC800',
  orange: '#FF9600',
  red: '#FF4B4B',
};

export interface CategoryCardProps {
  name: string;
  description: string;
  icon: string;
  trickCount: number;
  color: string;
  bonusXP: number;
  onPress?: () => void;
}

export function CategoryCard({
  name,
  description,
  icon,
  trickCount,
  color,
  bonusXP,
  onPress,
}: CategoryCardProps) {
  const hex = COLOR_HEX[color] ?? '#1CB0F6';
  const emoji = ICON_EMOJI[icon] ?? '🪀';

  return (
    <XStack
      backgroundColor="$neuSurface"
      borderRadius={20}
      padding={18}
      marginBottom={14}
      height={120}
      alignItems="center"
      onPress={onPress}
      animation="quick"
      pressStyle={{
        scaleY: 0.97,
        scaleX: 1.005,
        opacity: 0.92,
        backgroundColor: '$neuSurfacePressed',
        ...NEU.pressed,
      }}
      cursor="pointer"
      borderLeftWidth={5}
      borderLeftColor={hex}
      {...NEU.card}
    >
      {/* Left: icon + info */}
      <YStack
        width={48}
        height={48}
        borderRadius={14}
        backgroundColor={hex}
        alignItems="center"
        justifyContent="center"
        marginRight={14}
        opacity={0.9}
      >
        <Text fontSize={22}>{emoji}</Text>
      </YStack>

      <YStack flex={1} gap={4}>
        <Text fontSize={16} fontWeight="700" color="#2d3436">
          {name}
        </Text>
        <Text fontSize={12} color="#636e72" numberOfLines={2}>
          {description}
        </Text>
        <Text fontSize={11} color="#b2bec3" marginTop={2}>
          {trickCount} {trickCount === 1 ? 'trick' : 'tricks'}
        </Text>
      </YStack>

      {/* Right: bonus XP badge */}
      <YStack
        backgroundColor={hex}
        borderRadius={12}
        paddingHorizontal={10}
        paddingVertical={6}
        alignItems="center"
        justifyContent="center"
        marginLeft={10}
        opacity={0.95}
      >
        <Text fontSize={11} fontWeight="800" color="white">
          +{bonusXP}
        </Text>
        <Text fontSize={9} fontWeight="600" color="rgba(255,255,255,0.85)">
          XP
        </Text>
      </YStack>
    </XStack>
  );
}
