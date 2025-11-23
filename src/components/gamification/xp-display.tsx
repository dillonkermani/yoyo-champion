"use client";

import * as React from "react";
import { motion, AnimatePresence, useSpring, useTransform } from "framer-motion";
import { Sparkles, Crown, Star, TrendingUp, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGamificationStore, selectLevel, selectLevelProgress } from "@/stores";

export interface XPDisplayProps {
  variant?: "compact" | "full";
  className?: string;
  showLevelUpAnimation?: boolean;
  xpGained?: number; // For showing floating +XP animation
}

// Sparkle particle component
const SparkleParticle = ({ delay, x, y }: { delay: number; x: number; y: number }) => (
  <motion.div
    className="absolute pointer-events-none"
    style={{
      left: `${x}%`,
      top: `${y}%`,
    }}
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: [0, 1, 0],
      scale: [0, 1.5, 0],
      rotate: [0, 180],
    }}
    transition={{
      duration: 1.5,
      delay,
      repeat: Infinity,
      repeatDelay: Math.random() * 2,
    }}
  >
    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
  </motion.div>
);

// Animated counter hook
const useAnimatedCounter = (value: number, duration: number = 0.5) => {
  const spring = useSpring(0, { duration: duration * 1000, bounce: 0 });
  const display = useTransform(spring, (current) => Math.round(current).toLocaleString());

  React.useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  return display;
};

// Floating XP animation
const FloatingXP = ({ amount, onComplete }: { amount: number; onComplete: () => void }) => (
  <motion.div
    className="absolute top-0 left-1/2 -translate-x-1/2 flex items-center gap-1 font-bold text-lg text-yellow-500 z-20"
    initial={{ opacity: 0, y: 0, scale: 0.5 }}
    animate={{ opacity: [0, 1, 1, 0], y: -60, scale: [0.5, 1.2, 1, 0.8] }}
    transition={{ duration: 1.2, ease: "easeOut" }}
    onAnimationComplete={onComplete}
  >
    <Zap className="w-5 h-5 fill-yellow-500" />
    <span>+{amount} XP</span>
  </motion.div>
);

// Level badge component with crown/star and glow effect
const LevelBadge = React.forwardRef<
  HTMLDivElement,
  { level: number; size?: "sm" | "md" | "lg"; isLevelingUp?: boolean; className?: string }
>(({ level, size = "md", isLevelingUp = false, className }, ref) => {
  const sizeClasses = {
    sm: "w-10 h-10 text-sm",
    md: "w-14 h-14 text-lg",
    lg: "w-20 h-20 text-2xl",
  };

  const crownSizes = {
    sm: "w-4 h-4 -top-2",
    md: "w-5 h-5 -top-3",
    lg: "w-7 h-7 -top-4",
  };

  return (
    <motion.div
      ref={ref}
      className={cn(
        "relative rounded-full flex items-center justify-center font-black",
        "bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-600",
        "text-white shadow-2xl",
        sizeClasses[size],
        className
      )}
      animate={
        isLevelingUp
          ? {
              scale: [1, 1.3, 1],
              rotate: [0, -5, 5, 0],
            }
          : {
              boxShadow: [
                "0 0 20px 5px rgba(251, 191, 36, 0.3)",
                "0 0 30px 10px rgba(251, 191, 36, 0.5)",
                "0 0 20px 5px rgba(251, 191, 36, 0.3)",
              ],
            }
      }
      transition={
        isLevelingUp
          ? { duration: 0.6, ease: "easeOut" }
          : { duration: 2, repeat: Infinity, ease: "easeInOut" }
      }
      style={{
        textShadow: "0 2px 4px rgba(0,0,0,0.3)",
      }}
    >
      {/* Crown icon on top */}
      <motion.div
        className={cn("absolute left-1/2 -translate-x-1/2", crownSizes[size])}
        animate={{ rotate: [-5, 5, -5], y: [0, -2, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <Crown className="w-full h-full text-yellow-300 fill-yellow-400 drop-shadow-lg" />
      </motion.div>

      {/* Level number */}
      <span className="relative z-10">{level}</span>

      {/* Inner shine */}
      <div className="absolute inset-1 rounded-full bg-gradient-to-b from-white/30 to-transparent" />

      {/* Pulse rings on level up */}
      {isLevelingUp && (
        <>
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-yellow-400"
            initial={{ scale: 1, opacity: 1 }}
            animate={{ scale: 2.5, opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-yellow-400"
            initial={{ scale: 1, opacity: 1 }}
            animate={{ scale: 2.5, opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          />
        </>
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
      backgroundColor: ["#FFD700", "#4ECDC4", "#FF6B6B", "#A855F7", "#3B82F6"][
        Math.floor(Math.random() * 5)
      ],
      left: `${x}%`,
      top: "50%",
    }}
    initial={{ y: 0, opacity: 1, scale: 1 }}
    animate={{
      y: [-30, -100],
      x: [(Math.random() - 0.5) * 150],
      opacity: [1, 0],
      scale: [1, 0],
      rotate: [0, Math.random() * 720],
    }}
    transition={{ duration: 1.5, delay, ease: "easeOut" }}
  />
);

// XP Progress bar with gradient and shine effect
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
  <div className="w-full space-y-1.5 sm:space-y-2">
    <div className="flex justify-between text-xs sm:text-sm">
      <span className="text-muted-foreground font-medium">
        {current.toLocaleString()} / {required.toLocaleString()} XP
      </span>
      <motion.span
        className="text-yellow-600 font-bold"
        key={percentage}
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 0.3 }}
      >
        {Math.round(percentage)}%
      </motion.span>
    </div>
    <div className="relative h-3 sm:h-4 rounded-full bg-gray-100 overflow-hidden shadow-inner">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-30">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 w-px bg-gray-200"
            style={{ left: `${(i + 1) * 5}%` }}
          />
        ))}
      </div>

      {/* Progress fill */}
      {animated ? (
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            background: "linear-gradient(90deg, #FCD34D 0%, #F59E0B 50%, #D97706 100%)",
          }}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Animated shine */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear", repeatDelay: 0.5 }}
          />
          {/* Top highlight */}
          <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/40 to-transparent rounded-t-full" />
        </motion.div>
      ) : (
        <div
          className="absolute inset-y-0 left-0 rounded-full transition-all duration-300"
          style={{
            width: `${percentage}%`,
            background: "linear-gradient(90deg, #FCD34D 0%, #F59E0B 50%, #D97706 100%)",
          }}
        />
      )}

      {/* Glowing tip */}
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-lg"
        style={{ left: `calc(${Math.min(percentage, 98)}% - 6px)` }}
        animate={{
          boxShadow: [
            "0 0 5px 2px rgba(251, 191, 36, 0.5)",
            "0 0 15px 5px rgba(251, 191, 36, 0.8)",
            "0 0 5px 2px rgba(251, 191, 36, 0.5)",
          ],
        }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
    </div>
  </div>
);

export const XPDisplay = React.forwardRef<HTMLDivElement, XPDisplayProps>(
  ({ variant = "full", className, showLevelUpAnimation = false, xpGained }, ref) => {
    const level = useGamificationStore(selectLevel);
    const levelProgress = useGamificationStore(selectLevelProgress);
    const lifetimeXp = useGamificationStore((state) => state.lifetimeXp);

    const [isLevelingUp, setIsLevelingUp] = React.useState(false);
    const [showConfetti, setShowConfetti] = React.useState(false);
    const [showFloatingXP, setShowFloatingXP] = React.useState(false);
    const [floatingXPAmount, setFloatingXPAmount] = React.useState(0);

    const animatedXP = useAnimatedCounter(lifetimeXp, 0.8);

    // Trigger floating XP animation
    React.useEffect(() => {
      if (xpGained && xpGained > 0) {
        setFloatingXPAmount(xpGained);
        setShowFloatingXP(true);
      }
    }, [xpGained]);

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
        <div ref={ref} className={cn("flex items-center gap-3", className)}>
          <LevelBadge level={level} size="sm" isLevelingUp={isLevelingUp} />
          <div className="flex flex-col">
            <span className="text-xs font-bold text-gray-800">Level {level}</span>
            <div className="w-24 h-2 rounded-full bg-gray-100 overflow-hidden shadow-inner">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: "linear-gradient(90deg, #FCD34D 0%, #F59E0B 100%)",
                }}
                initial={{ width: 0 }}
                animate={{ width: `${(levelProgress.current / levelProgress.required) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </div>
      );
    }

    return (
      <motion.div
        ref={ref}
        className={cn(
          "relative p-4 sm:p-6 rounded-2xl border-2 border-yellow-200 bg-gradient-to-br from-yellow-50 to-amber-50 overflow-hidden",
          className
        )}
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {/* Sparkle particles - reduced on mobile for performance */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 5 }).map((_, i) => (
            <SparkleParticle
              key={i}
              delay={i * 0.4}
              x={10 + Math.random() * 80}
              y={10 + Math.random() * 80}
            />
          ))}
        </div>

        {/* Confetti effect - reduced count for mobile */}
        <AnimatePresence>
          {showConfetti && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {Array.from({ length: 15 }).map((_, i) => (
                <ConfettiParticle key={i} delay={i * 0.04} x={Math.random() * 100} />
              ))}
            </div>
          )}
        </AnimatePresence>

        {/* Floating XP animation */}
        <AnimatePresence>
          {showFloatingXP && (
            <FloatingXP
              amount={floatingXPAmount}
              onComplete={() => setShowFloatingXP(false)}
            />
          )}
        </AnimatePresence>

        <div className="relative flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-5">
          <LevelBadge level={level} size="md" isLevelingUp={isLevelingUp} className="sm:hidden" />
          <LevelBadge level={level} size="lg" isLevelingUp={isLevelingUp} className="hidden sm:flex" />

          <div className="flex-1 space-y-3 sm:space-y-4 w-full">
            <div className="flex flex-col sm:flex-row items-center sm:items-center sm:justify-between gap-2 sm:gap-0">
              <div className="text-center sm:text-left">
                <motion.h3
                  className="text-lg sm:text-xl font-black text-gray-900"
                  animate={isLevelingUp ? { scale: [1, 1.1, 1] } : {}}
                >
                  Level {level}
                </motion.h3>
                <p className="text-xs sm:text-sm text-gray-600">
                  {levelProgress.isMaxLevel
                    ? "Max Level Reached!"
                    : `${(levelProgress.required - levelProgress.current).toLocaleString()} XP to next level`}
                </p>
              </div>

              {/* Large animated XP display */}
              <div className="flex items-center gap-2">
                <motion.div
                  className="flex items-center gap-1 sm:gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  <motion.span className="text-lg sm:text-xl font-black text-white">
                    {animatedXP}
                  </motion.span>
                  <span className="text-xs sm:text-sm font-bold text-yellow-100">XP</span>
                </motion.div>
              </div>
            </div>

            <XPProgressBar
              current={levelProgress.current}
              required={levelProgress.required}
              percentage={(levelProgress.current / levelProgress.required) * 100}
            />

            {/* Next level preview */}
            {!levelProgress.isMaxLevel && (
              <motion.div
                className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>Next: Level {level + 1}</span>
                <span className="text-[10px] sm:text-xs px-1.5 py-0.5 sm:px-2 rounded-full bg-yellow-100 text-yellow-700 font-medium">
                  +New Rewards
                </span>
              </motion.div>
            )}
          </div>
        </div>

        {/* Level up glow effect */}
        <AnimatePresence>
          {isLevelingUp && (
            <motion.div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              initial={{ boxShadow: "0 0 0 0 rgba(251, 191, 36, 0)" }}
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(251, 191, 36, 0)",
                  "0 0 60px 20px rgba(251, 191, 36, 0.6)",
                  "0 0 30px 10px rgba(251, 191, 36, 0.3)",
                ],
              }}
              exit={{ boxShadow: "0 0 0 0 rgba(251, 191, 36, 0)" }}
              transition={{ duration: 0.8 }}
            />
          )}
        </AnimatePresence>
      </motion.div>
    );
  }
);
XPDisplay.displayName = "XPDisplay";

export { LevelBadge, XPProgressBar };
