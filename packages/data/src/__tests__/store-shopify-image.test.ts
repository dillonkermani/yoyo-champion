import { describe, it, expect } from "vitest";
import { shopifyImage } from '../store/shopify-image';

describe("shopifyImage", () => {
  it("adds a width param to Shopify CDN urls and keeps the cache-busting version", () => {
    const out = shopifyImage("https://cdn.shopify.com/s/files/1/0640/9506/0183/files/g.jpg?v=1781972368", 600);
    expect(out).toBe("https://cdn.shopify.com/s/files/1/0640/9506/0183/files/g.jpg?v=1781972368&width=600");
  });

  it("leaves non-Shopify urls alone", () => {
    expect(shopifyImage("https://i.ytimg.com/vi/x/hqdefault.jpg", 300)).toBe("https://i.ytimg.com/vi/x/hqdefault.jpg");
  });
});
