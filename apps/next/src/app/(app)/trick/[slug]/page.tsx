"use client";
import { TrickDetailScreen } from '@yoyo/ui';
import { getTrickBySlug } from '@yoyo/data';
import { useProgressStore, selectMasteredTricks } from '@yoyo/store';
import { useParams } from 'next/navigation';

export default function TrickPage() {
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
      difficulty={trick.difficulty}
      genre={trick.genre}
      style={trick.style}
      xpReward={trick.xpReward}
      estimatedMinutes={trick.estimatedMinutes}
      description={trick.description}
      steps={trick.steps}
      completed={completed}
    />
  );
}
