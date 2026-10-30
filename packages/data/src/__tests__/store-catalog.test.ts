import { describe, it, expect } from 'vitest';
import {
  storeProducts,
  visibleProducts,
  getProductByHandle,
  getStoreYoyos,
  getPacks,
  getIncludedProducts,
  getPacksContaining,
  cartPermalink,
  productUrl,
  formatMoney,
  STORE_ORIGIN,
  CATALOG_META,
} from '../store';
import { RAW_CATALOG } from '../generated/catalog.generated';

describe('store catalog', () => {
  it('has editorial metadata for every synced product', () => {
    const missing = RAW_CATALOG.map((p) => p.handle).filter((h) => !CATALOG_META[h]);
    expect(missing).toEqual([]);
  });

  it('hides private restock links and products without images', () => {
    const visible = visibleProducts().map((p) => p.handle);
    expect(visible).not.toContain('super-g-silver-red-splash-restock');
    expect(visible).not.toContain('signed-poster');
    expect(visibleProducts().every((p) => p.images.length > 0)).toBe(true);
  });

  it('every yo-yo card has a tagline, and spec dimensions are real numbers', () => {
    for (const y of getStoreYoyos()) {
      expect(y.meta.tagline, y.handle).toBeTruthy();
      if (y.specs.diameterMm !== undefined) expect(y.specs.diameterMm).toBeGreaterThan(30);
      if (y.specs.widthMm !== undefined) expect(y.specs.widthMm).toBeGreaterThan(30);
    }
  });

  it('the G Force carries the specs printed on its page', () => {
    const g = getProductByHandle('g-force-yoyo')!;
    expect(g.specs).toMatchObject({ diameterMm: 56, widthMm: 56, weightG: 69, bearing: 'Concave' });
    expect(g.variants.length).toBeGreaterThan(1);
    expect(g.optionName).toBe('Color');
  });

  it('signature colourways inherit the base model specs', () => {
    const base = getProductByHandle('g-force-yoyo')!;
    for (const h of ['electric-g-force', 'fire-g-force']) {
      expect(getProductByHandle(h)!.specs, h).toEqual(base.specs);
    }
  });

  it('packs resolve the products they include', () => {
    const pack = getProductByHandle('shutter-competition-pack')!;
    expect(getIncludedProducts(pack).map((p) => p.handle)).toEqual(['g-force-yoyo', 'shutter-mini-bimetal']);
    expect(getPacksContaining('g-force-yoyo').map((p) => p.handle)).toContain('shutter-competition-pack');
    expect(getPacks().length).toBeGreaterThan(0);
  });

  it('builds Shopify cart permalinks against the live store', () => {
    expect(cartPermalink([])).toBe(`${STORE_ORIGIN}/cart`);
    expect(cartPermalink([{ variantId: '1' }, { variantId: '2', quantity: 3 }])).toBe(`${STORE_ORIGIN}/cart/1:1,2:3`);
    const g = getProductByHandle('g-force-yoyo')!;
    expect(productUrl(g)).toBe(`${STORE_ORIGIN}/products/g-force-yoyo`);
    expect(productUrl(g, g.variants[0]!.id)).toContain(`?variant=${g.variants[0]!.id}`);
  });

  it('formats money without stray decimals', () => {
    expect(formatMoney(160)).toBe('$160');
    expect(formatMoney(44.99)).toBe('$44.99');
    expect(storeProducts.length).toBe(RAW_CATALOG.length);
  });
});
