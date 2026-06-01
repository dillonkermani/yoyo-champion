"use client";
import { TrickDetailScreen } from '@yoyo/ui';
import { getTrickBySlug } from '@yoyo/data';
import { useProgressStore, selectMasteredTricks } from '@yoyo/store';
import { useParams } from 'next/navigation';

export default function TrickClient() {
  const params = useParams();
  const slug = typeof params['slug'] === 'string' ? params['slug'] : '';
  const trick = getTrickBySlug(slug);
  const masteredTricks = useProgressStore(selectMasteredTricks);

  if (!trick) {
    return null;
  }

  const completed = masteredTricks.some((t) => t.trickId === trick.id);

  return (
    <TrickDetailScreen
      name={trick.name}
      level={trick.level}
      durationSec={trick.durationSec}
      thumbnails={trick.thumbnails}
      ytId={trick.ytId}
      completed={completed}
    />
  );
}
