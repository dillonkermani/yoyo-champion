"use client";

const SHOP_URL = "https://gentrystein.com/collections/shop-all";

export default function ShopPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] bg-[#F7F8FA] px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 rounded-full bg-[#E8FBFF] flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl">🛍️</span>
        </div>
        <h1 className="text-2xl font-extrabold text-gray-900 mb-2">YoYo Champion Shop</h1>
        <p className="text-[#536471] mb-8">
          Browse yo-yos, strings, accessories, and more from our official store.
        </p>
        <a
          href={SHOP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-[14px] bg-[#9bedff] px-8 py-3.5 text-base font-bold text-gray-900 hover:bg-[#7dd9f0] active:scale-[0.98] transition-all shadow-sm hover:shadow-md"
        >
          Visit Shop
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </div>
  );
}
