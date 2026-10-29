// Shopify's CDN resizes on request via the `width` query param, so cards and
// swatches fetch a few KB instead of the multi-megabyte original.
export function shopifyImage(src: string, width: number): string {
  if (!src.includes("cdn.shopify.com")) return src;
  const url = new URL(src);
  url.searchParams.set("width", String(width));
  return url.toString();
}
