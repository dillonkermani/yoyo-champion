import { YStack, XStack } from 'tamagui';
import { Text } from '../Text';
import { Button } from '../Button';
import { TrickDetailHero } from '../cards/TrickDetailHero';
import { ScreenContainer } from '../primitives/ScreenContainer';
import { NEU } from '../tamagui.config';

export interface TrickStep {
  id: string;
  order: number;
  title: string;
  description: string;
}

export interface TrickDetailScreenProps {
  name: string;
  difficulty: number;
  genre: string;
  style: string;
  xpReward: number;
  estimatedMinutes: number;
  description: string;
  steps: TrickStep[];
  completed?: boolean;
  mirrorVideo?: boolean;
  onStartPracticing?: () => void;
  onMarkComplete?: () => void;
  paddingTop?: number;
}

export function TrickDetailScreen({
  name,
  difficulty,
  genre,
  style,
  xpReward,
  estimatedMinutes,
  description,
  steps,
  completed = false,
  mirrorVideo = false,
  onStartPracticing,
  onMarkComplete,
  paddingTop = 0,
}: TrickDetailScreenProps) {
  return (
    <ScreenContainer scrollable paddingTop={paddingTop}>
      <TrickDetailHero name={name} difficulty={difficulty} genre={genre} style={style} xpReward={xpReward} />

      <YStack padding={24} gap={18}>
        {mirrorVideo && (
          <XStack
            backgroundColor="rgba(206, 130, 255, 0.12)"
            borderRadius={100}
            paddingHorizontal={14}
            paddingVertical={6}
            alignSelf="flex-start"
            gap={6}
            alignItems="center"
          >
            <Text fontSize={13} fontWeight="700" color="$brandPurple">Left-hand view</Text>
          </XStack>
        )}
        <XStack gap={8} alignItems="center">
          <Text fontSize={13} color="#536471">Est. {estimatedMinutes} min</Text>
          {completed && (
            <XStack backgroundColor="#e6f5e8" borderRadius={100} paddingHorizontal={10} paddingVertical={3}>
              <Text fontSize={12} fontWeight="600" color="#58CC02">Mastered</Text>
            </XStack>
          )}
        </XStack>

        <Text fontSize={15} color="#0F1419" lineHeight={22}>{description}</Text>

        <Text fontSize={18} fontWeight="700" letterSpacing={-0.3} color="#0F1419">Steps</Text>
        {steps.map((step) => (
          <YStack
            key={step.id}
            backgroundColor="white"
            borderRadius={16}
            padding={14}
            gap={6}
            {...NEU.card}
          >
            <XStack gap={10} alignItems="center">
              <YStack
                width={28}
                height={28}
                borderRadius={14}
                backgroundColor="$brandAqua"
                alignItems="center"
                justifyContent="center"
                {...NEU.glowAqua}
                shadowRadius={6}
                shadowOpacity={0.25}
              >
                <Text fontSize={12} fontWeight="700" color="white">{step.order}</Text>
              </YStack>
              <Text fontSize={15} fontWeight="600" color="#0F1419" flex={1}>{step.title}</Text>
            </XStack>
            <Text fontSize={13} color="#536471" lineHeight={20} paddingLeft={38}>{step.description}</Text>
          </YStack>
        ))}

        <YStack gap={10} marginTop={8}>
          {!completed && onStartPracticing && (
            <Button onPress={onStartPracticing}>Start Practicing</Button>
          )}
          {!completed && onMarkComplete && (
            <Button onPress={onMarkComplete} variant="outline">Mark as Complete</Button>
          )}
        </YStack>
      </YStack>

      <YStack height={100} />
    </ScreenContainer>
  );
}
