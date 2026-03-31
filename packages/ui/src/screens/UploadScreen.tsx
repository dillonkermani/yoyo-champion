import { useState } from 'react';
import { YStack, XStack, Input } from 'tamagui';
import { Text } from '../Text';
import { Button } from '../Button';
import { ScreenContainer } from '../primitives/ScreenContainer';
import { NEU } from '../tamagui.config';

export interface UploadScreenProps {
  tricks: { id: string; name: string }[];
  onSubmit: (data: { trickId: string; tags: string[]; usesYoyoChampionYoyo: boolean }) => void;
  onCancel?: () => void;
  paddingTop?: number;
}

export function UploadScreen({
  tricks,
  onSubmit,
  onCancel,
  paddingTop = 0,
}: UploadScreenProps) {
  const [selectedTrickId, setSelectedTrickId] = useState<string | null>(null);
  const [tagsInput, setTagsInput] = useState('');
  const [usesYoyoChampionYoyo, setUsesYoyoChampionYoyo] = useState(false);

  const handleSubmit = () => {
    if (!selectedTrickId) return;
    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);
    onSubmit({ trickId: selectedTrickId, tags, usesYoyoChampionYoyo });
  };

  return (
    <ScreenContainer scrollable paddingTop={paddingTop}>
      <YStack padding={24} gap={20}>
        <Text fontSize={28} fontWeight="800" letterSpacing={-0.5} color="#0F1419">
          Upload Your Trick
        </Text>

        {/* Trick selector */}
        <YStack gap={8}>
          <Text fontSize={15} fontWeight="600" color="#536471">
            Select a trick
          </Text>
          <YStack
            backgroundColor="#EEF0F3"
            borderRadius={16}
            padding={8}
            gap={6}
            maxHeight={220}
          >
            {tricks.map((trick) => {
              const isSelected = trick.id === selectedTrickId;
              return (
                <YStack
                  key={trick.id}
                  backgroundColor={isSelected ? '$brandAqua' : '#F7F8FA'}
                  borderRadius={12}
                  paddingVertical={12}
                  paddingHorizontal={16}
                  pressStyle={{ backgroundColor: isSelected ? '$brandAquaDark' : '#F0F2F5' }}
                  onPress={() => setSelectedTrickId(trick.id)}
                  cursor="pointer"
                  {...(isSelected ? NEU.glowAqua : NEU.card)}
                  shadowRadius={isSelected ? 8 : 6}
                  shadowOpacity={isSelected ? 0.3 : 0.4}
                >
                  <Text
                    fontSize={15}
                    fontWeight={isSelected ? '700' : '500'}
                    color={isSelected ? 'white' : '#0F1419'}
                  >
                    {trick.name}
                  </Text>
                </YStack>
              );
            })}
          </YStack>
        </YStack>

        {/* Tags input */}
        <YStack gap={8}>
          <Text fontSize={15} fontWeight="600" color="#536471">
            Tags (comma-separated)
          </Text>
          <Input
            value={tagsInput}
            onChangeText={setTagsInput}
            placeholder="e.g. smooth, beginner, tutorial"
            backgroundColor="white"
            borderRadius={14}
            borderWidth={0}
            paddingHorizontal={16}
            paddingVertical={12}
            fontSize={15}
            color="#0F1419"
            placeholderTextColor="#8899A6"
          />
        </YStack>

        {/* YoYo Champion Yoyo toggle */}
        <YStack gap={8}>
          <Text fontSize={15} fontWeight="600" color="#536471">
            Uses YoYo Champion Yoyo?
          </Text>
          <XStack gap={10}>
            <YStack
              flex={1}
              backgroundColor={usesYoyoChampionYoyo ? '$brandAqua' : '#F7F8FA'}
              borderRadius={14}
              paddingVertical={12}
              alignItems="center"
              pressStyle={{ backgroundColor: usesYoyoChampionYoyo ? '$brandAquaDark' : '#F0F2F5' }}
              onPress={() => setUsesYoyoChampionYoyo(true)}
              cursor="pointer"
              {...(usesYoyoChampionYoyo ? NEU.glowAqua : NEU.card)}
            >
              <Text
                fontSize={15}
                fontWeight="700"
                color={usesYoyoChampionYoyo ? 'white' : '#536471'}
              >
                Yes
              </Text>
            </YStack>
            <YStack
              flex={1}
              backgroundColor={!usesYoyoChampionYoyo ? '$brandAqua' : '#F7F8FA'}
              borderRadius={14}
              paddingVertical={12}
              alignItems="center"
              pressStyle={{ backgroundColor: !usesYoyoChampionYoyo ? '$brandAquaDark' : '#F0F2F5' }}
              onPress={() => setUsesYoyoChampionYoyo(false)}
              cursor="pointer"
              {...(!usesYoyoChampionYoyo ? NEU.glowAqua : NEU.card)}
            >
              <Text
                fontSize={15}
                fontWeight="700"
                color={!usesYoyoChampionYoyo ? 'white' : '#536471'}
              >
                No
              </Text>
            </YStack>
          </XStack>
          {usesYoyoChampionYoyo && (
            <XStack
              backgroundColor="rgba(255, 200, 0, 0.12)"
              borderRadius={10}
              paddingHorizontal={12}
              paddingVertical={8}
              alignItems="center"
              gap={6}
            >
              <Text fontSize={13} color="$xpGoldDark" fontWeight="600">
                5x reputation bonus with YoYo Champion yoyos!
              </Text>
            </XStack>
          )}
        </YStack>

        {/* Actions */}
        <YStack gap={10} marginTop={8}>
          <Button
            onPress={handleSubmit}
            disabled={!selectedTrickId}
            opacity={selectedTrickId ? 1 : 0.5}
          >
            Upload
          </Button>
          {onCancel && (
            <Button onPress={onCancel} variant="outline">
              Cancel
            </Button>
          )}
        </YStack>
      </YStack>

      <YStack height={80} />
    </ScreenContainer>
  );
}
