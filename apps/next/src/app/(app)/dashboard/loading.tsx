import { Shimmer, ShimmerCircle, ShimmerLine } from "@/components/shimmer";

export default function DashboardLoading() {
  return (
    <div className="flex flex-col gap-6 pt-2 pb-24">
      {/* Hero header: greeting + level/streak chips */}
      <div className="px-5 pt-2 flex items-center justify-between gap-3">
        <div className="flex-1 flex flex-col gap-2">
          <ShimmerLine width={140} height={14} />
          <ShimmerLine width={220} height={24} />
        </div>
        <div className="flex gap-2">
          <Shimmer className="w-16 h-9" rounded="rounded-full" />
          <Shimmer className="w-16 h-9" rounded="rounded-full" />
        </div>
      </div>

      {/* Intro video (16:9) */}
      <div className="px-5">
        <Shimmer className="w-full aspect-video" rounded="rounded-2xl" />
      </div>

      {/* Browse tricks: title, search, chips, grid */}
      <div className="px-5 flex flex-col gap-3">
        <ShimmerLine width={160} height={20} />
        <Shimmer className="w-full h-11" rounded="rounded-2xl" />
        <div className="flex gap-2 overflow-hidden">
          {Array.from({ length: 5 }).map((_, i) => (
            <Shimmer key={i} className="h-9 w-24 shrink-0" rounded="rounded-full" />
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3 mt-1">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl p-3 flex flex-col gap-2 ring-1 ring-black/5">
              <Shimmer className="w-full aspect-[4/3]" rounded="rounded-xl" />
              <ShimmerLine width="80%" height={14} />
              <ShimmerLine width="50%" height={12} />
            </div>
          ))}
        </div>
      </div>

      {/* Advanced coming soon */}
      <div className="px-5 flex flex-col gap-3">
        <ShimmerLine width={180} height={20} />
        <div className="flex gap-3 overflow-hidden">
          {Array.from({ length: 3 }).map((_, i) => (
            <Shimmer key={i} className="h-28 w-40 shrink-0" rounded="rounded-2xl" />
          ))}
        </div>
      </div>

      {/* News */}
      <div className="px-5 flex flex-col gap-3">
        <ShimmerLine width={120} height={20} />
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="bg-white rounded-2xl p-4 flex gap-3 ring-1 ring-black/5">
            <ShimmerCircle size={44} />
            <div className="flex-1 flex flex-col gap-2">
              <ShimmerLine width="70%" height={14} />
              <ShimmerLine width="90%" height={12} />
              <ShimmerLine width="40%" height={10} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
