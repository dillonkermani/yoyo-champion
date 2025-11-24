"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { TrickCard } from "@/components/tricks/trick-card";
import { StarRating } from "@/components/fun";
import type { Trick, TrickDifficulty } from "@/lib/data/types";
import type { TrickStatus } from "@/stores/progress-store";

// Difficulty configuration
const difficultyConfig: Record<
  TrickDifficulty,
  {
    label: string;
    description: string;
    color: string;
    bgColor: string;
    borderColor: string;
    stars: number;
  }
> = {
  1: {
    label: "Beginner",
    description: "Perfect for getting started",
    color: "text-fun-blue",
    bgColor: "bg-fun-blue/10",
    borderColor: "border-fun-blue/30",
    stars: 1,
  },
  2: {
    label: "Intermediate",
    description: "Building your skills",
    color: "text-fun-blue",
    bgColor: "bg-fun-blue/10",
    borderColor: "border-fun-blue/30",
    stars: 2,
  },
  3: {
    label: "Advanced",
    description: "Challenge yourself",
    color: "text-fun-orange",
    bgColor: "bg-fun-orange/10",
    borderColor: "border-fun-orange/30",
    stars: 3,
  },
  4: {
    label: "Expert",
    description: "For serious players",
    color: "text-fun-red",
    bgColor: "bg-fun-red/10",
    borderColor: "border-fun-red/30",
    stars: 4,
  },
  5: {
    label: "Master",
    description: "Elite level tricks",
    color: "text-fun-purple",
    bgColor: "bg-fun-purple/10",
    borderColor: "border-fun-purple/30",
    stars: 5,
  },
};

export interface DifficultySectionProps {
  difficulty: TrickDifficulty;
  tricks: Trick[];
  trickStatuses: Record<string, TrickStatus | "locked">;
  defaultOpen?: boolean;
  className?: string;
}

export function DifficultySection({
  difficulty,
  tricks,
  trickStatuses,
  defaultOpen = true,
  className,
}: DifficultySectionProps) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);
  const config = difficultyConfig[difficulty];

  // Calculate progress
  const masteredCount = tricks.filter(
    (trick) => trickStatuses[trick.id] === "mastered"
  ).length;
  const progress = tricks.length > 0 ? (masteredCount / tricks.length) * 100 : 0;
  const isComplete = progress >= 100;

  if (tricks.length === 0) {
    return null;
  }

  return (
    <div className={cn("rounded-3xl border-2 overflow-hidden", config.borderColor, className)}>
      {/* Header - Collapsible */}
      <motion.button
        className={cn(
          "w-full px-5 py-4 flex items-center justify-between",
          config.bgColor,
          "hover:bg-opacity-80 transition-colors"
        )}
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.99 }}
      >
        <div className="flex items-center gap-4">
          {/* Star Rating */}
          <div className="flex items-center gap-1">
            <StarRating rating={config.stars} maxRating={5} size="sm" />
          </div>

          {/* Label and description */}
          <div className="text-left">
            <div className="flex items-center gap-2">
              <h3 className={cn("font-bold text-lg", config.color)}>
                {config.label}
              </h3>
              {isComplete && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className={cn(
                    "w-5 h-5 rounded-full flex items-center justify-center",
                    "bg-fun-blue"
                  )}
                >
                  <svg
                    className="w-3 h-3 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </motion.div>
              )}
            </div>
            <p className="text-xs text-gray-500 hidden sm:block">
              {config.description}
            </p>
          </div>
        </div>

        {/* Right side: Progress and chevron */}
        <div className="flex items-center gap-4">
          {/* Progress indicator */}
          <div className="hidden sm:flex items-center gap-2">
            <span className={cn("text-sm font-bold", config.color)}>
              {masteredCount}/{tricks.length}
            </span>
            <span className="text-xs text-gray-400">mastered</span>
          </div>

          {/* Mini progress bar */}
          <div className="hidden md:block w-24 h-2 bg-white/50 rounded-full overflow-hidden">
            <motion.div
              className={cn("h-full rounded-full", config.bgColor.replace("/10", ""))}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{ backgroundColor: `hsl(var(--${config.color.replace("text-", "")}))` }}
            />
          </div>

          {/* Chevron */}
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className={cn("w-5 h-5", config.color)} />
          </motion.div>
        </div>
      </motion.button>

      {/* Content - Trick Grid */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="p-4 sm:p-5 bg-white">
              {/* Mobile progress */}
              <div className="sm:hidden mb-4 flex items-center justify-between">
                <span className={cn("text-sm font-bold", config.color)}>
                  {masteredCount}/{tricks.length} mastered
                </span>
                <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    className={cn("h-full rounded-full bg-gradient-to-r")}
                    style={{
                      background: `linear-gradient(to right, var(--color-start), var(--color-end))`,
                      // Using inline for dynamic colors
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Trick Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {tricks.map((trick, index) => {
                  const status = trickStatuses[trick.id] || "not_started";
                  const isLocked = status === "locked";

                  return (
                    <motion.div
                      key={trick.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: index * 0.05,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      <TrickCard
                        trick={trick}
                        status={isLocked ? "not_started" : status as TrickStatus}
                        isLocked={isLocked}
                      />
                    </motion.div>
                  );
                })}
              </div>

              {/* Section completion message */}
              {isComplete && (
                <motion.div
                  className={cn(
                    "mt-4 p-4 rounded-xl text-center",
                    config.bgColor
                  )}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Star className={cn("w-5 h-5 fill-current", config.color)} />
                    <span className={cn("font-bold", config.color)}>
                      All {config.label} tricks mastered!
                    </span>
                    <Star className={cn("w-5 h-5 fill-current", config.color)} />
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Group tricks by difficulty
export function groupTricksByDifficulty(
  tricks: Trick[]
): Map<TrickDifficulty, Trick[]> {
  const groups = new Map<TrickDifficulty, Trick[]>();

  // Initialize all difficulty levels
  ([1, 2, 3, 4, 5] as TrickDifficulty[]).forEach((diff) => {
    groups.set(diff, []);
  });

  // Group tricks
  tricks.forEach((trick) => {
    const current = groups.get(trick.difficulty) || [];
    groups.set(trick.difficulty, [...current, trick]);
  });

  return groups;
}

export default DifficultySection;
