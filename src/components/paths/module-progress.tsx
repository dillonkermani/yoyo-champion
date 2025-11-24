"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { TrickStatus } from "@/stores/progress-store";

export interface ModuleProgressProps {
  tricks: Array<{
    id: string;
    name: string;
    status: TrickStatus;
    xpReward: number;
  }>;
  currentTrickIndex?: number;
  onTrickClick?: (trickId: string, index: number) => void;
  className?: string;
}

/**
 * Visual module progress component showing horizontal progress steps
 * Each step is a trick, connected by lines, with current position highlighted
 */
export function ModuleProgress({
  tricks,
  currentTrickIndex,
  onTrickClick,
  className,
}: ModuleProgressProps) {
  const getStepStatus = (status: TrickStatus, index: number) => {
    if (status === "mastered") return "completed";
    if (status === "watching" || status === "practicing") return "in-progress";
    if (currentTrickIndex !== undefined && index === currentTrickIndex) return "current";
    if (currentTrickIndex !== undefined && index < currentTrickIndex) return "available";
    return "locked";
  };

  const completedCount = tricks.filter((t) => t.status === "mastered").length;
  const isModuleComplete = completedCount === tricks.length;

  return (
    <div className={cn("w-full", className)}>
      {/* Progress bar */}
      <div className="relative flex items-center justify-between">
        {/* Background line */}
        <div className="absolute left-0 right-0 top-1/2 h-1 -translate-y-1/2 bg-border rounded-full" />

        {/* Progress fill line */}
        <motion.div
          className={cn(
            "absolute left-0 top-1/2 h-1 -translate-y-1/2 rounded-full",
            isModuleComplete ? "bg-xp" : "bg-xp"
          )}
          initial={{ width: 0 }}
          animate={{
            width: `${tricks.length > 1 ? (completedCount / (tricks.length - 1)) * 100 : 100}%`,
          }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Step nodes */}
        {tricks.map((trick, index) => {
          const stepStatus = getStepStatus(trick.status, index);
          const isClickable = stepStatus !== "locked" && onTrickClick;

          return (
            <motion.div
              key={trick.id}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="relative z-10"
            >
              <button
                onClick={() => isClickable && onTrickClick?.(trick.id, index)}
                disabled={!isClickable}
                className={cn(
                  "relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200",
                  stepStatus === "completed" && "bg-xp text-brand-black",
                  stepStatus === "in-progress" && "bg-brand-blue text-brand-black ring-4 ring-brand-blue/20",
                  stepStatus === "current" && "bg-xp text-white ring-4 ring-fun-blue/20",
                  stepStatus === "available" && "bg-white border-2 border-fun-blue text-fun-blue",
                  stepStatus === "locked" && "bg-surface-secondary border-2 border-border text-muted-foreground cursor-not-allowed",
                  isClickable && "cursor-pointer hover:scale-110"
                )}
              >
                {stepStatus === "completed" ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : stepStatus === "locked" ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                ) : stepStatus === "in-progress" ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                ) : (
                  <span className="text-sm font-bold">{index + 1}</span>
                )}
              </button>

              {/* Tooltip on hover */}
              <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 hidden group-hover:block pointer-events-none">
                <div className="px-2 py-1 bg-brand-black text-white text-xs rounded whitespace-nowrap">
                  {trick.name}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Celebration at end */}
      {isModuleComplete && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-4 flex items-center justify-center gap-2 text-fun-blue"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
          <span className="font-semibold text-sm">Module Complete!</span>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        </motion.div>
      )}
    </div>
  );
}

/**
 * Compact vertical variant for sidebar/mobile
 */
export interface ModuleProgressVerticalProps {
  tricks: Array<{
    id: string;
    name: string;
    status: TrickStatus;
  }>;
  onTrickClick?: (trickId: string) => void;
  className?: string;
}

export function ModuleProgressVertical({
  tricks,
  onTrickClick,
  className,
}: ModuleProgressVerticalProps) {
  const completedCount = tricks.filter((t) => t.status === "mastered").length;

  return (
    <div className={cn("relative", className)}>
      {/* Vertical line */}
      <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-border" />

      {/* Progress fill */}
      <motion.div
        className="absolute left-4 top-4 w-0.5 bg-xp"
        initial={{ height: 0 }}
        animate={{
          height: `${(completedCount / tricks.length) * 100}%`,
        }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ maxHeight: "calc(100% - 32px)" }}
      />

      {/* Steps */}
      <div className="space-y-3">
        {tricks.map((trick, index) => {
          const isMastered = trick.status === "mastered";
          const isInProgress = trick.status === "watching" || trick.status === "practicing";

          return (
            <motion.button
              key={trick.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              onClick={() => onTrickClick?.(trick.id)}
              className="flex items-center gap-3 w-full text-left group"
            >
              <div
                className={cn(
                  "relative z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all",
                  isMastered && "bg-xp text-brand-black",
                  isInProgress && "bg-brand-blue text-brand-black",
                  !isMastered && !isInProgress && "bg-white border-2 border-border text-muted-foreground group-hover:border-fun-blue"
                )}
              >
                {isMastered ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : isInProgress ? (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                ) : (
                  <span className="text-xs font-semibold">{index + 1}</span>
                )}
              </div>
              <span
                className={cn(
                  "text-sm flex-1 truncate",
                  isMastered && "text-muted-foreground line-through",
                  isInProgress && "text-brand-black font-medium",
                  !isMastered && !isInProgress && "text-brand-black group-hover:text-fun-blue"
                )}
              >
                {trick.name}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

export default ModuleProgress;
