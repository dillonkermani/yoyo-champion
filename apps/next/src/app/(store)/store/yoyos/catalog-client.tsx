"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { visibleProducts, PLAYER_LEVELS, CONSTRUCTION_LABEL } from "@yoyo/data";
import type { Construction, PlayerLevel, ProductKind, StoreProduct } from "@yoyo/data";
import { ProductCard } from "@/components/store/product-card";

type KindTab = "yoyo" | "pack" | "parts" | "merch";
const KIND_TABS: { id: KindTab; label: string; kinds: ProductKind[] }[] = [
  { id: "yoyo", label: "Yo-yos", kinds: ["yoyo"] },
  { id: "pack", label: "Packs", kinds: ["pack"] },
  { id: "parts", label: "String and parts", kinds: ["string", "part"] },
  { id: "merch", label: "Merch", kinds: ["merch", "gift-card"] },
];

type Sort = "featured" | "price-asc" | "price-desc" | "lightest" | "widest";
const SORTS: { id: Sort; label: string }[] = [
  { id: "featured", label: "In stock first" },
  { id: "price-asc", label: "Price, low to high" },
  { id: "price-desc", label: "Price, high to low" },
  { id: "lightest", label: "Lightest first" },
  { id: "widest", label: "Widest first" },
];

const CONSTRUCTIONS = Object.keys(CONSTRUCTION_LABEL) as Construction[];

function sortProducts(list: StoreProduct[], sort: Sort): StoreProduct[] {
  const byStock = (a: StoreProduct, b: StoreProduct) => Number(b.available) - Number(a.available);
  const copy = [...list];
  switch (sort) {
    case "price-asc":
      return copy.sort((a, b) => a.priceFrom - b.priceFrom);
    case "price-desc":
      return copy.sort((a, b) => b.priceFrom - a.priceFrom);
    case "lightest":
      return copy.sort((a, b) => (a.specs.weightG ?? 999) - (b.specs.weightG ?? 999));
    case "widest":
      return copy.sort((a, b) => (b.specs.widthMm ?? 0) - (a.specs.widthMm ?? 0));
    default:
      return copy.sort((a, b) => byStock(a, b) || a.priceFrom - b.priceFrom);
  }
}

export function CatalogClient() {
  const params = useSearchParams();
  const initialKind = (params.get("kind") as KindTab | null) ?? "yoyo";
  const initialLevel = params.get("level") as PlayerLevel | null;

  const [kind, setKind] = React.useState<KindTab>(KIND_TABS.some((k) => k.id === initialKind) ? initialKind : "yoyo");
  const [level, setLevel] = React.useState<PlayerLevel | null>(initialLevel);
  const [construction, setConstruction] = React.useState<Construction | null>(null);
  const [inStock, setInStock] = React.useState(false);
  const [sort, setSort] = React.useState<Sort>("featured");

  const tab = KIND_TABS.find((k) => k.id === kind)!;
  const list = sortProducts(
    visibleProducts().filter(
      (p) =>
        tab.kinds.includes(p.meta.kind) &&
        (!level || p.meta.levels?.includes(level)) &&
        (!construction || p.meta.construction === construction) &&
        (!inStock || p.available),
    ),
    sort,
  );

  const isYoyoTab = kind === "yoyo" || kind === "pack";

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="text-4xl font-bold tracking-tight text-ink">{tab.label}</h1>
      <p className="mt-2 text-slate">
        {list.length} {list.length === 1 ? "product" : "products"}. Specs are printed on every card, straight from the product page.
      </p>

      <div role="tablist" aria-label="Product type" className="mt-6 flex flex-wrap gap-2">
        {KIND_TABS.map((k) => (
          <button
            key={k.id}
            role="tab"
            type="button"
            aria-selected={kind === k.id}
            onClick={() => {
              setKind(k.id);
              setConstruction(null);
            }}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-aqua ${
              kind === k.id ? "bg-ink text-white" : "bg-sky text-ink hover:bg-aqua-soft"
            }`}
          >
            {k.label}
          </button>
        ))}
      </div>

      {isYoyoTab && (
        <div className="mt-6 flex flex-col gap-4 rounded-3xl border border-line p-4 sm:p-5">
          <FilterRow label="Level">
            <Chip active={level === null} onClick={() => setLevel(null)}>Any</Chip>
            {PLAYER_LEVELS.map((l) => (
              <Chip key={l.id} active={level === l.id} onClick={() => setLevel(l.id)}>
                {l.label}
              </Chip>
            ))}
          </FilterRow>
          {kind === "yoyo" && (
            <FilterRow label="Build">
              <Chip active={construction === null} onClick={() => setConstruction(null)}>Any</Chip>
              {CONSTRUCTIONS.map((c) => (
                <Chip key={c} active={construction === c} onClick={() => setConstruction(c)}>
                  {CONSTRUCTION_LABEL[c]}
                </Chip>
              ))}
            </FilterRow>
          )}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <label className="inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-ink">
              <input
                type="checkbox"
                checked={inStock}
                onChange={(e) => setInStock(e.target.checked)}
                className="h-4 w-4 rounded border-line text-aqua focus:ring-aqua"
              />
              In stock only
            </label>
            <label className="inline-flex items-center gap-2 text-sm text-slate">
              Sort
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
                className="rounded-full border border-line bg-white px-3 py-1.5 text-sm font-medium text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-aqua"
              >
                {SORTS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
      )}

      {list.length === 0 ? (
        <div className="mt-10 rounded-3xl border border-dashed border-line p-10 text-center">
          <p className="font-semibold text-ink">Nothing matches those filters.</p>
          <button
            type="button"
            onClick={() => {
              setLevel(null);
              setConstruction(null);
              setInStock(false);
            }}
            className="mt-3 text-sm font-semibold text-aqua-deep hover:underline"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {list.map((p, i) => (
            <ProductCard key={p.handle} product={p} priority={i < 4} />
          ))}
        </div>
      )}
    </div>
  );
}

function FilterRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 w-12 text-sm text-slate">{label}</span>
      {children}
    </div>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-aqua ${
        active ? "border-aqua bg-sky text-aqua-deep" : "border-line text-ink hover:border-aqua/60"
      }`}
    >
      {children}
    </button>
  );
}
