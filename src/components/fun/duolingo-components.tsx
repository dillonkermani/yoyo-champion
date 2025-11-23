"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// =============================================================================
// ENCOURAGING MESSAGES - Random messages for different contexts
// =============================================================================

export const ENCOURAGING_MESSAGES = {
  greeting: [
    "You're doing amazing!",
    "Keep spinning!",
    "Ready to level up?",
    "Let's make today epic!",
    "Time to master some tricks!",
    "Your journey continues!",
    "Another day, another trick!",
  ],
  progress: [
    "You're on fire!",
    "Incredible progress!",
    "Look at you go!",
    "Nothing can stop you!",
    "So close to the next level!",
    "Keep that momentum!",
    "You're crushing it!",
  ],
  streak: [
    "Streak master!",
    "You're blazing!",
    "On a roll!",
    "Unstoppable!",
    "Consistency is key!",
    "Keep the fire burning!",
    "Legend in the making!",
  ],
  selection: [
    "Great choice!",
    "Perfect pick!",
    "Love that one!",
    "Excellent decision!",
    "You've got great taste!",
    "Nice selection!",
    "Good eye!",
  ],
  mastery: [
    "Nailed it!",
    "You're a natural!",
    "Trick mastered!",
    "Legendary!",
    "Pure talent!",
    "Absolute legend!",
    "You did it!",
  ],
};

export type MessageCategory = keyof typeof ENCOURAGING_MESSAGES;

export function getRandomMessage(category: MessageCategory): string {
  const messages = ENCOURAGING_MESSAGES[category];
  const randomIndex = Math.floor(Math.random() * messages.length);
  return messages[randomIndex] ?? "Keep going!";
}

// =============================================================================
// STREAK FIRE - Animated streak counter with flames
// =============================================================================

export interface StreakFireProps {
  count: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

const streakSizeMap = {
  sm: { container: "w-12 h-12", text: "text-lg", fire: "text-2xl" },
  md: { container: "w-16 h-16", text: "text-2xl", fire: "text-3xl" },
  lg: { container: "w-20 h-20", text: "text-3xl", fire: "text-4xl" },
};

export function StreakFire({ count, size = "md", showLabel = true, className }: StreakFireProps) {
  const sizeConfig = streakSizeMap[size];
  const isHot = count >= 7;
  const isOnFire = count >= 30;

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <motion.div
        className={cn(
          "relative flex items-center justify-center rounded-full",
          sizeConfig.container,
          isOnFire
            ? "bg-gradient-to-br from-fun-red to-fun-orange"
            : isHot
              ? "bg-gradient-to-br from-fun-orange to-fun-yellow"
              : "bg-gradient-to-br from-fun-yellow/80 to-fun-orange/80"
        )}
        animate={
          count > 0
            ? {
                scale: [1, 1.05, 1],
                rotate: isOnFire ? [-2, 2, -2] : [0, 0, 0],
              }
            : {}
        }
        transition={{ duration: 0.5, repeat: Infinity }}
      >
        <motion.span
          className={sizeConfig.fire}
          animate={{ y: [0, -2, 0] }}
          transition={{ duration: 0.3, repeat: Infinity }}
        >
          {isOnFire ? "🔥" : isHot ? "🔥" : "🔥"}
        </motion.span>
        {/* Flame particles for hot streaks */}
        {isHot && (
          <>
            <motion.span
              className="absolute -top-1 -right-1 text-sm"
              animate={{ opacity: [0, 1, 0], y: [0, -10], scale: [0.5, 1, 0.5] }}
              transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }}
            >
              ✨
            </motion.span>
            <motion.span
              className="absolute -top-2 left-0 text-sm"
              animate={{ opacity: [0, 1, 0], y: [0, -8], scale: [0.5, 1, 0.5] }}
              transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }}
            >
              ✨
            </motion.span>
          </>
        )}
      </motion.div>
      {showLabel && (
        <div className="mt-1 text-center">
          <span className={cn("font-black text-gray-900", sizeConfig.text)}>{count}</span>
          <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">
            {count === 1 ? "Day" : "Days"}
          </p>
        </div>
      )}
    </div>
  );
}

// =============================================================================
// XP BADGE - Gold badge showing XP amount
// =============================================================================

export interface XPBadgeProps {
  amount: number;
  size?: "sm" | "md" | "lg";
  showPlus?: boolean;
  animate?: boolean;
  className?: string;
}

const xpSizeMap = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-3 py-1 text-sm",
  lg: "px-4 py-1.5 text-base",
};

export function XPBadge({ amount, size = "md", showPlus = true, animate = true, className }: XPBadgeProps) {
  return (
    <motion.div
      className={cn(
        "inline-flex items-center gap-1 rounded-full font-black",
        "bg-gradient-to-r from-fun-yellow to-fun-orange text-white",
        "shadow-fun-yellow",
        xpSizeMap[size],
        className
      )}
      initial={animate ? { scale: 0 } : false}
      animate={animate ? { scale: 1 } : {}}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", bounce: 0.5 }}
    >
      <span>⭐</span>
      <span>
        {showPlus && "+"}
        {amount} XP
      </span>
    </motion.div>
  );
}

// =============================================================================
// LEVEL PROGRESS - Circular progress indicator with level
// =============================================================================

export interface LevelProgressProps {
  level: number;
  currentXP: number;
  requiredXP: number;
  size?: number;
  className?: string;
}

export function LevelProgress({ level, currentXP, requiredXP, size = 80, className }: LevelProgressProps) {
  const percentage = Math.min((currentXP / requiredXP) * 100, 100);
  const radius = (size - 8) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg width={size} height={size} className="-rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth={4}
        />
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#FFC800"
          strokeWidth={4}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </svg>
      {/* Level number in center */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          className="text-xl font-black text-white"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", bounce: 0.5 }}
        >
          {level}
        </motion.span>
        <span className="text-[8px] font-bold text-white/70 uppercase tracking-wider">Level</span>
      </div>
    </div>
  );
}

// =============================================================================
// DAILY GOAL - Progress bar for daily/weekly goals
// =============================================================================

export interface DailyGoalProps {
  current: number;
  target: number;
  icon?: "target" | "fire" | "star" | "trophy";
  label?: string;
  className?: string;
}

const goalIcons = {
  target: "🎯",
  fire: "🔥",
  star: "⭐",
  trophy: "🏆",
};

export function DailyGoal({ current, target, icon = "target", label = "Daily Goal", className }: DailyGoalProps) {
  const percentage = Math.min((current / target) * 100, 100);
  const isComplete = current >= target;

  return (
    <motion.div
      className={cn(
        "p-4 rounded-2xl border-2",
        isComplete
          ? "bg-fun-green/10 border-fun-green/30"
          : "bg-white border-gray-200",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <motion.span
            className="text-2xl"
            animate={isComplete ? { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] } : {}}
            transition={{ duration: 0.5 }}
          >
            {goalIcons[icon]}
          </motion.span>
          <span className="font-bold text-gray-900">{label}</span>
        </div>
        <span className={cn("font-black", isComplete ? "text-fun-green" : "text-gray-600")}>
          {current}/{target}
        </span>
      </div>
      <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          className={cn(
            "h-full rounded-full",
            isComplete
              ? "bg-gradient-to-r from-fun-green to-fun-green-light"
              : "bg-gradient-to-r from-fun-blue to-fun-blue-light"
          )}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
      {isComplete && (
        <motion.p
          className="mt-2 text-sm text-fun-green font-bold text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Goal Complete! Amazing work!
        </motion.p>
      )}
    </motion.div>
  );
}

// =============================================================================
// ACHIEVEMENT BADGE - Unlocked achievement display
// =============================================================================

export interface AchievementBadgeProps {
  icon: string;
  name: string;
  description?: string;
  rarity?: "common" | "rare" | "epic" | "legendary";
  unlocked?: boolean;
  className?: string;
}

const rarityConfig = {
  common: {
    bg: "bg-gray-100",
    border: "border-gray-300",
    glow: "",
    text: "text-gray-700",
  },
  rare: {
    bg: "bg-fun-blue/10",
    border: "border-fun-blue/30",
    glow: "shadow-fun-blue",
    text: "text-fun-blue",
  },
  epic: {
    bg: "bg-fun-purple/10",
    border: "border-fun-purple/30",
    glow: "shadow-fun-purple",
    text: "text-fun-purple",
  },
  legendary: {
    bg: "bg-fun-yellow/10",
    border: "border-fun-yellow/30",
    glow: "shadow-fun-yellow",
    text: "text-fun-orange",
  },
};

export function AchievementBadge({
  icon,
  name,
  description,
  rarity = "common",
  unlocked = true,
  className,
}: AchievementBadgeProps) {
  const config = rarityConfig[rarity];

  return (
    <motion.div
      className={cn(
        "relative p-4 rounded-2xl border-2 text-center",
        config.bg,
        config.border,
        unlocked && rarity !== "common" && config.glow,
        !unlocked && "opacity-50 grayscale",
        className
      )}
      whileHover={unlocked ? { scale: 1.05, y: -4 } : {}}
      transition={{ type: "spring", stiffness: 400 }}
    >
      <motion.div
        className="text-4xl mb-2"
        animate={
          unlocked && rarity === "legendary"
            ? { scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }
            : {}
        }
        transition={{ duration: 2, repeat: Infinity }}
      >
        {icon}
      </motion.div>
      <h4 className={cn("font-bold text-sm", config.text)}>{name}</h4>
      {description && <p className="text-xs text-gray-500 mt-1">{description}</p>}
      {!unlocked && (
        <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-gray-900/50">
          <span className="text-2xl">🔒</span>
        </div>
      )}
    </motion.div>
  );
}

// =============================================================================
// STAT CARD - Colorful stat display card
// =============================================================================

export interface StatCardProps {
  icon: string;
  label: string;
  value: string | number;
  color?: "primary" | "xp" | "streak" | "accent" | "blue" | "purple";
  className?: string;
}

const statColorConfig = {
  primary: {
    bg: "bg-fun-green/10",
    border: "border-fun-green/20",
    iconBg: "bg-fun-green/20",
    text: "text-fun-green",
  },
  xp: {
    bg: "bg-fun-yellow/10",
    border: "border-fun-yellow/20",
    iconBg: "bg-fun-yellow/20",
    text: "text-fun-orange",
  },
  streak: {
    bg: "bg-fun-red/10",
    border: "border-fun-red/20",
    iconBg: "bg-fun-red/20",
    text: "text-fun-red",
  },
  accent: {
    bg: "bg-fun-orange/10",
    border: "border-fun-orange/20",
    iconBg: "bg-fun-orange/20",
    text: "text-fun-orange",
  },
  blue: {
    bg: "bg-fun-blue/10",
    border: "border-fun-blue/20",
    iconBg: "bg-fun-blue/20",
    text: "text-fun-blue",
  },
  purple: {
    bg: "bg-fun-purple/10",
    border: "border-fun-purple/20",
    iconBg: "bg-fun-purple/20",
    text: "text-fun-purple",
  },
};

export function StatCard({ icon, label, value, color = "primary", className }: StatCardProps) {
  const config = statColorConfig[color];

  return (
    <motion.div
      className={cn(
        "p-4 rounded-2xl border-2",
        config.bg,
        config.border,
        className
      )}
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ type: "spring", stiffness: 400 }}
    >
      <div className="flex items-center gap-3">
        <div className={cn("w-10 h-10 rounded-full flex items-center justify-center text-xl", config.iconBg)}>
          {icon}
        </div>
        <div>
          <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">{label}</p>
          <p className={cn("text-xl font-black", config.text)}>{value}</p>
        </div>
      </div>
    </motion.div>
  );
}

// =============================================================================
// BOUNCE CARD - Card wrapper with bounce animation
// =============================================================================

export interface BounceCardProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export function BounceCard({ children, delay = 0, className }: BounceCardProps) {
  return (
    <motion.div
      className={cn("rounded-2xl bg-white border-2 border-gray-200 overflow-hidden", className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, type: "spring", bounce: 0.3 }}
      whileHover={{ y: -4, boxShadow: "0 8px 30px rgba(0,0,0,0.08)" }}
    >
      {children}
    </motion.div>
  );
}

// =============================================================================
// CONFETTI BURST - Trigger confetti animation
// =============================================================================

export interface ConfettiBurstProps {
  trigger: boolean;
  duration?: number;
  className?: string;
}

export function ConfettiBurst({ trigger, duration = 2000, className }: ConfettiBurstProps) {
  const [particles, setParticles] = React.useState<
    { id: number; x: number; color: string; delay: number }[]
  >([]);

  React.useEffect(() => {
    if (trigger) {
      const colors = ["#58CC02", "#FF9600", "#FFC800", "#1CB0F6", "#CE82FF", "#FF4B4B"] as const;
      const newParticles = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: 50 + (Math.random() - 0.5) * 100,
        color: colors[Math.floor(Math.random() * colors.length)] ?? "#58CC02",
        delay: Math.random() * 0.3,
      }));
      setParticles(newParticles);

      const timer = setTimeout(() => setParticles([]), duration);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [trigger, duration]);

  return (
    <AnimatePresence>
      {particles.length > 0 && (
        <div className={cn("fixed inset-0 pointer-events-none z-50", className)}>
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute w-3 h-3 rounded-full"
              style={{
                left: `${p.x}%`,
                top: "50%",
                backgroundColor: p.color,
              }}
              initial={{ opacity: 1, y: 0, scale: 1 }}
              animate={{
                opacity: 0,
                y: [0, -200, -100],
                x: [(Math.random() - 0.5) * 200, (Math.random() - 0.5) * 400],
                scale: [1, 0.5],
                rotate: [0, 360 * (Math.random() > 0.5 ? 1 : -1)],
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 1.5,
                delay: p.delay,
                ease: "easeOut",
              }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}

// =============================================================================
// STAR RATING - Visual star difficulty indicator
// =============================================================================

export interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const starSizeMap = {
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-6 h-6",
};

export function StarRating({ rating, maxRating = 5, size = "md", className }: StarRatingProps) {
  const sizeClass = starSizeMap[size];

  return (
    <div className={cn("flex gap-0.5", className)}>
      {Array.from({ length: maxRating }, (_, i) => (
        <motion.svg
          key={i}
          className={cn(sizeClass, i < rating ? "text-fun-yellow" : "text-gray-200")}
          fill="currentColor"
          viewBox="0 0 20 20"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.05, type: "spring", bounce: 0.5 }}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </motion.svg>
      ))}
    </div>
  );
}

// =============================================================================
// NEW BADGE - "NEW!" indicator badge
// =============================================================================

export interface NewBadgeProps {
  className?: string;
}

export function NewBadge({ className }: NewBadgeProps) {
  return (
    <motion.span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-black",
        "bg-fun-blue text-white",
        className
      )}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", bounce: 0.5 }}
    >
      NEW!
    </motion.span>
  );
}

// =============================================================================
// MASTERED BADGE - Checkmark badge for mastered items
// =============================================================================

export interface MasteredBadgeProps {
  className?: string;
}

export function MasteredBadge({ className }: MasteredBadgeProps) {
  return (
    <motion.div
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-black",
        "bg-fun-green text-white",
        className
      )}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", bounce: 0.5 }}
    >
      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
      Mastered
    </motion.div>
  );
}

export default {
  ENCOURAGING_MESSAGES,
  getRandomMessage,
  StreakFire,
  XPBadge,
  LevelProgress,
  DailyGoal,
  AchievementBadge,
  StatCard,
  BounceCard,
  ConfettiBurst,
  StarRating,
  NewBadge,
  MasteredBadge,
};
