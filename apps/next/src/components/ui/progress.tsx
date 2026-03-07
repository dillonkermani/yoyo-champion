"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  variant?: "default" | "fun" | "xp" | "streak" | "lesson" | "rainbow";
  size?: "sm" | "default" | "lg" | "xl";
  showValue?: boolean;
  animated?: boolean;
  celebrate?: boolean;
  sparkle?: boolean;
}

const progressVariants = {
  default: "bg-gray-400",
  fun: "bg-gradient-to-r from-fun-blue to-fun-blue-light",
  xp: "bg-gradient-to-r from-xp to-xp-light",
  streak: "bg-gradient-to-r from-fun-red to-fun-orange",
  lesson: "bg-gradient-to-r from-fun-blue to-fun-blue-light",
  rainbow: "bg-gradient-to-r from-fun-red via-fun-yellow via-fun-blue to-fun-blue-light",
};

const sizeVariants = {
  sm: "h-2",
  default: "h-3",
  lg: "h-4",
  xl: "h-6",
};

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(
  (
    {
      className,
      value = 0,
      variant = "fun",
      size = "default",
      showValue = false,
      animated = true,
      celebrate = false,
      sparkle = false,
      ...props
    },
    ref
  ) => {
    const percentage = Math.min(100, Math.max(0, value || 0));
    const isComplete = percentage >= 100;
    const [showCelebration, setShowCelebration] = React.useState(false);

    React.useEffect(() => {
      if (isComplete && celebrate) {
        setShowCelebration(true);
        const timer = setTimeout(() => setShowCelebration(false), 2000);
        return () => clearTimeout(timer);
      }
      return undefined;
    }, [isComplete, celebrate]);

    return (
      <div className={cn("w-full", showValue && "space-y-2")}>
        {showValue && (
          <div className="flex justify-between text-sm font-bold">
            <span className="text-muted-foreground">Progress</span>
            <motion.span
              className={cn(
                isComplete ? "text-fun-blue" : "text-brand-black"
              )}
              animate={isComplete && celebrate ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              {percentage}%
            </motion.span>
          </div>
        )}
        <ProgressPrimitive.Root
          ref={ref}
          className={cn(
            "relative w-full overflow-hidden rounded-full bg-gray-200",
            sizeVariants[size],
            isComplete && celebrate && "progress-complete",
            className
          )}
          {...props}
        >
          {animated ? (
            <motion.div
              className={cn(
                "h-full w-full flex-1 rounded-full relative",
                progressVariants[variant],
                sparkle && "progress-shine"
              )}
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {/* Shine effect */}
              {percentage > 0 && (
                <div className="absolute inset-0 overflow-hidden rounded-full">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    initial={{ x: "-100%" }}
                    animate={{ x: "200%" }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 1,
                      ease: "linear",
                    }}
                  />
                </div>
              )}

              {/* Sparkle at the end */}
              {sparkle && percentage > 5 && (
                <motion.div
                  className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [1, 0.5, 1],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              )}
            </motion.div>
          ) : (
            <ProgressPrimitive.Indicator
              className={cn(
                "h-full w-full flex-1 rounded-full transition-transform duration-300",
                progressVariants[variant]
              )}
              style={{ transform: `translateX(-${100 - percentage}%)` }}
            />
          )}
        </ProgressPrimitive.Root>

        {/* Celebration effect */}
        <AnimatePresence>
          {showCelebration && (
            <motion.div
              className="flex justify-center mt-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <span className="text-fun-blue font-bold text-sm">Complete!</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);
Progress.displayName = ProgressPrimitive.Root.displayName;

// XP Progress Bar with animation
export interface XPProgressProps {
  currentXP: number;
  maxXP: number;
  level?: number;
  size?: ProgressProps["size"];
  showXP?: boolean;
  animated?: boolean;
}

const XPProgress = React.forwardRef<HTMLDivElement, XPProgressProps>(
  ({ currentXP, maxXP, level, size = "lg", showXP = true, animated = true }, ref) => {
    const percentage = Math.min(100, (currentXP / maxXP) * 100);

    return (
      <div ref={ref} className="w-full space-y-2">
        <div className="flex justify-between items-center">
          {level !== undefined && (
            <div className="flex items-center gap-2">
              <motion.div
                className="w-8 h-8 rounded-full bg-gradient-to-br from-xp to-xp-light flex items-center justify-center shadow-fun-yellow"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <span className="text-sm font-bold text-brand-black">{level}</span>
              </motion.div>
              <span className="font-bold text-brand-black">Level {level}</span>
            </div>
          )}
          {showXP && (
            <span className="text-sm font-bold text-xp-dark">
              {currentXP} / {maxXP} XP
            </span>
          )}
        </div>
        <div className={cn(
          "relative w-full overflow-hidden rounded-full bg-gray-200",
          sizeVariants[size]
        )}>
          {animated ? (
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-xp to-xp-light relative progress-shine"
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            />
          ) : (
            <div
              className="h-full rounded-full bg-gradient-to-r from-xp to-xp-light"
              style={{ width: `${percentage}%` }}
            />
          )}
        </div>
      </div>
    );
  }
);
XPProgress.displayName = "XPProgress";

// Streak Progress
export interface StreakProgressProps {
  currentStreak: number;
  targetStreak?: number;
  size?: ProgressProps["size"];
  animated?: boolean;
}

const StreakProgress = React.forwardRef<HTMLDivElement, StreakProgressProps>(
  ({ currentStreak, targetStreak = 7, size = "default", animated = true }, ref) => {
    const percentage = Math.min(100, (currentStreak / targetStreak) * 100);

    return (
      <div ref={ref} className="w-full space-y-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <motion.span
              className="text-2xl"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
            >
              {currentStreak > 0 ? "&#128293;" : "&#10052;"}
            </motion.span>
            <span className="font-bold text-brand-black">{currentStreak} day streak!</span>
          </div>
          <span className="text-sm text-muted-foreground">
            Goal: {targetStreak} days
          </span>
        </div>
        <div className={cn(
          "relative w-full overflow-hidden rounded-full bg-fun-red/20",
          sizeVariants[size]
        )}>
          {animated ? (
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-fun-red to-fun-orange"
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            />
          ) : (
            <div
              className="h-full rounded-full bg-gradient-to-r from-fun-red to-fun-orange"
              style={{ width: `${percentage}%` }}
            />
          )}
        </div>
      </div>
    );
  }
);
StreakProgress.displayName = "StreakProgress";

// Multi-segment progress for skill trees or level progress
export interface MultiProgressProps {
  segments: Array<{
    value: number;
    variant?: ProgressProps["variant"];
    label?: string;
  }>;
  size?: ProgressProps["size"];
  className?: string;
  animated?: boolean;
}

const MultiProgress = React.forwardRef<HTMLDivElement, MultiProgressProps>(
  ({ segments, size = "default", className, animated = true }, ref) => {
    const total = segments.reduce((acc, seg) => acc + seg.value, 0);

    return (
      <div
        ref={ref}
        className={cn(
          "relative w-full overflow-hidden rounded-full bg-gray-200 flex",
          sizeVariants[size],
          className
        )}
      >
        {segments.map((segment, index) => {
          const width = (segment.value / total) * 100;
          const variant = segment.variant || "fun";

          if (animated) {
            return (
              <motion.div
                key={index}
                className={cn(
                  "h-full",
                  progressVariants[variant],
                  index === 0 && "rounded-l-full",
                  index === segments.length - 1 && "rounded-r-full"
                )}
                initial={{ width: 0 }}
                animate={{ width: `${width}%` }}
                transition={{
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                  delay: index * 0.1,
                }}
                title={segment.label}
              />
            );
          }

          return (
            <div
              key={index}
              className={cn(
                "h-full transition-all duration-300",
                progressVariants[variant],
                index === 0 && "rounded-l-full",
                index === segments.length - 1 && "rounded-r-full"
              )}
              style={{ width: `${width}%` }}
              title={segment.label}
            />
          );
        })}
      </div>
    );
  }
);
MultiProgress.displayName = "MultiProgress";

// Circular progress indicator
export interface CircularProgressProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  variant?: "fun" | "xp" | "streak" | "lesson";
  showValue?: boolean;
  className?: string;
  animated?: boolean;
  celebrate?: boolean;
}

const strokeColors: Record<string, string> = {
  fun: "stroke-fun-blue",
  xp: "stroke-xp",
  streak: "stroke-fun-red",
  lesson: "stroke-fun-blue",
};

const CircularProgress = React.forwardRef<SVGSVGElement, CircularProgressProps>(
  (
    {
      value = 0,
      size = 80,
      strokeWidth = 8,
      variant = "fun",
      showValue = true,
      className,
      animated = true,
      celebrate = false,
    },
    ref
  ) => {
    const percentage = Math.min(100, Math.max(0, value));
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (percentage / 100) * circumference;
    const isComplete = percentage >= 100;

    return (
      <div className={cn("relative inline-flex items-center justify-center", className)}>
        <svg
          ref={ref}
          width={size}
          height={size}
          className="transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            className="stroke-gray-200 fill-none"
          />
          {/* Progress circle */}
          {animated ? (
            <motion.circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              strokeWidth={strokeWidth}
              className={cn("fill-none", strokeColors[variant])}
              strokeLinecap="round"
              initial={{ strokeDasharray: circumference, strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            />
          ) : (
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              strokeWidth={strokeWidth}
              className={cn("fill-none transition-all duration-300", strokeColors[variant])}
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
            />
          )}
        </svg>
        {showValue && (
          <motion.span
            className={cn(
              "absolute text-lg font-bold",
              isComplete ? "text-fun-blue" : "text-brand-black"
            )}
            animate={isComplete && celebrate ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.3 }}
          >
            {percentage}%
          </motion.span>
        )}

        {/* Celebration ring */}
        {isComplete && celebrate && (
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-fun-blue"
            initial={{ scale: 1, opacity: 0.8 }}
            animate={{ scale: 1.3, opacity: 0 }}
            transition={{ duration: 0.6, repeat: 2 }}
          />
        )}
      </div>
    );
  }
);
CircularProgress.displayName = "CircularProgress";

// Lesson progress dots (like Duolingo)
export interface LessonDotsProps {
  total: number;
  completed: number;
  current?: number;
  size?: "sm" | "default" | "lg";
}

const dotSizes = {
  sm: "w-2 h-2",
  default: "w-3 h-3",
  lg: "w-4 h-4",
};

const LessonDots = React.forwardRef<HTMLDivElement, LessonDotsProps>(
  ({ total, completed, current, size = "default" }, ref) => {
    return (
      <div ref={ref} className="flex items-center gap-2">
        {Array.from({ length: total }).map((_, index) => {
          const isCompleted = index < completed;
          const isCurrent = index === current;

          return (
            <motion.div
              key={index}
              className={cn(
                "rounded-full transition-all duration-200",
                dotSizes[size],
                isCompleted && "bg-fun-blue",
                isCurrent && "bg-xp ring-2 ring-xp/30",
                !isCompleted && !isCurrent && "bg-gray-300"
              )}
              initial={isCompleted ? { scale: 0 } : {}}
              animate={isCompleted ? { scale: 1 } : {}}
              transition={{ delay: index * 0.05, type: "spring", stiffness: 500 }}
            />
          );
        })}
      </div>
    );
  }
);
LessonDots.displayName = "LessonDots";

export {
  Progress,
  XPProgress,
  StreakProgress,
  MultiProgress,
  CircularProgress,
  LessonDots,
};
