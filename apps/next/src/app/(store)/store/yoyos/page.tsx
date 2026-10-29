import { Suspense } from "react";
import type { Metadata } from "next";
import { CatalogClient } from "./catalog-client";

export const metadata: Metadata = { title: "All yo-yos" };

export default function YoyosPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-6xl px-4 py-16 text-slate">Loading the catalog…</div>}>
      <CatalogClient />
    </Suspense>
  );
}
