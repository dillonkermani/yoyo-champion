"use client";

import Link from "next/link";

export default function ShopPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] bg-[#F7F8FA] px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 rounded-full bg-[#E8FBFF] flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl">🛍️</span>
        </div>
        <h1 className="text-2xl font-extrabold text-gray-900 mb-2">YoYo Champion Shop</h1>
        <p className="text-[#536471] mb-8">
          Every yo-yo in Gentry&apos;s line, with real specs on every card and a finder that explains its picks.
        </p>
        <Link
          href="/store"
          className="inline-flex items-center gap-2 rounded-[14px] bg-[#9bedff] px-8 py-3.5 text-base font-bold text-gray-900 hover:bg-[#7dd9f0] active:scale-[0.98] transition-all shadow-sm hover:shadow-md"
        >
          Open the store
        </Link>
      </div>
    </div>
  );
}
