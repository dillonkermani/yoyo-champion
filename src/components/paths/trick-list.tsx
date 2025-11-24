"use client";

import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Trick, TrickDifficulty } from "@/lib/data/types";
import type { TrickStatus } from "@/stores/progress-store";

export type TrickListStatus = "locked" | "available" | "in_progress" | "completed";

export interface TrickListItem {
  trick: Trick;
  status: TrickStatus;
  listStatus: TrickListStatus;
  unlockRequirement?: string | undefined;
}

export interface TrickListProps {
  tricks: TrickListItem[];
  onTrickClick?: (trickId: string) => void;
  showXp?: boolean;
  showDifficulty?: boolean;
  className?: string;
}

const difficultyLabels: Record<TrickDifficulty, string> = {
  1: "Easy",
  2: "Beginner",
  3: "Intermediate",
  4: "Advanced",
  5: "Expert",
};

/**
 * Ordered trick list for modules with lock/unlock states,
 * progress indicators, and smooth animations
 */
export function TrickList({
  tricks,
  onTrickClick,
  showXp = true,
  showDifficulty = true,
  className,
}: TrickListProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <AnimatePresence mode="popLayout">
        {tricks.map((item, index) => {
          const { trick, status, listStatus, unlockRequirement } = item;
          const isLocked = listStatus === "locked";
          const isCompleted = listStatus === "completed" || status === "mastered";
          const isInProgress = listStatus === "in_progress" || status === "watching" || status === "practicing";
          const isAvailable = listStatus === "available";

          return (
            <motion.div
              key={trick.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <button
                onClick={() => !isLocked && onTrickClick?.(trick.id)}
                disabled={isLocked}
                className={cn(
                  "w-full flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 text-left",
                  isLocked && "bg-surface-secondary border-border opacity-60 cursor-not-allowed",
                  isCompleted && "bg-brand-green/5 border-brand-green/30 hover:border-brand-green/50",
                  isInProgress && "bg-brand-blue/5 border-brand-blue/30 hover:border-brand-blue/50",
                  isAvailable && "bg-white border-border hover:border-brand-teal/50 hover:shadow-sm",
                  !isLocked && "cursor-pointer"
                )}
              >
                {/* Order Number / Status Indicator */}
                <div
                  className={cn(
                    "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm",
                    isLocked && "bg-surface-tertiary text-muted-foreground",
                    isCompleted && "bg-brand-green text-brand-black",
                    isInProgress && "bg-brand-blue text-brand-black",
                    isAvailable && "bg-brand-teal/20 text-brand-teal"
                  )}
                >
                  {isLocked ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  ) : isCompleted ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    index + 1
                  )}
                </div>

                {/* Trick Thumbnail */}
                <div
                  className={cn(
                    "flex-shrink-0 w-14 h-14 rounded-lg bg-surface-secondary overflow-hidden relative",
                    isLocked && "grayscale"
                  )}
                >
                  {trick.thumbnailUrl ? (
                    <Image
                      src={trick.thumbnailUrl}
                      alt={trick.name}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Trick Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4
                      className={cn(
                        "font-semibold truncate",
                        isLocked && "text-muted-foreground",
                        isCompleted && "text-brand-black line-through opacity-70",
                        (isInProgress || isAvailable) && "text-brand-black"
                      )}
                    >
                      {trick.name}
                    </h4>
                    {isInProgress && (
                      <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-brand-blue text-brand-black whitespace-nowrap">
                        In Progress
                      </span>
                    )}
                  </div>

                  {/* Difficulty Stars */}
                  {showDifficulty && (
                    <div className="flex items-center gap-1 mb-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg
                          key={i}
                          className={cn(
                            "w-3 h-3",
                            i < trick.difficulty ? "text-brand-teal" : "text-border"
                          )}
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                        </svg>
                      ))}
                      <span className="text-xs text-muted-foreground ml-1">
                        {difficultyLabels[trick.difficulty]}
                      </span>
                    </div>
                  )}

                  {/* Locked message */}
                  {isLocked && unlockRequirement && (
                    <p className="text-xs text-muted-foreground">
                      {unlockRequirement}
                    </p>
                  )}
                </div>

                {/* XP Reward */}
                {showXp && (
                  <div
                    className={cn(
                      "flex-shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-semibold",
                      isLocked && "bg-surface-tertiary text-muted-foreground",
                      isCompleted && "bg-brand-green/20 text-brand-green",
                      (isInProgress || isAvailable) && "bg-brand-teal/10 text-brand-teal"
                    )}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                    </svg>
                    {isCompleted ? "Earned" : `${trick.xpReward} XP`}
                  </div>
                )}

                {/* Arrow / Action Icon */}
                <div className="flex-shrink-0">
                  {isLocked ? (
                    <svg className="w-5 h-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  ) : isCompleted ? (
                    <svg className="w-5 h-5 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-brand-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                </div>
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

/**
 * Compact trick list variant for smaller spaces
 */
export interface TrickListCompactProps {
  tricks: TrickListItem[];
  onTrickClick?: (trickId: string) => void;
  className?: string;
}

export function TrickListCompact({
  tricks,
  onTrickClick,
  className,
}: TrickListCompactProps) {
  return (
    <div className={cn("space-y-1", className)}>
      {tricks.map((item, index) => {
        const { trick, status, listStatus } = item;
        const isLocked = listStatus === "locked";
        const isCompleted = listStatus === "completed" || status === "mastered";
        const isInProgress = status === "watching" || status === "practicing";

        return (
          <button
            key={trick.id}
            onClick={() => !isLocked && onTrickClick?.(trick.id)}
            disabled={isLocked}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-left",
              isLocked && "opacity-50 cursor-not-allowed",
              !isLocked && "hover:bg-surface-secondary cursor-pointer"
            )}
          >
            <div
              className={cn(
                "w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold",
                isCompleted && "bg-brand-green text-brand-black",
                isInProgress && "bg-brand-blue text-brand-black",
                !isCompleted && !isInProgress && !isLocked && "bg-surface-secondary text-muted-foreground",
                isLocked && "bg-surface-tertiary text-muted-foreground"
              )}
            >
              {isCompleted ? (
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              ) : isLocked ? (
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              ) : (
                index + 1
              )}
            </div>
            <span
              className={cn(
                "flex-1 text-sm truncate",
                isCompleted && "line-through text-muted-foreground",
                isLocked && "text-muted-foreground",
                !isCompleted && !isLocked && "text-brand-black"
              )}
            >
              {trick.name}
            </span>
            <span className="text-xs text-muted-foreground">
              {trick.xpReward} XP
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default TrickList;
