import { Shimmer, ShimmerCircle, ShimmerLine } from "@/components/shimmer";

export default function ProfileLoading() {
  return (
    <div className="flex flex-col gap-5 pb-24">
      {/* Header card */}
      <div className="bg-white rounded-b-3xl p-5 flex flex-col items-center gap-3 ring-1 ring-black/5">
        <ShimmerCircle size={80} />
        <ShimmerLine width={140} height={18} />
        <Shimmer className="w-20 h-6" rounded="rounded-full" />
      </div>

      {/* Stats bar */}
      <div className="px-5">
        <div className="bg-white rounded-2xl p-4 flex justify-between gap-3 ring-1 ring-black/5">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <ShimmerLine width={40} height={20} />
              <ShimmerLine width={50} height={10} />
            </div>
          ))}
        </div>
      </div>

      {/* Badges */}
      <div className="px-5 flex flex-col gap-3">
        <ShimmerLine width={100} height={18} />
        <div className="flex flex-wrap gap-2.5">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl p-3 flex flex-col items-center gap-1.5 ring-1 ring-black/5" style={{ width: 80 }}>
              <Shimmer className="w-7 h-7" rounded="rounded-md" />
              <ShimmerLine width={50} height={9} />
            </div>
          ))}
        </div>
      </div>

      {/* Yoyo case */}
      <div className="px-5 flex flex-col gap-3">
        <ShimmerLine width={120} height={18} />
        <Shimmer className="w-full h-36" rounded="rounded-2xl" />
      </div>

      {/* Logout */}
      <div className="px-5 mt-2">
        <Shimmer className="w-full h-12" rounded="rounded-2xl" />
      </div>
    </div>
  );
}
