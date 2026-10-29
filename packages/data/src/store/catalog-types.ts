import type { YoyoSpecs } from './specs';

export interface CatalogVariant {
  id: string;
  title: string;
  price: number;
  compareAtPrice?: number;
  available: boolean;
  image?: string;
}

// What the Shopify sync produces, before editorial metadata is layered on.
export interface RawCatalogProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  specs: YoyoSpecs;
  priceFrom: number;
  compareAtFrom?: number;
  available: boolean;
  optionName?: string;
  images: string[];
  variants: CatalogVariant[];
}

export type ProductKind = 'yoyo' | 'pack' | 'string' | 'part' | 'merch' | 'gift-card';
export type Construction = 'plastic' | 'metal' | 'bimetal' | 'hybrid' | 'titanium' | 'tri-material';
export type PlayerLevel = 'first-throw' | 'learning-tricks' | 'can-bind' | 'competitor';
export type PlayFocus = 'basics' | 'dna' | 'string-tricks' | 'speed' | 'horizontal' | 'training' | 'collector';

// Hand-curated facts drawn from each product's own description. Nothing here
// is guessed: if the page doesn't say it, the field is left out.
export interface ProductMeta {
  kind: ProductKind;
  responsive?: boolean;
  construction?: Construction;
  levels?: PlayerLevel[];
  focus?: PlayFocus[];
  tagline?: string;
  forYou?: string[];
  notForYou?: string[];
  proof?: string;
  limitedTo?: number;
  trickSlugs?: string[];
  includesHandles?: string[];
  // A colourway edition whose page doesn't repeat the base model's spec list.
  specsFrom?: string;
  hidden?: boolean;
}

export type StoreProduct = RawCatalogProduct & { meta: ProductMeta };
