import { getTrickBySlug } from '../mock-tricks';
import { getProductByHandle } from '../store/catalog';
import type { StoreProduct } from '../store/catalog-types';

// The Sac Yoyo Club trick ladder: land these in front of a club admin and
// you keep the responsive yo-yo you grabbed from the bin. Ends on Trapeze
// because it is the first trick that makes a player want an unresponsive yo-yo.

export interface LadderRung {
  slug: string;
  name: string;
  // YouTube id from the scraped playlist; the sleeper has no tutorial video yet.
  ytId?: string;
  tip: string;
}

const rung = (slug: string, tip: string): LadderRung => {
  const trick = getTrickBySlug(slug);
  if (!trick) throw new Error(`Ladder trick "${slug}" is missing from the video catalog`);
  return { slug, name: trick.name, ytId: trick.ytId, tip };
};

export const TRICK_LADDER: LadderRung[] = [
  {
    slug: 'sleeper',
    name: 'Sleeper',
    tip: 'Throw hard and straight down, keep your palm up, and let it spin at the bottom. A gentle tug brings it back.',
  },
  rung('forward-pass', 'Swing it back past your hip, then throw forward like you are bowling, palm down.'),
  rung('around-the-world', 'Start with a forward pass, then let a strong sleeper carry it in a full circle beside you.'),
  rung('rock-the-baby', 'Pinch the string high, drape it over your hand, and let the yo-yo swing through the triangle.'),
  rung('trapeze', 'Throw a sideways sleeper, put your free index finger out, and swing the yo-yo over it onto the string.'),
];

export const LADDER_REWARD_HANDLE = 'vyral-dna-trick-pack';
// Offered after the reward to players who say they're ready for unresponsive yo-yos.
export const UNRESPONSIVE_UPSELL_HANDLE = 'yoyo-master-pack';

function catalogProduct(handle: string): StoreProduct {
  const product = getProductByHandle(handle);
  if (!product) throw new Error(`Ladder product "${handle}" is missing from the catalog`);
  return product;
}

export const ladderReward = (): StoreProduct => catalogProduct(LADDER_REWARD_HANDLE);
export const unresponsiveUpsell = (): StoreProduct => catalogProduct(UNRESPONSIVE_UPSELL_HANDLE);

// Index of the first rung not yet approved, or TRICK_LADDER.length when done.
export function nextRungIndex(approvedSlugs: readonly string[]): number {
  const idx = TRICK_LADDER.findIndex((r) => !approvedSlugs.includes(r.slug));
  return idx === -1 ? TRICK_LADDER.length : idx;
}

export const isLadderComplete = (approvedSlugs: readonly string[]): boolean =>
  nextRungIndex(approvedSlugs) === TRICK_LADDER.length;

export const MIN_NEWSLETTER_AGE = 13;
