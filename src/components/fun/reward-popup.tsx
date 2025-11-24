"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export type RewardType = "xp" | "streak" | "badge" | "level" | "custom";

export interface Reward {
  id: string;
  type: RewardType;
  value: string | number;
  label?: string;
  icon?: React.ReactNode;
  color?: string;
}

export interface RewardPopupProps {
  /** Array of rewards to display */
  rewards: Reward[];
  /** Position on screen */
  position?: "top" | "center" | "bottom";
  /** Callback when all rewards have been shown */
  onComplete?: () => void;
  /** Time each reward stays visible (ms) */
  displayDuration?: number;
  /** Stagger delay between rewards (ms) */
  staggerDelay?: number;
  /** Container className */
  className?: string;
}

const rewardConfig: Record<RewardType, { defaultColor: string; defaultLabel: string; icon: string }> = {
  xp: {
    defaultColor: "text-fun-blue",
    defaultLabel: "XP",
    icon: "star",
  },
  streak: {
    defaultColor: "text-orange-500",
    defaultLabel: "Day Streak",
    icon: "fire",
  },
  badge: {
    defaultColor: "text-yellow-500",
    defaultLabel: "Badge Earned",
    icon: "medal",
  },
  level: {
    defaultColor: "text-brand-blue",
    defaultLabel: "Level Up",
    icon: "arrow-up",
  },
  custom: {
    defaultColor: "text-brand-black",
    defaultLabel: "",
    icon: "gift",
  },
};

function RewardIcon({ type, className }: { type: RewardType; className?: string }) {
  const iconClass = cn("w-4 h-4 sm:w-5 sm:h-5", className);

  switch (type) {
    case "xp":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L14.09 8.26L20.18 9.27L15.54 13.14L16.82 19.02L12 16.27L7.18 19.02L8.46 13.14L3.82 9.27L9.91 8.26L12 2Z" />
        </svg>
      );
    case "streak":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C12 2 8 6 8 12C8 15.31 10.69 18 14 18C15.5 18 16.87 17.43 17.89 16.5C16.91 19.63 13.77 22 10 22C5.58 22 2 18.42 2 14C2 8.27 7 2.5 12 2Z" />
        </svg>
      );
    case "badge":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
        </svg>
      );
    case "level":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 4L20 12L12 20L4 12L12 4ZM12 8.83L7.41 12L12 15.17L16.59 12L12 8.83Z" />
        </svg>
      );
    default:
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 7H17.83L17 4.4C16.74 3.56 15.93 3 15 3H9C8.07 3 7.26 3.56 7 4.4L6.17 7H4C2.9 7 2 7.9 2 9V21C2 22.1 2.9 23 4 23H20C21.1 23 22 22.1 22 21V9C22 7.9 21.1 7 20 7Z" />
        </svg>
      );
  }
}

function SingleRewardPopup({
  reward,
  index,
  displayDuration,
  staggerDelay,
  position,
  onAnimationComplete,
}: {
  reward: Reward;
  index: number;
  displayDuration: number;
  staggerDelay: number;
  position: "top" | "center" | "bottom";
  onAnimationComplete: () => void;
}) {
  const config = rewardConfig[reward.type];
  const colorClass = reward.color ?? config.defaultColor;
  const label = reward.label ?? config.defaultLabel;

  const positionY = position === "top" ? -20 : position === "bottom" ? 20 : 0;

  return (
    <motion.div
      className={cn(
        "flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white shadow-elevated",
        "border border-border/50 backdrop-blur-sm"
      )}
      initial={{
        opacity: 0,
        y: positionY + 20,
        scale: 0.8,
      }}
      animate={{
        opacity: 1,
        y: positionY - index * 50,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        y: positionY - 50 - index * 50,
        scale: 0.8,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 25,
        delay: index * (staggerDelay / 1000),
      }}
      onAnimationComplete={() => {
        // Trigger exit after display duration
        setTimeout(onAnimationComplete, displayDuration);
      }}
    >
      {reward.icon ?? <RewardIcon type={reward.type} className={colorClass} />}
      <span className={cn("font-bold text-base sm:text-lg", colorClass)}>
        {typeof reward.value === "number" ? `+${reward.value}` : reward.value}
      </span>
      {label && (
        <span className="text-xs sm:text-sm text-muted-foreground">{label}</span>
      )}
    </motion.div>
  );
}

export function RewardPopup({
  rewards,
  position = "center",
  onComplete,
  displayDuration = 2000,
  staggerDelay = 300,
  className,
}: RewardPopupProps) {
  const [visibleRewards, setVisibleRewards] = React.useState<Reward[]>([]);
  const completedCountRef = React.useRef(0);

  React.useEffect(() => {
    setVisibleRewards(rewards);
    completedCountRef.current = 0;
  }, [rewards]);

  const handleAnimationComplete = React.useCallback(() => {
    completedCountRef.current += 1;
    if (completedCountRef.current >= rewards.length) {
      setVisibleRewards([]);
      onComplete?.();
    }
  }, [rewards.length, onComplete]);

  const positionClass = {
    top: "top-16 sm:top-20",
    center: "top-1/2 -translate-y-1/2",
    bottom: "bottom-24 sm:bottom-20",
  }[position];

  return (
    <div
      className={cn(
        "fixed left-1/2 -translate-x-1/2 z-50 pointer-events-none w-full max-w-sm sm:max-w-md px-4 sm:px-0",
        positionClass,
        className
      )}
    >
      <AnimatePresence mode="sync">
        {visibleRewards.map((reward, index) => (
          <SingleRewardPopup
            key={reward.id}
            reward={reward}
            index={index}
            displayDuration={displayDuration}
            staggerDelay={staggerDelay}
            position={position}
            onAnimationComplete={handleAnimationComplete}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

// Hook for managing reward popups
export function useRewardPopup() {
  const [rewards, setRewards] = React.useState<Reward[]>([]);
  const idCounter = React.useRef(0);

  const showReward = React.useCallback((reward: Omit<Reward, "id">) => {
    const id = `reward-${idCounter.current++}`;
    setRewards((prev) => [...prev, { ...reward, id }]);
  }, []);

  const showXP = React.useCallback((value: number) => {
    showReward({ type: "xp", value });
  }, [showReward]);

  const showStreak = React.useCallback((days: number) => {
    showReward({ type: "streak", value: days, label: "Day Streak" });
  }, [showReward]);

  const showBadge = React.useCallback((name: string) => {
    showReward({ type: "badge", value: name });
  }, [showReward]);

  const showLevelUp = React.useCallback((level: number) => {
    showReward({ type: "level", value: `Level ${level}!` });
  }, [showReward]);

  const clearRewards = React.useCallback(() => {
    setRewards([]);
  }, []);

  return {
    rewards,
    showReward,
    showXP,
    showStreak,
    showBadge,
    showLevelUp,
    clearRewards,
    RewardPopupComponent: () => (
      <RewardPopup rewards={rewards} onComplete={clearRewards} />
    ),
  };
}

// Preset reward popup variants
export function XPRewardPopup({
  value,
  onComplete,
}: {
  value: number;
  onComplete?: () => void;
}) {
  return (
    <RewardPopup
      rewards={[{ id: "xp", type: "xp", value }]}
      {...(onComplete ? { onComplete } : {})}
    />
  );
}

export function StreakRewardPopup({
  days,
  onComplete,
}: {
  days: number;
  onComplete?: () => void;
}) {
  return (
    <RewardPopup
      rewards={[{ id: "streak", type: "streak", value: days, label: "Day Streak" }]}
      {...(onComplete ? { onComplete } : {})}
    />
  );
}

export function MultiRewardPopup({
  xp,
  streakDays,
  badge,
  onComplete,
}: {
  xp?: number;
  streakDays?: number;
  badge?: string;
  onComplete?: () => void;
}) {
  const rewards: Reward[] = [];

  if (xp) {
    rewards.push({ id: "xp", type: "xp", value: xp });
  }
  if (streakDays) {
    rewards.push({ id: "streak", type: "streak", value: streakDays, label: "Day Streak" });
  }
  if (badge) {
    rewards.push({ id: "badge", type: "badge", value: badge });
  }

  return <RewardPopup rewards={rewards} {...(onComplete ? { onComplete } : {})} />;
}

export default RewardPopup;
