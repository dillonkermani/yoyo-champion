"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/ui/input";
import type { TrickDifficulty, YoYoStyle, TrickGenre } from "@/lib/data/types";

// Filter configuration
const difficultyOptions: { value: TrickDifficulty; label: string; color: string }[] = [
  { value: 1, label: "Beginner", color: "bg-emerald-100 text-emerald-700 border-emerald-300 active:bg-emerald-200" },
  { value: 2, label: "Intermediate", color: "bg-yellow-100 text-yellow-700 border-yellow-300 active:bg-yellow-200" },
  { value: 3, label: "Advanced", color: "bg-orange-100 text-orange-700 border-orange-300 active:bg-orange-200" },
  { value: 4, label: "Expert", color: "bg-red-100 text-red-700 border-red-300 active:bg-red-200" },
  { value: 5, label: "Master", color: "bg-purple-100 text-purple-700 border-purple-300 active:bg-purple-200" },
];

const styleOptions: { value: YoYoStyle; label: string }[] = [
  { value: "1A", label: "1A String" },
  { value: "2A", label: "2A Looping" },
  { value: "3A", label: "3A Dual" },
  { value: "4A", label: "4A Offstring" },
  { value: "5A", label: "5A Freehand" },
];

const genreOptions: { value: TrickGenre; label: string }[] = [
  { value: "basics", label: "Basics" },
  { value: "string", label: "String" },
  { value: "slack", label: "Slack" },
  { value: "tech", label: "Tech" },
  { value: "flow", label: "Flow" },
  { value: "horizontal", label: "Horizontal" },
  { value: "speed", label: "Speed" },
  { value: "hops", label: "Hops" },
];

const statusOptions = [
  { value: "all", label: "All" },
  { value: "available", label: "Available" },
  { value: "in_progress", label: "In Progress" },
  { value: "mastered", label: "Mastered" },
  { value: "locked", label: "Locked" },
] as const;

export type SortOption = "difficulty" | "name" | "xp" | "newest";

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "difficulty", label: "Difficulty" },
  { value: "name", label: "Name" },
  { value: "xp", label: "XP Reward" },
  { value: "newest", label: "Newest" },
];

export interface TrickFiltersState {
  search: string;
  difficulty: TrickDifficulty[];
  style: YoYoStyle[];
  genre: TrickGenre[];
  status: string;
  gentryRecommends: boolean;
  sortBy: SortOption;
}

export interface TrickFiltersProps {
  filters: TrickFiltersState;
  onFiltersChange: (filters: TrickFiltersState) => void;
  className?: string;
  collapsible?: boolean;
}

export function TrickFilters({
  filters,
  onFiltersChange,
  className,
  collapsible = false,
}: TrickFiltersProps) {
  const [isExpanded, setIsExpanded] = React.useState(!collapsible);

  const updateFilter = <K extends keyof TrickFiltersState>(
    key: K,
    value: TrickFiltersState[K]
  ) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const toggleArrayFilter = <T extends TrickDifficulty | YoYoStyle | TrickGenre>(
    key: "difficulty" | "style" | "genre",
    value: T
  ) => {
    const currentArray = filters[key] as T[];
    const newArray = currentArray.includes(value)
      ? currentArray.filter((v) => v !== value)
      : [...currentArray, value];
    updateFilter(key, newArray as TrickFiltersState[typeof key]);
  };

  const clearFilters = () => {
    onFiltersChange({
      search: "",
      difficulty: [],
      style: [],
      genre: [],
      status: "all",
      gentryRecommends: false,
      sortBy: "difficulty",
    });
  };

  const hasActiveFilters =
    filters.search ||
    filters.difficulty.length > 0 ||
    filters.style.length > 0 ||
    filters.genre.length > 0 ||
    filters.status !== "all" ||
    filters.gentryRecommends;

  const filterContent = (
    <div className="space-y-5 sm:space-y-6">
      {/* Search */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
        <SearchInput
          placeholder="Search tricks..."
          value={filters.search}
          onChange={(e) => updateFilter("search", e.target.value)}
          onSearch={(value) => updateFilter("search", value)}
        />
      </div>

      {/* Difficulty Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2 sm:mb-3">Difficulty</label>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {difficultyOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => toggleArrayFilter("difficulty", option.value)}
              className={cn(
                "px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 min-h-[36px] touch-manipulation",
                filters.difficulty.includes(option.value)
                  ? option.color + " border-current"
                  : "bg-white border-gray-300 text-gray-600 active:border-gray-400 active:text-gray-800"
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Style Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2 sm:mb-3">Style</label>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {styleOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => toggleArrayFilter("style", option.value)}
              className={cn(
                "px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 min-h-[36px] touch-manipulation",
                filters.style.includes(option.value)
                  ? "bg-brand-blue/30 text-gray-800 border-brand-blue"
                  : "bg-white border-gray-300 text-gray-600 active:border-gray-400 active:text-gray-800"
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Genre Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2 sm:mb-3">Genre</label>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {genreOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => toggleArrayFilter("genre", option.value)}
              className={cn(
                "px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 capitalize min-h-[36px] touch-manipulation",
                filters.genre.includes(option.value)
                  ? "bg-brand-blue/30 text-gray-800 border-brand-blue"
                  : "bg-white border-gray-300 text-gray-600 active:border-gray-400 active:text-gray-800"
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Status Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2 sm:mb-3">Status</label>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {statusOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => updateFilter("status", option.value)}
              className={cn(
                "px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 min-h-[36px] touch-manipulation",
                filters.status === option.value
                  ? "bg-brand-teal/20 text-brand-teal border-brand-teal"
                  : "bg-white border-gray-300 text-gray-600 active:border-gray-400 active:text-gray-800"
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Gentry Recommends Toggle */}
      <div>
        <button
          onClick={() => updateFilter("gentryRecommends", !filters.gentryRecommends)}
          className={cn(
            "flex items-center gap-3 w-full px-4 py-3 rounded-lg border transition-all duration-200 min-h-[48px] touch-manipulation",
            filters.gentryRecommends
              ? "bg-amber-100 border-amber-400 text-amber-700"
              : "bg-white border-gray-300 text-gray-600 active:border-gray-400"
          )}
        >
          <div className={cn(
            "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all",
            filters.gentryRecommends
              ? "border-amber-600 bg-amber-600"
              : "border-gray-400"
          )}>
            {filters.gentryRecommends && (
              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
            <span className="font-medium text-sm">Gentry Recommends</span>
          </div>
        </button>
      </div>

      {/* Sort Options */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2 sm:mb-3">Sort By</label>
        <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => updateFilter("sortBy", option.value)}
              className={cn(
                "px-3 py-2 rounded-lg text-xs font-semibold border transition-all duration-200 min-h-[40px] touch-manipulation",
                filters.sortBy === option.value
                  ? "bg-brand-teal/20 text-brand-teal border-brand-teal"
                  : "bg-white border-gray-300 text-gray-600 active:border-gray-400 active:text-gray-800"
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={clearFilters}
          className="w-full text-gray-500 hover:text-gray-700 min-h-[44px]"
        >
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
          Clear All Filters
        </Button>
      )}
    </div>
  );

  if (collapsible) {
    return (
      <div className={cn("rounded-xl border border-gray-200 bg-white overflow-hidden", className)}>
        {/* Collapsible Header */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-between w-full p-4 text-left hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            <span className="font-medium text-gray-800">Filters</span>
            {hasActiveFilters && (
              <span className="px-2 py-0.5 rounded-full bg-brand-teal/20 text-brand-teal text-xs font-semibold">
                Active
              </span>
            )}
          </div>
          <motion.svg
            className="w-5 h-5 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </motion.svg>
        </button>

        {/* Collapsible Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="p-4 pt-0 border-t border-gray-200">
                {filterContent}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className={cn("rounded-xl border border-gray-200 bg-white p-4", className)}>
      <div className="flex items-center gap-2 mb-6">
        <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
        <h2 className="font-semibold text-gray-800">Filters</h2>
      </div>
      {filterContent}
    </div>
  );
}

export default TrickFilters;
