import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  visibleProducts,
  getProductByHandle,
  getIncludedProducts,
  getPacksContaining,
  getStoreYoyos,
  getTrickBySlug,
} from "@yoyo/data";
import type { Trick } from "@yoyo/data";
import { ProductView } from "./product-view";

const ADD_ON_HANDLES = ["dna-string", "center-track-yoyo-bearing", "response-pads", "mzhtuv1qm6rsfjmeie8izknnx8493s"];

export function generateStaticParams() {
  return visibleProducts().map((p) => ({ handle: p.handle }));
}

export async function generateMetadata({ params }: { params: Promise<{ handle: string }> }): Promise<Metadata> {
  const { handle } = await params;
  const product = getProductByHandle(handle);
  return { title: product?.title ?? "Product", description: product?.meta.tagline };
}

export default async function ProductPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const product = getProductByHandle(handle);
  if (!product || product.meta.hidden) notFound();

  const similar = getStoreYoyos()
    .filter((y) => y.handle !== product.handle && y.meta.levels?.some((l) => product.meta.levels?.includes(l)))
    .sort((a, b) => Number(b.available) - Number(a.available))
    .slice(0, 4);

  const addOns = (product.meta.kind === "yoyo" || product.meta.kind === "pack")
    ? ADD_ON_HANDLES.map(getProductByHandle).filter((p) => p && p.available && p.handle !== product.handle)
    : [];

  const tricks = (product.meta.trickSlugs ?? []).map(getTrickBySlug).filter((t): t is Trick => Boolean(t));

  return (
    <ProductView
      product={product}
      included={getIncludedProducts(product)}
      packs={getPacksContaining(product.handle)}
      similar={similar}
      addOns={addOns as NonNullable<(typeof addOns)[number]>[]}
      tricks={tricks}
    />
  );
}
