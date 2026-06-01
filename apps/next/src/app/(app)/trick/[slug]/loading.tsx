import { Shimmer, ShimmerLine } from "@/components/shimmer";

export default function TrickLoading() {
  return (
    <div className="flex flex-col gap-4 pb-24">
      {/* Hero */}
      <div className="px-5 pt-3 flex flex-col gap-3">
        <ShimmerLine width={80} height={12} />
        <ShimmerLine width="80%" height={28} />
        <div className="flex gap-2">
          <Shimmer className="h-7 w-20" rounded="rounded-full" />
          <Shimmer className="h-7 w-16" rounded="rounded-full" />
          <Shimmer className="h-7 w-24" rounded="rounded-full" />
        </div>
      </div>

      {/* Video / preview */}
      <div className="px-5">
        <Shimmer className="w-full aspect-video" rounded="rounded-2xl" />
      </div>

      {/* Meta row */}
      <div className="px-5 flex gap-3">
        <Shimmer className="flex-1 h-16" rounded="rounded-2xl" />
        <Shimmer className="flex-1 h-16" rounded="rounded-2xl" />
        <Shimmer className="flex-1 h-16" rounded="rounded-2xl" />
      </div>

      {/* Description */}
      <div className="px-5 flex flex-col gap-2">
        <ShimmerLine width={120} height={18} />
        <ShimmerLine width="100%" height={12} />
        <ShimmerLine width="95%" height={12} />
        <ShimmerLine width="70%" height={12} />
      </div>

      {/* Steps */}
      <div className="px-5 flex flex-col gap-3">
        <ShimmerLine width={90} height={18} />
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-white rounded-2xl p-4 flex gap-3 ring-1 ring-black/5">
            <Shimmer className="w-8 h-8" rounded="rounded-full" />
            <div className="flex-1 flex flex-col gap-2">
              <ShimmerLine width="50%" height={14} />
              <ShimmerLine width="90%" height={12} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
