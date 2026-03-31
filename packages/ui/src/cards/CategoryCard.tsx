import React from 'react';
import { YStack, XStack } from 'tamagui';
import { Text } from '../Text';
// Clean shadow design - NEU removed

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
  blue: '#9bedff',
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
  const hex = COLOR_HEX[color] ?? '#9bedff';
  const emoji = ICON_EMOJI[icon] ?? '🪀';

  return (
    <XStack
      backgroundColor="white"
      borderRadius={20}
      padding={18}
      marginBottom={14}
      height={120}
      alignItems="center"
      onPress={onPress}
      animation="quick"
      pressStyle={{ opacity: 0.9, scale: 0.98 }}
      cursor="pointer"
      borderWidth={1}
      borderColor="#E1E8ED"
      borderLeftWidth={5}
      borderLeftColor={hex}
      shadowColor="#000"
      shadowOffset={{ width: 0, height: 2 }}
      shadowRadius={8}
      shadowOpacity={0.08}
      elevation={3}
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
        <Text fontSize={16} fontWeight="700" color="#0F1419">
          {name}
        </Text>
        <Text fontSize={12} color="#536471" numberOfLines={2}>
          {description}
        </Text>
        <Text fontSize={11} color="#8899A6" marginTop={2}>
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
