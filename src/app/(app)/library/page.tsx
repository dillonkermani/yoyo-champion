"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { mockTricks } from "@/lib/data";
import { useProgressStore } from "@/stores";
import { TrickGrid, TrickFilters, type TrickFiltersState } from "@/components/tricks";
import type { TrickDifficulty, YoYoStyle, TrickGenre } from "@/lib/data/types";
import type { TrickStatus } from "@/stores/progress-store";
import { XPBadge, getRandomMessage } from "@/components/fun";

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

// Genre colors for fun badges
const genreColorMap: Record<string, { bg: string; text: string }> = {
  basics: { bg: "bg-gray-100", text: "text-gray-700" },
  string: { bg: "bg-fun-blue/20", text: "text-fun-blue" },
  slack: { bg: "bg-fun-purple/20", text: "text-fun-purple" },
  tech: { bg: "bg-cyan-100", text: "text-cyan-700" },
  flow: { bg: "bg-pink-100", text: "text-pink-700" },
  horizontal: { bg: "bg-xp/20", text: "text-fun-accent" },
  speed: { bg: "bg-streak/20", text: "text-streak" },
  grinds: { bg: "bg-orange-100", text: "text-orange-700" },
  regens: { bg: "bg-lime-100", text: "text-lime-700" },
  hops: { bg: "bg-indigo-100", text: "text-indigo-700" },
};

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

  // Encouraging message
  const encouragingMessage = React.useMemo(() => getRandomMessage("greeting"), []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Page Header - Fun and Bold */}
      <div className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-3 sm:px-4 py-5 sm:py-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-2">
              <motion.span
                className="text-3xl sm:text-4xl"
                animate={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                📚
              </motion.span>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900">
                Trick Library
              </h1>
            </div>
            <p className="text-gray-600 text-sm sm:text-lg ml-0 sm:ml-14 line-clamp-2 sm:line-clamp-none">
              {encouragingMessage} Master tricks from beginner to world-class!
            </p>
          </motion.div>

          {/* Stats Bar - Colorful and Fun */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="mt-4 sm:mt-6 flex flex-wrap items-center gap-2 sm:gap-4"
          >
            {/* Total Tricks */}
            <motion.div
              className="flex items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-fun-blue/10 border-2 border-fun-blue/20"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-lg sm:text-xl">🎯</span>
              <div>
                <span className="font-black text-gray-900 text-sm sm:text-base">{stats.total}</span>
                <span className="text-gray-500 ml-1 text-xs sm:text-sm">tricks</span>
              </div>
            </motion.div>

            {/* Mastered */}
            <motion.div
              className="flex items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-fun-primary/10 border-2 border-fun-primary/20"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-lg sm:text-xl">✅</span>
              <div>
                <span className="font-black text-fun-primary text-sm sm:text-base">{stats.mastered}</span>
                <span className="text-gray-500 ml-1 text-xs sm:text-sm">mastered</span>
              </div>
            </motion.div>

            {/* XP Earned */}
            <motion.div
              className="flex items-center gap-1 sm:gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <XPBadge amount={stats.xpEarned} size="sm" showPlus={false} animate={false} />
              <span className="text-gray-500 text-xs sm:text-sm">earned</span>
            </motion.div>

            {/* Completion Percentage */}
            {stats.mastered > 0 && (
              <motion.div
                className="flex items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-xp/10 border-2 border-xp/20"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-lg sm:text-xl">🏆</span>
                <span className="font-black text-fun-accent text-sm sm:text-base">
                  {Math.round((stats.mastered / stats.total) * 100)}%
                </span>
                <span className="text-gray-500 text-xs sm:text-sm">complete</span>
              </motion.div>
            )}
          </motion.div>

          {/* Category Quick Filters - Colorful Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="mt-4 sm:mt-6 flex flex-wrap gap-1.5 sm:gap-2"
          >
            {Object.entries(genreColorMap).slice(0, 6).map(([genre, colors], index) => (
              <motion.button
                key={genre}
                className={`px-3 py-1.5 sm:px-4 rounded-full text-xs sm:text-sm font-bold capitalize transition-all min-h-[36px] touch-manipulation ${
                  filters.genre.includes(genre as TrickGenre)
                    ? `${colors.bg} ${colors.text} ring-2 ring-offset-1 ring-current`
                    : "bg-gray-100 text-gray-600 active:bg-gray-200"
                }`}
                onClick={() => {
                  setFilters(prev => ({
                    ...prev,
                    genre: prev.genre.includes(genre as TrickGenre)
                      ? prev.genre.filter(g => g !== genre)
                      : [...prev.genre, genre as TrickGenre]
                  }));
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
              >
                {genre}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-8">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden">
            <motion.button
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
              className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-2xl bg-white border-2 border-gray-200 text-gray-700 active:border-fun-primary/30 transition-all font-bold min-h-[48px] touch-manipulation"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
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
              <span>Filters</span>
              {(filters.difficulty.length > 0 ||
                filters.style.length > 0 ||
                filters.genre.length > 0 ||
                filters.status !== "all" ||
                filters.gentryRecommends) && (
                <motion.span
                  className="px-2 py-0.5 rounded-full bg-fun-primary text-white text-xs font-bold"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                >
                  Active
                </motion.span>
              )}
            </motion.button>

            {/* Mobile Filters Panel */}
            <AnimatePresence>
              {isFiltersOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 overflow-hidden"
                >
                  <TrickFilters
                    filters={filters}
                    onFiltersChange={setFilters}
                    collapsible={false}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Desktop Sidebar Filters */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <motion.div
              className="sticky top-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <TrickFilters
                filters={filters}
                onFiltersChange={setFilters}
              />
            </motion.div>
          </aside>

          {/* Trick Grid */}
          <main className="flex-1 min-w-0">
            {/* Results Count */}
            <motion.div
              className="mb-4 flex items-center justify-between"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-gray-500">
                Showing <span className="font-bold text-gray-900">{filteredTricks.length}</span> tricks
              </p>
              {filteredTricks.length > 0 && filters.search && (
                <motion.span
                  className="text-sm text-fun-primary font-semibold"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  Nice search!
                </motion.span>
              )}
            </motion.div>

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
