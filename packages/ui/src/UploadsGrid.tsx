import React from 'react';
import { XStack, YStack } from 'tamagui';
import { Text } from './Text';
import { NEU } from './tamagui.config';

export interface UploadThumbnail {
  id: string;
  thumbnailUrl: string;
}

export interface UploadsGridProps {
  uploads: UploadThumbnail[];
  onUploadPress?: (id: string) => void;
}

export function UploadsGrid({ uploads = [], onUploadPress }: UploadsGridProps) {
  if (uploads.length === 0) {
    return (
      <YStack
        alignItems="center"
        justifyContent="center"
        padding={24}
        backgroundColor="white"
        borderRadius={14}
        {...NEU.card}
      >
        <Text fontSize={13} color="#536471" textAlign="center">
          No uploads yet. Record your first trick!
        </Text>
      </YStack>
    );
  }

  return (
    <XStack flexWrap="wrap" gap={10}>
      {uploads.map((upload) => (
        <YStack
          key={upload.id}
          width="31%"
          aspectRatio={1}
          backgroundColor="#111"
          borderRadius={12}
          overflow="hidden"
          pressStyle={{ opacity: 0.8 }}
          onPress={onUploadPress ? () => onUploadPress(upload.id) : undefined}
          {...NEU.card}
        />
      ))}
    </XStack>
  );
}
