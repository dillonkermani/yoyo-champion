import {
  Skeleton,
  SkeletonText,
  SkeletonVideoPlayer,
  SkeletonButton
} from "@/components/ui/skeleton";

export default function TrickDetailLoading() {
  return (
    <div className="min-h-screen bg-surface">
      {/* Header Skeleton */}
      <div className="border-b border-border bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            {/* Back button */}
            <Skeleton className="w-10 h-10 rounded-full" animation="shimmer" />

            <div className="flex-1 min-w-0">
              {/* Title */}
              <Skeleton className="h-8 w-64 mb-3" animation="shimmer" />

              {/* Badges */}
              <div className="flex items-center gap-2">
                <Skeleton className="h-6 w-20 rounded-full" animation="shimmer" />
                <Skeleton className="h-6 w-12 rounded-full" animation="shimmer" />
                <Skeleton className="h-6 w-24 rounded-full" animation="shimmer" />
              </div>
            </div>

            <div className="hidden sm:flex flex-col items-end gap-1.5">
              <Skeleton className="h-6 w-24 rounded-full" animation="shimmer" />
              <div className="flex items-center gap-3">
                <Skeleton className="h-4 w-16" animation="shimmer" />
                <Skeleton className="h-4 w-12" animation="shimmer" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 lg:py-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Main Column */}
          <div className="flex-1 min-w-0 space-y-6">
            {/* Video Player Skeleton */}
            <SkeletonVideoPlayer animation="shimmer" />

            {/* Tabs Skeleton */}
            <div className="space-y-4">
              {/* Tab List */}
              <div className="flex gap-2 p-1 bg-surface-secondary rounded-lg">
                <Skeleton className="h-9 w-24 rounded-md" animation="shimmer" />
                <Skeleton className="h-9 w-20 rounded-md" animation="shimmer" />
                <Skeleton className="h-9 w-16 rounded-md" animation="shimmer" />
              </div>

              {/* Tab Content - Overview */}
              <div className="rounded-xl border border-border bg-white p-6 space-y-6">
                {/* Description */}
                <SkeletonText lines={3} animation="shimmer" />

                {/* Prerequisites Section */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Skeleton className="w-5 h-5" animation="shimmer" />
                    <Skeleton className="h-5 w-28" animation="shimmer" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-14 w-full rounded-lg" animation="shimmer" />
                    <Skeleton className="h-14 w-full rounded-lg" animation="shimmer" />
                  </div>
                </div>

                {/* What You'll Learn Section */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Skeleton className="w-5 h-5" animation="shimmer" />
                    <Skeleton className="h-5 w-32" animation="shimmer" />
                  </div>
                  <div className="space-y-2">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <Skeleton className="w-5 h-5 rounded-full" animation="shimmer" />
                        <Skeleton className="h-4 flex-1" animation="shimmer" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Mastery Section Skeleton */}
            <div className="rounded-xl border-2 border-brand-teal bg-white p-6 space-y-4">
              <div className="flex items-center gap-2">
                <Skeleton className="w-6 h-6" animation="shimmer" />
                <Skeleton className="h-6 w-48" animation="shimmer" />
              </div>
              <SkeletonText lines={2} animation="shimmer" />
              <SkeletonButton size="lg" className="w-full" animation="shimmer" />
            </div>
          </div>

          {/* Sidebar Skeleton (Desktop) */}
          <aside className="hidden lg:block w-80 shrink-0 space-y-6">
            {/* Progress Card */}
            <div className="rounded-xl border border-border bg-white p-6 space-y-4">
              <Skeleton className="h-5 w-20" animation="shimmer" />
              <div className="space-y-3">
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-12" animation="shimmer" />
                  <Skeleton className="h-6 w-20 rounded-full" animation="shimmer" />
                </div>
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-20" animation="shimmer" />
                  <Skeleton className="h-4 w-16" animation="shimmer" />
                </div>
              </div>
              <Skeleton className="h-px w-full" animation="shimmer" />
              <div className="space-y-2">
                <SkeletonButton className="w-full" animation="shimmer" />
                <SkeletonButton className="w-full" animation="shimmer" />
              </div>
            </div>

            {/* Notes Card */}
            <div className="rounded-xl border border-border bg-white p-6 space-y-4">
              <div className="flex items-center gap-2">
                <Skeleton className="w-5 h-5" animation="shimmer" />
                <Skeleton className="h-5 w-20" animation="shimmer" />
              </div>
              <div className="flex gap-2">
                <Skeleton className="h-10 flex-1 rounded-lg" animation="shimmer" />
                <Skeleton className="h-10 w-10 rounded-lg" animation="shimmer" />
              </div>
              <div className="space-y-2">
                {Array.from({ length: 2 }).map((_, i) => (
                  <Skeleton key={i} className="h-16 w-full rounded-lg" animation="shimmer" />
                ))}
              </div>
            </div>

            {/* Related Tricks Card */}
            <div className="rounded-xl border border-border bg-white p-6 space-y-4">
              <Skeleton className="h-5 w-28" animation="shimmer" />
              <div className="space-y-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-surface-secondary">
                    <div className="flex-1">
                      <Skeleton className="h-4 w-24 mb-2" animation="shimmer" />
                      <Skeleton className="h-5 w-16 rounded-full" animation="shimmer" />
                    </div>
                    <Skeleton className="w-5 h-5" animation="shimmer" />
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
