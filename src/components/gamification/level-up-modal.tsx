"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Star, ChevronRight, Gift, Unlock, Crown, Zap, Trophy } from "lucide-react";
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

// Enhanced confetti with more variety - reduced motion on mobile
const ConfettiParticle = ({
  delay,
  color,
  startX,
  startY,
  size = "md",
}: {
  delay: number;
  color: string;
  startX: number;
  startY: number;
  size?: "sm" | "md" | "lg";
}) => {
  const sizes = { sm: "w-1.5 h-1.5 sm:w-2 sm:h-2", md: "w-2 h-2 sm:w-3 sm:h-3", lg: "w-3 h-3 sm:w-4 sm:h-4" };
  const shapes = ["rounded-full", "rounded-sm", "rounded-none"];
  const shape = shapes[Math.floor(Math.random() * shapes.length)];

  return (
    <motion.div
      className={`absolute ${sizes[size]} ${shape}`}
      style={{
        backgroundColor: color,
        left: `${startX}%`,
        top: `${startY}%`,
      }}
      initial={{ opacity: 1, scale: 0 }}
      animate={{
        y: [-15, Math.random() * 200 + 80],
        x: [(Math.random() - 0.5) * 80, (Math.random() - 0.5) * 250],
        rotate: [0, Math.random() * 720 - 360],
        opacity: [0, 1, 1, 0],
        scale: [0, 1.2, 0.8, 0.3],
      }}
      transition={{
        duration: 2,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    />
  );
};

// Firework burst effect
const FireworkBurst = ({ x, y, delay }: { x: number; y: number; delay: number }) => (
  <motion.div
    className="absolute pointer-events-none"
    style={{ left: `${x}%`, top: `${y}%` }}
    initial={{ opacity: 0 }}
    animate={{ opacity: [0, 1, 0] }}
    transition={{ duration: 0.8, delay }}
  >
    {Array.from({ length: 12 }).map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-2 h-2 rounded-full"
        style={{
          backgroundColor: ["#FFD700", "#FF6B6B", "#4ECDC4", "#A855F7", "#3B82F6"][i % 5],
        }}
        initial={{ x: 0, y: 0, opacity: 1 }}
        animate={{
          x: Math.cos((i * 30 * Math.PI) / 180) * 80,
          y: Math.sin((i * 30 * Math.PI) / 180) * 80,
          opacity: 0,
          scale: [1, 0],
        }}
        transition={{ duration: 0.6, delay: delay + 0.1 }}
      />
    ))}
  </motion.div>
);

// Stars explosion effect
const StarsExplosion = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {Array.from({ length: 20 }).map((_, i) => (
      <motion.div
        key={i}
        className="absolute"
        style={{
          left: "50%",
          top: "40%",
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: [0, 1, 0],
          scale: [0, 1, 0],
          x: Math.cos((i * 18 * Math.PI) / 180) * (100 + Math.random() * 100),
          y: Math.sin((i * 18 * Math.PI) / 180) * (100 + Math.random() * 100),
          rotate: [0, Math.random() * 360],
        }}
        transition={{
          duration: 1.2,
          delay: 0.3 + i * 0.05,
          ease: "easeOut",
        }}
      >
        <Star
          className="w-4 h-4 text-yellow-400 fill-yellow-400"
          style={{ filter: "drop-shadow(0 0 4px rgba(251, 191, 36, 0.8))" }}
        />
      </motion.div>
    ))}
  </div>
);

// Starburst rays effect
const StarburstRays = () => (
  <motion.div
    className="absolute inset-0 pointer-events-none"
    initial={{ opacity: 0 }}
    animate={{ opacity: [0, 1, 0] }}
    transition={{ duration: 1.5, times: [0, 0.2, 1] }}
  >
    {Array.from({ length: 16 }).map((_, i) => (
      <motion.div
        key={i}
        className="absolute left-1/2 top-[35%] w-1 h-32 origin-bottom"
        style={{
          background: "linear-gradient(to top, rgba(251, 191, 36, 0.8) 0%, transparent 100%)",
          transform: `rotate(${i * 22.5}deg) translateX(-50%)`,
        }}
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ scaleY: [0, 1, 0], opacity: [0, 1, 0] }}
        transition={{ duration: 1, delay: i * 0.03 }}
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
      icon: <Zap className="w-5 h-5" />,
      title: "Bonus XP",
      description: "Earn 10% bonus XP this week",
    });
  }

  return perks.length > 0 ? perks : undefined;
};

// Confetti colors
const confettiColors = [
  "#FFD700", // Gold
  "#FF6B6B", // Red
  "#4ECDC4", // Teal
  "#F59E0B", // Amber
  "#EC4899", // Pink
  "#8B5CF6", // Purple
  "#1CB0F6", // Aqua Blue
  "#9bedff", // Light Blue
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
      const timer = setTimeout(() => setShowContent(true), 600);
      return () => clearTimeout(timer);
    } else {
      setShowContent(false);
      return undefined;
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="max-w-[95vw] sm:max-w-lg overflow-hidden bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 border-4 border-yellow-400 mx-2 sm:mx-auto"
        showClose={false}
      >
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Full confetti explosion - reduced count for mobile performance */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {Array.from({ length: 40 }).map((_, i) => (
                  <ConfettiParticle
                    key={i}
                    delay={Math.random() * 0.6}
                    color={confettiColors[i % confettiColors.length] ?? "#FFD700"}
                    startX={30 + Math.random() * 40}
                    startY={20 + Math.random() * 30}
                    size={Math.random() > 0.7 ? "lg" : Math.random() > 0.4 ? "md" : "sm"}
                  />
                ))}
              </div>

              {/* Fireworks */}
              <FireworkBurst x={20} y={20} delay={0.3} />
              <FireworkBurst x={80} y={25} delay={0.5} />
              <FireworkBurst x={15} y={60} delay={0.7} />
              <FireworkBurst x={85} y={55} delay={0.9} />

              {/* Stars explosion */}
              <StarsExplosion />

              {/* Starburst */}
              <StarburstRays />

              {/* Content */}
              <motion.div
                className="relative z-10 flex flex-col items-center text-center py-4 sm:py-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                {/* "LEVEL UP!" text - bold and fun */}
                <motion.div
                  initial={{ opacity: 0, scale: 0, y: -50 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 400, damping: 15 }}
                  className="mb-4 sm:mb-6"
                >
                  <motion.h1
                    className="text-3xl sm:text-4xl font-black tracking-tight"
                    style={{
                      background: "linear-gradient(135deg, #F59E0B 0%, #D97706 50%, #B45309 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      textShadow: "0 4px 20px rgba(251, 191, 36, 0.4)",
                    }}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
                  >
                    LEVEL UP!
                  </motion.h1>
                </motion.div>

                {/* Large level number with crown */}
                <motion.div
                  className="relative mb-6 sm:mb-8"
                  initial={{ scale: 0, rotate: -360 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    delay: 0.5,
                    type: "spring",
                    stiffness: 200,
                    damping: 12,
                  }}
                >
                  {/* Crown on top */}
                  <motion.div
                    className="absolute -top-4 sm:-top-6 left-1/2 -translate-x-1/2 z-20"
                    animate={{ y: [0, -5, 0], rotate: [-5, 5, -5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Crown className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-500 fill-yellow-400 drop-shadow-lg" />
                  </motion.div>

                  <div className="relative">
                    <motion.div
                      className="w-28 h-28 sm:w-36 sm:h-36 rounded-full flex items-center justify-center shadow-2xl"
                      style={{
                        background: "linear-gradient(135deg, #FCD34D 0%, #F59E0B 50%, #D97706 100%)",
                      }}
                      animate={{
                        boxShadow: [
                          "0 0 30px 10px rgba(251, 191, 36, 0.3)",
                          "0 0 60px 25px rgba(251, 191, 36, 0.5)",
                          "0 0 30px 10px rgba(251, 191, 36, 0.3)",
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {/* Inner glossy effect */}
                      <div className="absolute inset-2 rounded-full bg-gradient-to-b from-white/40 to-transparent" />

                      <motion.span
                        className="text-5xl sm:text-6xl font-black text-white relative z-10"
                        style={{ textShadow: "0 4px 8px rgba(0,0,0,0.2)" }}
                        initial={{ scale: 0 }}
                        animate={{ scale: [0, 1.3, 1] }}
                        transition={{ delay: 0.7, duration: 0.5 }}
                      >
                        {newLevel}
                      </motion.span>
                    </motion.div>

                    {/* Orbiting stars */}
                    {[0, 90, 180, 270].map((angle, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-8 h-8"
                        style={{
                          top: "50%",
                          left: "50%",
                        }}
                        animate={{
                          rotate: [angle, angle + 360],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        <motion.div
                          style={{
                            transform: "translateX(60px) translateY(-50%)",
                          }}
                          animate={{ scale: [0.8, 1.2, 0.8] }}
                          transition={{ duration: 1, repeat: Infinity, delay: i * 0.25 }}
                        >
                          <Sparkles className="w-6 h-6 text-yellow-400 fill-yellow-300" />
                        </motion.div>
                      </motion.div>
                    ))}

                    {/* Pulse rings */}
                    <motion.div
                      className="absolute inset-0 rounded-full border-4 border-yellow-400"
                      initial={{ scale: 1, opacity: 1 }}
                      animate={{ scale: [1, 2], opacity: [0.8, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    <motion.div
                      className="absolute inset-0 rounded-full border-4 border-yellow-400"
                      initial={{ scale: 1, opacity: 1 }}
                      animate={{ scale: [1, 2], opacity: [0.8, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                    />
                  </div>
                </motion.div>

                {/* Title */}
                <DialogTitle asChild>
                  <motion.h2
                    className="text-2xl sm:text-3xl font-black text-gray-900 mb-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }}
                    transition={{ delay: 0.1 }}
                  >
                    Congratulations!
                  </motion.h2>
                </DialogTitle>

                <DialogDescription asChild>
                  <motion.p
                    className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6 font-medium"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: showContent ? 1 : 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    You&apos;ve reached Level {newLevel}!
                  </motion.p>
                </DialogDescription>

                {/* Perks */}
                {perks && perks.length > 0 && (
                  <motion.div
                    className="w-full space-y-2 sm:space-y-3 mb-4 sm:mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
                      <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600" />
                      <p className="text-xs sm:text-sm font-bold text-yellow-700 uppercase tracking-wider">
                        New Unlocks
                      </p>
                    </div>
                    {perks.map((perk, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-white/80 border-2 border-yellow-200 shadow-lg"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.15 }}
                        whileHover={{ scale: 1.02, x: 5 }}
                      >
                        <motion.div
                          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center text-white shadow-lg flex-shrink-0"
                          animate={{ rotate: [0, 5, -5, 0] }}
                          transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                        >
                          {perk.icon}
                        </motion.div>
                        <div className="text-left flex-1 min-w-0">
                          <p className="font-bold text-gray-900 text-sm sm:text-base">{perk.title}</p>
                          <p className="text-xs sm:text-sm text-gray-600 truncate">{perk.description}</p>
                        </div>
                        <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 flex-shrink-0" />
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {/* Continue button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }}
                  transition={{ delay: 0.7 }}
                >
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      onClick={onClose}
                      className="bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-white font-black px-8 py-5 sm:px-10 sm:py-6 text-base sm:text-lg rounded-full shadow-xl min-h-[48px]"
                    >
                      <span>Continue</span>
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                      >
                        <ChevronRight className="w-6 h-6 ml-2" />
                      </motion.div>
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};
