"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, Snowflake, AlertTriangle, Calendar, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useProgressStore, selectCurrentStreak, selectLongestStreak } from "@/stores";

export interface StreakDisplayProps {
  variant?: "compact" | "full";
  className?: string;
  showWarning?: boolean;
  streakFreezeAvailable?: boolean;
}

// Animated flame component - bigger for longer streaks
const AnimatedFlame = ({ streak, size = "md" }: { streak: number; size?: "sm" | "md" | "lg" }) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-14 h-14",
  };

  // Intensity based on streak length
  const intensity = Math.min(streak / 30, 1); // Max intensity at 30 days
  const flameScale = 1 + intensity * 0.3;

  return (
    <motion.div
      className={cn(
        "relative flex items-center justify-center",
        sizeClasses[size]
      )}
      animate={{
        scale: [flameScale, flameScale * 1.1, flameScale],
      }}
      transition={{
        duration: 0.5 + (1 - intensity) * 0.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <Flame
        className={cn(
          "w-full h-full",
          streak === 0
            ? "text-gray-300"
            : streak < 7
            ? "text-orange-400"
            : streak < 30
            ? "text-orange-500"
            : "text-red-500"
        )}
        style={{
          filter: streak > 0 ? `drop-shadow(0 0 ${4 + intensity * 8}px rgba(251, 146, 60, ${0.5 + intensity * 0.5}))` : "none",
        }}
      />
      {/* Inner glow for high streaks */}
      {streak >= 7 && (
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle, rgba(251, 146, 60, ${0.3 * intensity}) 0%, transparent 70%)`,
          }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      )}
    </motion.div>
  );
};

// Calendar day indicator
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
  const dayNum = date.getDate();

  return (
    <div
      className={cn(
        "flex flex-col items-center gap-1",
        isToday && "font-semibold"
      )}
    >
      <span className="text-[10px] text-muted-foreground uppercase">{dayName}</span>
      <motion.div
        className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center text-xs",
          isActive
            ? "bg-brand-teal text-white"
            : isToday
            ? "bg-surface-secondary text-brand-black border-2 border-dashed border-brand-teal"
            : "bg-surface-secondary text-muted-foreground"
        )}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        {isActive ? (
          <Check className="w-4 h-4" />
        ) : (
          dayNum
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

export const StreakDisplay = React.forwardRef<HTMLDivElement, StreakDisplayProps>(
  ({ variant = "full", className, showWarning = true, streakFreezeAvailable = false }, ref) => {
    const currentStreak = useProgressStore(selectCurrentStreak);
    const longestStreak = useProgressStore(selectLongestStreak);
    const lastActivityDate = useProgressStore((state) => state.lastActivityDate);

    // Check if streak is about to break (no activity today)
    const today = new Date().toISOString().split("T")[0] as string;
    const lastActivity = lastActivityDate?.split("T")[0] ?? "";
    const streakAtRisk = currentStreak > 0 && lastActivity !== today;

    // Simulate active days for calendar (in real app, this would come from store)
    const last7Days = getLast7Days();
    const activeDays = React.useMemo(() => {
      // Mark days as active based on streak
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
        <div
          ref={ref}
          className={cn("flex items-center gap-2", className)}
        >
          <AnimatedFlame streak={currentStreak} size="sm" />
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-brand-black">
              {currentStreak} day{currentStreak !== 1 ? "s" : ""}
            </span>
            <span className="text-[10px] text-muted-foreground">streak</span>
          </div>
          {streakAtRisk && showWarning && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="ml-1"
            >
              <AlertTriangle className="w-4 h-4 text-amber-500" />
            </motion.div>
          )}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(
          "p-6 rounded-xl border border-border bg-white space-y-4",
          className
        )}
      >
        {/* Header with flame and streak count */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AnimatedFlame streak={currentStreak} size="lg" />
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-brand-black">
                  {currentStreak}
                </span>
                <span className="text-lg text-muted-foreground">
                  day{currentStreak !== 1 ? "s" : ""}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">Current streak</p>
            </div>
          </div>

          {/* Longest streak */}
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Longest</p>
            <p className="text-lg font-semibold text-brand-black">
              {longestStreak} day{longestStreak !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        {/* Streak warning */}
        <AnimatePresence>
          {streakAtRisk && showWarning && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="flex items-center gap-2 p-3 rounded-lg bg-amber-50 border border-amber-200">
                <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-amber-800">
                    Your streak is about to break!
                  </p>
                  <p className="text-xs text-amber-600">
                    Practice today to keep your {currentStreak}-day streak alive
                  </p>
                </div>
                {streakFreezeAvailable && (
                  <button className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-brand-blue text-brand-black text-xs font-medium hover:bg-brand-blue/80 transition-colors">
                    <Snowflake className="w-3 h-3" />
                    Use Freeze
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 7-day calendar view */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>Last 7 days</span>
          </div>
          <div className="flex justify-between">
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
          <div className="flex items-center gap-2 pt-2 border-t border-border">
            <Snowflake className="w-4 h-4 text-brand-blue" />
            <span className="text-sm text-muted-foreground">
              1 streak freeze available
            </span>
          </div>
        )}
      </div>
    );
  }
);
StreakDisplay.displayName = "StreakDisplay";

export { AnimatedFlame };
