"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  Target,
  Zap,
  Flame,
  Wind,
  Sparkles,
  Trophy,
  Gift,
  Star,
  ChevronDown,
  Rocket,
  Award,
  Layers,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SkillNode, ConnectingPath, type NodeState } from "./skill-node";
import { useProgressStore } from "@/stores/progress-store";
import { getTrickById } from "@/lib/data/mock-tricks";
import type { TrickDifficulty } from "@/lib/data/types";

// =============================================================================
// TYPES
// =============================================================================

export interface SkillTreeCategory {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  trickIds: string[];
}

export interface SkillTreeSection {
  id: string;
  name: string;
  categories: SkillTreeCategory[];
  checkpointXp?: number;
}

export interface SkillTreeProps {
  className?: string;
  onTrickSelect?: (trickId: string) => void;
}

// =============================================================================
// SKILL TREE DATA STRUCTURE
// =============================================================================

const skillTreeSections: SkillTreeSection[] = [
  {
    id: "foundations",
    name: "Foundations",
    categories: [
      {
        id: "basics",
        name: "Basic Throws",
        description: "Master the fundamental throws",
        icon: <BookOpen className="w-8 h-8" />,
        color: "fun-blue",
        trickIds: ["trick-001", "trick-002", "trick-003", "trick-004"],
      },
    ],
    checkpointXp: 100,
  },
  {
    id: "mounts-binds",
    name: "Mounts & Binds",
    categories: [
      {
        id: "mounts",
        name: "Mounts",
        description: "Learn essential mounting positions",
        icon: <Target className="w-8 h-8" />,
        color: "fun-blue",
        trickIds: ["trick-006", "trick-007"],
      },
      {
        id: "binds",
        name: "Binds",
        description: "Master the bind return",
        icon: <Zap className="w-8 h-8" />,
        color: "fun-purple",
        trickIds: ["trick-005"],
      },
    ],
    checkpointXp: 200,
  },
  {
    id: "string-tricks",
    name: "String Tricks",
    categories: [
      {
        id: "string-basics",
        name: "String Basics",
        description: "Classic string manipulations",
        icon: <Layers className="w-8 h-8" />,
        color: "fun-orange",
        trickIds: ["trick-008", "trick-009", "trick-013"],
      },
    ],
    checkpointXp: 300,
  },
  {
    id: "combos",
    name: "Basic Combos",
    categories: [
      {
        id: "flow-combos",
        name: "Flow",
        description: "Smooth, flowing combinations",
        icon: <Wind className="w-8 h-8" />,
        color: "fun-cyan",
        trickIds: ["trick-010", "trick-018"],
      },
      {
        id: "speed-tricks",
        name: "Speed",
        description: "Fast-paced speed tricks",
        icon: <Rocket className="w-8 h-8" />,
        color: "fun-red",
        trickIds: ["trick-011", "trick-022"],
      },
      {
        id: "hops",
        name: "Hops",
        description: "Hopping and popping tricks",
        icon: <Sparkles className="w-8 h-8" />,
        color: "fun-yellow",
        trickIds: ["trick-014"],
      },
    ],
    checkpointXp: 500,
  },
  {
    id: "advanced",
    name: "Advanced",
    categories: [
      {
        id: "slack-advanced",
        name: "Slack",
        description: "Advanced slack techniques",
        icon: <Flame className="w-8 h-8" />,
        color: "fun-pink",
        trickIds: ["trick-015", "trick-021"],
      },
      {
        id: "tech-advanced",
        name: "Tech",
        description: "Technical precision tricks",
        icon: <Award className="w-8 h-8" />,
        color: "fun-purple",
        trickIds: ["trick-012", "trick-016", "trick-020"],
      },
      {
        id: "horizontal",
        name: "Horizontal",
        description: "Sideways spinning tricks",
        icon: <Target className="w-8 h-8" />,
        color: "fun-blue",
        trickIds: ["trick-017"],
      },
    ],
    checkpointXp: 750,
  },
  {
    id: "competition",
    name: "Competition",
    categories: [
      {
        id: "master-tricks",
        name: "Master Tricks",
        description: "Competition-level difficulty",
        icon: <Trophy className="w-8 h-8" />,
        color: "fun-yellow",
        trickIds: ["trick-019"],
      },
    ],
  },
];

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

function getCategoryProgress(
  trickIds: string[],
  masteredTrickIds: string[]
): { completed: number; total: number; percentage: number } {
  const completed = trickIds.filter((id) => masteredTrickIds.includes(id)).length;
  return {
    completed,
    total: trickIds.length,
    percentage: Math.round((completed / trickIds.length) * 100),
  };
}

function getCategoryState(
  trickIds: string[],
  masteredTrickIds: string[],
  inProgressTrickIds: string[],
  isLocked: boolean
): NodeState {
  if (isLocked) return "locked";

  const allMastered = trickIds.every((id) => masteredTrickIds.includes(id));
  if (allMastered) return "completed";

  const hasInProgress = trickIds.some((id) => inProgressTrickIds.includes(id));
  const hasMastered = trickIds.some((id) => masteredTrickIds.includes(id));
  if (hasInProgress || hasMastered) return "in-progress";

  return "available";
}

function getTrickState(
  trickId: string,
  masteredTrickIds: string[],
  inProgressTrickIds: string[],
  isLocked: boolean
): NodeState {
  if (isLocked) return "locked";
  if (masteredTrickIds.includes(trickId)) return "mastered";
  if (inProgressTrickIds.includes(trickId)) return "in-progress";
  return "available";
}

function isSectionLocked(
  sectionIndex: number,
  sections: SkillTreeSection[],
  masteredTrickIds: string[]
): boolean {
  if (sectionIndex === 0) return false;

  // Check if previous section has at least 50% completion
  const prevSection = sections[sectionIndex - 1];
  if (!prevSection) return true;

  const prevTrickIds = prevSection.categories.flatMap((c) => c.trickIds);
  const prevMastered = prevTrickIds.filter((id) => masteredTrickIds.includes(id)).length;
  const prevPercentage = (prevMastered / prevTrickIds.length) * 100;

  return prevPercentage < 50;
}

// =============================================================================
// CHECKPOINT COMPONENT
// =============================================================================

interface CheckpointNodeProps {
  sectionName: string;
  xpReward: number;
  isUnlocked: boolean;
  isComplete: boolean;
  onClaim?: () => void;
}

function CheckpointNode({
  sectionName,
  xpReward,
  isUnlocked,
  isComplete,
}: CheckpointNodeProps) {
  const [showCelebration, setShowCelebration] = React.useState(false);

  React.useEffect(() => {
    if (isComplete) {
      setShowCelebration(true);
      const timer = setTimeout(() => setShowCelebration(false), 2000);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [isComplete]);

  return (
    <motion.div
      className="relative flex flex-col items-center"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", bounce: 0.4 }}
    >
      {/* Celebration particles */}
      <AnimatePresence>
        {showCelebration && (
          <>
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute top-1/2 left-1/2"
                initial={{ opacity: 1, scale: 1 }}
                animate={{
                  opacity: 0,
                  scale: 0.5,
                  x: Math.cos((i * Math.PI) / 4) * 60,
                  y: Math.sin((i * Math.PI) / 4) * 60,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <Star
                  className="w-4 h-4 fill-fun-yellow text-fun-yellow"
                />
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Checkpoint node */}
      <motion.div
        className={cn(
          "relative w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center",
          "border-4 transition-all duration-300",
          isComplete
            ? "bg-gradient-to-br from-fun-yellow to-fun-orange border-fun-orange shadow-fun-yellow-lg"
            : isUnlocked
              ? "bg-white border-fun-yellow border-dashed shadow-fun-yellow"
              : "bg-gray-200 border-gray-300"
        )}
        animate={
          isUnlocked && !isComplete
            ? {
                borderColor: ["#FFC800", "#FF9600", "#FFC800"],
              }
            : {}
        }
        transition={{ duration: 2, repeat: Infinity }}
      >
        {isComplete ? (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", bounce: 0.5 }}
          >
            <Trophy className="w-8 h-8 text-white" />
          </motion.div>
        ) : (
          <Gift
            className={cn(
              "w-8 h-8",
              isUnlocked ? "text-fun-yellow" : "text-gray-400"
            )}
          />
        )}
      </motion.div>

      {/* Label */}
      <div className="mt-2 text-center">
        <p
          className={cn(
            "text-xs font-bold uppercase tracking-wider",
            isComplete ? "text-fun-orange" : isUnlocked ? "text-fun-yellow-dark" : "text-gray-400"
          )}
        >
          {sectionName} Complete!
        </p>
        <motion.div
          className={cn(
            "mt-1 px-2 py-0.5 rounded-full text-xs font-bold inline-flex items-center gap-1",
            isComplete
              ? "bg-fun-yellow text-white"
              : isUnlocked
                ? "bg-fun-yellow/20 text-fun-yellow-dark"
                : "bg-gray-200 text-gray-400"
          )}
          animate={isUnlocked && !isComplete ? { scale: [1, 1.05, 1] } : {}}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <Zap className="w-3 h-3" />
          <span>+{xpReward} XP</span>
        </motion.div>
      </div>
    </motion.div>
  );
}

// =============================================================================
// SECTION HEADER
// =============================================================================

interface SectionHeaderProps {
  name: string;
  isLocked: boolean;
  isExpanded: boolean;
  onToggle: () => void;
  progress: { completed: number; total: number };
}

function SectionHeader({
  name,
  isLocked,
  isExpanded,
  onToggle,
  progress,
}: SectionHeaderProps) {
  const percentage = Math.round((progress.completed / progress.total) * 100) || 0;

  return (
    <motion.button
      onClick={onToggle}
      className={cn(
        "w-full flex items-center justify-between px-4 py-3 rounded-xl",
        "transition-all duration-200",
        isLocked
          ? "bg-gray-100 cursor-not-allowed"
          : "bg-gradient-to-r from-fun-blue/10 to-fun-blue/10 hover:from-fun-blue/20 hover:to-fun-blue/20"
      )}
      whileHover={!isLocked ? { scale: 1.01 } : {}}
      whileTap={!isLocked ? { scale: 0.99 } : {}}
    >
      <div className="flex items-center gap-3">
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown
            className={cn(
              "w-5 h-5",
              isLocked ? "text-gray-400" : "text-fun-blue"
            )}
          />
        </motion.div>
        <span
          className={cn(
            "font-bold text-lg",
            isLocked ? "text-gray-400" : "text-gray-900"
          )}
        >
          {name}
        </span>
      </div>

      {/* Progress indicator */}
      <div className="flex items-center gap-2">
        <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-fun-blue to-fun-blue rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <span
          className={cn(
            "text-sm font-bold min-w-[3rem] text-right",
            isLocked ? "text-gray-400" : "text-fun-blue"
          )}
        >
          {progress.completed}/{progress.total}
        </span>
      </div>
    </motion.button>
  );
}

// =============================================================================
// CATEGORY ROW
// =============================================================================

interface CategoryRowProps {
  categories: SkillTreeCategory[];
  masteredTrickIds: string[];
  inProgressTrickIds: string[];
  isLocked: boolean;
  onTrickSelect?: (trickId: string) => void;
}

function CategoryRow({
  categories,
  masteredTrickIds,
  inProgressTrickIds,
  isLocked,
  onTrickSelect,
}: CategoryRowProps) {
  const router = useRouter();

  const handleTrickClick = (trickId: string) => {
    if (onTrickSelect) {
      onTrickSelect(trickId);
    } else {
      const trick = getTrickById(trickId);
      if (trick) {
        router.push(`/trick/${trick.slug}`);
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 py-6">
      {/* Categories */}
      <div
        className={cn(
          "flex gap-8 md:gap-12 justify-center flex-wrap",
          categories.length === 1 && "justify-center",
          categories.length === 2 && "justify-center gap-16",
          categories.length === 3 && "justify-center"
        )}
      >
        {categories.map((category, catIndex) => {
          const progress = getCategoryProgress(category.trickIds, masteredTrickIds);
          const categoryState = getCategoryState(
            category.trickIds,
            masteredTrickIds,
            inProgressTrickIds,
            isLocked
          );

          return (
            <motion.div
              key={category.id}
              className="flex flex-col items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: catIndex * 0.1 }}
            >
              {/* Category Node */}
              <SkillNode
                id={category.id}
                variant="category"
                state={categoryState}
                name={category.name}
                icon={category.icon}
                progress={progress.percentage}
              />

              {/* Tricks under category */}
              <div className="flex flex-wrap gap-3 justify-center max-w-[200px]">
                {category.trickIds.map((trickId) => {
                  const trick = getTrickById(trickId);
                  if (!trick) return null;

                  const trickState = getTrickState(
                    trickId,
                    masteredTrickIds,
                    inProgressTrickIds,
                    isLocked
                  );

                  return (
                    <SkillNode
                      key={trickId}
                      id={trickId}
                      variant="trick"
                      state={trickState}
                      name={trick.name}
                      difficulty={trick.difficulty as TrickDifficulty}
                      xpReward={trick.xpReward}
                      onClick={() => handleTrickClick(trickId)}
                    />
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// =============================================================================
// MAIN SKILL TREE COMPONENT
// =============================================================================

export function SkillTree({ className, onTrickSelect }: SkillTreeProps) {
  const [expandedSections, setExpandedSections] = React.useState<Set<string>>(
    new Set(["foundations", "mounts-binds"])
  );

  // Get progress from store
  const trickProgress = useProgressStore((state) => state.trickProgress);
  const masteredTrickIds = Object.entries(trickProgress)
    .filter(([, progress]) => progress.status === "mastered")
    .map(([id]) => id);
  const inProgressTrickIds = Object.entries(trickProgress)
    .filter(([, progress]) => progress.status === "watching" || progress.status === "practicing")
    .map(([id]) => id);

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(sectionId)) {
        next.delete(sectionId);
      } else {
        next.add(sectionId);
      }
      return next;
    });
  };

  return (
    <div className={cn("relative", className)}>
      {/* Background path decoration */}
      <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-fun-blue/20 via-fun-blue/20 to-fun-purple/20 -translate-x-1/2 rounded-full" />

      {/* Sections */}
      <div className="relative space-y-6">
        {skillTreeSections.map((section, sectionIndex) => {
          const isLocked = isSectionLocked(sectionIndex, skillTreeSections, masteredTrickIds);
          const isExpanded = expandedSections.has(section.id);

          // Calculate section progress
          const sectionTrickIds = section.categories.flatMap((c) => c.trickIds);
          const sectionProgress = getCategoryProgress(sectionTrickIds, masteredTrickIds);
          const isSectionComplete = sectionProgress.percentage === 100;

          // Previous section complete check for checkpoint
          const prevSection = sectionIndex > 0 ? skillTreeSections[sectionIndex - 1] : undefined;
          const isPrevSectionComplete =
            sectionIndex > 0 &&
            prevSection !== undefined &&
            getCategoryProgress(
              prevSection.categories.flatMap((c) => c.trickIds),
              masteredTrickIds
            ).percentage === 100;

          return (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: sectionIndex * 0.1 }}
            >
              {/* Section Header */}
              <SectionHeader
                name={section.name}
                isLocked={isLocked}
                isExpanded={isExpanded}
                onToggle={() => !isLocked && toggleSection(section.id)}
                progress={{
                  completed: sectionProgress.completed,
                  total: sectionProgress.total,
                }}
              />

              {/* Section Content */}
              <AnimatePresence>
                {isExpanded && !isLocked && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <CategoryRow
                      categories={section.categories}
                      masteredTrickIds={masteredTrickIds}
                      inProgressTrickIds={inProgressTrickIds}
                      isLocked={isLocked}
                      {...(onTrickSelect ? { onTrickSelect } : {})}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Checkpoint (after each section except the last) */}
              {section.checkpointXp && sectionIndex < skillTreeSections.length - 1 && (
                <div className="flex justify-center py-4">
                  <ConnectingPath
                    direction="down"
                    state={isSectionComplete ? "completed" : isPrevSectionComplete ? "active" : "locked"}
                    length={40}
                  />
                </div>
              )}
              {section.checkpointXp && sectionIndex < skillTreeSections.length - 1 && (
                <div className="flex justify-center py-2">
                  <CheckpointNode
                    sectionName={section.name}
                    xpReward={section.checkpointXp}
                    isUnlocked={!isLocked && sectionProgress.percentage >= 50}
                    isComplete={isSectionComplete}
                  />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Final achievement */}
      <motion.div
        className="flex flex-col items-center py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="relative">
          <motion.div
            className={cn(
              "w-24 h-24 rounded-full flex items-center justify-center",
              "bg-gradient-to-br from-fun-yellow via-fun-orange to-fun-red",
              "shadow-glow-yellow"
            )}
            animate={{
              boxShadow: [
                "0 0 20px rgba(255, 200, 0, 0.5), 0 0 40px rgba(255, 200, 0, 0.3)",
                "0 0 30px rgba(255, 200, 0, 0.7), 0 0 60px rgba(255, 200, 0, 0.4)",
                "0 0 20px rgba(255, 200, 0, 0.5), 0 0 40px rgba(255, 200, 0, 0.3)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Trophy className="w-12 h-12 text-white" />
          </motion.div>
          {/* Orbiting stars */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2"
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                transformOrigin: "0 0",
              }}
            >
              <Star
                className="w-4 h-4 fill-fun-yellow text-fun-yellow"
                style={{
                  transform: `translate(${40 + i * 10}px, -50%)`,
                }}
              />
            </motion.div>
          ))}
        </div>
        <h3 className="mt-4 text-xl font-black text-gray-900">
          Yo-Yo Master
        </h3>
        <p className="text-sm text-gray-500 text-center max-w-[200px]">
          Complete all tricks to unlock this legendary title!
        </p>
      </motion.div>
    </div>
  );
}

export default SkillTree;
