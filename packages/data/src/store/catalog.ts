import { RAW_CATALOG, STORE_ORIGIN } from '../generated/catalog.generated';
import { CATALOG_META } from './catalog-meta';
import type { PlayerLevel, ProductKind, ProductMeta, StoreProduct } from './catalog-types';

const UNKNOWN_META: ProductMeta = { kind: 'merch' };

export const storeProducts: StoreProduct[] = RAW_CATALOG.map((raw) => {
  const meta = CATALOG_META[raw.handle] ?? UNKNOWN_META;
  const base = meta.specsFrom ? RAW_CATALOG.find((p) => p.handle === meta.specsFrom) : undefined;
  const specs = Object.keys(raw.specs).length === 0 && base ? base.specs : raw.specs;
  return { ...raw, specs, meta };
});

export const visibleProducts = (): StoreProduct[] => storeProducts.filter((p) => !p.meta.hidden);

export const getProductByHandle = (handle: string): StoreProduct | undefined =>
  storeProducts.find((p) => p.handle === handle);

export const getProductsByKind = (kind: ProductKind): StoreProduct[] =>
  visibleProducts().filter((p) => p.meta.kind === kind);

export const getStoreYoyos = (): StoreProduct[] => getProductsByKind('yoyo');

export const getPacks = (): StoreProduct[] => getProductsByKind('pack');

export const getProductsForLevel = (level: PlayerLevel): StoreProduct[] =>
  visibleProducts().filter((p) => p.meta.levels?.includes(level));

export const getLimitedEditions = (): StoreProduct[] =>
  visibleProducts().filter((p) => typeof p.meta.limitedTo === 'number');

export const getIncludedProducts = (product: StoreProduct): StoreProduct[] =>
  (product.meta.includesHandles ?? [])
    .map(getProductByHandle)
    .filter((p): p is StoreProduct => Boolean(p));

export const getPacksContaining = (handle: string): StoreProduct[] =>
  getPacks().filter((p) => p.meta.includesHandles?.includes(handle));

// Shopify cart permalink: /cart/<variantId>:<qty>,<variantId>:<qty> opens the
// real gentrystein.com checkout with those lines already in the cart.
export const cartPermalink = (lines: { variantId: string; quantity?: number }[]): string => {
  if (lines.length === 0) return `${STORE_ORIGIN}/cart`;
  const path = lines.map((l) => `${l.variantId}:${l.quantity ?? 1}`).join(',');
  return `${STORE_ORIGIN}/cart/${path}`;
};

export const productUrl = (product: StoreProduct, variantId?: string): string =>
  `${STORE_ORIGIN}/products/${product.handle}${variantId ? `?variant=${variantId}` : ''}`;

export const formatMoney = (n: number): string =>
  n % 1 === 0 ? `$${n.toFixed(0)}` : `$${n.toFixed(2)}`;

export const PLAYER_LEVELS: { id: PlayerLevel; label: string; blurb: string }[] = [
  { id: 'first-throw', label: 'Never thrown', blurb: 'A yo-yo that comes back on a tug.' },
  { id: 'learning-tricks', label: 'Learning tricks', blurb: 'Sleeper, trapeze, first string tricks.' },
  { id: 'can-bind', label: 'I can bind', blurb: 'Ready for unresponsive metal.' },
  { id: 'competitor', label: 'Competing', blurb: 'Contest-grade spin and stability.' },
];

export const CONSTRUCTION_LABEL: Record<NonNullable<StoreProduct['meta']['construction']>, string> = {
  plastic: 'Polycarbonate',
  metal: 'Aluminum',
  bimetal: 'Bimetal',
  hybrid: 'Hybrid',
  titanium: 'Titanium',
  'tri-material': 'Tri-material',
};
