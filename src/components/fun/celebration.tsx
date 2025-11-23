"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Mascot, type MascotState } from "./mascot";
import { Confetti } from "./confetti";
import { Particles, type ParticleType } from "./particles";

export type CelebrationLevel = "small" | "medium" | "epic";

export interface CelebrationProps {
  /** Whether celebration is active */
  active: boolean;
  /** Celebration intensity level */
  level?: CelebrationLevel;
  /** Optional title text */
  title?: string;
  /** Optional subtitle text */
  subtitle?: string;
  /** Callback when celebration completes */
  onComplete?: () => void;
  /** Container className */
  className?: string;
  /** Custom mascot state */
  mascotState?: MascotState;
  /** Hide mascot */
  hideMascot?: boolean;
  /** Custom duration in seconds */
  duration?: number;
}

interface LevelConfig {
  confettiCount: number;
  confettiDuration: number;
  particleTypes: ParticleType[];
  particleIntensity: "low" | "medium" | "high";
  mascotSize: "sm" | "md" | "lg" | "xl";
  showConfetti: boolean;
}

const levelConfigs: Record<CelebrationLevel, LevelConfig> = {
  small: {
    confettiCount: 30,
    confettiDuration: 1.5,
    particleTypes: ["sparkle"],
    particleIntensity: "low",
    mascotSize: "md",
    showConfetti: false,
  },
  medium: {
    confettiCount: 50,
    confettiDuration: 2,
    particleTypes: ["sparkle", "star"],
    particleIntensity: "medium",
    mascotSize: "lg",
    showConfetti: true,
  },
  epic: {
    confettiCount: 100,
    confettiDuration: 3,
    particleTypes: ["sparkle", "star", "fire"],
    particleIntensity: "high",
    mascotSize: "xl",
    showConfetti: true,
  },
};

export function Celebration({
  active,
  level = "medium",
  title,
  subtitle,
  onComplete,
  className,
  mascotState = "celebrating",
  hideMascot = false,
  duration,
}: CelebrationProps) {
  const config = levelConfigs[level];
  const effectDuration = duration ?? config.confettiDuration;
  const [showContent, setShowContent] = React.useState(false);

  React.useEffect(() => {
    if (active) {
      setShowContent(true);
      const timer = setTimeout(() => {
        setShowContent(false);
        onComplete?.();
      }, effectDuration * 1000);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [active, effectDuration, onComplete]);

  return (
    <>
      {/* Full-screen confetti overlay */}
      {config.showConfetti && (
        <Confetti
          active={active}
          count={config.confettiCount}
          duration={config.confettiDuration}
          shapes={["circle", "square", "string", "star"]}
        />
      )}

      {/* Centered celebration content */}
      <AnimatePresence>
        {showContent && (
          <motion.div
            className={cn(
              "fixed inset-0 z-50 flex items-center justify-center pointer-events-none",
              className
            )}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="relative flex flex-col items-center"
              initial={{ scale: 0.5, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.5, y: -50, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
            >
              {/* Particle effects around mascot */}
              <div className="absolute inset-0 -m-20">
                {config.particleTypes.map((type) => (
                  <Particles
                    key={type}
                    active={active}
                    config={{
                      type,
                      intensity: config.particleIntensity,
                      size: "lg",
                    }}
                    position="absolute"
                  />
                ))}
              </div>

              {/* Mascot */}
              {!hideMascot && (
                <Mascot
                  state={mascotState}
                  size={config.mascotSize}
                  showString={false}
                />
              )}

              {/* Text content */}
              {(title || subtitle) && (
                <motion.div
                  className="text-center mt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {title && (
                    <motion.h2
                      className="text-2xl md:text-3xl font-bold text-brand-black"
                      animate={{
                        scale: [1, 1.05, 1],
                      }}
                      transition={{
                        duration: 0.5,
                        repeat: 3,
                      }}
                    >
                      {title}
                    </motion.h2>
                  )}
                  {subtitle && (
                    <p className="text-lg text-muted-foreground mt-1">
                      {subtitle}
                    </p>
                  )}
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Preset celebration variants
export function TrickMasteryCelebration({
  active,
  trickName,
  onComplete,
}: {
  active: boolean;
  trickName?: string;
  onComplete?: () => void;
}) {
  return (
    <Celebration
      active={active}
      level="medium"
      title="Trick Mastered!"
      {...(trickName ? { subtitle: trickName } : {})}
      mascotState="celebrating"
      {...(onComplete ? { onComplete } : {})}
    />
  );
}

export function PathCompletionCelebration({
  active,
  pathName,
  onComplete,
}: {
  active: boolean;
  pathName?: string;
  onComplete?: () => void;
}) {
  return (
    <Celebration
      active={active}
      level="epic"
      title="Path Complete!"
      {...(pathName ? { subtitle: `You mastered ${pathName}!` } : {})}
      mascotState="celebrating"
      {...(onComplete ? { onComplete } : {})}
    />
  );
}

export function AchievementCelebration({
  active,
  achievementName,
  onComplete,
}: {
  active: boolean;
  achievementName?: string;
  onComplete?: () => void;
}) {
  return (
    <Celebration
      active={active}
      level="medium"
      title="Achievement Unlocked!"
      {...(achievementName ? { subtitle: achievementName } : {})}
      mascotState="excited"
      {...(onComplete ? { onComplete } : {})}
    />
  );
}

export function LevelUpCelebration({
  active,
  newLevel,
  onComplete,
}: {
  active: boolean;
  newLevel?: number;
  onComplete?: () => void;
}) {
  return (
    <Celebration
      active={active}
      level="epic"
      title={`Level ${newLevel ?? "Up"}!`}
      subtitle="Keep up the great work!"
      mascotState="excited"
      {...(onComplete ? { onComplete } : {})}
    />
  );
}

export function StreakCelebration({
  active,
  streakDays,
  onComplete,
}: {
  active: boolean;
  streakDays?: number;
  onComplete?: () => void;
}) {
  return (
    <Celebration
      active={active}
      level="small"
      title={`${streakDays ?? ""} Day Streak!`}
      subtitle="You're on fire!"
      mascotState="encouraging"
      {...(onComplete ? { onComplete } : {})}
    />
  );
}

export default Celebration;
