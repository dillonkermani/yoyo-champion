"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Star, ChevronRight, Gift, Unlock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export interface LevelUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  newLevel: number;
  perks?: Array<{
    icon: React.ReactNode;
    title: string;
    description: string;
  }>;
}

// Confetti particle
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
    className="absolute w-3 h-3 rounded-sm"
    style={{
      backgroundColor: color,
      left: `${startX}%`,
      top: `${startY}%`,
    }}
    initial={{ opacity: 1, scale: 1 }}
    animate={{
      y: [0, -50, 200],
      x: [(Math.random() - 0.5) * 50, (Math.random() - 0.5) * 150],
      rotate: [0, Math.random() * 720],
      opacity: [1, 1, 0],
      scale: [1, 1.2, 0.5],
    }}
    transition={{
      duration: 2,
      delay,
      ease: "easeOut",
    }}
  />
);

// Starburst effect
const Starburst = () => (
  <motion.div
    className="absolute inset-0 pointer-events-none"
    initial={{ opacity: 0 }}
    animate={{ opacity: [0, 1, 0] }}
    transition={{ duration: 1, times: [0, 0.2, 1] }}
  >
    {Array.from({ length: 12 }).map((_, i) => (
      <motion.div
        key={i}
        className="absolute left-1/2 top-1/2 w-1 h-20 bg-gradient-to-t from-brand-gold to-transparent origin-bottom"
        style={{
          transform: `rotate(${i * 30}deg) translateY(-50%)`,
        }}
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ scaleY: [0, 1, 0], opacity: [0, 1, 0] }}
        transition={{ duration: 0.8, delay: i * 0.02 }}
      />
    ))}
  </motion.div>
);

// Default perks based on level milestones
const getDefaultPerks = (level: number): LevelUpModalProps["perks"] => {
  const perks: NonNullable<LevelUpModalProps["perks"]> = [];

  if (level === 5) {
    perks.push({
      icon: <Unlock className="w-5 h-5" />,
      title: "Intermediate Tricks",
      description: "Access to intermediate-level tutorials",
    });
  }
  if (level === 10) {
    perks.push({
      icon: <Star className="w-5 h-5" />,
      title: "Custom Profile",
      description: "Unlock profile customization options",
    });
  }
  if (level === 15) {
    perks.push({
      icon: <Gift className="w-5 h-5" />,
      title: "Advanced Tricks",
      description: "Access to advanced-level tutorials",
    });
  }
  if (level === 25) {
    perks.push({
      icon: <Sparkles className="w-5 h-5" />,
      title: "Master Tricks",
      description: "Access to master-level tutorials",
    });
  }

  // Add a generic perk if no specific ones
  if (perks.length === 0 && level % 5 === 0) {
    perks.push({
      icon: <Gift className="w-5 h-5" />,
      title: "Bonus XP",
      description: "Earn 10% bonus XP this week",
    });
  }

  return perks.length > 0 ? perks : undefined;
};

// Confetti colors
const confettiColors = [
  "#FFD700", // Gold
  "#4ECDC4", // Teal
  "#3B82F6", // Blue
  "#F59E0B", // Amber
  "#EC4899", // Pink
  "#8B5CF6", // Purple
];

export const LevelUpModal: React.FC<LevelUpModalProps> = ({
  isOpen,
  onClose,
  newLevel,
  perks: customPerks,
}) => {
  const perks = customPerks || getDefaultPerks(newLevel);
  const [showContent, setShowContent] = React.useState(false);

  // Trigger content animation after initial burst
  React.useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setShowContent(true), 500);
      return () => clearTimeout(timer);
    } else {
      setShowContent(false);
      return undefined;
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="sm:max-w-md overflow-hidden bg-white border-brand-gold/30"
        showClose={false}
      >
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Confetti */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {Array.from({ length: 50 }).map((_, i) => (
                  <ConfettiParticle
                    key={i}
                    delay={Math.random() * 0.5}
                    color={confettiColors[i % confettiColors.length] ?? "#FFD700"}
                    startX={20 + Math.random() * 60}
                    startY={30 + Math.random() * 20}
                  />
                ))}
              </div>

              {/* Starburst */}
              <Starburst />

              {/* Content */}
              <motion.div
                className="relative z-10 flex flex-col items-center text-center py-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                {/* "Level Up" text */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
                  className="mb-4"
                >
                  <span className="text-sm font-semibold text-brand-gold uppercase tracking-widest">
                    Level Up!
                  </span>
                </motion.div>

                {/* Large level number */}
                <motion.div
                  className="relative mb-6"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    delay: 0.4,
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                  }}
                >
                  <div className="relative">
                    <motion.div
                      className="w-28 h-28 rounded-full bg-gradient-to-br from-brand-gold to-yellow-500 flex items-center justify-center shadow-xl"
                      animate={{
                        boxShadow: [
                          "0 0 0 0 rgba(251, 191, 36, 0)",
                          "0 0 40px 20px rgba(251, 191, 36, 0.4)",
                          "0 0 20px 10px rgba(251, 191, 36, 0.2)",
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <span className="text-5xl font-bold text-brand-black">
                        {newLevel}
                      </span>
                    </motion.div>

                    {/* Orbiting stars */}
                    {[0, 120, 240].map((angle, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-6 h-6"
                        style={{
                          top: "50%",
                          left: "50%",
                        }}
                        animate={{
                          rotate: [angle, angle + 360],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        <motion.div
                          style={{
                            transform: "translateX(60px) translateY(-50%)",
                          }}
                        >
                          <Sparkles className="w-5 h-5 text-brand-gold" />
                        </motion.div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Title */}
                <DialogTitle asChild>
                  <motion.h2
                    className="text-2xl font-bold text-brand-black mb-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }}
                    transition={{ delay: 0.1 }}
                  >
                    Congratulations!
                  </motion.h2>
                </DialogTitle>

                <DialogDescription asChild>
                  <motion.p
                    className="text-muted-foreground mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: showContent ? 1 : 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    You&apos;ve reached Level {newLevel}
                  </motion.p>
                </DialogDescription>

                {/* Perks */}
                {perks && perks.length > 0 && (
                  <motion.div
                    className="w-full space-y-2 mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }}
                    transition={{ delay: 0.4 }}
                  >
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">
                      New Unlocks
                    </p>
                    {perks.map((perk, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center gap-3 p-3 rounded-lg bg-brand-gold/10 border border-brand-gold/20"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                      >
                        <div className="w-10 h-10 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-gold">
                          {perk.icon}
                        </div>
                        <div className="text-left">
                          <p className="font-medium text-brand-black text-sm">
                            {perk.title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {perk.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {/* Continue button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }}
                  transition={{ delay: 0.6 }}
                >
                  <Button
                    onClick={onClose}
                    className="bg-brand-gold hover:bg-yellow-500 text-brand-black font-semibold px-8"
                  >
                    Continue
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};
