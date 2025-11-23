"use client";

import * as React from "react";
import { motion } from "framer-motion";
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

// Rarity colors and styling
const rarityConfig = {
  common: {
    bg: "bg-gray-100",
    border: "border-gray-200",
    text: "text-gray-600",
    glow: "rgba(107, 114, 128, 0.3)",
    label: "Common",
    iconBg: "bg-gray-200",
  },
  uncommon: {
    bg: "bg-green-50",
    border: "border-green-200",
    text: "text-green-700",
    glow: "rgba(34, 197, 94, 0.3)",
    label: "Uncommon",
    iconBg: "bg-green-100",
  },
  rare: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-700",
    glow: "rgba(59, 130, 246, 0.4)",
    label: "Rare",
    iconBg: "bg-blue-100",
  },
  epic: {
    bg: "bg-purple-50",
    border: "border-purple-200",
    text: "text-purple-700",
    glow: "rgba(147, 51, 234, 0.4)",
    label: "Epic",
    iconBg: "bg-purple-100",
  },
  legendary: {
    bg: "bg-gradient-to-br from-yellow-50 to-amber-50",
    border: "border-brand-gold",
    text: "text-amber-700",
    glow: "rgba(251, 191, 36, 0.5)",
    label: "Legendary",
    iconBg: "bg-gradient-to-br from-brand-gold to-yellow-400",
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

export const BadgeCard = React.forwardRef<HTMLDivElement, BadgeCardProps>(
  (
    {
      badge,
      isLocked = false,
      lockedDescription,
      className,
      onClick,
      showDetails = true,
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = React.useState(false);

    // Locked state
    if (isLocked || !badge) {
      return (
        <motion.div
          ref={ref}
          className={cn(
            "relative p-4 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50",
            "cursor-pointer transition-colors hover:border-gray-300 hover:bg-gray-100",
            className
          )}
          onClick={onClick}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
              <HelpCircle className="w-8 h-8 text-gray-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-400">Locked Badge</p>
              {lockedDescription && (
                <p className="text-xs text-gray-400 mt-1">{lockedDescription}</p>
              )}
            </div>
            <Lock className="absolute top-2 right-2 w-4 h-4 text-gray-400" />
          </div>
        </motion.div>
      );
    }

    const rarity = rarityConfig[badge.rarity];
    const IconComponent = badgeIcons[badge.icon] || Star;

    return (
      <motion.div
        ref={ref}
        className={cn(
          "relative p-4 rounded-xl border-2 transition-all cursor-pointer",
          rarity.bg,
          rarity.border,
          className
        )}
        onClick={onClick}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{
          scale: 1.02,
          boxShadow: `0 8px 30px ${rarity.glow}`,
        }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Rarity indicator */}
        <div className="absolute top-2 right-2">
          <span
            className={cn(
              "px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase",
              rarity.text,
              badge.rarity === "legendary"
                ? "bg-gradient-to-r from-brand-gold/20 to-yellow-200/50"
                : "bg-white/50"
            )}
          >
            {rarity.label}
          </span>
        </div>

        <div className="flex flex-col items-center gap-3 text-center">
          {/* Badge icon */}
          <motion.div
            className={cn(
              "w-16 h-16 rounded-full flex items-center justify-center",
              rarity.iconBg,
              badge.rarity === "legendary" && "text-brand-black"
            )}
            animate={
              isHovered
                ? {
                    rotate: [0, -10, 10, 0],
                    scale: [1, 1.1, 1],
                  }
                : {}
            }
            transition={{ duration: 0.5 }}
          >
            <IconComponent
              className={cn(
                "w-8 h-8",
                badge.rarity === "legendary" ? "text-brand-black" : rarity.text
              )}
            />
          </motion.div>

          {/* Badge name */}
          <div>
            <h4 className="font-semibold text-brand-black">{badge.name}</h4>
            <p className="text-xs text-muted-foreground mt-0.5">{badge.description}</p>
          </div>

          {/* Details */}
          {showDetails && (
            <div className="w-full pt-3 border-t border-current/10 space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Category</span>
                <span className={rarity.text}>{categoryLabels[badge.category]}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Unlocked</span>
                <span className="text-brand-black">{formatDate(badge.unlockedAt)}</span>
              </div>
            </div>
          )}
        </div>

        {/* Legendary shine effect */}
        {badge.rarity === "legendary" && (
          <motion.div
            className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none"
            initial={false}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
              animate={{ x: ["-200%", "200%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
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
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center gap-1.5 px-2 py-1 rounded-full border",
          rarity.bg,
          rarity.border,
          className
        )}
      >
        <IconComponent className={cn("w-3.5 h-3.5", rarity.text)} />
        <span className={cn("text-xs font-medium", rarity.text)}>{badge.name}</span>
      </div>
    );
  }
);
MiniBadge.displayName = "MiniBadge";

export { rarityConfig, badgeIcons, categoryLabels };
