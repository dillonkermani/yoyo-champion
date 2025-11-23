"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, ChevronDown, Award, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGamificationStore, selectBadges, BADGE_DEFINITIONS, type Badge, type BadgeCategory } from "@/stores";
import { BadgeCard, rarityConfig, categoryLabels } from "./badge-card";

export interface BadgeGridProps {
  className?: string;
  onBadgeClick?: (badge: Badge | null, isLocked: boolean) => void;
}

type FilterType = "all" | "earned" | "locked";
type RarityFilter = "all" | Badge["rarity"];

// All possible badges from definitions
const allBadgeDefinitions = Object.values(BADGE_DEFINITIONS).map(({ condition, ...badge }) => badge);

// Group badges by category
const groupByCategory = (badges: typeof allBadgeDefinitions): Record<BadgeCategory, typeof allBadgeDefinitions> => {
  const groups: Record<BadgeCategory, typeof allBadgeDefinitions> = {
    streak: [],
    mastery: [],
    explorer: [],
    social: [],
    milestone: [],
    special: [],
  };

  badges.forEach((badge) => {
    groups[badge.category].push(badge);
  });

  return groups;
};

export const BadgeGrid = React.forwardRef<HTMLDivElement, BadgeGridProps>(
  ({ className, onBadgeClick }, ref) => {
    const earnedBadges = useGamificationStore(selectBadges);
    const earnedBadgeIds = new Set(earnedBadges.map((b) => b.id));

    const [filterType, setFilterType] = React.useState<FilterType>("all");
    const [rarityFilter, setRarityFilter] = React.useState<RarityFilter>("all");
    const [showFilters, setShowFilters] = React.useState(false);

    // Filter badges
    const filteredDefinitions = React.useMemo(() => {
      let filtered = allBadgeDefinitions;

      // Filter by earned/locked status
      if (filterType === "earned") {
        filtered = filtered.filter((b) => earnedBadgeIds.has(b.id));
      } else if (filterType === "locked") {
        filtered = filtered.filter((b) => !earnedBadgeIds.has(b.id));
      }

      // Filter by rarity
      if (rarityFilter !== "all") {
        filtered = filtered.filter((b) => b.rarity === rarityFilter);
      }

      return filtered;
    }, [filterType, rarityFilter, earnedBadgeIds]);

    // Group filtered badges by category
    const groupedBadges = React.useMemo(() => groupByCategory(filteredDefinitions), [filteredDefinitions]);

    // Stats
    const totalBadges = allBadgeDefinitions.length;
    const earnedCount = earnedBadges.length;
    const progressPercentage = (earnedCount / totalBadges) * 100;

    return (
      <div ref={ref} className={cn("space-y-6", className)}>
        {/* Header with progress */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Award className="w-6 h-6 text-brand-gold" />
            <div>
              <h2 className="text-xl font-semibold text-brand-black">Badge Collection</h2>
              <p className="text-sm text-muted-foreground">
                {earnedCount} of {totalBadges} badges earned
              </p>
            </div>
          </div>

          {/* Progress ring */}
          <div className="relative w-14 h-14">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="28"
                cy="28"
                r="24"
                strokeWidth="4"
                className="fill-none stroke-surface-secondary"
              />
              <motion.circle
                cx="28"
                cy="28"
                r="24"
                strokeWidth="4"
                className="fill-none stroke-brand-gold"
                strokeLinecap="round"
                initial={{ strokeDasharray: 150, strokeDashoffset: 150 }}
                animate={{ strokeDashoffset: 150 - (150 * progressPercentage) / 100 }}
                transition={{ duration: 0.5 }}
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-brand-black">
              {Math.round(progressPercentage)}%
            </span>
          </div>
        </div>

        {/* Filters */}
        <div className="space-y-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-brand-black transition-colors"
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
            <ChevronDown
              className={cn(
                "w-4 h-4 transition-transform",
                showFilters && "rotate-180"
              )}
            />
          </button>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="flex flex-wrap gap-4 pb-4">
                  {/* Status filter */}
                  <div className="space-y-1.5">
                    <label className="text-xs text-muted-foreground uppercase tracking-wider">
                      Status
                    </label>
                    <div className="flex gap-1">
                      {(["all", "earned", "locked"] as FilterType[]).map((type) => (
                        <button
                          key={type}
                          onClick={() => setFilterType(type)}
                          className={cn(
                            "px-3 py-1.5 text-xs font-medium rounded-full transition-colors",
                            filterType === type
                              ? "bg-brand-black text-white"
                              : "bg-surface-secondary text-muted-foreground hover:bg-gray-200"
                          )}
                        >
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Rarity filter */}
                  <div className="space-y-1.5">
                    <label className="text-xs text-muted-foreground uppercase tracking-wider">
                      Rarity
                    </label>
                    <div className="flex gap-1 flex-wrap">
                      {(["all", "common", "uncommon", "rare", "epic", "legendary"] as RarityFilter[]).map(
                        (rarity) => (
                          <button
                            key={rarity}
                            onClick={() => setRarityFilter(rarity)}
                            className={cn(
                              "px-3 py-1.5 text-xs font-medium rounded-full transition-colors",
                              rarityFilter === rarity
                                ? "bg-brand-black text-white"
                                : "bg-surface-secondary text-muted-foreground hover:bg-gray-200"
                            )}
                          >
                            {rarity === "all" ? "All" : rarityConfig[rarity].label}
                          </button>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Badge grid by category */}
        <div className="space-y-8">
          {(Object.keys(groupedBadges) as BadgeCategory[]).map((category) => {
            const badges = groupedBadges[category];
            if (badges.length === 0) return null;

            return (
              <div key={category} className="space-y-3">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-brand-black uppercase tracking-wider">
                    {categoryLabels[category]}
                  </h3>
                  <span className="text-xs text-muted-foreground">
                    ({badges.filter((b) => earnedBadgeIds.has(b.id)).length}/{badges.length})
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {badges.map((badgeDef) => {
                    const isEarned = earnedBadgeIds.has(badgeDef.id);
                    const earnedBadge = isEarned
                      ? earnedBadges.find((b) => b.id === badgeDef.id)
                      : null;

                    return (
                      <motion.div
                        key={badgeDef.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <BadgeCard
                          badge={earnedBadge || null}
                          isLocked={!isEarned}
                          lockedDescription={badgeDef.description}
                          onClick={() => onBadgeClick?.(earnedBadge ?? null, !isEarned)}
                          showDetails={isEarned}
                        />
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty state */}
        {filteredDefinitions.length === 0 && (
          <div className="text-center py-12">
            <Lock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-brand-black mb-2">No badges found</h3>
            <p className="text-sm text-muted-foreground">
              Try adjusting your filters to see more badges
            </p>
          </div>
        )}
      </div>
    );
  }
);
BadgeGrid.displayName = "BadgeGrid";
