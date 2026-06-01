import { Shimmer, ShimmerLine } from "@/components/shimmer";

export default function LibraryLoading() {
  return (
    <div className="flex flex-col gap-3 pt-2 pb-24">
      {/* Title */}
      <div className="px-5 pt-3">
        <ShimmerLine width={180} height={26} />
      </div>

      {/* Search */}
      <div className="px-5">
        <Shimmer className="w-full h-11" rounded="rounded-2xl" />
      </div>

      {/* Filter chips */}
      <div className="px-5 flex gap-2 flex-wrap">
        {Array.from({ length: 6 }).map((_, i) => (
          <Shimmer key={i} className="h-9 w-20" rounded="rounded-full" />
        ))}
      </div>

      {/* Result count */}
      <div className="px-5">
        <ShimmerLine width={80} height={10} />
      </div>

      {/* Trick rows */}
      <div className="px-5 flex flex-col gap-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="bg-white rounded-2xl p-4 flex items-center gap-3 ring-1 ring-black/5">
            <Shimmer className="w-14 h-14" rounded="rounded-xl" />
            <div className="flex-1 flex flex-col gap-2">
              <ShimmerLine width="60%" height={14} />
              <ShimmerLine width="40%" height={12} />
            </div>
            <Shimmer className="w-12 h-6" rounded="rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
