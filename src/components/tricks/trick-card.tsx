"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { XPBadge, NewBadge, StarRating } from "@/components/fun";
import type { Trick, TrickDifficulty } from "@/lib/data/types";
import type { TrickStatus } from "@/stores/progress-store";

// Difficulty configuration - Now more colorful!
const difficultyConfig: Record<
  TrickDifficulty,
  { label: string; color: string; bgColor: string; stars: number }
> = {
  1: { label: "Beginner", color: "text-fun-primary", bgColor: "bg-fun-primary/20", stars: 1 },
  2: { label: "Intermediate", color: "text-fun-accent", bgColor: "bg-fun-accent/20", stars: 2 },
  3: { label: "Advanced", color: "text-orange-600", bgColor: "bg-orange-100", stars: 3 },
  4: { label: "Expert", color: "text-streak", bgColor: "bg-streak/20", stars: 4 },
  5: { label: "Master", color: "text-fun-purple", bgColor: "bg-fun-purple/20", stars: 5 },
};

// Status configuration
const statusConfig: Record<
  TrickStatus | "locked",
  { icon: React.ReactNode; className: string; label: string; ringColor: string }
> = {
  not_started: {
    icon: null,
    className: "",
    label: "Ready to Learn",
    ringColor: "",
  },
  watching: {
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    className: "ring-2 ring-fun-accent ring-offset-2",
    label: "Learning",
    ringColor: "ring-fun-accent",
  },
  practicing: {
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    className: "ring-2 ring-fun-blue ring-offset-2",
    label: "Practicing",
    ringColor: "ring-fun-blue",
  },
  mastered: {
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    className: "ring-2 ring-fun-primary ring-offset-2",
    label: "Mastered",
    ringColor: "ring-fun-primary",
  },
  locked: {
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    className: "opacity-60 grayscale",
    label: "Locked",
    ringColor: "",
  },
};

// Genre colors - Fun and vibrant
const genreColors: Record<string, { bg: string; text: string }> = {
  basics: { bg: "bg-gray-100", text: "text-gray-700" },
  string: { bg: "bg-fun-blue/20", text: "text-fun-blue" },
  slack: { bg: "bg-fun-purple/20", text: "text-purple-700" },
  tech: { bg: "bg-cyan-100", text: "text-cyan-700" },
  flow: { bg: "bg-pink-100", text: "text-pink-700" },
  horizontal: { bg: "bg-xp/20", text: "text-amber-700" },
  speed: { bg: "bg-streak/20", text: "text-red-700" },
  grinds: { bg: "bg-orange-100", text: "text-orange-700" },
  regens: { bg: "bg-lime-100", text: "text-lime-700" },
  hops: { bg: "bg-indigo-100", text: "text-indigo-700" },
};

export interface TrickCardProps {
  trick: Trick;
  status?: TrickStatus | "locked";
  isLocked?: boolean;
  isNew?: boolean;
  className?: string;
}

export function TrickCard({
  trick,
  status = "not_started",
  isLocked = false,
  isNew = false,
  className,
}: TrickCardProps) {
  const effectiveStatus = isLocked ? "locked" : status;
  const statusInfo = statusConfig[effectiveStatus];
  const difficultyInfo = difficultyConfig[trick.difficulty];
  const defaultGenreColor = { bg: "bg-gray-100", text: "text-gray-700" };
  const genreColor = genreColors[trick.genre] ?? defaultGenreColor;

  const cardContent = (
    <motion.div
      className={cn(
        "group relative rounded-2xl border-2 border-gray-200 bg-white overflow-hidden transition-all duration-300",
        "hover:border-fun-primary/50 hover:shadow-xl hover:shadow-fun-primary/10",
        statusInfo.className,
        isLocked && "cursor-not-allowed",
        className
      )}
      {...(!isLocked && { whileHover: { y: -8, scale: 1.02 } })}
      {...(!isLocked && { whileTap: { scale: 0.98 } })}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {/* Thumbnail Section */}
      <div className="relative aspect-video bg-gray-100 overflow-hidden">
        {/* Placeholder gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200" />

        {/* Preview gif on hover - Fun gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-fun-primary/20 via-fun-blue/10 to-fun-purple/20"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />

        {/* Play icon overlay - Bigger and bouncy, always visible on touch for better UX */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
          initial={false}
        >
          <motion.div
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-fun-primary flex items-center justify-center shadow-lg"
            whileHover={{ scale: 1.1 }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </motion.div>
        </motion.div>

        {/* Mastered indicator - Top right with glow */}
        {effectiveStatus === "mastered" && (
          <motion.div
            className="absolute top-2 right-2 sm:top-3 sm:right-3"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", bounce: 0.6 }}
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-fun-primary flex items-center justify-center shadow-lg shadow-fun-primary/30">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </motion.div>
        )}

        {/* New badge */}
        {isNew && !isLocked && effectiveStatus === "not_started" && (
          <div className="absolute top-3 left-3">
            <NewBadge />
          </div>
        )}

        {/* Locked overlay */}
        {isLocked && (
          <div className="absolute inset-0 bg-gray-900/70 flex flex-col items-center justify-center gap-1.5 sm:gap-2">
            <motion.div
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gray-200 flex items-center justify-center"
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <svg className="w-6 h-6 sm:w-7 sm:h-7 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </motion.div>
            <span className="text-white/80 text-xs sm:text-sm font-semibold px-2 text-center">Complete prerequisites</span>
          </div>
        )}

        {/* XP Badge - Bottom left with gold styling */}
        <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3">
          <XPBadge amount={trick.xpReward} size="sm" showPlus={true} animate={false} />
        </div>

        {/* Progress indicator for in-progress tricks */}
        {(effectiveStatus === "watching" || effectiveStatus === "practicing") && (
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gray-200">
            <motion.div
              className="h-full bg-fun-accent"
              initial={{ width: 0 }}
              animate={{ width: "45%" }}
              transition={{ duration: 0.5 }}
            />
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-3 sm:p-4 space-y-2 sm:space-y-3">
        {/* Title */}
        <h3 className="font-bold text-gray-900 text-base sm:text-lg leading-tight line-clamp-1 group-hover:text-fun-primary transition-colors">
          {trick.name}
        </h3>

        {/* Difficulty Stars */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <StarRating rating={difficultyInfo.stars} maxRating={5} size="sm" />
          <span className={cn("text-[10px] sm:text-xs font-bold", difficultyInfo.color)}>
            {difficultyInfo.label}
          </span>
        </div>

        {/* Badges Row */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {/* Style Badge */}
          <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-fun-blue/20 text-fun-blue text-[10px] sm:text-xs font-bold">
            {trick.style}
          </span>

          {/* Genre Tag */}
          <span className={cn(
            "px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold capitalize",
            genreColor.bg,
            genreColor.text
          )}>
            {trick.genre}
          </span>
        </div>

        {/* Status & Time Row */}
        <div className="flex items-center justify-between text-[10px] sm:text-xs pt-1">
          <div className="flex items-center gap-1.5">
            {effectiveStatus === "mastered" ? (
              <span className="flex items-center gap-1 text-fun-primary font-bold">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Mastered!
              </span>
            ) : (effectiveStatus === "watching" || effectiveStatus === "practicing") ? (
              <span className="flex items-center gap-1 text-fun-accent font-bold">
                {statusInfo.icon}
                {statusInfo.label}
              </span>
            ) : isLocked ? (
              <span className="flex items-center gap-1 text-gray-400 font-semibold">
                {statusInfo.icon}
                {statusInfo.label}
              </span>
            ) : (
              <span className="text-gray-500 font-semibold">
                Ready to learn
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 text-gray-400">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-semibold">{trick.estimatedMinutes} min</span>
          </div>
        </div>
      </div>
    </motion.div>
  );

  if (isLocked) {
    return cardContent;
  }

  return (
    <Link href={`/trick/${trick.slug}`} className="block">
      {cardContent}
    </Link>
  );
}

// Skeleton variant for loading states - More fun
export function TrickCardSkeleton() {
  return (
    <div className="rounded-2xl border-2 border-gray-200 bg-white overflow-hidden">
      {/* Thumbnail */}
      <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse" />

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <div className="h-6 bg-gray-200 rounded-full w-3/4 animate-pulse" />

        {/* Stars */}
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-5 h-5 bg-gray-200 rounded-full animate-pulse" />
          ))}
        </div>

        {/* Badges */}
        <div className="flex gap-2">
          <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse" />
          <div className="h-6 w-14 bg-gray-200 rounded-full animate-pulse" />
        </div>

        {/* Status row */}
        <div className="flex justify-between pt-1">
          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export default TrickCard;
