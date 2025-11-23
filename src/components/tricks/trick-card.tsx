"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import type { Trick, TrickDifficulty } from "@/lib/data/types";
import type { TrickStatus } from "@/stores/progress-store";

// Difficulty configuration
const difficultyConfig: Record<
  TrickDifficulty,
  { label: string; color: string; bgColor: string }
> = {
  1: { label: "Beginner", color: "text-emerald-700", bgColor: "bg-emerald-100" },
  2: { label: "Intermediate", color: "text-yellow-700", bgColor: "bg-yellow-100" },
  3: { label: "Advanced", color: "text-orange-700", bgColor: "bg-orange-100" },
  4: { label: "Expert", color: "text-red-700", bgColor: "bg-red-100" },
  5: { label: "Master", color: "text-purple-700", bgColor: "bg-purple-100" },
};

// Status configuration
const statusConfig: Record<
  TrickStatus | "locked",
  { icon: React.ReactNode; className: string; label: string }
> = {
  not_started: {
    icon: null,
    className: "",
    label: "Available",
  },
  watching: {
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    className: "ring-2 ring-brand-teal ring-offset-2 ring-offset-white",
    label: "In Progress",
  },
  practicing: {
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    className: "ring-2 ring-brand-teal ring-offset-2 ring-offset-white",
    label: "In Progress",
  },
  mastered: {
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    className: "",
    label: "Mastered",
  },
  locked: {
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    className: "opacity-60 grayscale",
    label: "Locked",
  },
};

// Genre colors
const genreColors: Record<string, string> = {
  basics: "bg-gray-100 text-gray-700",
  string: "bg-blue-100 text-blue-700",
  slack: "bg-purple-100 text-purple-700",
  tech: "bg-cyan-100 text-cyan-700",
  flow: "bg-pink-100 text-pink-700",
  horizontal: "bg-amber-100 text-amber-700",
  speed: "bg-red-100 text-red-700",
  grinds: "bg-orange-100 text-orange-700",
  regens: "bg-lime-100 text-lime-700",
  hops: "bg-indigo-100 text-indigo-700",
};

export interface TrickCardProps {
  trick: Trick;
  status?: TrickStatus | "locked";
  isLocked?: boolean;
  className?: string;
}

export function TrickCard({
  trick,
  status = "not_started",
  isLocked = false,
  className,
}: TrickCardProps) {
  const effectiveStatus = isLocked ? "locked" : status;
  const statusInfo = statusConfig[effectiveStatus];
  const difficultyInfo = difficultyConfig[trick.difficulty];

  const cardContent = (
    <motion.div
      className={cn(
        "group relative rounded-xl border border-gray-200 bg-white overflow-hidden transition-all duration-300",
        "hover:border-brand-teal/30 hover:shadow-lg hover:shadow-brand-teal/5",
        statusInfo.className,
        isLocked && "cursor-not-allowed",
        className
      )}
      {...(!isLocked ? { whileHover: { y: -4, scale: 1.01 } } : {})}
      transition={{ duration: 0.2 }}
    >
      {/* Thumbnail Section */}
      <div className="relative aspect-video bg-gray-100 overflow-hidden">
        {/* Placeholder gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200" />

        {/* Preview gif on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-full h-full bg-gradient-to-br from-brand-blue/20 to-brand-teal/20" />
        </div>

        {/* Play icon overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-12 h-12 rounded-full bg-brand-blue flex items-center justify-center">
            <svg className="w-6 h-6 text-gray-900 ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        {/* Status indicator */}
        {effectiveStatus === "mastered" && (
          <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}

        {/* Locked overlay */}
        {isLocked && (
          <div className="absolute inset-0 bg-gray-900/60 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
              <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>
        )}

        {/* XP Badge */}
        <div className="absolute bottom-2 left-2">
          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-semibold text-amber-700">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
            {trick.xpReward} XP
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <h3 className="font-bold text-gray-900 text-lg leading-tight line-clamp-1 group-hover:text-brand-teal transition-colors">
          {trick.name}
        </h3>

        {/* Badges Row */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Difficulty Badge */}
          <div className={cn(
            "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold",
            difficultyInfo.bgColor,
            difficultyInfo.color
          )}>
            <span className="flex items-center justify-center w-4 h-4 rounded-full bg-current/20 text-[10px] font-bold">
              {trick.difficulty}
            </span>
            {difficultyInfo.label}
          </div>

          {/* Style Badge */}
          <Badge className="bg-brand-blue/30 text-gray-800 border-0 text-xs font-semibold">
            {trick.style}
          </Badge>

          {/* Genre Tag */}
          <span className={cn(
            "px-2 py-0.5 rounded-full text-xs font-medium capitalize",
            genreColors[trick.genre] || "bg-gray-100 text-gray-700"
          )}>
            {trick.genre}
          </span>
        </div>

        {/* Status & Time Row */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-1.5">
            {statusInfo.icon && (
              <span className={cn(
                effectiveStatus === "mastered" && "text-emerald-600",
                (effectiveStatus === "watching" || effectiveStatus === "practicing") && "text-brand-teal",
                effectiveStatus === "locked" && "text-gray-400"
              )}>
                {statusInfo.icon}
              </span>
            )}
            <span className={cn(
              effectiveStatus === "mastered" && "text-emerald-600",
              (effectiveStatus === "watching" || effectiveStatus === "practicing") && "text-brand-teal",
              effectiveStatus === "locked" && "text-gray-400"
            )}>
              {statusInfo.label}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {trick.estimatedMinutes} min
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

// Skeleton variant for loading states
export function TrickCardSkeleton() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white overflow-hidden animate-pulse">
      {/* Thumbnail */}
      <div className="aspect-video bg-gray-200" />

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <div className="h-6 bg-gray-200 rounded w-3/4" />

        {/* Badges */}
        <div className="flex gap-2">
          <div className="h-5 w-20 bg-gray-200 rounded-full" />
          <div className="h-5 w-12 bg-gray-200 rounded-full" />
          <div className="h-5 w-16 bg-gray-200 rounded-full" />
        </div>

        {/* Status row */}
        <div className="flex justify-between">
          <div className="h-4 w-20 bg-gray-200 rounded" />
          <div className="h-4 w-16 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
}

export default TrickCard;
