"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Star,
  Lock,
  Check,
  Gift,
  Sparkles,
  Circle,
  Target,
  Zap,
  Trophy,
  BookOpen,
  Crown,
} from "lucide-react";
import { cn } from "@/lib/utils";

// =============================================================================
// TYPES
// =============================================================================

export type NodeState = "locked" | "available" | "in-progress" | "completed" | "mastered";
export type NodeVariant = "category" | "trick" | "checkpoint";

export interface SkillNodeProps {
  id: string;
  variant: NodeVariant;
  state: NodeState;
  name: string;
  description?: string;
  icon?: React.ReactNode;
  difficulty?: 1 | 2 | 3 | 4 | 5;
  xpReward?: number;
  progress?: number; // 0-100 for category nodes
  href?: string;
  onClick?: () => void;
  className?: string;
}

// =============================================================================
// CONSTANTS
// =============================================================================

const stateColors = {
  locked: {
    bg: "bg-gray-200",
    border: "border-gray-300",
    text: "text-gray-400",
    glow: "",
    icon: "text-gray-400",
  },
  available: {
    bg: "bg-white",
    border: "border-fun-blue",
    text: "text-gray-900",
    glow: "shadow-fun-blue",
    icon: "text-fun-blue",
  },
  "in-progress": {
    bg: "bg-fun-yellow/10",
    border: "border-fun-yellow",
    text: "text-gray-900",
    glow: "shadow-fun-yellow",
    icon: "text-fun-yellow-dark",
  },
  completed: {
    bg: "bg-fun-blue",
    border: "border-fun-blue-dark",
    text: "text-white",
    glow: "shadow-fun-blue-lg",
    icon: "text-white",
  },
  mastered: {
    bg: "bg-gradient-to-br from-fun-yellow to-fun-orange",
    border: "border-fun-orange",
    text: "text-white",
    glow: "shadow-fun-yellow-lg",
    icon: "text-white",
  },
};

const variantSizes = {
  category: {
    container: "w-20 h-20 md:w-24 md:h-24",
    innerRing: "w-[72px] h-[72px] md:w-[88px] md:h-[88px]",
    icon: "w-8 h-8 md:w-10 md:h-10",
    label: "text-sm md:text-base",
  },
  trick: {
    container: "w-14 h-14 md:w-16 md:h-16",
    innerRing: "w-12 h-12 md:w-14 md:h-14",
    icon: "w-5 h-5 md:w-6 md:h-6",
    label: "text-xs md:text-sm",
  },
  checkpoint: {
    container: "w-16 h-16 md:w-20 md:h-20",
    innerRing: "w-14 h-14 md:w-[72px] md:h-[72px]",
    icon: "w-7 h-7 md:w-8 md:h-8",
    label: "text-sm md:text-base",
  },
};

// =============================================================================
// PROGRESS RING COMPONENT
// =============================================================================

interface ProgressRingProps {
  progress: number;
  size: number;
  strokeWidth?: number;
  className?: string;
}

function ProgressRing({ progress, size, strokeWidth = 4, className }: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <svg
      className={cn("absolute inset-0 -rotate-90", className)}
      width={size}
      height={size}
    >
      {/* Background ring */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        className="text-gray-200"
      />
      {/* Progress ring */}
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        className="text-fun-blue"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
    </svg>
  );
}

// =============================================================================
// DIFFICULTY STARS
// =============================================================================

interface DifficultyStarsProps {
  difficulty: 1 | 2 | 3 | 4 | 5;
  size?: "sm" | "md";
  className?: string;
}

function DifficultyStars({ difficulty, size = "sm", className }: DifficultyStarsProps) {
  const starSize = size === "sm" ? "w-3 h-3" : "w-4 h-4";

  return (
    <div className={cn("flex gap-0.5", className)}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={cn(
            starSize,
            i < difficulty ? "fill-fun-yellow text-fun-yellow" : "fill-gray-200 text-gray-200"
          )}
        />
      ))}
    </div>
  );
}

// =============================================================================
// XP BADGE
// =============================================================================

interface XPBadgeProps {
  amount: number;
  className?: string;
}

function XPBadge({ amount, className }: XPBadgeProps) {
  return (
    <motion.div
      className={cn(
        "absolute -bottom-1 left-1/2 -translate-x-1/2",
        "px-2 py-0.5 rounded-full text-xs font-bold",
        "bg-fun-yellow text-white shadow-fun-yellow",
        "flex items-center gap-0.5",
        className
      )}
      initial={{ scale: 0, y: 10 }}
      animate={{ scale: 1, y: 0 }}
      transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
    >
      <Zap className="w-3 h-3" />
      <span>{amount}</span>
    </motion.div>
  );
}

// =============================================================================
// SPARKLE EFFECTS
// =============================================================================

function SparkleEffects({ active }: { active: boolean }) {
  if (!active) return null;

  return (
    <AnimatePresence>
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.5, 1, 0.5],
            x: [0, (i % 2 === 0 ? 1 : -1) * (15 + i * 5)],
            y: [0, (i < 2 ? -1 : 1) * (15 + i * 3)],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.3,
          }}
          style={{
            top: "50%",
            left: "50%",
          }}
        >
          <Sparkles className="w-3 h-3 text-fun-yellow" />
        </motion.div>
      ))}
    </AnimatePresence>
  );
}

// =============================================================================
// MAIN SKILL NODE COMPONENT
// =============================================================================

export function SkillNode({
  id: _id,
  variant,
  state,
  name,
  description: _description,
  icon,
  difficulty,
  xpReward,
  progress = 0,
  href,
  onClick,
  className,
}: SkillNodeProps) {
  const colors = stateColors[state];
  const sizes = variantSizes[variant];
  const isInteractive = state !== "locked";
  const showProgress = variant === "category" && progress > 0 && progress < 100;
  const showSparkles = state === "mastered" || state === "completed";
  const showXpBadge = variant === "trick" && xpReward && state !== "mastered";

  // Default icons based on variant and state
  const getDefaultIcon = () => {
    if (state === "locked") return <Lock className={cn(sizes.icon, colors.icon)} />;
    if (state === "completed" || state === "mastered") {
      return <Check className={cn(sizes.icon, colors.icon)} strokeWidth={3} />;
    }

    switch (variant) {
      case "category":
        return <BookOpen className={cn(sizes.icon, colors.icon)} />;
      case "trick":
        return <Target className={cn(sizes.icon, colors.icon)} />;
      case "checkpoint":
        return <Gift className={cn(sizes.icon, colors.icon)} />;
      default:
        return <Circle className={cn(sizes.icon, colors.icon)} />;
    }
  };

  const nodeContent = (
    <motion.div
      className={cn(
        "relative flex flex-col items-center gap-2",
        isInteractive && "cursor-pointer",
        className
      )}
      whileHover={isInteractive ? { scale: 1.08 } : {}}
      whileTap={isInteractive ? { scale: 0.95 } : {}}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", bounce: 0.4 }}
    >
      {/* Node Circle */}
      <div className="relative">
        {/* Progress Ring (for category nodes) */}
        {showProgress && (
          <ProgressRing
            progress={progress}
            size={variant === "category" ? 96 : 64}
            strokeWidth={4}
          />
        )}

        {/* Main Node */}
        <motion.div
          className={cn(
            "relative rounded-full flex items-center justify-center",
            "border-4 transition-all duration-300",
            sizes.container,
            colors.bg,
            colors.border,
            isInteractive && colors.glow
          )}
          animate={
            state === "in-progress"
              ? {
                  boxShadow: [
                    "0 0 0 0 rgba(255, 200, 0, 0.4)",
                    "0 0 0 10px rgba(255, 200, 0, 0)",
                  ],
                }
              : state === "available"
                ? {
                    boxShadow: [
                      "0 0 0 0 rgba(88, 204, 2, 0.4)",
                      "0 0 0 8px rgba(88, 204, 2, 0)",
                    ],
                  }
                : {}
          }
          transition={
            state === "in-progress" || state === "available"
              ? { duration: 1.5, repeat: Infinity }
              : {}
          }
        >
          {/* Icon */}
          <motion.div
            animate={
              state === "in-progress"
                ? { scale: [1, 1.1, 1] }
                : state === "mastered"
                  ? { rotate: [0, 5, -5, 0] }
                  : {}
            }
            transition={{ duration: 2, repeat: Infinity }}
          >
            {icon || getDefaultIcon()}
          </motion.div>

          {/* Checkpoint treasure chest animation */}
          {variant === "checkpoint" && state === "completed" && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ duration: 0.5, type: "spring" }}
            >
              <Crown className="w-8 h-8 text-white" />
            </motion.div>
          )}
        </motion.div>

        {/* Sparkle Effects */}
        <SparkleEffects active={showSparkles} />

        {/* XP Badge */}
        {showXpBadge && <XPBadge amount={xpReward} />}

        {/* Mastered Crown */}
        {state === "mastered" && variant === "trick" && (
          <motion.div
            className="absolute -top-2 -right-2"
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, type: "spring", bounce: 0.5 }}
          >
            <div className="w-6 h-6 rounded-full bg-fun-yellow flex items-center justify-center shadow-fun-yellow">
              <Trophy className="w-3.5 h-3.5 text-white" />
            </div>
          </motion.div>
        )}

        {/* Locked Overlay */}
        {state === "locked" && (
          <div className="absolute inset-0 rounded-full bg-gray-900/10" />
        )}
      </div>

      {/* Label */}
      <div className="text-center max-w-[100px]">
        <motion.p
          className={cn(
            "font-bold leading-tight",
            sizes.label,
            state === "locked" ? "text-gray-400" : "text-gray-900"
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {name}
        </motion.p>

        {/* Difficulty Stars (for trick nodes) */}
        {variant === "trick" && difficulty && state !== "locked" && (
          <motion.div
            className="flex justify-center mt-1"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <DifficultyStars difficulty={difficulty} />
          </motion.div>
        )}
      </div>
    </motion.div>
  );

  // Wrap in Link if href is provided and node is interactive
  if (href && isInteractive) {
    return <Link href={href}>{nodeContent}</Link>;
  }

  // Wrap in button if onClick is provided and node is interactive
  if (onClick && isInteractive) {
    return (
      <button onClick={onClick} type="button" className="focus:outline-none">
        {nodeContent}
      </button>
    );
  }

  return nodeContent;
}

// =============================================================================
// CONNECTING PATH COMPONENT
// =============================================================================

export interface ConnectingPathProps {
  direction: "down" | "down-left" | "down-right" | "branch";
  state: "locked" | "active" | "completed";
  length?: number;
  className?: string;
}

export function ConnectingPath({
  direction,
  state,
  length = 60,
  className,
}: ConnectingPathProps) {
  const pathColors = {
    locked: "stroke-gray-300",
    active: "stroke-fun-blue",
    completed: "stroke-fun-blue",
  };

  const getPath = () => {
    switch (direction) {
      case "down":
        return `M 25 0 L 25 ${length}`;
      case "down-left":
        return `M 50 0 Q 25 ${length / 2} 0 ${length}`;
      case "down-right":
        return `M 0 0 Q 25 ${length / 2} 50 ${length}`;
      case "branch":
        return `M 25 0 L 25 ${length / 2} M 0 ${length / 2} L 50 ${length / 2}`;
      default:
        return `M 25 0 L 25 ${length}`;
    }
  };

  return (
    <svg
      className={cn("w-[50px]", className)}
      style={{ height: length }}
      viewBox={`0 0 50 ${length}`}
    >
      {/* Background path */}
      <motion.path
        d={getPath()}
        fill="none"
        strokeWidth={4}
        strokeLinecap="round"
        className="stroke-gray-200"
      />
      {/* Animated path */}
      <motion.path
        d={getPath()}
        fill="none"
        strokeWidth={4}
        strokeLinecap="round"
        strokeDasharray="8 6"
        className={pathColors[state]}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{
          pathLength: state === "completed" ? 1 : state === "active" ? 0.5 : 0,
          opacity: 1,
        }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
      {/* Animated dots for active paths */}
      {state === "active" && (
        <motion.circle
          r={3}
          className="fill-fun-blue"
          animate={{
            offsetDistance: ["0%", "100%"],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            offsetPath: `path("${getPath()}")`,
          }}
        />
      )}
    </svg>
  );
}

export default SkillNode;
