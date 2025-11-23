"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGamificationStore, selectLevel, selectLevelProgress } from "@/stores";

export interface XPDisplayProps {
  variant?: "compact" | "full";
  className?: string;
  showLevelUpAnimation?: boolean;
}

// Level badge component with glow effect
const LevelBadge = React.forwardRef<
  HTMLDivElement,
  { level: number; size?: "sm" | "md" | "lg"; isLevelingUp?: boolean }
>(({ level, size = "md", isLevelingUp = false }, ref) => {
  const sizeClasses = {
    sm: "w-8 h-8 text-sm",
    md: "w-12 h-12 text-lg",
    lg: "w-16 h-16 text-2xl",
  };

  return (
    <motion.div
      ref={ref}
      className={cn(
        "relative rounded-full flex items-center justify-center font-bold",
        "bg-gradient-to-br from-brand-gold to-yellow-600",
        "text-brand-black shadow-lg",
        sizeClasses[size]
      )}
      animate={
        isLevelingUp
          ? {
              scale: [1, 1.2, 1],
              boxShadow: [
                "0 0 0 0 rgba(251, 191, 36, 0)",
                "0 0 30px 10px rgba(251, 191, 36, 0.6)",
                "0 0 0 0 rgba(251, 191, 36, 0)",
              ],
            }
          : {}
      }
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {level}
      {isLevelingUp && (
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-brand-gold"
          initial={{ scale: 1, opacity: 1 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      )}
    </motion.div>
  );
});
LevelBadge.displayName = "LevelBadge";

// Confetti particle component
const ConfettiParticle = ({ delay, x }: { delay: number; x: number }) => (
  <motion.div
    className="absolute w-2 h-2 rounded-full"
    style={{
      backgroundColor: ["#FFD700", "#4ECDC4", "#3B82F6", "#F59E0B"][
        Math.floor(Math.random() * 4)
      ],
      left: `${x}%`,
      top: "50%",
    }}
    initial={{ y: 0, opacity: 1, scale: 1 }}
    animate={{
      y: [-20, -80],
      x: [0, (Math.random() - 0.5) * 100],
      opacity: [1, 0],
      scale: [1, 0],
      rotate: [0, Math.random() * 360],
    }}
    transition={{ duration: 1, delay, ease: "easeOut" }}
  />
);

// XP Progress bar with animation
const XPProgressBar = ({
  current,
  required,
  percentage,
  animated = true,
}: {
  current: number;
  required: number;
  percentage: number;
  animated?: boolean;
}) => (
  <div className="w-full space-y-1">
    <div className="flex justify-between text-xs">
      <span className="text-muted-foreground">
        {current.toLocaleString()} / {required.toLocaleString()} XP
      </span>
      <span className="text-brand-gold font-medium">{Math.round(percentage)}%</span>
    </div>
    <div className="relative h-2.5 rounded-full bg-surface-secondary overflow-hidden">
      {animated ? (
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-brand-gold to-yellow-400"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />
      ) : (
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-brand-gold to-yellow-400 transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      )}
      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        animate={{ x: ["-100%", "400%"] }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
      />
    </div>
  </div>
);

export const XPDisplay = React.forwardRef<HTMLDivElement, XPDisplayProps>(
  ({ variant = "full", className, showLevelUpAnimation = false }, ref) => {
    const level = useGamificationStore(selectLevel);
    const levelProgress = useGamificationStore(selectLevelProgress);
    const lifetimeXp = useGamificationStore((state) => state.lifetimeXp);

    const [isLevelingUp, setIsLevelingUp] = React.useState(false);
    const [showConfetti, setShowConfetti] = React.useState(false);

    // Trigger level up animation when prop changes
    React.useEffect(() => {
      if (showLevelUpAnimation) {
        setIsLevelingUp(true);
        setShowConfetti(true);
        const timer = setTimeout(() => {
          setIsLevelingUp(false);
          setShowConfetti(false);
        }, 2000);
        return () => clearTimeout(timer);
      }
      return undefined;
    }, [showLevelUpAnimation]);

    if (variant === "compact") {
      return (
        <div
          ref={ref}
          className={cn("flex items-center gap-2", className)}
        >
          <LevelBadge level={level} size="sm" isLevelingUp={isLevelingUp} />
          <div className="flex flex-col">
            <span className="text-xs font-medium text-brand-black">Level {level}</span>
            <div className="w-20 h-1.5 rounded-full bg-surface-secondary overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-brand-gold to-yellow-400"
                initial={{ width: 0 }}
                animate={{ width: `${levelProgress.current / levelProgress.required * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(
          "relative p-6 rounded-xl border border-border bg-white",
          className
        )}
      >
        {/* Confetti effect */}
        {showConfetti && (
          <AnimatePresence>
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {Array.from({ length: 20 }).map((_, i) => (
                <ConfettiParticle key={i} delay={i * 0.05} x={Math.random() * 100} />
              ))}
            </div>
          </AnimatePresence>
        )}

        <div className="flex items-start gap-4">
          <LevelBadge level={level} size="lg" isLevelingUp={isLevelingUp} />

          <div className="flex-1 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-brand-black">Level {level}</h3>
                <p className="text-sm text-muted-foreground">
                  {levelProgress.isMaxLevel ? "Max Level Reached!" : `${levelProgress.required - levelProgress.current} XP to next level`}
                </p>
              </div>
              <div className="flex items-center gap-1 text-brand-gold">
                <Sparkles className="w-4 h-4" />
                <span className="font-semibold">{lifetimeXp.toLocaleString()} XP</span>
              </div>
            </div>

            <XPProgressBar
              current={levelProgress.current}
              required={levelProgress.required}
              percentage={(levelProgress.current / levelProgress.required) * 100}
            />

            {/* Next level preview */}
            {!levelProgress.isMaxLevel && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <TrendingUp className="w-3 h-3" />
                <span>Next: Level {level + 1}</span>
              </div>
            )}
          </div>
        </div>

        {/* Level up glow effect */}
        <AnimatePresence>
          {isLevelingUp && (
            <motion.div
              className="absolute inset-0 rounded-xl pointer-events-none"
              initial={{ boxShadow: "0 0 0 0 rgba(251, 191, 36, 0)" }}
              animate={{ boxShadow: "0 0 40px 10px rgba(251, 191, 36, 0.4)" }}
              exit={{ boxShadow: "0 0 0 0 rgba(251, 191, 36, 0)" }}
              transition={{ duration: 0.5 }}
            />
          )}
        </AnimatePresence>
      </div>
    );
  }
);
XPDisplay.displayName = "XPDisplay";

export { LevelBadge, XPProgressBar };
