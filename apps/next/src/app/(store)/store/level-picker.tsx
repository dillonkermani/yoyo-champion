"use client";

import * as React from "react";
import Link from "next/link";
import { PLAYER_LEVELS, getProductsForLevel } from "@yoyo/data";
import type { PlayerLevel } from "@yoyo/data";
import { ProductCard } from "@/components/store/product-card";

export function LevelPicker() {
  const [level, setLevel] = React.useState<PlayerLevel>("first-throw");
  const products = getProductsForLevel(level)
    .filter((p) => p.meta.kind === "yoyo" || p.meta.kind === "pack")
    .sort((a, b) => Number(b.available) - Number(a.available) || a.priceFrom - b.priceFrom);

  return (
    <div className="mt-8">
      <div role="tablist" aria-label="Player level" className="grid gap-2 sm:grid-cols-4">
        {PLAYER_LEVELS.map((l) => {
          const active = l.id === level;
          return (
            <button
              key={l.id}
              role="tab"
              type="button"
              aria-selected={active}
              onClick={() => setLevel(l.id)}
              className={`rounded-2xl border px-4 py-3 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-aqua ${
                active ? "border-aqua bg-sky" : "border-line hover:border-aqua/60"
              }`}
            >
              <span className="block font-semibold text-ink">{l.label}</span>
              <span className="block text-sm text-slate">{l.blurb}</span>
            </button>
          );
        })}
      </div>

      <div role="tabpanel" className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {products.slice(0, 4).map((p, i) => (
          <ProductCard key={p.handle} product={p} priority={i < 2} />
        ))}
      </div>

      <div className="mt-6">
        <Link href={`/store/yoyos?level=${level}`} className="text-sm font-semibold text-aqua-deep hover:underline">
          See everything for this level
        </Link>
      </div>
    </div>
  );
}
