// The catalog now comes from the YouTube playlist scraper.
// Run `pnpm scrape:videos` at the repo root to regenerate.
import type { Trick } from './types';
import { TRICK_VIDEOS } from './generated/trick-videos.generated';

export const mockTricks: Trick[] = TRICK_VIDEOS;

export const getTrickById = (id: string): Trick | undefined =>
  mockTricks.find((t) => t.id === id);

export const getTrickBySlug = (slug: string): Trick | undefined =>
  mockTricks.find((t) => t.slug === slug);

// Legacy helpers: data dropped these dimensions. Kept so older imports still resolve
// — they return an empty list when the legacy field is missing.
export const getTricksByDifficulty = (difficulty: number): Trick[] =>
  mockTricks.filter((t) => t.difficulty === difficulty);

export const getTricksByStyle = (style: string): Trick[] =>
  mockTricks.filter((t) => t.style === style);

export const getTricksByGenre = (genre: string): Trick[] =>
  mockTricks.filter((t) => t.genre === genre);

export const getPrerequisiteChain = (trickId: string): Trick[] => {
  const trick = getTrickById(trickId);
  if (!trick || !trick.prerequisites?.length) return [];
  const chain: Trick[] = [];
  const visited = new Set<string>();
  const walk = (id: string) => {
    if (visited.has(id)) return;
    visited.add(id);
    const t = getTrickById(id);
    if (!t) return;
    t.prerequisites?.forEach(walk);
    chain.push(t);
  };
  trick.prerequisites.forEach(walk);
  return chain;
};
