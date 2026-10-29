"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCompareStore, selectCompareCount } from "@yoyo/store";

const NAV = [
  { href: "/store/yoyos", label: "Yo-yos" },
  { href: "/store/yoyos?kind=pack", label: "Packs" },
  { href: "/store/finder", label: "Find my yo-yo" },
];

export function StoreHeader() {
  const pathname = usePathname();
  const compareCount = useCompareStore(selectCompareCount);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-4 sm:px-6">
        <Link href="/store" className="flex items-center gap-2.5 font-bold tracking-tight text-ink">
          <Image src="/images/logo.avif" alt="" width={28} height={28} className="h-7 w-7" />
          <span>YoYoChampion</span>
        </Link>

        <nav aria-label="Store" className="ml-auto flex items-center gap-1 overflow-x-auto">
          {NAV.map((item) => {
            const active = pathname === item.href.split("?")[0] && !item.href.includes("?");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`whitespace-nowrap rounded-full px-3.5 py-2 text-sm font-medium transition-colors hover:bg-sky ${
                  active ? "bg-sky text-aqua-deep" : "text-ink"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/store/compare"
            className={`ml-1 inline-flex items-center gap-2 whitespace-nowrap rounded-full border px-3.5 py-2 text-sm font-medium transition-colors ${
              compareCount > 0 ? "border-aqua bg-aqua-soft text-aqua-deep" : "border-line text-ink hover:bg-sky"
            }`}
          >
            Compare
            {compareCount > 0 && (
              <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-aqua px-1.5 text-xs font-bold text-white">
                {compareCount}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function StoreFooter() {
  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 text-sm text-slate sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="max-w-md">
          Every yo-yo here is from Gentry Stein&apos;s signature line. Checkout and shipping happen on gentrystein.com.
        </p>
        <nav aria-label="Footer" className="flex gap-5">
          <Link href="/store/yoyos" className="hover:text-ink">Yo-yos</Link>
          <Link href="/store/finder" className="hover:text-ink">Find my yo-yo</Link>
          <Link href="/store/compare" className="hover:text-ink">Compare</Link>
          <Link href="/curriculum" className="hover:text-ink">Learn tricks</Link>
        </nav>
      </div>
    </footer>
  );
}
