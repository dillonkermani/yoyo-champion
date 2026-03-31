import { XStack, YStack, Text } from 'tamagui';
import { getDifficultyLabel, getDifficultyColor } from './utils';
// Clean shadow design - NEU removed

export interface TrickCardProps {
  name: string;
  difficulty: number;
  genre: string;
  completed?: boolean;
  xpReward?: number;
  onPress?: (() => void) | undefined;
}

export function TrickCard({ name, difficulty, genre, completed, xpReward, onPress }: TrickCardProps) {
  const color = getDifficultyColor(difficulty);
  const label = getDifficultyLabel(difficulty);

  return (
    <XStack
      backgroundColor="white"
      borderRadius={16}
      padding={14}
      marginBottom={12}
      alignItems="center"
      onPress={onPress}
      animation="quick"
      pressStyle={{ opacity: 0.9, scale: 0.98 }}
      cursor="pointer"
      borderWidth={1}
      borderColor={completed ? '#58CC02' : '#E1E8ED'}
      {...(completed
        ? { borderLeftWidth: 4, borderLeftColor: '#58CC02' }
        : {})}
      shadowColor="#000"
      shadowOffset={{ width: 0, height: 2 }}
      shadowRadius={8}
      shadowOpacity={0.08}
      elevation={3}
    >
      <YStack flex={1}>
        <Text fontWeight="600" fontSize={15} color="#0F1419">{name}</Text>
        <XStack marginTop={4} gap={8} alignItems="center">
          <Text
            fontSize={11}
            color="white"
            backgroundColor={color}
            paddingHorizontal={8}
            paddingVertical={2}
            borderRadius={20}
          >
            {label}
          </Text>
          <Text fontSize={11} color="#536471">{genre}</Text>
        </XStack>
      </YStack>
      {xpReward !== undefined && (
        <Text fontWeight="700" color="$xpGoldDark" fontSize={13}>+{xpReward} XP</Text>
      )}
      {completed && <Text fontSize={16} marginLeft={8}>✓</Text>}
    </XStack>
  );
}
