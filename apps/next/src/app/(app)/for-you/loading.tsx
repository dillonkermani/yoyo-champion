import { Shimmer, ShimmerLine } from "@/components/shimmer";

export default function ForYouLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center gap-3 w-full max-w-[640px] mx-auto">
      <Shimmer className="w-14 h-14" rounded="rounded-2xl" />
      <ShimmerLine width={160} height={22} />
      <ShimmerLine width={260} height={14} />
      <ShimmerLine width={220} height={14} />
    </div>
  );
}
