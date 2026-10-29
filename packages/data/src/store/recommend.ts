import type { PlayFocus, PlayerLevel, StoreProduct } from './catalog-types';
import { hasDimensions } from './specs';

export type Budget = 'under-30' | 'under-70' | 'under-130' | 'any';
export type SizeFeel = 'compact' | 'standard' | 'wide' | 'no-preference';

export interface FinderAnswers {
  level: PlayerLevel;
  focus: PlayFocus;
  budget: Budget;
  size: SizeFeel;
}

export interface Recommendation {
  product: StoreProduct;
  score: number;
  reasons: string[];
}

const BUDGET_CAP: Record<Budget, number> = {
  'under-30': 30,
  'under-70': 70,
  'under-130': 130,
  any: Number.POSITIVE_INFINITY,
};

export const sizeOf = (widthMm: number): Exclude<SizeFeel, 'no-preference'> =>
  widthMm < 46 ? 'compact' : widthMm <= 52 ? 'standard' : 'wide';

const FOCUS_LABEL: Record<PlayFocus, string> = {
  basics: 'learning the basics',
  dna: 'DNA and fingerspins',
  'string-tricks': 'string tricks',
  speed: 'speed combos',
  horizontal: 'horizontal play',
  training: 'training accuracy',
  collector: 'collecting',
};

// Deterministic scoring over the real catalog. Every reason maps to a fact
// on the product's own page, so the coach can never invent a claim.
export function recommend(answers: FinderAnswers, products: StoreProduct[], limit = 3): Recommendation[] {
  const cap = BUDGET_CAP[answers.budget];
  const needsResponsive = answers.level === 'first-throw';

  const scored = products
    .filter((p) => !p.meta.hidden && (p.meta.kind === 'yoyo' || p.meta.kind === 'pack'))
    .filter((p) => p.available && p.priceFrom <= cap)
    .filter((p) => (needsResponsive ? p.meta.responsive === true : p.meta.responsive !== true))
    .map((p) => {
      let score = 0;
      const reasons: string[] = [];

      if (p.meta.levels?.includes(answers.level)) {
        score += 4;
        reasons.push(
          needsResponsive
            ? 'Comes back on a tug, so you can learn the throw first'
            : answers.level === 'competitor'
              ? 'Built for contest play'
              : 'Made for exactly where you are',
        );
      }
      if (p.meta.focus?.includes(answers.focus)) {
        score += 3;
        reasons.push(`Designed for ${FOCUS_LABEL[answers.focus]}`);
      }
      if (answers.size !== 'no-preference' && hasDimensions(p.specs)) {
        if (sizeOf(p.specs.widthMm) === answers.size) {
          score += 2;
          reasons.push(`${p.specs.widthMm} mm wide, the ${answers.size} feel you asked for`);
        }
      }
      if (p.meta.kind === 'pack' && answers.level === 'first-throw') {
        score += 1;
        reasons.push('Includes string and the next yo-yo you will grow into');
      }
      if (p.meta.proof) {
        score += 1;
        reasons.push(p.meta.proof);
      }
      return { product: p, score, reasons };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score || a.product.priceFrom - b.product.priceFrom);

  return scored.slice(0, limit);
}
