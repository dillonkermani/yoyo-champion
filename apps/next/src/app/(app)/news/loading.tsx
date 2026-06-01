import { Shimmer, ShimmerLine } from "@/components/shimmer";

export default function NewsLoading() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <ShimmerLine width={280} height={28} />
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex flex-col rounded-2xl bg-white p-5 ring-1 ring-gray-100 gap-3">
              <div className="flex items-center justify-between">
                <Shimmer className="h-5 w-24" rounded="rounded-full" />
                <ShimmerLine width={60} height={10} />
              </div>
              <ShimmerLine width="90%" height={18} />
              <ShimmerLine width="100%" height={12} />
              <ShimmerLine width="95%" height={12} />
              <ShimmerLine width="60%" height={12} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
