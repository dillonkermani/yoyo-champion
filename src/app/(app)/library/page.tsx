"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { mockTricks } from "@/lib/data";
import { useProgressStore } from "@/stores";
import { TrickGrid, TrickFilters, type TrickFiltersState } from "@/components/tricks";
import type { TrickDifficulty, YoYoStyle, TrickGenre } from "@/lib/data/types";
import type { TrickStatus } from "@/stores/progress-store";

// Default filter state
const defaultFilters: TrickFiltersState = {
  search: "",
  difficulty: [],
  style: [],
  genre: [],
  status: "all",
  gentryRecommends: false,
  sortBy: "difficulty",
};

// Featured tricks that Gentry recommends (mock data - these would come from backend)
const gentryRecommendedTricks = [
  "trick-001", // Sleeper
  "trick-006", // Trapeze
  "trick-010", // Split the Atom
  "trick-015", // Spirit Bomb
];

export default function LibraryPage() {
  const [filters, setFilters] = React.useState<TrickFiltersState>(defaultFilters);
  const [isFiltersOpen, setIsFiltersOpen] = React.useState(false);
  const trickProgress = useProgressStore((state) => state.trickProgress);

  // Get trick status
  const getTrickStatus = React.useCallback(
    (trickId: string): TrickStatus | "locked" => {
      const progress = trickProgress[trickId];
      if (!progress) return "not_started";
      return progress.status;
    },
    [trickProgress]
  );

  // Filter and sort tricks
  const filteredTricks = React.useMemo(() => {
    let result = [...mockTricks];

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (trick) =>
          trick.name.toLowerCase().includes(searchLower) ||
          trick.description.toLowerCase().includes(searchLower) ||
          trick.genre.toLowerCase().includes(searchLower)
      );
    }

    // Difficulty filter
    if (filters.difficulty.length > 0) {
      result = result.filter((trick) =>
        filters.difficulty.includes(trick.difficulty as TrickDifficulty)
      );
    }

    // Style filter
    if (filters.style.length > 0) {
      result = result.filter((trick) =>
        filters.style.includes(trick.style as YoYoStyle)
      );
    }

    // Genre filter
    if (filters.genre.length > 0) {
      result = result.filter((trick) =>
        filters.genre.includes(trick.genre as TrickGenre)
      );
    }

    // Status filter
    if (filters.status !== "all") {
      result = result.filter((trick) => {
        const status = getTrickStatus(trick.id);
        switch (filters.status) {
          case "available":
            return status === "not_started";
          case "in_progress":
            return status === "watching" || status === "practicing";
          case "mastered":
            return status === "mastered";
          case "locked":
            return status === "locked";
          default:
            return true;
        }
      });
    }

    // Gentry Recommends filter
    if (filters.gentryRecommends) {
      result = result.filter((trick) =>
        gentryRecommendedTricks.includes(trick.id)
      );
    }

    // Sort
    result.sort((a, b) => {
      switch (filters.sortBy) {
        case "difficulty":
          return a.difficulty - b.difficulty;
        case "name":
          return a.name.localeCompare(b.name);
        case "xp":
          return b.xpReward - a.xpReward;
        case "newest":
          // For mock data, reverse order (higher IDs are "newer")
          return b.id.localeCompare(a.id);
        default:
          return 0;
      }
    });

    return result;
  }, [filters, getTrickStatus]);

  // Calculate stats
  const stats = React.useMemo(() => {
    const mastered = Object.values(trickProgress).filter(
      (p) => p.status === "mastered"
    ).length;
    const totalXp = Object.values(trickProgress).reduce(
      (sum, p) => sum + p.xpEarned,
      0
    );
    return {
      total: mockTricks.length,
      mastered,
      xpEarned: totalXp,
    };
  }, [trickProgress]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Trick Library
            </h1>
            <p className="text-gray-600 text-lg">
              Master every trick from beginner basics to world-class combos
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
              <div className="w-8 h-8 rounded-full bg-brand-blue/20 flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-brand-teal"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <div>
                <span className="font-semibold text-gray-900">{stats.total}</span>
                <span className="text-gray-500 ml-1">tricks available</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-emerald-600"
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
                <span className="font-semibold text-gray-900">{stats.mastered}</span>
                <span className="text-gray-500 ml-1">mastered</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-amber-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg>
              </div>
              <div>
                <span className="font-semibold text-gray-900">
                  {stats.xpEarned.toLocaleString()}
                </span>
                <span className="text-gray-500 ml-1">XP earned</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
              className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-lg bg-white border border-gray-200 text-gray-700 hover:border-gray-300 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
              <span className="font-medium">Filters</span>
              {(filters.difficulty.length > 0 ||
                filters.style.length > 0 ||
                filters.genre.length > 0 ||
                filters.status !== "all" ||
                filters.gentryRecommends) && (
                <span className="px-2 py-0.5 rounded-full bg-brand-teal text-white text-xs font-semibold">
                  Active
                </span>
              )}
            </button>

            {/* Mobile Filters Panel */}
            {isFiltersOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4"
              >
                <TrickFilters
                  filters={filters}
                  onFiltersChange={setFilters}
                  collapsible={false}
                />
              </motion.div>
            )}
          </div>

          {/* Desktop Sidebar Filters */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky top-4">
              <TrickFilters
                filters={filters}
                onFiltersChange={setFilters}
              />
            </div>
          </aside>

          {/* Trick Grid */}
          <main className="flex-1 min-w-0">
            <TrickGrid
              tricks={filteredTricks}
              getTrickStatus={getTrickStatus}
              emptyMessage="No tricks match your filters"
              emptyDescription="Try adjusting your filters or search to find different tricks"
            />
          </main>
        </div>
      </div>
    </div>
  );
}
