"use client";

import Link from "next/link";
import Image from "next/image";
import { getProductByHandle, hasDimensions, formatMoney, CONSTRUCTION_LABEL } from "@yoyo/data";
import type { StoreProduct } from "@yoyo/data";
import { useCompareStore, selectCompareHandles, MAX_COMPARE } from "@yoyo/store";
import { YoyoSilhouette } from "@/components/store/yoyo-silhouette";
import { shopifyImage } from "@yoyo/data";

type Row = { label: string; value: (p: StoreProduct) => string | number | undefined; unit?: string };

const ROWS: Row[] = [
  { label: "Price", value: (p) => formatMoney(p.priceFrom) },
  { label: "Diameter", value: (p) => p.specs.diameterMm, unit: "mm" },
  { label: "Width", value: (p) => p.specs.widthMm, unit: "mm" },
  { label: "Weight", value: (p) => p.specs.weightG, unit: "g" },
  { label: "Gap", value: (p) => p.specs.gapMm, unit: "mm" },
  { label: "Build", value: (p) => (p.meta.construction ? CONSTRUCTION_LABEL[p.meta.construction] : undefined) },
  { label: "Bearing", value: (p) => p.specs.bearing },
  { label: "Response", value: (p) => p.specs.response ?? (p.meta.responsive === false ? "Unresponsive" : p.meta.responsive ? "Responsive" : undefined) },
  { label: "Good for", value: (p) => p.meta.levels?.map(levelLabel).join(", ") },
  { label: "In stock", value: (p) => (p.available ? "Yes" : "No") },
];

function levelLabel(l: string) {
  return { "first-throw": "never thrown", "learning-tricks": "learning tricks", "can-bind": "can bind", competitor: "competing" }[l] ?? l;
}

export function CompareClient() {
  const handles = useCompareStore(selectCompareHandles);
  const remove = useCompareStore((s) => s.removeFromCompare);
  const clear = useCompareStore((s) => s.clearCompare);
  const products = handles.map(getProductByHandle).filter((p): p is StoreProduct => Boolean(p));

  if (products.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
        <h1 className="text-4xl font-bold tracking-tight text-ink">Nothing to compare yet.</h1>
        <p className="mt-3 text-slate">Tap Compare on up to {MAX_COMPARE} yo-yos and they line up here at the same scale.</p>
        <Link href="/store/yoyos" className="mt-6 inline-flex rounded-full bg-aqua px-6 py-3 font-semibold text-white hover:bg-aqua-deep">
          Browse yo-yos
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-ink">Side by side.</h1>
          <p className="mt-2 text-slate">Silhouettes are drawn to the same scale, so size differences are real.</p>
        </div>
        <div className="flex gap-4 text-sm font-semibold">
          {products.length < MAX_COMPARE && (
            <Link href="/store/yoyos" className="text-aqua-deep hover:underline">Add another</Link>
          )}
          <button type="button" onClick={clear} className="text-slate hover:text-ink">Clear all</button>
        </div>
      </div>

      {/* Silhouette overlay */}
      <div className="mt-8 flex flex-wrap items-end justify-center gap-10 rounded-[2rem] bg-sky p-8">
        {products.map((p) =>
          hasDimensions(p.specs) ? (
            <figure key={p.handle} className="flex flex-col items-center gap-2">
              <YoyoSilhouette diameterMm={p.specs.diameterMm} widthMm={p.specs.widthMm} scale={2.2} />
              <figcaption className="text-sm font-medium text-ink">{p.title.replace(/ Yoyo$/i, "")}</figcaption>
            </figure>
          ) : (
            <figure key={p.handle} className="flex flex-col items-center gap-2 text-slate">
              <span className="flex h-24 w-24 items-center justify-center rounded-full border border-dashed border-slate/40 text-xs">no dimensions published</span>
              <figcaption className="text-sm font-medium text-ink">{p.title.replace(/ Yoyo$/i, "")}</figcaption>
            </figure>
          ),
        )}
      </div>

      <div className="mt-8 overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr>
              <th className="w-32 p-2 text-left align-bottom font-medium text-slate">Yo-yo</th>
              {products.map((p) => (
                <th key={p.handle} className="p-2 text-left align-bottom">
                  <Link href={`/store/products/${p.handle}`} className="group block">
                    <span className="relative block aspect-square w-full max-w-[160px] overflow-hidden rounded-2xl bg-sky">
                      {p.images[0] && <Image src={shopifyImage(p.images[0], 320)} alt="" fill sizes="160px" className="object-contain p-2" />}
                    </span>
                    <span className="mt-2 block text-base font-semibold text-ink group-hover:text-aqua-deep">{p.title}</span>
                  </Link>
                  <button type="button" onClick={() => remove(p.handle)} className="mt-1 text-xs font-medium text-slate hover:text-ink">
                    Remove
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr key={row.label} className="border-t border-line">
                <th scope="row" className="p-2 text-left font-medium text-slate">{row.label}</th>
                {products.map((p) => {
                  const v = row.value(p);
                  return (
                    <td key={p.handle} className="p-2 font-semibold text-ink">
                      {v ?? <span className="font-normal text-slate">—</span>}
                      {v !== undefined && row.unit && <span className="ml-1 font-normal text-slate">{row.unit}</span>}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
