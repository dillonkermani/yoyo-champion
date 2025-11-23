"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { mockPaths, getFeaturedPaths, calculatePathProgress } from "@/lib/data";
import { useProgressStore, selectMasteredTricks, selectActivePaths } from "@/stores";
import { PathCard, PathCardSkeleton } from "@/components/paths";
import { Badge } from "@/components/ui/badge";
import type { TrickDifficulty } from "@/lib/data/types";

// Difficulty filter options
const difficultyOptions: { value: TrickDifficulty | "all"; label: string }[] = [
  { value: "all", label: "All Levels" },
  { value: 1, label: "Beginner" },
  { value: 2, label: "Intermediate" },
  { value: 3, label: "Advanced" },
  { value: 4, label: "Expert" },
  { value: 5, label: "Master" },
];

export default function PathsPage() {
  const [difficultyFilter, setDifficultyFilter] = React.useState<TrickDifficulty | "all">("all");
  const [isLoading, setIsLoading] = React.useState(true);

  // Get user progress
  const masteredTricks = useProgressStore(selectMasteredTricks);
  const activePaths = useProgressStore(selectActivePaths);
  const pathProgress = useProgressStore((state) => state.pathProgress);

  // Simulate loading state
  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  // Get completed trick IDs
  const completedTrickIds = React.useMemo(
    () => masteredTricks.map((t) => t.trickId),
    [masteredTricks]
  );

  // Calculate progress for each path
  const getPathProgressData = React.useCallback(
    (pathId: string) => {
      return calculatePathProgress(pathId, completedTrickIds);
    },
    [completedTrickIds]
  );

  // Filter paths
  const filteredPaths = React.useMemo(() => {
    if (difficultyFilter === "all") return mockPaths;
    return mockPaths.filter((path) => path.difficulty === difficultyFilter);
  }, [difficultyFilter]);

  // Get featured paths
  const featuredPaths = React.useMemo(() => {
    return getFeaturedPaths().filter(
      (path) => difficultyFilter === "all" || path.difficulty === difficultyFilter
    );
  }, [difficultyFilter]);

  // Get active (started) paths
  const startedPaths = React.useMemo(() => {
    return filteredPaths.filter((path) => pathProgress[path.id]);
  }, [filteredPaths, pathProgress]);

  // Get non-started paths for "All Paths" section
  const notStartedPaths = React.useMemo(() => {
    return filteredPaths.filter((path) => !pathProgress[path.id] && !path.isFeatured);
  }, [filteredPaths, pathProgress]);

  // Calculate stats
  const stats = React.useMemo(() => {
    const totalPaths = mockPaths.length;
    const completedPaths = Object.values(pathProgress).filter((p) => p.completedAt).length;
    const inProgressPaths = activePaths.length;
    return { totalPaths, completedPaths, inProgressPaths };
  }, [pathProgress, activePaths]);

  return (
    <div className="min-h-screen bg-surface-primary">
      {/* Page Header */}
      <div className="border-b border-border bg-white">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-brand-black mb-2">
              Learning Paths
            </h1>
            <p className="text-muted-foreground text-lg">
              Follow structured paths from Gentry Stein and world champions to master every style
            </p>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="mt-6 flex flex-wrap items-center gap-6 text-sm"
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-brand-blue/30 flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-brand-black"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                  />
                </svg>
              </div>
              <div>
                <span className="font-semibold text-brand-black">{stats.totalPaths}</span>
                <span className="text-muted-foreground ml-1">paths available</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-brand-blue/30 flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-brand-black"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <span className="font-semibold text-brand-black">{stats.inProgressPaths}</span>
                <span className="text-muted-foreground ml-1">in progress</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-brand-green/50 flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-brand-black"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <span className="font-semibold text-brand-black">{stats.completedPaths}</span>
                <span className="text-muted-foreground ml-1">completed</span>
              </div>
            </div>
          </motion.div>

          {/* Difficulty Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="mt-6 flex flex-wrap gap-2"
          >
            {difficultyOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setDifficultyFilter(option.value)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                  difficultyFilter === option.value
                    ? "bg-brand-blue text-brand-black shadow-sm"
                    : "bg-surface-secondary text-muted-foreground hover:bg-surface-tertiary hover:text-brand-black"
                )}
              >
                {option.label}
              </button>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 space-y-12">
        {/* Your Active Paths Section */}
        {startedPaths.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-xl font-bold text-brand-black">Your Active Paths</h2>
              <Badge variant="blue" className="text-xs">
                {startedPaths.length} {startedPaths.length === 1 ? "path" : "paths"}
              </Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {startedPaths.map((path, index) => (
                <motion.div
                  key={path.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                >
                  <PathCard
                    path={path}
                    progress={getPathProgressData(path.id)}
                  />
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Featured Paths Section */}
        {featuredPaths.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-xl font-bold text-brand-black">Featured Paths</h2>
              <Badge variant="brand" className="text-xs">
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg>
                Recommended
              </Badge>
            </div>
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <PathCardSkeleton key={i} />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredPaths
                  .filter((path) => !pathProgress[path.id])
                  .map((path, index) => (
                    <motion.div
                      key={path.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                    >
                      <PathCard
                        path={path}
                        progress={getPathProgressData(path.id)}
                      />
                    </motion.div>
                  ))}
              </div>
            )}
          </motion.section>
        )}

        {/* All Paths Section */}
        {notStartedPaths.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-xl font-bold text-brand-black">All Paths</h2>
              <Badge variant="outline" className="text-xs">
                {notStartedPaths.length} available
              </Badge>
            </div>
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <PathCardSkeleton key={i} />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {notStartedPaths.map((path, index) => (
                  <motion.div
                    key={path.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                  >
                    <PathCard
                      path={path}
                      progress={getPathProgressData(path.id)}
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </motion.section>
        )}

        {/* Empty State */}
        {filteredPaths.length === 0 && !isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-surface-secondary flex items-center justify-center">
              <svg
                className="w-8 h-8 text-muted-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-brand-black mb-2">
              No paths found
            </h3>
            <p className="text-muted-foreground mb-4">
              No paths match the selected difficulty level
            </p>
            <button
              onClick={() => setDifficultyFilter("all")}
              className="px-4 py-2 rounded-full bg-brand-blue text-brand-black font-medium hover:bg-brand-blue/80 transition-colors"
            >
              View All Paths
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
