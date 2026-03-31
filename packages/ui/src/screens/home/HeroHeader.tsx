import { XStack, YStack } from 'tamagui';
import { Text } from '../../Text';
import { LevelBadge } from '../../gamification/XPDisplay';

export interface HeroHeaderProps {
  displayName: string;
  level: number;
  streak: number;
}

export function HeroHeader({ displayName, level, streak }: HeroHeaderProps) {
  return (
    <XStack justifyContent="space-between" alignItems="center" paddingHorizontal={20} paddingVertical={16}>
      <YStack flex={1} gap={4}>
        <Text fontSize={24} fontWeight="800" letterSpacing={-0.5} color="#0F1419">
          Welcome back,
        </Text>
        <XStack alignItems="center" gap={10}>
          <Text fontSize={20} fontWeight="700" color="#0F1419">
            {displayName}
          </Text>
          {streak > 0 && (
            <XStack
              alignItems="center"
              gap={4}
              backgroundColor="#FFF3E0"
              paddingHorizontal={10}
              paddingVertical={4}
              borderRadius={20}
            >
              <Text fontSize={14}>{'🔥'}</Text>
              <Text fontSize={13} fontWeight="700" color="#FF9600">
                {streak}d
              </Text>
            </XStack>
          )}
        </XStack>
      </YStack>
      <LevelBadge level={level} size="md" />
    </XStack>
  );
}
