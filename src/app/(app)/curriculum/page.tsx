"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  mockUser,
  mockTricks,
  mockPaths,
  calculatePathProgress,
} from "@/lib/data";
import {
  useProgressStore,
  selectMasteredTricks,
  useGamificationStore,
  selectXp,
  selectLevel,
} from "@/stores";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Mascot,
  StreakFire,
  LevelProgress,
  DailyGoal,
  BounceCard,
  getRandomMessage,
} from "@/components/fun";
import type { TrickGenre } from "@/lib/data/types";

// =============================================================================
// TYPES & CONSTANTS
// =============================================================================

interface CategoryInfo {
  id: TrickGenre;
  name: string;
  icon: string;
  color: string;
  bgColor: string;
  borderColor: string;
  description: string;
  order: number;
}

const TRICK_CATEGORIES: CategoryInfo[] = [
  {
    id: "basics",
    name: "Foundations",
    icon: "star",
    color: "text-fun-blue",
    bgColor: "bg-fun-blue/10",
    borderColor: "border-fun-blue/30",
    description: "Sleepers, throws, and binds",
    order: 1,
  },
  {
    id: "string",
    name: "String Tricks",
    icon: "link",
    color: "text-fun-blue",
    bgColor: "bg-fun-blue/10",
    borderColor: "border-fun-blue/30",
    description: "Mounts and basic combos",
    order: 2,
  },
  {
    id: "slack",
    name: "Slack Tricks",
    icon: "wind",
    color: "text-fun-purple",
    bgColor: "bg-fun-purple/10",
    borderColor: "border-fun-purple/30",
    description: "Slack and whip elements",
    order: 3,
  },
  {
    id: "tech",
    name: "Tech Tricks",
    icon: "cpu",
    color: "text-fun-orange",
    bgColor: "bg-fun-orange/10",
    borderColor: "border-fun-orange/30",
    description: "Technical precision",
    order: 4,
  },
  {
    id: "flow",
    name: "Flow Tricks",
    icon: "waves",
    color: "text-fun-pink",
    bgColor: "bg-fun-pink/10",
    borderColor: "border-fun-pink/30",
    description: "Smooth combinations",
    order: 5,
  },
  {
    id: "horizontal",
    name: "Horizontal",
    icon: "rotate-3d",
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/10",
    borderColor: "border-cyan-500/30",
    description: "Horizontal play",
    order: 6,
  },
  {
    id: "speed",
    name: "Speed Tricks",
    icon: "zap",
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/30",
    description: "Fast-paced tricks",
    order: 7,
  },
  {
    id: "hops",
    name: "Hop Tricks",
    icon: "arrow-up",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/30",
    description: "Popping and hopping",
    order: 8,
  },
];

// Icons as components
const Icons = {
  star: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
    </svg>
  ),
  link: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
    </svg>
  ),
  wind: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.59 4.59A2 2 0 1111 8H2m10.59 11.41A2 2 0 1014 16H2m15.73-8.27A2.5 2.5 0 1119.5 12H2" />
    </svg>
  ),
  cpu: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" />
    </svg>
  ),
  waves: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
    </svg>
  ),
  "rotate-3d": ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v3m6.366-.366l-2.12 2.12M21 12h-3m.366 6.366l-2.12-2.12M12 21v-3m-6.366.366l2.12-2.12M3 12h3m-.366-6.366l2.12 2.12" />
      <circle cx="12" cy="12" r="4" />
    </svg>
  ),
  zap: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" />
    </svg>
  ),
  "arrow-up": ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
    </svg>
  ),
  check: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  ),
  lock: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" d="M12 1C8.676 1 6 3.676 6 7v2H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V11a2 2 0 00-2-2h-2V7c0-3.324-2.676-6-6-6zM8 7c0-2.21 1.79-4 4-4s4 1.79 4 4v2H8V7z" clipRule="evenodd" />
    </svg>
  ),
  "arrow-right": ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  ),
  trophy: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M4 3h16v2a6 6 0 01-6 6h-4a6 6 0 01-6-6V3zm2 2v.5a4 4 0 004 4h4a4 4 0 004-4V5H6zm4 12h4v4h2v-4a2 2 0 00-2-2h-4a2 2 0 00-2 2v4h2v-4z" />
    </svg>
  ),
  map: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
    </svg>
  ),
  sparkles: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
    </svg>
  ),
};

// =============================================================================
// SKILL TREE NODE COMPONENT
// =============================================================================

interface SkillTreeNodeProps {
  category: CategoryInfo;
  mastered: number;
  total: number;
  isUnlocked: boolean;
  isActive: boolean;
  index: number;
}

function SkillTreeNode({ category, mastered, total, isUnlocked, isActive, index }: SkillTreeNodeProps) {
  const percentage = total > 0 ? Math.round((mastered / total) * 100) : 0;
  const isComplete = mastered === total && total > 0;

  const IconComponent = Icons[category.icon as keyof typeof Icons] || Icons.star;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1, type: "spring", bounce: 0.3 }}
      className="relative"
    >
      {/* Connection line to next node */}
      {index < TRICK_CATEGORIES.length - 1 && (
        <div className="hidden lg:block absolute top-1/2 left-full w-8 h-0.5 bg-gray-200 -translate-y-1/2 z-0" />
      )}

      <Link
        href={isUnlocked ? `/library?genre=${category.id}` : "#"}
        className={cn(
          "relative block",
          !isUnlocked && "cursor-not-allowed"
        )}
      >
        <motion.div
          className={cn(
            "relative w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center transition-all duration-300",
            category.bgColor,
            isUnlocked ? "border-4" : "border-2 border-dashed",
            isComplete ? "border-fun-blue" : category.borderColor,
            isActive && "ring-4 ring-fun-blue/30",
            isUnlocked && "hover:scale-110 hover:shadow-lg cursor-pointer"
          )}
          whileHover={isUnlocked ? { y: -4 } : {}}
          whileTap={isUnlocked ? { scale: 0.95 } : {}}
        >
          {/* Progress ring */}
          {isUnlocked && percentage > 0 && (
            <svg className="absolute inset-0 w-full h-full -rotate-90">
              <circle
                cx="50%"
                cy="50%"
                r="45%"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                className={cn("opacity-20", category.color)}
              />
              <motion.circle
                cx="50%"
                cy="50%"
                r="45%"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                className={category.color}
                strokeDasharray={`${percentage * 2.83} 283`}
                initial={{ strokeDasharray: "0 283" }}
                animate={{ strokeDasharray: `${percentage * 2.83} 283` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </svg>
          )}

          {/* Icon or lock */}
          {isUnlocked ? (
            <div className={cn("relative z-10", category.color)}>
              {isComplete ? (
                <motion.div
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-fun-blue flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", bounce: 0.5 }}
                >
                  <Icons.check className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </motion.div>
              ) : (
                <IconComponent className="w-8 h-8 md:w-10 md:h-10" />
              )}
            </div>
          ) : (
            <Icons.lock className="w-8 h-8 md:w-10 md:h-10 text-gray-400" />
          )}
        </motion.div>

        {/* Category label */}
        <div className="mt-2 text-center">
          <p className={cn(
            "font-bold text-xs md:text-sm",
            isUnlocked ? "text-gray-900" : "text-gray-400"
          )}>
            {category.name}
          </p>
          {isUnlocked && (
            <p className={cn("text-xs font-semibold", category.color)}>
              {mastered}/{total}
            </p>
          )}
        </div>

        {/* Completion badge */}
        {isComplete && (
          <motion.div
            className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-fun-blue flex items-center justify-center shadow-lg"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring", bounce: 0.5 }}
          >
            <span className="text-xs">✓</span>
          </motion.div>
        )}
      </Link>
    </motion.div>
  );
}

// =============================================================================
// CATEGORY CARD COMPONENT
// =============================================================================

interface CategoryCardProps {
  category: CategoryInfo;
  mastered: number;
  total: number;
  isUnlocked: boolean;
  index: number;
}

function CategoryCard({ category, mastered, total, isUnlocked, index }: CategoryCardProps) {
  const percentage = total > 0 ? Math.round((mastered / total) * 100) : 0;
  const isComplete = mastered === total && total > 0;
  const IconComponent = Icons[category.icon as keyof typeof Icons] || Icons.star;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, type: "spring", bounce: 0.3 }}
    >
      <Link
        href={isUnlocked ? `/library?genre=${category.id}` : "#"}
        className={cn(
          "block",
          !isUnlocked && "cursor-not-allowed"
        )}
      >
        <motion.div
          className={cn(
            "relative p-4 md:p-5 rounded-2xl border-2 transition-all duration-200",
            category.bgColor,
            isComplete ? "border-fun-blue" : category.borderColor,
            isUnlocked && "hover:shadow-lg cursor-pointer",
            !isUnlocked && "opacity-60"
          )}
          whileHover={isUnlocked ? { y: -4, scale: 1.02 } : {}}
          whileTap={isUnlocked ? { scale: 0.98 } : {}}
        >
          {/* Header */}
          <div className="flex items-center gap-3 mb-3">
            <div className={cn(
              "w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center",
              isComplete ? "bg-fun-blue" : "bg-white/80"
            )}>
              {isUnlocked ? (
                isComplete ? (
                  <Icons.check className="w-6 h-6 text-white" />
                ) : (
                  <IconComponent className={cn("w-6 h-6", category.color)} />
                )
              ) : (
                <Icons.lock className="w-6 h-6 text-gray-400" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className={cn(
                "font-bold text-sm md:text-base truncate",
                isUnlocked ? "text-gray-900" : "text-gray-500"
              )}>
                {category.name}
              </h3>
              <p className="text-xs text-gray-500 truncate">{category.description}</p>
            </div>
          </div>

          {/* Progress */}
          {isUnlocked && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500 font-medium">Progress</span>
                <span className={cn("font-bold", isComplete ? "text-fun-blue" : category.color)}>
                  {mastered}/{total} tricks
                </span>
              </div>
              <div className="h-2 bg-white/60 rounded-full overflow-hidden">
                <motion.div
                  className={cn(
                    "h-full rounded-full",
                    isComplete ? "bg-fun-blue" : "bg-gradient-to-r",
                    !isComplete && category.color.replace("text-", "from-").replace("500", "400"),
                    !isComplete && category.color.replace("text-", "to-")
                  )}
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </div>
            </div>
          )}

          {/* Action */}
          <div className="mt-3 flex items-center justify-between">
            {isUnlocked ? (
              <>
                {isComplete ? (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-fun-blue">
                    <Icons.check className="w-4 h-4" />
                    Mastered
                  </span>
                ) : mastered > 0 ? (
                  <span className="text-xs font-semibold text-fun-blue">Continue</span>
                ) : (
                  <span className="text-xs font-semibold text-gray-500">Start</span>
                )}
                <ArrowRight className={cn("w-4 h-4", category.color)} />
              </>
            ) : (
              <span className="text-xs text-gray-400 font-medium">Complete previous to unlock</span>
            )}
          </div>

          {/* Completion sparkle */}
          {isComplete && (
            <motion.div
              className="absolute top-2 right-2"
              animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Icons.sparkles className="w-5 h-5 text-fun-yellow" />
            </motion.div>
          )}
        </motion.div>
      </Link>
    </motion.div>
  );
}

// =============================================================================
// PATH CARD COMPONENT
// =============================================================================

interface LearningPathCardProps {
  path: typeof mockPaths[0];
  progress: { completed: number; total: number; percentage: number };
  isActive: boolean;
  index: number;
}

function LearningPathCard({ path, progress, isActive, index }: LearningPathCardProps) {
  const isStarted = progress.completed > 0;
  const isComplete = progress.percentage === 100;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, type: "spring", bounce: 0.3 }}
    >
      <Link href={`/paths/${path.slug}`}>
        <motion.div
          className={cn(
            "relative p-4 md:p-5 rounded-2xl border-2 bg-white transition-all duration-200",
            isActive ? "border-fun-blue ring-2 ring-fun-blue/20" : "border-gray-200",
            isComplete && "border-fun-blue bg-fun-blue/5"
          )}
          whileHover={{ y: -4, scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          {/* Active badge */}
          {isActive && !isComplete && (
            <motion.div
              className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full bg-fun-blue text-white text-xs font-bold"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", bounce: 0.5 }}
            >
              Active
            </motion.div>
          )}

          {/* Complete badge */}
          {isComplete && (
            <motion.div
              className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full bg-fun-blue text-white text-xs font-bold flex items-center gap-1"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", bounce: 0.5 }}
            >
              <Icons.check className="w-3 h-3" />
              Complete
            </motion.div>
          )}

          <div className="flex items-start gap-4">
            {/* Instructor avatar */}
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-fun-primary/20 to-fun-blue/20 flex items-center justify-center flex-shrink-0">
              <span className="text-xl">{path.difficulty <= 2 ? "🌱" : path.difficulty <= 3 ? "🌿" : "🌳"}</span>
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-gray-900 truncate">{path.title}</h4>
              <p className="text-xs text-gray-500 line-clamp-1 mb-2">{path.description}</p>

              {/* Progress bar */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">{progress.completed}/{progress.total} tricks</span>
                  <span className={cn(
                    "font-bold",
                    isComplete ? "text-brand-teal" : "text-fun-blue"
                  )}>
                    {progress.percentage}%
                  </span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    className={cn(
                      "h-full rounded-full",
                      isComplete
                        ? "bg-brand-teal"
                        : "bg-gradient-to-r from-fun-blue to-fun-blue-light"
                    )}
                    initial={{ width: 0 }}
                    animate={{ width: `${progress.percentage}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </div>
              </div>
            </div>

            {/* Action */}
            <div className="flex-shrink-0 self-center">
              {isStarted && !isComplete ? (
                <Button variant="brand" size="sm">Continue</Button>
              ) : isComplete ? (
                <Button variant="secondary" size="sm">Review</Button>
              ) : (
                <Button variant="funBlue" size="sm">Start</Button>
              )}
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

// =============================================================================
// MAIN CURRICULUM PAGE
// =============================================================================

export default function CurriculumPage() {
  // Get user data (mock for demo)
  const user = mockUser;

  // Get progress from stores
  const masteredTricks = useProgressStore(selectMasteredTricks);
  const xp = useGamificationStore(selectXp);
  const level = useGamificationStore(selectLevel);

  // Calculate completed trick IDs
  const completedTrickIds = React.useMemo(
    () => masteredTricks.map((t) => t.trickId),
    [masteredTricks]
  );

  // For demo, use mock user data
  const effectiveCompletedTricks = completedTrickIds.length > 0 ? completedTrickIds : user.completedTricks;
  const effectiveXp = xp || user.xp;
  const effectiveLevel = level || user.level;

  // Calculate skills by category
  const skillsByCategory = React.useMemo(() => {
    const categories: Record<TrickGenre, { mastered: number; total: number }> = {} as any;

    TRICK_CATEGORIES.forEach((cat) => {
      categories[cat.id] = { mastered: 0, total: 0 };
    });

    mockTricks.forEach((trick) => {
      if (categories[trick.genre]) {
        categories[trick.genre].total++;
        if (effectiveCompletedTricks.includes(trick.id)) {
          categories[trick.genre].mastered++;
        }
      }
    });

    return categories;
  }, [effectiveCompletedTricks]);

  // Calculate unlock status for categories
  const categoryUnlockStatus = React.useMemo(() => {
    const status: Record<TrickGenre, boolean> = {} as any;

    // Basics is always unlocked
    status.basics = true;

    // String is unlocked after 2 basics
    status.string = skillsByCategory.basics.mastered >= 2;

    // Others unlock progressively
    status.slack = skillsByCategory.string.mastered >= 2;
    status.tech = skillsByCategory.string.mastered >= 3;
    status.flow = skillsByCategory.tech.mastered >= 1 || skillsByCategory.slack.mastered >= 1;
    status.horizontal = skillsByCategory.flow.mastered >= 1;
    status.speed = skillsByCategory.string.mastered >= 2;
    status.hops = skillsByCategory.string.mastered >= 2;

    return status;
  }, [skillsByCategory]);

  // Calculate path progress
  const pathsWithProgress = React.useMemo(() => {
    return mockPaths.map((path) => ({
      path,
      progress: calculatePathProgress(path.id, effectiveCompletedTricks),
      isActive: user.activePaths.includes(path.id),
    }));
  }, [effectiveCompletedTricks, user.activePaths]);

  // Get active paths
  const activePathsData = pathsWithProgress.filter((p) => p.isActive);

  // Get recommended paths (featured, not started)
  const recommendedPaths = pathsWithProgress.filter(
    (p) => p.path.isFeatured && p.progress.completed === 0 && !p.isActive
  );

  // Overall stats
  const totalMastered = effectiveCompletedTricks.length;
  const completedPaths = pathsWithProgress.filter((p) => p.progress.percentage === 100).length;

  // Daily goal (mock)
  const dailyGoal = { current: 2, target: 3 };
  const weeklyChallenge = { name: "Master 5 tricks", current: 3, target: 5 };

  // Encouraging message
  const [encouragingMessage] = React.useState(() =>
    user.currentStreak >= 7 ? getRandomMessage("streak") : getRandomMessage("greeting")
  );

  return (
    <div className="min-h-screen bg-surface-primary pb-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden bg-gradient-to-br from-fun-blue via-fun-blue-dark to-brand-teal px-4 py-6 md:py-10"
      >
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="container mx-auto relative">
          <div className="flex flex-col lg:flex-row lg:items-center gap-6">
            {/* Title and mascot */}
            <div className="flex items-center gap-4 flex-1">
              <Mascot
                size="lg"
                mood="encouraging"
                showString={false}
                className="hidden md:block flex-shrink-0"
              />
              <Mascot
                size="md"
                mood="encouraging"
                showString={false}
                className="md:hidden flex-shrink-0"
              />
              <div>
                <motion.h1
                  className="text-2xl md:text-4xl font-black text-white mb-1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Your Learning Journey
                </motion.h1>
                <motion.p
                  className="text-white/80 text-sm md:text-lg"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {encouragingMessage}
                </motion.p>
              </div>
            </div>

            {/* Stats */}
            <motion.div
              className="flex flex-wrap items-center gap-4 md:gap-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <LevelProgress
                level={effectiveLevel}
                currentXP={effectiveXp % 500}
                requiredXP={500}
                size={70}
                className="bg-white/10 rounded-full p-1"
              />
              <StreakFire
                count={user.currentStreak}
                size="md"
                showLabel={false}
              />
            </motion.div>
          </div>

          {/* Overall stats row */}
          <motion.div
            className="mt-6 grid grid-cols-3 gap-3 md:gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="text-center p-3 md:p-4 rounded-xl bg-white/10 backdrop-blur-sm">
              <p className="text-2xl md:text-3xl font-black text-white">{totalMastered}</p>
              <p className="text-xs md:text-sm text-white/70 font-semibold">Tricks Learned</p>
            </div>
            <div className="text-center p-3 md:p-4 rounded-xl bg-white/10 backdrop-blur-sm">
              <p className="text-2xl md:text-3xl font-black text-white">{completedPaths}</p>
              <p className="text-xs md:text-sm text-white/70 font-semibold">Paths Completed</p>
            </div>
            <div className="text-center p-3 md:p-4 rounded-xl bg-white/10 backdrop-blur-sm">
              <p className="text-2xl md:text-3xl font-black text-fun-yellow">{effectiveXp.toLocaleString()}</p>
              <p className="text-xs md:text-sm text-white/70 font-semibold">Total XP</p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 py-8 space-y-10">
        {/* Skill Tree Visualization */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Icons.map className="w-6 h-6 text-fun-blue" />
            <h2 className="text-xl md:text-2xl font-black text-gray-900">Skill Tree</h2>
          </div>

          {/* Tree visualization for desktop */}
          <div className="hidden lg:block">
            <BounceCard className="p-6 overflow-x-auto">
              <div className="flex items-center justify-between gap-4 min-w-max">
                {TRICK_CATEGORIES.slice(0, 6).map((category, index) => (
                  <SkillTreeNode
                    key={category.id}
                    category={category}
                    mastered={skillsByCategory[category.id]?.mastered || 0}
                    total={skillsByCategory[category.id]?.total || 0}
                    isUnlocked={categoryUnlockStatus[category.id]}
                    isActive={false}
                    index={index}
                  />
                ))}
              </div>
            </BounceCard>
          </div>

          {/* Mobile-friendly grid */}
          <div className="lg:hidden">
            <div className="grid grid-cols-3 gap-3">
              {TRICK_CATEGORIES.slice(0, 6).map((category, index) => (
                <SkillTreeNode
                  key={category.id}
                  category={category}
                  mastered={skillsByCategory[category.id]?.mastered || 0}
                  total={skillsByCategory[category.id]?.total || 0}
                  isUnlocked={categoryUnlockStatus[category.id]}
                  isActive={false}
                  index={index}
                />
              ))}
            </div>
          </div>
        </motion.section>

        {/* Active Learning Paths */}
        {activePathsData.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🛤️</span>
                <h2 className="text-xl md:text-2xl font-black text-gray-900">Active Paths</h2>
                <Badge variant="blue" className="text-xs">
                  {activePathsData.length} active
                </Badge>
              </div>
              <Link href="/paths" className="text-fun-blue hover:text-fun-blue-dark font-bold text-sm flex items-center gap-1">
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="space-y-3">
              {activePathsData.map(({ path, progress, isActive }, index) => (
                <LearningPathCard
                  key={path.id}
                  path={path}
                  progress={progress}
                  isActive={isActive}
                  index={index}
                />
              ))}
            </div>
          </motion.section>
        )}

        {/* Recommended Paths */}
        {recommendedPaths.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Icons.sparkles className="w-6 h-6 text-fun-yellow" />
              <h2 className="text-xl md:text-2xl font-black text-gray-900">Recommended Paths</h2>
            </div>

            <div className="space-y-3">
              {recommendedPaths.slice(0, 2).map(({ path, progress, isActive }, index) => (
                <LearningPathCard
                  key={path.id}
                  path={path}
                  progress={progress}
                  isActive={isActive}
                  index={index}
                />
              ))}
            </div>
          </motion.section>
        )}

        {/* Trick Categories Grid */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Icons.trophy className="w-6 h-6 text-fun-orange" />
            <h2 className="text-xl md:text-2xl font-black text-gray-900">Trick Categories</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
            {TRICK_CATEGORIES.map((category, index) => (
              <CategoryCard
                key={category.id}
                category={category}
                mastered={skillsByCategory[category.id]?.mastered || 0}
                total={skillsByCategory[category.id]?.total || 0}
                isUnlocked={categoryUnlockStatus[category.id]}
                index={index}
              />
            ))}
          </div>
        </motion.section>

        {/* Daily/Weekly Goals */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">🎯</span>
            <h2 className="text-xl md:text-2xl font-black text-gray-900">Daily & Weekly Goals</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Daily Goal */}
            <DailyGoal
              current={dailyGoal.current}
              target={dailyGoal.target}
              icon="target"
              label="Daily Practice"
            />

            {/* Weekly Challenge */}
            <BounceCard className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">🏆</span>
                <span className="font-bold text-gray-900">Weekly Challenge</span>
              </div>
              <p className="text-sm text-gray-600 mb-3">{weeklyChallenge.name}</p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Progress</span>
                  <span className="font-bold text-fun-blue">
                    {weeklyChallenge.current}/{weeklyChallenge.target}
                  </span>
                </div>
                <Progress
                  value={(weeklyChallenge.current / weeklyChallenge.target) * 100}
                  variant="fun"
                  size="default"
                />
              </div>
            </BounceCard>

            {/* Streak Display */}
            <BounceCard className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🔥</span>
                  <span className="font-bold text-gray-900">Current Streak</span>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <StreakFire count={user.currentStreak} size="lg" />
              </div>
              <p className="text-center text-sm text-gray-500 mt-2">
                Best: {user.longestStreak} days
              </p>
            </BounceCard>
          </div>
        </motion.section>

        {/* Quick Start CTA */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <BounceCard className="p-6 md:p-8 text-center bg-gradient-to-br from-fun-blue/5 to-brand-teal/5 border-fun-blue/20">
            <Mascot size="lg" mood="excited" className="mx-auto mb-4" />
            <h3 className="text-xl md:text-2xl font-black text-gray-900 mb-2">
              Ready to learn something new?
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Jump into the trick library to discover new techniques or continue where you left off.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button variant="default" size="lg" asChild>
                <Link href="/library">Browse All Tricks</Link>
              </Button>
              <Button variant="secondary" size="lg" asChild>
                <Link href="/paths">Explore Paths</Link>
              </Button>
            </div>
          </BounceCard>
        </motion.section>
      </div>
    </div>
  );
}
