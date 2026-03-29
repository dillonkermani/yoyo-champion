import React from 'react';
import { YStack } from 'tamagui';
import { VideoPlayer } from '../../VideoPlayer';
import { Text } from '../../Text';
import { NEU } from '../../tamagui.config';

export interface IntroVideoProps {
  uri: string;
  posterUri?: string;
}

export function IntroVideo({ uri, posterUri }: IntroVideoProps) {
  return (
    <YStack paddingHorizontal={20} gap={10}>
      <Text fontSize={13} fontWeight="600" color="#636e72" letterSpacing={0.5} textTransform="uppercase">
        Getting Started
      </Text>
      <YStack
        borderRadius={16}
        overflow="hidden"
        aspectRatio={16 / 9}
        backgroundColor="#000"
        {...NEU.card}
      >
        <VideoPlayer uri={uri} {...(posterUri ? { posterUri } : {})} isActive isMuted />
      </YStack>
    </YStack>
  );
}
