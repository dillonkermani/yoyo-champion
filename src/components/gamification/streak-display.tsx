"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Flame,
  Snowflake,
  AlertTriangle,
  Calendar,
  Trophy,
  PartyPopper,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useProgressStore, selectCurrentStreak, selectLongestStreak } from "@/stores";

export interface StreakDisplayProps {
  variant?: "compact" | "full";
  className?: string;
  showWarning?: boolean;
  streakFreezeAvailable?: boolean;
}

// Fire particle component
const FireParticle = ({ delay, x }: { delay: number; x: number }) => (
  <motion.div
    className="absolute w-2 h-2 rounded-full pointer-events-none"
    style={{
      background: `radial-gradient(circle, ${
        Math.random() > 0.5 ? "#FFA500" : "#FF4500"
      } 0%, transparent 70%)`,
      left: `${x}%`,
      bottom: "20%",
    }}
    initial={{ opacity: 0, y: 0, scale: 0.5 }}
    animate={{
      opacity: [0, 1, 0],
      y: [-10, -40],
      x: [(Math.random() - 0.5) * 20],
      scale: [0.5, 1, 0],
    }}
    transition={{
      duration: 0.8 + Math.random() * 0.4,
      delay,
      repeat: Infinity,
      repeatDelay: Math.random() * 0.5,
    }}
  />
);

// Milestone configurations
const milestones: Record<number, { text: string; emoji: string; color: string }> = {
  7: { text: "Amazing!", emoji: "fire", color: "text-orange-500" },
  14: { text: "On Fire!", emoji: "fire", color: "text-orange-600" },
  30: { text: "Incredible!", emoji: "trophy", color: "text-yellow-500" },
  60: { text: "Unstoppable!", emoji: "trophy", color: "text-yellow-600" },
  100: { text: "LEGENDARY!", emoji: "party", color: "text-purple-500" },
  365: { text: "GODLIKE!", emoji: "party", color: "text-purple-600" },
};

// Get milestone message
const getMilestone = (streak: number) => {
  const keys = Object.keys(milestones)
    .map(Number)
    .sort((a, b) => b - a);
  for (const key of keys) {
    if (streak >= key) return { days: key, ...milestones[key] };
  }
  return null;
};

// Animated flame component - grows with streak
const AnimatedFlame = ({
  streak,
  size = "md",
  className,
}: {
  streak: number;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-24 h-24",
  };

  // Intensity based on streak length
  const intensity = Math.min(streak / 30, 1);
  const flameScale = 1 + intensity * 0.4;
  const isHighStreak = streak >= 7;

  // Fire colors based on streak
  const getFlameColor = () => {
    if (streak === 0) return "text-gray-300";
    if (streak < 7) return "text-orange-400";
    if (streak < 30) return "text-orange-500";
    if (streak < 100) return "text-red-500";
    return "text-red-600";
  };

  return (
    <motion.div
      className={cn("relative flex items-center justify-center", sizeClasses[size], className)}
      animate={{
        scale: [flameScale, flameScale * 1.15, flameScale],
      }}
      transition={{
        duration: 0.4 + (1 - intensity) * 0.3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {/* Fire particles for high streaks */}
      {isHighStreak && (
        <div className="absolute inset-0">
          {Array.from({ length: 6 }).map((_, i) => (
            <FireParticle key={i} delay={i * 0.15} x={30 + Math.random() * 40} />
          ))}
        </div>
      )}

      {/* Outer glow */}
      {streak > 0 && (
        <motion.div
          className="absolute inset-[-50%] rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(circle, rgba(255, 100, 0, ${
              0.2 + intensity * 0.3
            }) 0%, transparent 70%)`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      )}

      {/* Main flame icon */}
      <Flame
        className={cn("w-full h-full transition-colors", getFlameColor())}
        style={{
          filter:
            streak > 0
              ? `drop-shadow(0 0 ${8 + intensity * 16}px rgba(255, 100, 0, ${
                  0.6 + intensity * 0.4
                }))`
              : "none",
        }}
      />

      {/* Inner bright core for high streaks */}
      {streak >= 30 && (
        <motion.div
          className="absolute inset-[30%] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(255, 255, 200, 0.8) 0%, transparent 70%)",
          }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        />
      )}
    </motion.div>
  );
};

// Calendar day indicator with flame
const CalendarDay = ({
  date,
  isActive,
  isToday,
}: {
  date: Date;
  isActive: boolean;
  isToday: boolean;
}) => {
  const dayName = date.toLocaleDateString("en-US", { weekday: "short" }).charAt(0);

  return (
    <div className={cn("flex flex-col items-center gap-0.5 sm:gap-1", isToday && "font-bold")}>
      <span className="text-[9px] sm:text-[10px] text-gray-500 uppercase">{dayName}</span>
      <motion.div
        className={cn(
          "relative w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold",
          isActive
            ? "bg-gradient-to-br from-orange-400 to-red-500 text-white shadow-lg"
            : isToday
            ? "bg-gray-100 text-gray-800 border-2 border-dashed border-orange-400"
            : "bg-gray-100 text-gray-400"
        )}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.2 }}
      >
        {isActive ? (
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-white fill-yellow-300" />
          </motion.div>
        ) : (
          date.getDate()
        )}

        {/* Glow effect for active days */}
        {isActive && (
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              boxShadow: "0 0 15px 5px rgba(255, 100, 0, 0.4)",
            }}
            animate={{
              boxShadow: [
                "0 0 10px 3px rgba(255, 100, 0, 0.3)",
                "0 0 20px 8px rgba(255, 100, 0, 0.5)",
                "0 0 10px 3px rgba(255, 100, 0, 0.3)",
              ],
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
      </motion.div>
    </div>
  );
};

// Get last 7 days including today
const getLast7Days = (): Date[] => {
  const days: Date[] = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    days.push(date);
  }
  return days;
};

// Milestone celebration component
const MilestoneCelebration = ({ milestone }: { milestone: ReturnType<typeof getMilestone> }) => {
  if (!milestone) return null;

  const Icon = milestone.emoji === "trophy" ? Trophy : milestone.emoji === "party" ? PartyPopper : Zap;

  return (
    <motion.div
      className={cn(
        "flex items-center gap-2 px-3 py-1.5 rounded-full",
        "bg-gradient-to-r from-orange-100 to-red-100",
        "border border-orange-200"
      )}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 500, damping: 25 }}
    >
      <motion.div
        animate={{ rotate: [-10, 10, -10], scale: [1, 1.1, 1] }}
        transition={{ duration: 0.5, repeat: Infinity }}
      >
        <Icon className={cn("w-4 h-4", milestone.color)} />
      </motion.div>
      <span className={cn("text-sm font-bold", milestone.color)}>{milestone.text}</span>
    </motion.div>
  );
};

export const StreakDisplay = React.forwardRef<HTMLDivElement, StreakDisplayProps>(
  ({ variant = "full", className, showWarning = true, streakFreezeAvailable = false }, ref) => {
    const currentStreak = useProgressStore(selectCurrentStreak);
    const longestStreak = useProgressStore(selectLongestStreak);
    const lastActivityDate = useProgressStore((state) => state.lastActivityDate);

    // Check if streak is about to break (no activity today)
    const today = new Date().toISOString().split("T")[0] as string;
    const lastActivity = lastActivityDate?.split("T")[0] ?? "";
    const streakAtRisk = currentStreak > 0 && lastActivity !== today;

    const milestone = getMilestone(currentStreak);

    // Simulate active days for calendar
    const last7Days = getLast7Days();
    const activeDays = React.useMemo(() => {
      const active: Set<string> = new Set();
      for (let i = 0; i < Math.min(currentStreak, 7); i++) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        if (i > 0 || lastActivity === today) {
          const dateStr = date.toISOString().split("T")[0];
          if (dateStr) {
            active.add(dateStr);
          }
        }
      }
      return active;
    }, [currentStreak, lastActivity, today]);

    if (variant === "compact") {
      return (
        <motion.div
          ref={ref}
          className={cn("flex items-center gap-2", className)}
          whileHover={{ scale: 1.02 }}
        >
          <AnimatedFlame streak={currentStreak} size="sm" />
          <div className="flex flex-col">
            <span className="text-sm font-black text-gray-900">
              {currentStreak} day{currentStreak !== 1 ? "s" : ""}
            </span>
            <span className="text-[10px] text-gray-500 font-medium">streak</span>
          </div>
          {streakAtRisk && showWarning && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="ml-1"
            >
              <AlertTriangle className="w-4 h-4 text-red-500" />
            </motion.div>
          )}
        </motion.div>
      );
    }

    return (
      <motion.div
        ref={ref}
        className={cn(
          "relative p-4 sm:p-6 rounded-2xl border-2 overflow-hidden",
          streakAtRisk
            ? "border-red-200 bg-gradient-to-br from-red-50 to-orange-50"
            : "border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50",
          className
        )}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Header with flame and streak count */}
        <div className="flex flex-col sm:flex-row items-center sm:items-center sm:justify-between mb-4 gap-3 sm:gap-0">
          <div className="flex items-center gap-3 sm:gap-4">
            <AnimatedFlame streak={currentStreak} size="lg" className="sm:hidden" />
            <AnimatedFlame streak={currentStreak} size="xl" className="hidden sm:flex" />
            <div className="text-center sm:text-left">
              <div className="flex items-baseline gap-1.5 sm:gap-2 justify-center sm:justify-start">
                <motion.span
                  className="text-4xl sm:text-5xl font-black text-gray-900"
                  key={currentStreak}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 500 }}
                >
                  {currentStreak}
                </motion.span>
                <span className="text-lg sm:text-xl font-bold text-gray-500">
                  day{currentStreak !== 1 ? "s" : ""}
                </span>
              </div>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 sm:gap-2 mt-1">
                <span className="text-xs sm:text-sm font-semibold text-orange-600">Current streak</span>
                {milestone && <MilestoneCelebration milestone={milestone} />}
              </div>
            </div>
          </div>

          {/* Longest streak */}
          <div className="text-center sm:text-right">
            <div className="flex items-center justify-center sm:justify-end gap-1 text-gray-500">
              <Trophy className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-500" />
              <span className="text-[10px] sm:text-xs font-medium">Best</span>
            </div>
            <p className="text-xl sm:text-2xl font-black text-gray-800">
              {longestStreak}
              <span className="text-xs sm:text-sm font-medium text-gray-500 ml-1">days</span>
            </p>
          </div>
        </div>

        {/* Streak warning */}
        <AnimatePresence>
          {streakAtRisk && showWarning && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginBottom: 0 }}
              animate={{ opacity: 1, height: "auto", marginBottom: 16 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              className="overflow-hidden"
            >
              <motion.div
                className="flex items-center gap-3 p-4 rounded-xl bg-red-100 border-2 border-red-300"
                animate={{
                  boxShadow: [
                    "0 0 0 0 rgba(239, 68, 68, 0)",
                    "0 0 20px 5px rgba(239, 68, 68, 0.3)",
                    "0 0 0 0 rgba(239, 68, 68, 0)",
                  ],
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1], rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                >
                  <AlertTriangle className="w-6 h-6 text-red-500" />
                </motion.div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-red-700">Your streak is about to break!</p>
                  <p className="text-xs text-red-600">
                    Practice today to keep your {currentStreak}-day streak alive
                  </p>
                </div>
                {streakFreezeAvailable && (
                  <motion.button
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-blue-500 text-white text-sm font-bold shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Snowflake className="w-4 h-4" />
                    Use Freeze
                  </motion.button>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 7-day calendar view */}
        <div className="space-y-2 sm:space-y-3">
          <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-600 font-medium">
            <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Last 7 days</span>
          </div>
          <div className="flex justify-between px-0 sm:px-2">
            {last7Days.map((date) => {
              const dateStr = date.toISOString().split("T")[0] as string;
              return (
                <CalendarDay
                  key={dateStr}
                  date={date}
                  isActive={activeDays.has(dateStr)}
                  isToday={dateStr === today}
                />
              );
            })}
          </div>
        </div>

        {/* Streak freeze indicator */}
        {streakFreezeAvailable && (
          <motion.div
            className="flex items-center gap-2 pt-4 mt-4 border-t border-orange-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Snowflake className="w-5 h-5 text-blue-500" />
            </motion.div>
            <span className="text-sm font-medium text-gray-600">
              1 streak freeze available
            </span>
          </motion.div>
        )}
      </motion.div>
    );
  }
);
StreakDisplay.displayName = "StreakDisplay";

export { AnimatedFlame };
