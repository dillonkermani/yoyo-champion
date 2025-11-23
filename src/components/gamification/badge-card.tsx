"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Flame,
  Star,
  Trophy,
  Crown,
  Map,
  Compass,
  Clock,
  Zap,
  Lock,
  HelpCircle,
  Users,
  Gift,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Badge, BadgeCategory } from "@/stores";

export interface BadgeCardProps {
  badge: Badge | null;
  isLocked?: boolean;
  lockedDescription?: string;
  className?: string;
  onClick?: () => void;
  showDetails?: boolean;
  isNew?: boolean;
}

// Badge icon mapping
const badgeIcons: Record<string, React.ElementType> = {
  flame: Flame,
  star: Star,
  trophy: Trophy,
  crown: Crown,
  map: Map,
  compass: Compass,
  clock: Clock,
  zap: Zap,
  users: Users,
  gift: Gift,
};

// Rarity colors and styling - Duolingo style
const rarityConfig = {
  common: {
    bg: "bg-gradient-to-br from-gray-50 to-gray-100",
    border: "border-gray-200",
    text: "text-gray-600",
    glow: "rgba(107, 114, 128, 0.3)",
    glowColor: "#6B7280",
    label: "Common",
    iconBg: "bg-gradient-to-br from-gray-200 to-gray-300",
    ringColor: "ring-gray-300",
  },
  uncommon: {
    bg: "bg-gradient-to-br from-green-50 to-emerald-100",
    border: "border-green-300",
    text: "text-green-700",
    glow: "rgba(34, 197, 94, 0.4)",
    glowColor: "#22C55E",
    label: "Uncommon",
    iconBg: "bg-gradient-to-br from-green-400 to-emerald-500",
    ringColor: "ring-green-400",
  },
  rare: {
    bg: "bg-gradient-to-br from-blue-50 to-indigo-100",
    border: "border-blue-400",
    text: "text-blue-700",
    glow: "rgba(59, 130, 246, 0.5)",
    glowColor: "#3B82F6",
    label: "Rare",
    iconBg: "bg-gradient-to-br from-blue-400 to-indigo-500",
    ringColor: "ring-blue-400",
  },
  epic: {
    bg: "bg-gradient-to-br from-purple-50 to-violet-100",
    border: "border-purple-400",
    text: "text-purple-700",
    glow: "rgba(147, 51, 234, 0.5)",
    glowColor: "#9333EA",
    label: "Epic",
    iconBg: "bg-gradient-to-br from-purple-400 to-violet-600",
    ringColor: "ring-purple-400",
  },
  legendary: {
    bg: "bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50",
    border: "border-yellow-400",
    text: "text-amber-700",
    glow: "rgba(251, 191, 36, 0.6)",
    glowColor: "#FBBF24",
    label: "Legendary",
    iconBg: "bg-gradient-to-br from-yellow-400 via-amber-400 to-orange-500",
    ringColor: "ring-yellow-400",
  },
};

// Category labels
const categoryLabels: Record<BadgeCategory, string> = {
  streak: "Streak",
  mastery: "Mastery",
  explorer: "Explorer",
  social: "Social",
  milestone: "Milestone",
  special: "Special",
};

// Format date for display
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

// Sparkle animation for legendary badges
const LegendarySparkle = ({ delay }: { delay: number }) => (
  <motion.div
    className="absolute pointer-events-none"
    style={{
      left: `${20 + Math.random() * 60}%`,
      top: `${20 + Math.random() * 60}%`,
    }}
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
      rotate: [0, 180],
    }}
    transition={{
      duration: 1.5,
      delay,
      repeat: Infinity,
      repeatDelay: Math.random() * 2,
    }}
  >
    <Sparkles className="w-4 h-4 text-yellow-400" />
  </motion.div>
);

// Rainbow border animation for legendary
const RainbowBorder = () => (
  <motion.div
    className="absolute inset-0 rounded-2xl pointer-events-none"
    style={{
      background: "linear-gradient(90deg, #f59e0b, #ef4444, #8b5cf6, #3b82f6, #10b981, #f59e0b)",
      backgroundSize: "300% 100%",
      padding: "3px",
      WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
      WebkitMaskComposite: "xor",
      maskComposite: "exclude",
    }}
    animate={{
      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
    }}
    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
  />
);

export const BadgeCard = React.forwardRef<HTMLDivElement, BadgeCardProps>(
  (
    {
      badge,
      isLocked = false,
      lockedDescription,
      className,
      onClick,
      showDetails = true,
      isNew = false,
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = React.useState(false);
    const [showUnlockAnimation, setShowUnlockAnimation] = React.useState(false);

    // Simulate unlock animation on mount if isNew
    React.useEffect(() => {
      if (isNew) {
        setShowUnlockAnimation(true);
        const timer = setTimeout(() => setShowUnlockAnimation(false), 2000);
        return () => clearTimeout(timer);
      }
      return undefined;
    }, [isNew]);

    // Locked state - grayscale with lock icon
    if (isLocked || !badge) {
      return (
        <motion.div
          ref={ref}
          className={cn(
            "relative p-5 rounded-2xl border-2 border-dashed border-gray-300 bg-gray-100",
            "cursor-pointer transition-all",
            className
          )}
          onClick={onClick}
          whileHover={{ scale: 1.02, borderColor: "#9CA3AF" }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="relative w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
              <HelpCircle className="w-10 h-10 text-gray-400" />
              <motion.div
                className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-gray-300 flex items-center justify-center"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Lock className="w-4 h-4 text-gray-500" />
              </motion.div>
            </div>
            <div>
              <p className="text-sm font-bold text-gray-400">Locked Badge</p>
              {lockedDescription && (
                <p className="text-xs text-gray-400 mt-1">{lockedDescription}</p>
              )}
            </div>
          </div>
        </motion.div>
      );
    }

    const rarity = rarityConfig[badge.rarity];
    const IconComponent = badgeIcons[badge.icon] || Star;
    const isLegendary = badge.rarity === "legendary";
    const isEpicOrHigher = badge.rarity === "epic" || isLegendary;

    return (
      <motion.div
        ref={ref}
        className={cn(
          "relative p-4 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer overflow-hidden min-h-[180px] sm:min-h-[200px]",
          rarity.bg,
          rarity.border,
          className
        )}
        onClick={onClick}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        initial={showUnlockAnimation ? { scale: 0, rotate: -180 } : {}}
        animate={
          showUnlockAnimation
            ? { scale: [0, 1.2, 1], rotate: [180, 0] }
            : {
                boxShadow: isHovered
                  ? `0 10px 40px ${rarity.glow}`
                  : `0 4px 20px ${rarity.glow}`,
              }
        }
        whileHover={{ scale: 1.03, y: -5 }}
        whileTap={{ scale: 0.98 }}
        transition={showUnlockAnimation ? { type: "spring", stiffness: 300, damping: 15 } : {}}
      >
        {/* Rainbow border for legendary */}
        {isLegendary && <RainbowBorder />}

        {/* Sparkles for legendary badges */}
        {isLegendary && (
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 5 }).map((_, i) => (
              <LegendarySparkle key={i} delay={i * 0.4} />
            ))}
          </div>
        )}

        {/* NEW! badge indicator */}
        <AnimatePresence>
          {isNew && (
            <motion.div
              className="absolute -top-2 -right-2 z-10"
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 30 }}
            >
              <motion.div
                className="px-3 py-1 rounded-full bg-red-500 text-white text-xs font-black shadow-lg"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                NEW!
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Rarity indicator */}
        <div className="absolute top-2 right-2 sm:top-3 sm:right-3">
          <motion.span
            className={cn(
              "px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-wide",
              rarity.text,
              isLegendary
                ? "bg-gradient-to-r from-yellow-200 to-amber-200"
                : isEpicOrHigher
                ? "bg-white/80"
                : "bg-white/60"
            )}
            animate={isLegendary ? { scale: [1, 1.05, 1] } : {}}
            transition={{ duration: 1, repeat: Infinity }}
          >
            {rarity.label}
          </motion.span>
        </div>

        <div className="flex flex-col items-center gap-3 sm:gap-4 text-center">
          {/* Badge icon with glow */}
          <motion.div
            className={cn(
              "relative w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center shadow-lg",
              rarity.iconBg,
              isLegendary && "text-white"
            )}
            animate={
              isHovered
                ? {
                    rotate: [0, -10, 10, 0],
                    scale: [1, 1.1, 1],
                  }
                : isLegendary
                ? {
                    boxShadow: [
                      `0 0 20px 5px ${rarity.glow}`,
                      `0 0 40px 15px ${rarity.glow}`,
                      `0 0 20px 5px ${rarity.glow}`,
                    ],
                  }
                : {}
            }
            transition={isHovered ? { duration: 0.5 } : { duration: 2, repeat: Infinity }}
          >
            {/* Glossy shine effect */}
            <div className="absolute inset-1 rounded-full bg-gradient-to-b from-white/40 to-transparent" />

            <IconComponent
              className={cn(
                "w-8 h-8 sm:w-10 sm:h-10 relative z-10",
                isLegendary || badge.rarity === "epic" ? "text-white" : rarity.text
              )}
            />

            {/* Outer ring glow for epic+ */}
            {isEpicOrHigher && (
              <motion.div
                className={cn("absolute inset-[-4px] rounded-full ring-4", rarity.ringColor)}
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            )}
          </motion.div>

          {/* Badge name */}
          <div>
            <h4 className="font-black text-gray-900 text-base sm:text-lg">{badge.name}</h4>
            <p className="text-[11px] sm:text-xs text-gray-600 mt-1 leading-relaxed line-clamp-2">{badge.description}</p>
          </div>

          {/* Details */}
          {showDetails && (
            <div className="w-full pt-2 sm:pt-3 border-t border-current/10 space-y-1.5 sm:space-y-2">
              <div className="flex items-center justify-between text-[11px] sm:text-xs">
                <span className="text-gray-500 font-medium">Category</span>
                <span className={cn("font-bold", rarity.text)}>
                  {categoryLabels[badge.category]}
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px] sm:text-xs">
                <span className="text-gray-500 font-medium">Unlocked</span>
                <span className="font-bold text-gray-700">{formatDate(badge.unlockedAt)}</span>
              </div>
            </div>
          )}
        </div>

        {/* Shine sweep effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none"
          initial={false}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12"
            animate={isHovered ? { x: ["-200%", "200%"] } : {}}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Continuous shine for legendary */}
        {isLegendary && (
          <motion.div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
              animate={{ x: ["-200%", "200%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
            />
          </motion.div>
        )}
      </motion.div>
    );
  }
);
BadgeCard.displayName = "BadgeCard";

// Mini badge for inline display
export interface MiniBadgeProps {
  badge: Badge;
  className?: string;
}

export const MiniBadge = React.forwardRef<HTMLDivElement, MiniBadgeProps>(
  ({ badge, className }, ref) => {
    const rarity = rarityConfig[badge.rarity];
    const IconComponent = badgeIcons[badge.icon] || Star;

    return (
      <motion.div
        ref={ref}
        className={cn(
          "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border-2 shadow-sm",
          rarity.bg,
          rarity.border,
          className
        )}
        whileHover={{ scale: 1.05 }}
      >
        <IconComponent className={cn("w-4 h-4", rarity.text)} />
        <span className={cn("text-xs font-bold", rarity.text)}>{badge.name}</span>
      </motion.div>
    );
  }
);
MiniBadge.displayName = "MiniBadge";

export { rarityConfig, badgeIcons, categoryLabels };
