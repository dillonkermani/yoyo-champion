"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import type { PathModule, Trick } from "@/lib/data/types";
import type { TrickStatus } from "@/stores/progress-store";

export interface ModuleCardProps {
  module: PathModule;
  moduleNumber: number;
  tricks: Trick[];
  getTrickStatus: (trickId: string) => TrickStatus;
  isLocked?: boolean;
  isExpanded?: boolean;
  onExpandToggle?: () => void;
  onTrickClick?: (trickId: string) => void;
  className?: string;
}

export function ModuleCard({
  module,
  moduleNumber,
  tricks,
  getTrickStatus,
  isLocked = false,
  isExpanded = false,
  onExpandToggle,
  onTrickClick,
  className,
}: ModuleCardProps) {
  // Calculate completion stats
  const completedTricks = module.tricks.filter(
    (trickId) => getTrickStatus(trickId) === "mastered"
  ).length;
  const totalTricks = module.tricks.length;
  const completionPercentage = Math.round((completedTricks / totalTricks) * 100);
  const isComplete = completedTricks === totalTricks;
  const isInProgress = completedTricks > 0 && !isComplete;

  return (
    <div
      className={cn(
        "rounded-xl border bg-white overflow-hidden transition-all duration-200",
        isLocked ? "border-border opacity-60" : "border-border hover:border-brand-teal/30",
        isComplete && "border-brand-green/50 bg-brand-green/5",
        isInProgress && !isComplete && "border-brand-blue/50",
        className
      )}
    >
      {/* Header - Always visible */}
      <button
        onClick={onExpandToggle}
        disabled={isLocked}
        className={cn(
          "w-full px-5 py-4 flex items-center gap-4 text-left transition-colors",
          !isLocked && "hover:bg-surface-secondary",
          isLocked && "cursor-not-allowed"
        )}
      >
        {/* Module Number / Status */}
        <div
          className={cn(
            "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold",
            isComplete && "bg-brand-green text-brand-black",
            isInProgress && "bg-brand-blue text-brand-black",
            !isComplete && !isInProgress && !isLocked && "bg-brand-teal/20 text-brand-teal",
            isLocked && "bg-surface-secondary text-muted-foreground"
          )}
        >
          {isComplete ? (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          ) : isLocked ? (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          ) : (
            moduleNumber
          )}
        </div>

        {/* Module Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4
              className={cn(
                "font-semibold text-sm truncate",
                isLocked ? "text-muted-foreground" : "text-brand-black"
              )}
            >
              {module.title}
            </h4>
            {isInProgress && !isComplete && (
              <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-brand-blue text-brand-black">
                In Progress
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-xs text-muted-foreground">
              {completedTricks} / {totalTricks} tricks
            </span>
            {!isLocked && completionPercentage > 0 && (
              <div className="flex items-center gap-1.5">
                <div className="w-16 h-1.5 rounded-full bg-surface-secondary overflow-hidden">
                  <motion.div
                    className={cn(
                      "h-full rounded-full",
                      isComplete ? "bg-brand-green" : "bg-brand-blue"
                    )}
                    initial={{ width: 0 }}
                    animate={{ width: `${completionPercentage}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <span className="text-[10px] font-medium text-muted-foreground">
                  {completionPercentage}%
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Expand/Collapse Icon */}
        {!isLocked && (
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="flex-shrink-0 text-muted-foreground"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
        )}
      </button>

      {/* Expanded Tricks List */}
      <AnimatePresence>
        {isExpanded && !isLocked && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-4 border-t border-border pt-3">
              <p className="text-xs text-muted-foreground mb-3">
                {module.description}
              </p>
              <div className="space-y-2">
                {module.tricks.map((trickId, index) => {
                  const trick = tricks.find((t) => t.id === trickId);
                  if (!trick) return null;

                  const status = getTrickStatus(trickId);
                  const isMastered = status === "mastered";
                  const isWatching = status === "watching" || status === "practicing";

                  return (
                    <motion.button
                      key={trickId}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                      onClick={() => onTrickClick?.(trickId)}
                      className={cn(
                        "w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors",
                        "hover:bg-surface-secondary"
                      )}
                    >
                      {/* Status Icon */}
                      <div
                        className={cn(
                          "flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center",
                          isMastered && "bg-brand-green text-brand-black",
                          isWatching && "bg-brand-blue text-brand-black",
                          !isMastered && !isWatching && "bg-surface-secondary text-muted-foreground"
                        )}
                      >
                        {isMastered ? (
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        ) : isWatching ? (
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        ) : (
                          <span className="w-2 h-2 rounded-full bg-current" />
                        )}
                      </div>

                      {/* Trick Info */}
                      <div className="flex-1 min-w-0">
                        <span
                          className={cn(
                            "text-sm font-medium truncate block",
                            isMastered
                              ? "text-brand-black line-through opacity-70"
                              : "text-brand-black"
                          )}
                        >
                          {trick.name}
                        </span>
                      </div>

                      {/* XP */}
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <svg className="w-3.5 h-3.5 text-brand-teal" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                        </svg>
                        {trick.xpReward}
                      </div>

                      {/* Arrow */}
                      <svg className="w-4 h-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Skeleton for loading
export function ModuleCardSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-white animate-pulse">
      <div className="px-5 py-4 flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-surface-secondary" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-32 bg-surface-secondary rounded" />
          <div className="h-3 w-24 bg-surface-secondary rounded" />
        </div>
      </div>
    </div>
  );
}

export default ModuleCard;
