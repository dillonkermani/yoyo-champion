"use client";

import * as React from "react";
import Link from "next/link";
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
} from "lucide-react";
import { cn } from "@/lib/utils";
import { CircularProgress } from "@/components/ui/progress";
import { XPBadge } from "@/components/fun";
import type { TrickCategory } from "@/lib/data/categories";
import { categoryColorConfig } from "@/lib/data/categories";

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

export interface CategoryCardProps {
  category: TrickCategory;
  totalTricks: number;
  masteredTricks: number;
  totalXP: number;
  className?: string;
}

export function CategoryCard({
  category,
  totalTricks,
  masteredTricks,
  totalXP,
  className,
}: CategoryCardProps) {
  const colorConfig = categoryColorConfig[category.color];
  const IconComponent = iconComponents[category.icon];
  const progress = totalTricks > 0 ? (masteredTricks / totalTricks) * 100 : 0;
  const isComplete = progress >= 100;

  return (
    <Link href={`/curriculum/${category.slug}`} className="block">
      <motion.div
        className={cn(
          "group relative rounded-3xl border-2 bg-white overflow-hidden",
          "transition-all duration-300",
          "hover:shadow-xl cursor-pointer",
          colorConfig.ring,
          isComplete ? `${colorConfig.border} ring-2` : "border-gray-200",
          className
        )}
        whileHover={{ y: -6, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        {/* Gradient background on hover */}
        <motion.div
          className={cn(
            "absolute inset-0 bg-gradient-to-br opacity-0",
            colorConfig.gradient
          )}
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 0.05 }}
          transition={{ duration: 0.3 }}
        />

        {/* Completion badge */}
        {isComplete && (
          <motion.div
            className="absolute top-3 right-3 z-10"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", bounce: 0.6, delay: 0.2 }}
          >
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center shadow-lg",
              colorConfig.bg,
              colorConfig.shadow
            )}>
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </motion.div>
        )}

        <div className="p-5 sm:p-6">
          {/* Header: Icon and Progress */}
          <div className="flex items-start justify-between mb-4">
            {/* Icon */}
            <motion.div
              className={cn(
                "w-14 h-14 rounded-2xl flex items-center justify-center",
                colorConfig.bgLight
              )}
              whileHover={{ rotate: [0, -5, 5, 0] }}
              transition={{ duration: 0.4 }}
            >
              <IconComponent className={cn("w-7 h-7", colorConfig.text)} />
            </motion.div>

            {/* Circular Progress */}
            <CircularProgress
              value={progress}
              size={56}
              strokeWidth={5}
              variant={isComplete ? "fun" : "lesson"}
              showValue={true}
              className="text-sm"
            />
          </div>

          {/* Category Name */}
          <h3 className={cn(
            "font-bold text-lg text-gray-900 mb-1.5",
            "group-hover:text-fun-primary transition-colors"
          )}>
            {category.name}
          </h3>

          {/* Description - truncated */}
          <p className="text-sm text-gray-500 line-clamp-2 mb-4">
            {category.description}
          </p>

          {/* Stats Row */}
          <div className="flex items-center justify-between">
            {/* Trick count */}
            <div className="flex items-center gap-2">
              <span className={cn(
                "text-sm font-bold",
                isComplete ? colorConfig.text : "text-gray-700"
              )}>
                {masteredTricks}/{totalTricks}
              </span>
              <span className="text-xs text-gray-400">tricks</span>
            </div>

            {/* XP available */}
            <XPBadge
              amount={totalXP}
              size="sm"
              showPlus={false}
              animate={false}
            />
          </div>

          {/* Progress bar at bottom */}
          <div className="mt-4">
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                className={cn(
                  "h-full rounded-full bg-gradient-to-r",
                  colorConfig.gradient
                )}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </div>
        </div>

        {/* Bonus XP hint */}
        {!isComplete && totalTricks > 0 && (
          <div className={cn(
            "px-5 py-3 border-t border-gray-100",
            "flex items-center justify-between",
            colorConfig.bgLight
          )}>
            <span className="text-xs text-gray-500">
              Complete all for bonus XP
            </span>
            <span className={cn("text-xs font-bold", colorConfig.text)}>
              +{category.bonusXP} XP
            </span>
          </div>
        )}

        {/* Completed state footer */}
        {isComplete && (
          <motion.div
            className={cn(
              "px-5 py-3 border-t",
              colorConfig.bgLight,
              colorConfig.border
            )}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-2">
              <svg className={cn("w-4 h-4", colorConfig.text)} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              <span className={cn("text-xs font-bold", colorConfig.text)}>
                {category.completionBadge} Unlocked!
              </span>
            </div>
          </motion.div>
        )}
      </motion.div>
    </Link>
  );
}

// Skeleton for loading
export function CategoryCardSkeleton() {
  return (
    <div className="rounded-3xl border-2 border-gray-200 bg-white overflow-hidden">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="w-14 h-14 rounded-2xl bg-gray-100 animate-pulse" />
          <div className="w-14 h-14 rounded-full bg-gray-100 animate-pulse" />
        </div>
        <div className="h-6 bg-gray-100 rounded-full w-3/4 mb-2 animate-pulse" />
        <div className="h-4 bg-gray-100 rounded-full w-full mb-1 animate-pulse" />
        <div className="h-4 bg-gray-100 rounded-full w-2/3 mb-4 animate-pulse" />
        <div className="flex justify-between mb-4">
          <div className="h-5 w-20 bg-gray-100 rounded-full animate-pulse" />
          <div className="h-5 w-16 bg-gray-100 rounded-full animate-pulse" />
        </div>
        <div className="h-2 bg-gray-100 rounded-full animate-pulse" />
      </div>
    </div>
  );
}

export default CategoryCard;
