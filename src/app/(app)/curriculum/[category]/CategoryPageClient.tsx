"use client";

import * as React from "react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Target,
  Sparkles,
  Zap,
  Cpu,
  Wind,
  RotateCcw,
  Rocket,
  Hand,
  ArrowLeft,
  Trophy,
  Star,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { XPBadge } from "@/components/fun";
import { DifficultySection, groupTricksByDifficulty } from "@/components/curriculum";
import { getCategoryBySlug, categoryColorConfig } from "@/lib/data/categories";
import { getTricksByGenre, getTricksByStyle } from "@/lib/data";
import { useProgressStore } from "@/stores/progress-store";
import type { TrickDifficulty } from "@/lib/data/types";
import type { TrickStatus } from "@/stores/progress-store";

// Icon component mapping
const iconComponents = {
  Target,
  Sparkles,
  Zap,
  Cpu,
  Wind,
  RotateCcw,
  Rocket,
  Hand,
} as const;

export default function CategoryPageClient() {
  const params = useParams();
  const categorySlug = params["category"] as string;
  const category = getCategoryBySlug(categorySlug);

  // Hydrate progress store
  const trickProgress = useProgressStore((state) => state.trickProgress);
  const [isHydrated, setIsHydrated] = React.useState(false);

  React.useEffect(() => {
    useProgressStore.persist.rehydrate();
    setIsHydrated(true);
  }, []);

  if (!category) {
    notFound();
  }

  // Get tricks for this category
  const categoryTricks = React.useMemo(() => {
    // Special case for 5A category - filter by style
    if (category.slug === "5a-tricks") {
      return getTricksByStyle("5A");
    }
    // Otherwise filter by genres
    return category.genres.flatMap((genre) => getTricksByGenre(genre));
  }, [category]);

  // Group tricks by difficulty
  const tricksByDifficulty = React.useMemo(
    () => groupTricksByDifficulty(categoryTricks),
    [categoryTricks]
  );

  // Get trick statuses
  const trickStatuses = React.useMemo(() => {
    const statuses: Record<string, TrickStatus | "locked"> = {};

    categoryTricks.forEach((trick) => {
      const progress = trickProgress[trick.id];
      if (progress) {
        statuses[trick.id] = progress.status;
      } else {
        // Check if prerequisites are met
        const hasPrereqs = trick.prerequisites.every((prereqId) => {
          const prereqProgress = trickProgress[prereqId];
          return prereqProgress && prereqProgress.status === "mastered";
        });
        statuses[trick.id] = hasPrereqs || trick.prerequisites.length === 0 ? "not_started" : "locked";
      }
    });

    return statuses;
  }, [categoryTricks, trickProgress]);

  // Calculate stats
  const totalTricks = categoryTricks.length;
  const masteredTricks = categoryTricks.filter(
    (trick) => trickStatuses[trick.id] === "mastered"
  ).length;
  const totalXP = categoryTricks.reduce((sum, trick) => sum + trick.xpReward, 0);
  const earnedXP = categoryTricks
    .filter((trick) => trickStatuses[trick.id] === "mastered")
    .reduce((sum, trick) => sum + trick.xpReward, 0);
  const progress = totalTricks > 0 ? (masteredTricks / totalTricks) * 100 : 0;
  const isComplete = progress >= 100;

  const colorConfig = categoryColorConfig[category.color];
  const IconComponent = iconComponents[category.icon];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div
        className={cn(
          "relative overflow-hidden",
          colorConfig.bgLight
        )}
      >
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className={cn(
              "absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-20",
              colorConfig.bg
            )}
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          <motion.div
            className={cn(
              "absolute -bottom-10 -left-10 w-40 h-40 rounded-full opacity-10",
              colorConfig.bg
            )}
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 pt-6 pb-8">
          {/* Back button */}
          <Link
            href="/curriculum"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Curriculum</span>
          </Link>

          {/* Category header */}
          <div className="flex flex-col sm:flex-row sm:items-start gap-6">
            {/* Icon */}
            <motion.div
              className={cn(
                "w-20 h-20 rounded-3xl flex items-center justify-center shrink-0",
                colorConfig.bg,
                colorConfig.shadow
              )}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", bounce: 0.5 }}
            >
              <IconComponent className="w-10 h-10 text-white" />
            </motion.div>

            {/* Title and description */}
            <div className="flex-1">
              <motion.h1
                className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                {category.name}
              </motion.h1>
              <motion.p
                className="text-gray-600 text-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                {category.description}
              </motion.p>
            </div>
          </div>

          {/* Stats cards */}
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* Progress */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <div className="text-sm text-gray-500 mb-1">Progress</div>
              <div className="flex items-baseline gap-1">
                <span className={cn("text-2xl font-bold", colorConfig.text)}>
                  {masteredTricks}
                </span>
                <span className="text-gray-400">/ {totalTricks}</span>
              </div>
              <div className="text-xs text-gray-400">tricks mastered</div>
            </div>

            {/* XP Available */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <div className="text-sm text-gray-500 mb-1">XP Available</div>
              <div className="flex items-center gap-2">
                <XPBadge amount={totalXP} size="sm" showPlus={false} animate={false} />
              </div>
              <div className="text-xs text-gray-400">{earnedXP} earned</div>
            </div>

            {/* Completion */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <div className="text-sm text-gray-500 mb-1">Completion</div>
              <div className={cn("text-2xl font-bold", isComplete ? "text-fun-blue" : colorConfig.text)}>
                {Math.round(progress)}%
              </div>
              <div className="text-xs text-gray-400">
                {isComplete ? "Complete!" : "In progress"}
              </div>
            </div>

            {/* Bonus XP */}
            <div className={cn(
              "rounded-2xl p-4 shadow-sm border",
              isComplete
                ? `${colorConfig.bgLight} ${colorConfig.border}`
                : "bg-white border-gray-100"
            )}>
              <div className="text-sm text-gray-500 mb-1">Category Bonus</div>
              <div className={cn("text-2xl font-bold", colorConfig.text)}>
                +{category.bonusXP}
              </div>
              <div className="text-xs text-gray-400">
                {isComplete ? "Earned!" : "Complete all tricks"}
              </div>
            </div>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            className="mt-6"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            style={{ transformOrigin: "left" }}
          >
            <Progress
              value={progress}
              variant={isComplete ? "fun" : "lesson"}
              size="lg"
              animated={isHydrated}
              celebrate={isComplete}
            />
          </motion.div>
        </div>
      </div>

      {/* Category Completion Badge Preview */}
      {!isComplete && totalTricks > 0 && (
        <div className="max-w-5xl mx-auto px-4 mt-6">
          <motion.div
            className={cn(
              "rounded-2xl border-2 border-dashed p-4 flex items-center justify-between",
              colorConfig.border,
              colorConfig.bgLight
            )}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center gap-4">
              <div className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center opacity-50",
                colorConfig.bg
              )}>
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-700">
                  {category.completionBadge}
                </h3>
                <p className="text-sm text-gray-500">
                  Complete all {totalTricks} tricks to unlock this badge
                </p>
              </div>
            </div>
            <div className={cn("text-sm font-bold", colorConfig.text)}>
              {totalTricks - masteredTricks} remaining
            </div>
          </motion.div>
        </div>
      )}

      {/* Category Complete Celebration */}
      {isComplete && (
        <div className="max-w-5xl mx-auto px-4 mt-6">
          <motion.div
            className={cn(
              "rounded-2xl border-2 p-6 text-center",
              colorConfig.border,
              colorConfig.bgLight
            )}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, type: "spring", bounce: 0.4 }}
          >
            <motion.div
              className="flex justify-center mb-4"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.6, type: "spring", bounce: 0.6 }}
            >
              <div className={cn(
                "w-16 h-16 rounded-2xl flex items-center justify-center",
                colorConfig.bg,
                colorConfig.shadow
              )}>
                <Trophy className="w-8 h-8 text-white" />
              </div>
            </motion.div>
            <h3 className={cn("text-xl font-bold mb-2", colorConfig.text)}>
              {category.completionBadge} Unlocked!
            </h3>
            <p className="text-gray-600 mb-4">
              You have mastered all {category.name.toLowerCase()} tricks!
            </p>
            <div className="flex items-center justify-center gap-2">
              <Star className={cn("w-5 h-5 fill-current", colorConfig.text)} />
              <span className={cn("font-bold", colorConfig.text)}>
                +{category.bonusXP} Bonus XP Earned
              </span>
              <Star className={cn("w-5 h-5 fill-current", colorConfig.text)} />
            </div>
          </motion.div>
        </div>
      )}

      {/* Difficulty Sections */}
      <div className="max-w-5xl mx-auto px-4 mt-8 space-y-6">
        {([1, 2, 3, 4, 5] as TrickDifficulty[]).map((difficulty) => {
          const tricks = tricksByDifficulty.get(difficulty) || [];
          if (tricks.length === 0) return null;

          return (
            <motion.div
              key={difficulty}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.2 + difficulty * 0.1,
                duration: 0.4,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <DifficultySection
                difficulty={difficulty}
                tricks={tricks}
                trickStatuses={trickStatuses}
                defaultOpen={difficulty <= 2}
              />
            </motion.div>
          );
        })}

        {/* Empty state */}
        {categoryTricks.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className={cn(
              "w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-4",
              colorConfig.bgLight
            )}>
              <IconComponent className={cn("w-10 h-10", colorConfig.text)} />
            </div>
            <h3 className="text-xl font-bold text-gray-700 mb-2">
              Coming Soon
            </h3>
            <p className="text-gray-500">
              We are working on adding tricks to this category.
              Check back soon!
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
