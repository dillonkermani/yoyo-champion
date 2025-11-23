"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Badge, DifficultyBadge } from "@/components/ui/badge";
import type { LearningPath, TrickDifficulty } from "@/lib/data/types";

// Difficulty level mapping
const difficultyLevelMap: Record<TrickDifficulty, "beginner" | "intermediate" | "advanced" | "master" | "legendary"> = {
  1: "beginner",
  2: "intermediate",
  3: "advanced",
  4: "master",
  5: "legendary",
};

export interface PathCardProps {
  path: LearningPath;
  progress?: {
    completed: number;
    total: number;
    percentage: number;
  };
  className?: string;
}

export function PathCard({ path, progress, className }: PathCardProps) {
  const hasProgress = progress && progress.completed > 0;
  const isComplete = progress && progress.percentage === 100;

  return (
    <Link href={`/paths/${path.slug}`} className="block">
      <motion.div
        className={cn(
          "group relative rounded-xl border border-border bg-white overflow-hidden transition-all duration-300",
          "hover:border-brand-teal/30 hover:shadow-elevated",
          className
        )}
        whileHover={{ y: -4, scale: 1.01 }}
        transition={{ duration: 0.2 }}
      >
        {/* Thumbnail Section */}
        <div className="relative aspect-[16/9] bg-surface-secondary overflow-hidden">
          {/* Placeholder gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/30 to-brand-teal/30" />

          {/* Preview overlay on hover */}
          <div className="absolute inset-0 bg-brand-black/0 group-hover:bg-brand-black/10 transition-all duration-300" />

          {/* Play icon overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-14 h-14 rounded-full bg-brand-blue flex items-center justify-center shadow-lg">
              <svg className="w-7 h-7 text-brand-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>

          {/* Featured Badge */}
          {path.isFeatured && (
            <div className="absolute top-3 left-3">
              <Badge variant="brand" className="shadow-sm">
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg>
                Featured
              </Badge>
            </div>
          )}

          {/* Completion Badge */}
          {isComplete && (
            <div className="absolute top-3 right-3 w-10 h-10 rounded-full bg-brand-green flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-brand-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}

          {/* XP Badge */}
          <div className="absolute bottom-3 left-3">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-semibold text-brand-black shadow-sm">
              <svg className="w-4 h-4 text-brand-teal" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
              {path.totalXp.toLocaleString()} XP
            </div>
          </div>

          {/* Module Count Badge */}
          <div className="absolute bottom-3 right-3">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-semibold text-brand-black shadow-sm">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              {path.modules.length} Modules
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-5 space-y-4">
          {/* Title */}
          <h3 className="font-semibold text-brand-black text-lg leading-tight line-clamp-2 group-hover:text-brand-teal transition-colors">
            {path.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-muted-foreground line-clamp-2">
            {path.description}
          </p>

          {/* Badges Row */}
          <div className="flex flex-wrap items-center gap-2">
            <DifficultyBadge level={difficultyLevelMap[path.difficulty]} />

            <Badge variant="outline" className="text-xs">
              <svg className="w-3.5 h-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {path.estimatedDays} days
            </Badge>
          </div>

          {/* Progress Bar (if started) */}
          {hasProgress && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">
                  {progress.completed} of {progress.total} tricks completed
                </span>
                <span className="font-semibold text-brand-teal">
                  {progress.percentage}%
                </span>
              </div>
              <div className="relative h-2 rounded-full bg-surface-secondary overflow-hidden">
                <motion.div
                  className={cn(
                    "h-full rounded-full",
                    isComplete ? "bg-brand-green" : "bg-brand-blue"
                  )}
                  initial={{ width: 0 }}
                  animate={{ width: `${progress.percentage}%` }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            </div>
          )}

          {/* Instructor Info */}
          <div className="flex items-center gap-3 pt-2 border-t border-border">
            <div className="w-8 h-8 rounded-full bg-brand-teal/20 flex items-center justify-center overflow-hidden">
              {/* Avatar placeholder */}
              <span className="text-xs font-semibold text-brand-teal">
                {path.instructor.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-brand-black truncate">
                {path.instructor.name}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {path.instructor.title}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

// Skeleton variant for loading states
export function PathCardSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-white overflow-hidden animate-pulse">
      {/* Thumbnail */}
      <div className="aspect-[16/9] bg-surface-secondary" />

      {/* Content */}
      <div className="p-5 space-y-4">
        {/* Title */}
        <div className="h-6 bg-surface-secondary rounded w-3/4" />

        {/* Description */}
        <div className="space-y-2">
          <div className="h-4 bg-surface-secondary rounded w-full" />
          <div className="h-4 bg-surface-secondary rounded w-2/3" />
        </div>

        {/* Badges */}
        <div className="flex gap-2">
          <div className="h-6 w-24 bg-surface-secondary rounded-full" />
          <div className="h-6 w-20 bg-surface-secondary rounded-full" />
        </div>

        {/* Instructor */}
        <div className="flex items-center gap-3 pt-2 border-t border-border">
          <div className="w-8 h-8 rounded-full bg-surface-secondary" />
          <div className="space-y-1.5">
            <div className="h-4 w-24 bg-surface-secondary rounded" />
            <div className="h-3 w-32 bg-surface-secondary rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PathCard;
