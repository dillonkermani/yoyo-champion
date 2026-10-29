"use client";

import Link from "next/link";
import Image from "next/image";
import type { StoreProduct } from "@yoyo/data";
import { hasDimensions, CONSTRUCTION_LABEL } from "@yoyo/data";
import { useCompareStore, selectIsCompared, selectCompareFull } from "@yoyo/store";
import { Price } from "./price";
import { YoyoSilhouette } from "./yoyo-silhouette";
import { shopifyImage } from "@yoyo/data";

interface Props {
  product: StoreProduct;
  priority?: boolean;
}

export function ProductCard({ product, priority }: Props) {
  const compared = useCompareStore(selectIsCompared(product.handle));
  const full = useCompareStore(selectCompareFull);
  const toggle = useCompareStore((s) => s.toggleCompare);
  const isYoyo = product.meta.kind === "yoyo";
  const specs = product.specs;
  const image = product.images[0];

  return (
    <article className="group relative flex flex-col rounded-3xl border border-line bg-white transition-colors hover:border-aqua">
      <Link href={`/store/products/${product.handle}`} className="flex flex-1 flex-col p-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-aqua rounded-3xl">
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-sky/60">
          {image && (
            <Image
              src={shopifyImage(image, 600)}
              alt={product.title}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              className="object-contain p-4 transition-transform duration-300 group-hover:scale-[1.03]"
              priority={priority ?? false}
            />
          )}
          {!product.available && (
            <span className="absolute left-3 top-3 rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-slate">Sold out</span>
          )}
          {product.available && product.meta.limitedTo && (
            <span className="absolute left-3 top-3 rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-ink">
              Limited to {product.meta.limitedTo}
            </span>
          )}
          {isYoyo && hasDimensions(specs) && (
            <span className="absolute bottom-3 right-3 rounded-xl bg-white/90 p-1.5" title="Drawn to scale">
              <YoyoSilhouette diameterMm={specs.diameterMm} widthMm={specs.widthMm} scale={0.9} />
            </span>
          )}
        </div>

        <div className="mt-4 flex flex-1 flex-col">
          <h3 className="text-lg font-semibold leading-snug text-ink">{product.title}</h3>
          {product.meta.tagline && <p className="mt-1 text-sm leading-relaxed text-slate">{product.meta.tagline}</p>}

          {isYoyo && hasAnySpec(specs) && (
            <dl className="mt-3 grid grid-cols-3 gap-2 text-ink">
              <SpecMini value={specs.diameterMm} unit="mm" label="diameter" />
              <SpecMini value={specs.widthMm} unit="mm" label="width" />
              <SpecMini value={specs.weightG} unit="g" label="weight" />
            </dl>
          )}

          {(product.meta.construction || product.meta.responsive !== undefined) && (
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {product.meta.responsive !== undefined && (
                <li className="rounded-full bg-sky px-2.5 py-1 text-xs font-medium text-aqua-deep">
                  {product.meta.responsive ? "Responsive" : "Unresponsive"}
                </li>
              )}
              {product.meta.construction && (
                <li className="rounded-full bg-sky px-2.5 py-1 text-xs font-medium text-ink">
                  {CONSTRUCTION_LABEL[product.meta.construction]}
                </li>
              )}
            </ul>
          )}

          <div className="mt-auto pt-4">
            <Price price={product.priceFrom} compareAt={product.compareAtFrom} from={product.variants.length > 1 && hasPriceSpread(product)} />
          </div>
        </div>
      </Link>

      {isYoyo && (
        <button
          type="button"
          onClick={() => toggle(product.handle)}
          disabled={!compared && full}
          aria-pressed={compared}
          className={`absolute right-4 top-4 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-aqua disabled:cursor-not-allowed disabled:opacity-40 ${
            compared ? "bg-aqua text-white" : "bg-white text-ink shadow-sm hover:bg-sky"
          }`}
        >
          {compared ? "Comparing" : "Compare"}
        </button>
      )}
    </article>
  );
}

function hasAnySpec(s: StoreProduct["specs"]) {
  return [s.diameterMm, s.widthMm, s.weightG].some((v) => typeof v === "number");
}

function hasPriceSpread(p: StoreProduct) {
  return new Set(p.variants.map((v) => v.price)).size > 1;
}

function SpecMini({ value, unit, label }: { value?: number | undefined; unit: string; label: string }) {
  return (
    <div className="rounded-xl bg-sky/70 px-2.5 py-2">
      <dd className="text-sm font-bold leading-none">
        {value ?? <span className="text-slate">—</span>}
        {value !== undefined && <span className="ml-0.5 text-xs font-medium text-slate">{unit}</span>}
      </dd>
      <dt className="mt-1 text-[11px] text-slate">{label}</dt>
    </div>
  );
}
