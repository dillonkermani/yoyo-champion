import { TrickDetailScreen } from '@yoyo/ui';
import { getTrickBySlug } from '@yoyo/data';
import { useProgressStore, selectMasteredTricks } from '@yoyo/store';
import { useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TrickDetailPage() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const insets = useSafeAreaInsets();
  const trick = getTrickBySlug(slug ?? '');
  const masteredTricks = useProgressStore(selectMasteredTricks);

  if (!trick) return null;

  return (
    <TrickDetailScreen
      name={trick.name}
      level={trick.level}
      durationSec={trick.durationSec}
      thumbnails={trick.thumbnails}
      ytId={trick.ytId}
      completed={masteredTricks.some((t) => t.trickId === trick.id)}
      paddingTop={insets.top}
    />
  );
}
