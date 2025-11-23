"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Star, Zap, Volume2, PartyPopper } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Achievement } from "@/stores";
import { rarityConfig, badgeIcons } from "./badge-card";

export interface AchievementToastProps {
  achievement: Achievement;
  onDismiss: () => void;
  onClick?: () => void;
  position?: "top" | "bottom";
  duration?: number;
}

// Confetti particle for explosion effect - reduced on mobile
const ConfettiParticle = ({
  delay,
  color,
  startX,
  startY,
}: {
  delay: number;
  color: string;
  startX: number;
  startY: number;
}) => (
  <motion.div
    className="absolute w-2 h-2 sm:w-3 sm:h-3 rounded-sm pointer-events-none"
    style={{
      backgroundColor: color,
      left: `${startX}%`,
      top: `${startY}%`,
    }}
    initial={{ opacity: 1, scale: 1 }}
    animate={{
      y: [(Math.random() - 0.5) * 30, (Math.random() - 0.5) * 120 + 60],
      x: [(Math.random() - 0.5) * 60, (Math.random() - 0.5) * 180],
      rotate: [0, Math.random() * 540 - 270],
      opacity: [1, 1, 0],
      scale: [0, 1.2, 0.4],
    }}
    transition={{
      duration: 1.2,
      delay,
      ease: "easeOut",
    }}
  />
);

// Coin/XP animation
const CoinAnimation = ({ amount }: { amount: number }) => (
  <motion.div
    className="flex items-center gap-1"
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.5, type: "spring" }}
  >
    <motion.div
      className="flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-400 text-yellow-900 font-black text-sm shadow-lg"
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 0.5, repeat: 3 }}
    >
      <motion.div
        animate={{ rotateY: [0, 360] }}
        transition={{ duration: 0.6, repeat: 3 }}
      >
        <Zap className="w-4 h-4 fill-yellow-600" />
      </motion.div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        +{amount} XP
      </motion.span>
    </motion.div>
  </motion.div>
);

// Sound indicator (visual placeholder for sound effect)
const SoundIndicator = () => (
  <motion.div
    className="absolute -top-2 -left-2"
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
    transition={{ duration: 0.8, times: [0, 0.2, 1] }}
  >
    <Volume2 className="w-6 h-6 text-yellow-500" />
  </motion.div>
);

// Confetti colors
const confettiColors = [
  "#FFD700", // Gold
  "#FF6B6B", // Red
  "#4ECDC4", // Teal
  "#A855F7", // Purple
  "#3B82F6", // Blue
  "#F472B6", // Pink
  "#34D399", // Green
];

export const AchievementToast = React.forwardRef<HTMLDivElement, AchievementToastProps>(
  ({ achievement, onDismiss, onClick, position = "top", duration = 6000 }, ref) => {
    const { badge, xpAwarded } = achievement;
    const rarity = rarityConfig[badge.rarity];
    const IconComponent = badgeIcons[badge.icon] || Star;
    const isLegendary = badge.rarity === "legendary";
    const isEpicOrHigher = badge.rarity === "epic" || isLegendary;

    const [showConfetti, setShowConfetti] = React.useState(true);

    // Auto-dismiss timer
    React.useEffect(() => {
      const confettiTimer = setTimeout(() => setShowConfetti(false), 2000);
      const dismissTimer = setTimeout(onDismiss, duration);
      return () => {
        clearTimeout(confettiTimer);
        clearTimeout(dismissTimer);
      };
    }, [duration, onDismiss]);

    const slideDirection = position === "top" ? -100 : 100;

    return (
      <motion.div
        ref={ref}
        className={cn(
          "fixed left-1/2 z-50 w-full max-w-md px-2 sm:px-4",
          position === "top" ? "top-2 sm:top-6" : "bottom-20 sm:bottom-6"
        )}
        initial={{ opacity: 0, y: slideDirection, x: "-50%", scale: 0.8 }}
        animate={{ opacity: 1, y: 0, x: "-50%", scale: 1 }}
        exit={{ opacity: 0, y: slideDirection, x: "-50%", scale: 0.8 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <motion.div
          className={cn(
            "relative overflow-visible rounded-2xl border-3 shadow-2xl cursor-pointer",
            isLegendary
              ? "border-yellow-400 bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50"
              : isEpicOrHigher
              ? "border-purple-400 bg-gradient-to-br from-purple-50 to-violet-50"
              : "border-gray-200 bg-white"
          )}
          onClick={onClick}
          animate={
            isLegendary
              ? {
                  boxShadow: [
                    "0 0 20px 5px rgba(251, 191, 36, 0.3)",
                    "0 0 40px 15px rgba(251, 191, 36, 0.5)",
                    "0 0 20px 5px rgba(251, 191, 36, 0.3)",
                  ],
                }
              : {}
          }
          transition={{ duration: 1, repeat: Infinity }}
        >
          {/* Sound indicator */}
          <SoundIndicator />

          {/* Confetti explosion - reduced count on mobile for performance */}
          <AnimatePresence>
            {showConfetti && (
              <div className="absolute inset-0 overflow-visible pointer-events-none">
                {Array.from({ length: 20 }).map((_, i) => (
                  <ConfettiParticle
                    key={i}
                    delay={i * 0.03}
                    color={confettiColors[i % confettiColors.length]!}
                    startX={40 + Math.random() * 20}
                    startY={40 + Math.random() * 20}
                  />
                ))}
              </div>
            )}
          </AnimatePresence>

          {/* Glow effect */}
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              background: `radial-gradient(circle at 30% 50%, ${rarity.glow} 0%, transparent 70%)`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          {/* Content */}
          <div className="relative p-3 sm:p-5">
            <div className="flex items-start gap-3 sm:gap-4">
              {/* Badge icon with glow */}
              <motion.div
                className={cn(
                  "relative w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center flex-shrink-0 shadow-xl",
                  rarity.iconBg
                )}
                initial={{ scale: 0, rotate: -180 }}
                animate={{
                  scale: 1,
                  rotate: 0,
                  boxShadow: [
                    `0 0 0 0 ${rarity.glow}`,
                    `0 0 30px 15px ${rarity.glow}`,
                    `0 0 20px 10px ${rarity.glow}`,
                  ],
                }}
                transition={{
                  scale: { type: "spring", stiffness: 400, delay: 0.2 },
                  rotate: { type: "spring", stiffness: 200, delay: 0.2 },
                  boxShadow: { duration: 1.5, repeat: 3 },
                }}
              >
                {/* Glossy effect */}
                <div className="absolute inset-1 rounded-full bg-gradient-to-b from-white/40 to-transparent" />

                <IconComponent
                  className={cn(
                    "w-6 h-6 sm:w-8 sm:h-8 relative z-10",
                    isLegendary || badge.rarity === "epic" ? "text-white" : rarity.text
                  )}
                />

                {/* Sparkle particles for legendary */}
                {isLegendary && (
                  <>
                    <motion.div
                      className="absolute -top-2 -right-2"
                      animate={{ rotate: 360, scale: [1, 1.3, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Sparkles className="w-5 h-5 text-yellow-400" />
                    </motion.div>
                    <motion.div
                      className="absolute -bottom-1 -left-1"
                      animate={{ rotate: -360, scale: [1, 1.3, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    >
                      <Sparkles className="w-4 h-4 text-yellow-400" />
                    </motion.div>
                  </>
                )}
              </motion.div>

              {/* Text content */}
              <div className="flex-1 min-w-0">
                <motion.div
                  className="flex items-center gap-2 mb-1"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <PartyPopper className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
                  <span className="text-xs sm:text-sm font-black text-yellow-600 uppercase tracking-wider">
                    Achievement Unlocked!
                  </span>
                </motion.div>

                <motion.h4
                  className="text-base sm:text-xl font-black text-gray-900 truncate"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {badge.name}
                </motion.h4>

                <motion.div
                  className="flex items-center gap-3 mt-2"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <span
                    className={cn(
                      "text-xs font-bold px-2.5 py-1 rounded-full",
                      rarity.text,
                      isLegendary
                        ? "bg-yellow-200"
                        : isEpicOrHigher
                        ? "bg-purple-100"
                        : "bg-gray-100"
                    )}
                  >
                    {rarity.label}
                  </span>
                  <CoinAnimation amount={xpAwarded} />
                </motion.div>
              </div>

              {/* Close button */}
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  onDismiss();
                }}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5 text-gray-400" />
              </motion.button>
            </div>

            {/* Progress bar showing auto-dismiss */}
            <motion.div
              className="absolute bottom-0 left-0 h-1.5 rounded-b-2xl"
              style={{
                background: `linear-gradient(90deg, ${rarity.glowColor} 0%, ${rarity.glowColor}88 100%)`,
              }}
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: duration / 1000, ease: "linear" }}
            />
          </div>

          {/* Shine effect for legendary */}
          {isLegendary && (
            <motion.div className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12"
                animate={{ x: ["-200%", "200%"] }}
                transition={{ duration: 1.5, ease: "easeInOut", repeat: 2 }}
              />
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    );
  }
);
AchievementToast.displayName = "AchievementToast";

// Container for stacking multiple achievement toasts
export interface AchievementToastStackProps {
  achievements: Achievement[];
  onDismiss: (achievementId: string) => void;
  onAchievementClick?: (achievement: Achievement) => void;
  position?: "top" | "bottom";
}

export const AchievementToastStack: React.FC<AchievementToastStackProps> = ({
  achievements,
  onDismiss,
  onAchievementClick,
  position = "top",
}) => {
  return (
    <div
      className={cn(
        "fixed left-0 right-0 z-50 flex flex-col items-center pointer-events-none",
        position === "top" ? "top-0" : "bottom-0"
      )}
    >
      <AnimatePresence mode="popLayout">
        {achievements.map((achievement, index) => (
          <motion.div
            key={achievement.id}
            layout
            className="pointer-events-auto"
            style={{
              marginTop: position === "top" ? (index > 0 ? "-70px" : 0) : 0,
              marginBottom: position === "bottom" ? (index > 0 ? "-70px" : 0) : 0,
              zIndex: achievements.length - index,
              opacity: index > 2 ? 0 : 1 - index * 0.2,
              scale: 1 - index * 0.05,
            }}
          >
            <AchievementToast
              achievement={achievement}
              onDismiss={() => onDismiss(achievement.id)}
              onClick={() => onAchievementClick?.(achievement)}
              position={position}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
