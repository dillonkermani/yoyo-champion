"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import type { StoreProduct, Trick } from "@yoyo/data";
import { cartPermalink, productUrl, formatMoney, hasDimensions, CONSTRUCTION_LABEL } from "@yoyo/data";
import { useCompareStore, selectIsCompared, selectCompareFull } from "@yoyo/store";
import { Price } from "@/components/store/price";
import { YoyoSilhouette } from "@/components/store/yoyo-silhouette";
import { SpecRange } from "@/components/store/spec-range";
import { ProductCard } from "@/components/store/product-card";
import { shopifyImage } from "@yoyo/data";

interface Props {
  product: StoreProduct;
  included: StoreProduct[];
  packs: StoreProduct[];
  similar: StoreProduct[];
  addOns: StoreProduct[];
  tricks: Trick[];
}

export function ProductView({ product, included, packs, similar, addOns, tricks }: Props) {
  const firstAvailable = product.variants.find((v) => v.available) ?? product.variants[0]!;
  const [variantId, setVariantId] = React.useState(firstAvailable.id);
  const [addOnIds, setAddOnIds] = React.useState<string[]>([]);
  const [imageIndex, setImageIndex] = React.useState(0);

  const variant = product.variants.find((v) => v.id === variantId) ?? firstAvailable;
  const compared = useCompareStore(selectIsCompared(product.handle));
  const compareFull = useCompareStore(selectCompareFull);
  const toggleCompare = useCompareStore((s) => s.toggleCompare);

  const isYoyo = product.meta.kind === "yoyo";
  const images = product.images;
  const shownImage = variant.image && imageIndex === 0 ? variant.image : images[imageIndex] ?? images[0];

  const addOnLines = addOns
    .filter((a) => addOnIds.includes(a.handle))
    .map((a) => ({ variantId: (a.variants.find((v) => v.available) ?? a.variants[0]!).id }));
  const total = variant.price + addOns.filter((a) => addOnIds.includes(a.handle)).reduce((s, a) => s + a.priceFrom, 0);
  const buyHref = cartPermalink([{ variantId: variant.id }, ...addOnLines]);

  // Spec lines already render in the Specs panel, so keep the prose only.
  const paragraphs = product.description
    .split("\n")
    .map((l) => l.trim())
    .filter(
      (l) =>
        l.length > 0 &&
        !/^(specs?|specifications):?$/i.test(l) &&
        !/^(diameter|width|weight|gap width|in gap|bearing|response|body|rims)\s*[:|\-–]/i.test(l),
    );

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <nav aria-label="Breadcrumb" className="text-sm text-slate">
        <Link href="/store" className="hover:text-ink">Store</Link>
        <span className="mx-2">/</span>
        <Link href={`/store/yoyos?kind=${product.meta.kind === "yoyo" ? "yoyo" : product.meta.kind === "pack" ? "pack" : "parts"}`} className="hover:text-ink">
          {product.meta.kind === "yoyo" ? "Yo-yos" : product.meta.kind === "pack" ? "Packs" : "String and parts"}
        </Link>
      </nav>

      <div className="mt-4 grid gap-10 lg:grid-cols-[1.05fr_1fr]">
        {/* Gallery */}
        <div className="min-w-0">
          <div className="relative aspect-square overflow-hidden rounded-[2rem] bg-sky">
            {shownImage && (
              <Image key={shownImage} src={shopifyImage(shownImage, 1200)} alt={`${product.title}, ${variant.title}`} fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="object-contain p-8" />
            )}
            {isYoyo && hasDimensions(product.specs) && (
              <div className="absolute bottom-4 left-4 flex items-center gap-3 rounded-2xl bg-white/95 px-3 py-2">
                <YoyoSilhouette diameterMm={product.specs.diameterMm} widthMm={product.specs.widthMm} scale={1} />
                <span className="text-xs leading-tight text-slate">
                  Drawn to scale.
                  <br />
                  Same scale on every page.
                </span>
              </div>
            )}
          </div>
          {images.length > 1 && (
            <ul className="mt-3 flex gap-2 overflow-x-auto pb-1">
              {images.map((src, i) => (
                <li key={src}>
                  <button
                    type="button"
                    onClick={() => setImageIndex(i)}
                    aria-label={`Photo ${i + 1}`}
                    aria-current={i === imageIndex}
                    className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 bg-sky transition-colors ${
                      i === imageIndex ? "border-aqua" : "border-transparent hover:border-line"
                    }`}
                  >
                    <Image src={shopifyImage(src, 128)} alt="" fill sizes="64px" className="object-contain p-1" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Buy panel */}
        <div className="min-w-0">
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-ink">{product.title}</h1>
          {product.meta.tagline && <p className="mt-2 text-lg text-slate">{product.meta.tagline}</p>}
          {product.meta.proof && <p className="mt-3 rounded-2xl bg-sky px-4 py-3 text-sm leading-relaxed text-ink">{product.meta.proof}</p>}

          <div className="mt-6">
            <Price price={variant.price} compareAt={variant.compareAtPrice} size="lg" />
            {product.meta.limitedTo && <p className="mt-1 text-sm text-slate">Limited to {product.meta.limitedTo} pieces.</p>}
          </div>

          {product.optionName && product.variants.length > 1 && (
            <fieldset className="mt-6">
              <legend className="text-sm font-medium text-ink">
                {product.optionName}: <span className="text-slate">{variant.title}</span>
              </legend>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.variants.map((v) => {
                  const selected = v.id === variant.id;
                  return (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => {
                        setVariantId(v.id);
                        setImageIndex(0);
                      }}
                      aria-pressed={selected}
                      className={`inline-flex items-center gap-2 rounded-full border py-1.5 pl-1.5 pr-3.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-aqua ${
                        selected ? "border-aqua bg-sky text-ink" : "border-line text-ink hover:border-aqua/60"
                      } ${v.available ? "" : "opacity-50"}`}
                    >
                      <span className="relative h-7 w-7 overflow-hidden rounded-full bg-sky">
                        {v.image && <Image src={shopifyImage(v.image, 56)} alt="" fill sizes="28px" className="object-cover" />}
                      </span>
                      {v.title}
                      {!v.available && <span className="text-xs text-slate">sold out</span>}
                    </button>
                  );
                })}
              </div>
            </fieldset>
          )}

          {addOns.length > 0 && (
            <fieldset className="mt-6 rounded-3xl border border-line p-4">
              <legend className="px-1 text-sm font-medium text-ink">Complete the setup</legend>
              <ul className="mt-1 space-y-2">
                {addOns.map((a) => {
                  const on = addOnIds.includes(a.handle);
                  return (
                    <li key={a.handle}>
                      <label className="flex cursor-pointer items-center gap-3 rounded-2xl p-2 hover:bg-sky/60">
                        <input
                          type="checkbox"
                          checked={on}
                          onChange={(e) =>
                            setAddOnIds((ids) => (e.target.checked ? [...ids, a.handle] : ids.filter((h) => h !== a.handle)))
                          }
                          className="h-4 w-4 rounded border-line text-aqua focus:ring-aqua"
                        />
                        <span className="relative h-10 w-10 overflow-hidden rounded-xl bg-sky">
                          {a.images[0] && <Image src={shopifyImage(a.images[0], 80)} alt="" fill sizes="40px" className="object-contain p-1" />}
                        </span>
                        <span className="flex-1">
                          <span className="block text-sm font-medium text-ink">{a.title}</span>
                          {a.meta.tagline && <span className="block text-xs text-slate">{a.meta.tagline}</span>}
                        </span>
                        <span className="text-sm font-semibold text-ink">{formatMoney(a.priceFrom)}</span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </fieldset>
          )}

          <div className="mt-6 flex flex-col gap-3">
            {variant.available ? (
              <a
                href={buyHref}
                className="inline-flex items-center justify-center rounded-full bg-aqua px-6 py-4 text-base font-semibold text-white transition-colors hover:bg-aqua-deep focus:outline-none focus-visible:ring-2 focus-visible:ring-aqua focus-visible:ring-offset-2"
              >
                Buy {addOnLines.length > 0 ? `setup, ${formatMoney(total)}` : `for ${formatMoney(variant.price)}`}
              </a>
            ) : (
              <span className="inline-flex items-center justify-center rounded-full bg-line px-6 py-4 text-base font-semibold text-slate">
                Sold out in {variant.title}
              </span>
            )}
            <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-slate">
              <span>Checkout opens on gentrystein.com with your items in the cart.</span>
              <a href={productUrl(product, variant.id)} target="_blank" rel="noopener noreferrer" className="font-medium text-aqua-deep hover:underline">
                View there
              </a>
            </div>
            {isYoyo && (
              <button
                type="button"
                onClick={() => toggleCompare(product.handle)}
                disabled={!compared && compareFull}
                aria-pressed={compared}
                className={`inline-flex items-center justify-center rounded-full border px-6 py-3 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-aqua disabled:opacity-40 ${
                  compared ? "border-aqua bg-sky text-aqua-deep" : "border-line text-ink hover:border-aqua"
                }`}
              >
                {compared ? "In your comparison" : "Add to compare"}
              </button>
            )}
          </div>

          {(product.meta.forYou || product.meta.notForYou) && (
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {product.meta.forYou && (
                <div>
                  <h2 className="font-semibold text-ink">This is for you if</h2>
                  <ul className="mt-2 space-y-1.5 text-sm text-slate">
                    {product.meta.forYou.map((f) => (
                      <li key={f} className="flex gap-2">
                        <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-aqua" aria-hidden />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {product.meta.notForYou && (
                <div>
                  <h2 className="font-semibold text-ink">Skip it if</h2>
                  <ul className="mt-2 space-y-1.5 text-sm text-slate">
                    {product.meta.notForYou.map((f) => (
                      <li key={f} className="flex gap-2">
                        <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-slate/50" aria-hidden />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Specs */}
      {isYoyo && (Object.keys(product.specs).length > 0 || product.meta.construction) && (
        <section className="mt-16 grid gap-8 rounded-[2rem] border border-line p-6 sm:p-8 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-ink">Specs</h2>
            <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
              <SpecRow label="Diameter" value={product.specs.diameterMm} unit="mm" />
              <SpecRow label="Width" value={product.specs.widthMm} unit="mm" />
              <SpecRow label="Weight" value={product.specs.weightG} unit="g" />
              <SpecRow label="Gap" value={product.specs.gapMm} unit="mm" />
              <SpecRow label="Build" value={product.meta.construction ? CONSTRUCTION_LABEL[product.meta.construction] : undefined} />
              <SpecRow label="Body" value={product.specs.body} />
              <SpecRow label="Rims" value={product.specs.rims} />
              <SpecRow label="Bearing" value={product.specs.bearing} />
              <SpecRow label="Response" value={product.specs.response ?? (product.meta.responsive === true ? "Responsive" : product.meta.responsive === false ? "Unresponsive" : undefined)} />
            </dl>
            <p className="mt-4 text-xs text-slate">Only what the product page states. A dash means it is not published.</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-ink">Against the rest of the store</h2>
            <div className="mt-4">
              <SpecRange specs={product.specs} />
            </div>
          </div>
        </section>
      )}

      {/* Description */}
      <section className="mt-16 grid gap-10 lg:grid-cols-[1fr_1fr]">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-ink">About the {product.title.replace(/ Yoyo$/i, "")}</h2>
          <div className="prose-sm mt-4 max-w-prose space-y-3 text-[15px] leading-relaxed text-slate">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>

        {tricks.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-ink">Tricks to learn on it</h2>
            <p className="mt-1 text-sm text-slate">Gentry&apos;s tutorials on YouTube.</p>
            <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {tricks.map((t) => (
                <li key={t.slug}>
                  <a
                    href={`https://www.youtube.com/watch?v=${t.ytId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block overflow-hidden rounded-2xl border border-line transition-colors hover:border-aqua"
                  >
                    <span className="relative block aspect-video bg-ink">
                      <Image src={t.thumbnails.hq} alt="" fill sizes="200px" className="object-cover" />
                    </span>
                    <span className="block p-2.5 text-sm font-medium text-ink">{t.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {included.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold tracking-tight text-ink">What is inside</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {included.map((p) => (
              <ProductCard key={p.handle} product={p} />
            ))}
          </div>
        </section>
      )}

      {packs.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold tracking-tight text-ink">Comes in a pack</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {packs.map((p) => (
              <ProductCard key={p.handle} product={p} />
            ))}
          </div>
        </section>
      )}

      {similar.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold tracking-tight text-ink">Same level, different feel</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {similar.map((p) => (
              <ProductCard key={p.handle} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function SpecRow({ label, value, unit }: { label: string; value?: string | number | undefined; unit?: string }) {
  return (
    <div className="flex items-baseline justify-between border-b border-line py-2">
      <dt className="text-slate">{label}</dt>
      <dd className="text-right font-semibold text-ink">
        {value ?? <span className="font-normal text-slate">—</span>}
        {value !== undefined && unit && <span className="ml-1 font-normal text-slate">{unit}</span>}
      </dd>
    </div>
  );
}
