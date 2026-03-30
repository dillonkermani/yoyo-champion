import React from 'react';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { UploadScreen } from '@yoyo/ui';
import { mockTricks } from '@yoyo/data';
import { useVideoStore } from '@yoyo/store';

const trickOptions = mockTricks.map((t) => ({ id: t.id, name: t.name }));

export default function UploadModal() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const addUpload = useVideoStore((s) => s.addUpload);

  const handleSubmit = (data: {
    trickId: string;
    tags: string[];
    usesYoyoChampionYoyo: boolean;
  }) => {
    addUpload({
      trickId: data.trickId,
      videoUri: '',
      tags: data.tags,
      usesYoyoChampionYoyo: data.usesYoyoChampionYoyo,
    });
    router.back();
  };

  return (
    <UploadScreen
      tricks={trickOptions}
      onSubmit={handleSubmit}
      onCancel={() => router.back()}
      paddingTop={insets.top}
    />
  );
}
