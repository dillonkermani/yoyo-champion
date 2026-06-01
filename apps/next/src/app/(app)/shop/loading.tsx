import { Shimmer, ShimmerCircle, ShimmerLine } from "@/components/shimmer";

export default function ShopLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-160px)] px-4">
      <div className="flex flex-col items-center gap-4 text-center max-w-md w-full">
        <ShimmerCircle size={80} />
        <ShimmerLine width={220} height={22} />
        <ShimmerLine width={280} height={14} />
        <ShimmerLine width={240} height={14} />
        <Shimmer className="h-12 w-40 mt-4" rounded="rounded-2xl" />
      </div>
    </div>
  );
}
