"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Star, Zap } from "lucide-react";
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

// Sound effect for achievement (would be actual audio in production)
const playAchievementSound = () => {
  // In production, this would play an actual sound
  // For now, we'll just log it
  console.log("Achievement unlocked sound");
};

export const AchievementToast = React.forwardRef<HTMLDivElement, AchievementToastProps>(
  ({ achievement, onDismiss, onClick, position = "top", duration = 5000 }, ref) => {
    const { badge, xpAwarded } = achievement;
    const rarity = rarityConfig[badge.rarity];
    const IconComponent = badgeIcons[badge.icon] || Star;

    // Auto-dismiss timer
    React.useEffect(() => {
      playAchievementSound();
      const timer = setTimeout(onDismiss, duration);
      return () => clearTimeout(timer);
    }, [duration, onDismiss]);

    const slideDirection = position === "top" ? -100 : 100;

    return (
      <motion.div
        ref={ref}
        className={cn(
          "fixed left-1/2 z-50 w-full max-w-sm px-4",
          position === "top" ? "top-4" : "bottom-4"
        )}
        initial={{ opacity: 0, y: slideDirection, x: "-50%" }}
        animate={{ opacity: 1, y: 0, x: "-50%" }}
        exit={{ opacity: 0, y: slideDirection, x: "-50%" }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        <div
          className={cn(
            "relative overflow-hidden rounded-xl border-2 shadow-lg cursor-pointer",
            rarity.border,
            "bg-white"
          )}
          onClick={onClick}
        >
          {/* Glow effect */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background: `radial-gradient(circle at 30% 50%, ${rarity.glow} 0%, transparent 70%)`,
            }}
          />

          {/* Content */}
          <div className="relative p-4">
            <div className="flex items-start gap-4">
              {/* Badge icon with glow */}
              <motion.div
                className={cn(
                  "relative w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0",
                  rarity.iconBg
                )}
                animate={{
                  boxShadow: [
                    `0 0 0 0 ${rarity.glow}`,
                    `0 0 20px 8px ${rarity.glow}`,
                    `0 0 0 0 ${rarity.glow}`,
                  ],
                }}
                transition={{ duration: 1.5, repeat: 2 }}
              >
                <IconComponent
                  className={cn(
                    "w-7 h-7",
                    badge.rarity === "legendary" ? "text-brand-black" : rarity.text
                  )}
                />
                {/* Sparkle particles */}
                {badge.rarity === "legendary" && (
                  <>
                    <motion.div
                      className="absolute -top-1 -right-1"
                      animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Sparkles className="w-4 h-4 text-brand-gold" />
                    </motion.div>
                    <motion.div
                      className="absolute -bottom-1 -left-1"
                      animate={{ rotate: -360, scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    >
                      <Sparkles className="w-3 h-3 text-brand-gold" />
                    </motion.div>
                  </>
                )}
              </motion.div>

              {/* Text content */}
              <div className="flex-1 min-w-0">
                <motion.p
                  className="text-xs font-semibold text-brand-gold uppercase tracking-wider"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Achievement Unlocked!
                </motion.p>
                <motion.h4
                  className="text-lg font-bold text-brand-black truncate"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {badge.name}
                </motion.h4>
                <motion.div
                  className="flex items-center gap-2 mt-1"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full", rarity.text, "bg-current/10")}>
                    {rarity.label}
                  </span>
                  <span className="text-xs text-brand-gold font-semibold flex items-center gap-1">
                    <Zap className="w-3 h-3" />
                    +{xpAwarded} XP
                  </span>
                </motion.div>
              </div>

              {/* Close button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDismiss();
                }}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            {/* Progress bar showing auto-dismiss */}
            <motion.div
              className="absolute bottom-0 left-0 h-1 bg-brand-gold/30"
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: duration / 1000, ease: "linear" }}
            />
          </div>

          {/* Shine effect for legendary */}
          {badge.rarity === "legendary" && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={false}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12"
                animate={{ x: ["-200%", "200%"] }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            </motion.div>
          )}
        </div>
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
              marginTop: position === "top" ? (index > 0 ? "-60px" : 0) : 0,
              marginBottom: position === "bottom" ? (index > 0 ? "-60px" : 0) : 0,
              zIndex: achievements.length - index,
              opacity: index > 2 ? 0 : 1 - index * 0.15,
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
