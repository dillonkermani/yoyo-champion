"use client";

import * as React from "react";
import { motion, type Variants, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export type MascotState =
  | "happy"
  | "excited"
  | "sad"
  | "celebrating"
  | "thinking"
  | "encouraging";

export interface MascotProps extends Omit<HTMLMotionProps<"div">, "children"> {
  /** @deprecated Use `mood` instead */
  state?: MascotState;
  /** The mood/state of the mascot */
  mood?: MascotState;
  size?: "sm" | "md" | "lg" | "xl";
  showString?: boolean;
  className?: string;
}

const sizeMap = {
  sm: { width: 48, height: 48, eyeSize: 6, pupilSize: 3 },
  md: { width: 80, height: 80, eyeSize: 10, pupilSize: 5 },
  lg: { width: 120, height: 120, eyeSize: 14, pupilSize: 7 },
  xl: { width: 160, height: 160, eyeSize: 18, pupilSize: 9 },
};

// Static by default - no continuous animations
// Animations only trigger on specific interactions
const containerVariants: Record<MascotState, Variants> = {
  happy: {
    animate: {
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  },
  excited: {
    animate: {
      y: 0,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  },
  sad: {
    animate: {
      y: 0,
      rotate: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  },
  celebrating: {
    // Only celebrating keeps animation (for achievements/celebrations)
    animate: {
      rotate: [-10, 10, -10],
      scale: [1, 1.1, 1],
      transition: {
        duration: 0.3,
        repeat: 3, // Only repeat 3 times, not infinitely
        ease: "easeInOut",
      },
    },
  },
  thinking: {
    animate: {
      rotate: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  },
  encouraging: {
    animate: {
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  },
};

// Static eye variants - no continuous animations
const eyeVariants: Record<MascotState, Variants> = {
  happy: {
    animate: {
      scaleY: 1,
      transition: { duration: 0.3 },
    },
  },
  excited: {
    animate: {
      scale: 1.1,
      transition: { duration: 0.3 },
    },
  },
  sad: {
    animate: {
      scaleY: 0.6,
      y: 2,
      transition: { duration: 0.3 },
    },
  },
  celebrating: {
    // Only celebrating has brief animation
    animate: {
      scaleY: [0.3, 0.8, 0.3],
      transition: { duration: 0.2, repeat: 3 },
    },
  },
  thinking: {
    animate: {
      x: 0,
      transition: { duration: 0.3 },
    },
  },
  encouraging: {
    animate: {
      scale: 1,
      transition: { duration: 0.3 },
    },
  },
};

// Static pupil variants - no continuous animations
const pupilVariants: Record<MascotState, Variants> = {
  happy: {
    animate: {
      y: 0,
      transition: { duration: 0.3 },
    },
  },
  excited: {
    animate: {
      scale: 1,
      transition: { duration: 0.3 },
    },
  },
  sad: {
    animate: {
      y: 1,
      transition: { duration: 0.3 },
    },
  },
  celebrating: {
    // Brief animation for celebrating only
    animate: {
      y: [-1, 1, -1],
      transition: { duration: 0.15, repeat: 3 },
    },
  },
  thinking: {
    animate: {
      x: 0,
      y: 0,
      transition: { duration: 0.3 },
    },
  },
  encouraging: {
    animate: {
      y: 0,
      transition: { duration: 0.3 },
    },
  },
};

const mouthPaths: Record<MascotState, string> = {
  happy: "M -8 4 Q 0 10 8 4",
  excited: "M -10 2 Q 0 14 10 2",
  sad: "M -6 8 Q 0 4 6 8",
  celebrating: "M -10 0 Q 0 16 10 0",
  thinking: "M -4 6 L 4 6",
  encouraging: "M -8 4 Q 0 12 8 4",
};

// Static string variants - no continuous animations
const stringVariants: Record<MascotState, Variants> = {
  happy: {
    animate: {
      d: "M 0 0 Q 0 20 0 40",
      transition: { duration: 0.3 },
    },
  },
  excited: {
    animate: {
      d: "M 0 0 Q 0 20 0 40",
      transition: { duration: 0.3 },
    },
  },
  sad: {
    animate: {
      d: "M 0 0 Q 0 20 0 40",
      transition: { duration: 0.3 },
    },
  },
  celebrating: {
    // Brief animation for celebrating only
    animate: {
      d: ["M 0 0 Q 8 10 -5 40", "M 0 0 Q -8 10 5 40", "M 0 0 Q 8 10 -5 40"],
      transition: { duration: 0.2, repeat: 3 },
    },
  },
  thinking: {
    animate: {
      d: "M 0 0 Q 0 20 0 40",
      transition: { duration: 0.3 },
    },
  },
  encouraging: {
    animate: {
      d: "M 0 0 Q 0 20 0 40",
      transition: { duration: 0.3 },
    },
  },
};

// Confetti pieces for celebrating state - limited animation
function CelebrationConfetti({ size }: { size: number }) {
  const confettiColors = ["#9bedff", "#1CB0F6", "#e3f2e6", "#FFD700", "#FF6B6B"];

  return (
    <>
      {confettiColors.map((color, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: size * 0.06,
            height: size * 0.06,
            backgroundColor: color,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0.5],
            x: [0, (i % 2 === 0 ? 1 : -1) * (20 + i * 10)],
            y: [0, -30 - i * 5, 10],
            rotate: [0, 360 * (i % 2 === 0 ? 1 : -1)],
          }}
          transition={{
            duration: 0.8,
            repeat: 2, // Only repeat twice, not infinitely
            delay: i * 0.1,
            ease: "easeOut",
          }}
        />
      ))}
    </>
  );
}

// Thinking bubbles - static, no animation
function ThinkingBubbles({ size }: { size: number }) {
  return (
    <div className="absolute -right-2 -top-2">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="absolute rounded-full bg-fun-blue/30"
          style={{
            width: size * (0.1 - i * 0.02),
            height: size * (0.1 - i * 0.02),
            right: i * 8,
            top: -i * 6,
            opacity: 0.5 - i * 0.1,
          }}
        />
      ))}
    </div>
  );
}

// Encouraging sparkles - static, no animation
function EncouragingSparkles({ size }: { size: number }) {
  return (
    <>
      {[0, 1].map((i) => (
        <svg
          key={i}
          className="absolute"
          style={{
            width: size * 0.12,
            height: size * 0.12,
            left: i === 0 ? '10%' : '80%',
            top: '5%',
            opacity: 0.7,
          }}
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M12 2L14 8L20 10L14 12L12 18L10 12L4 10L10 8L12 2Z"
            fill="#FFD700"
          />
        </svg>
      ))}
    </>
  );
}

export const Mascot = React.forwardRef<HTMLDivElement, MascotProps>(
  ({ state, mood, size = "md", showString = true, className, ...props }, ref) => {
    // Support both `mood` (preferred) and `state` (deprecated) props
    const currentMood = mood ?? state ?? "happy";
    const dimensions = sizeMap[size];
    const { width, height, eyeSize, pupilSize } = dimensions;

    return (
      <motion.div
        ref={ref}
        className={cn("relative inline-flex items-center justify-center", className)}
        variants={containerVariants[currentMood]}
        animate="animate"
        {...props}
      >
        {/* Celebration confetti */}
        {currentMood === "celebrating" && <CelebrationConfetti size={width} />}

        {/* Thinking bubbles */}
        {currentMood === "thinking" && <ThinkingBubbles size={width} />}

        {/* Encouraging sparkles */}
        {currentMood === "encouraging" && <EncouragingSparkles size={width} />}

        {/* Main YoYo Body SVG */}
        <svg
          width={width}
          height={height + (showString ? 50 : 0)}
          viewBox={`0 0 60 ${60 + (showString ? 50 : 0)}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer ring gradient */}
          <defs>
            <linearGradient id="yoyoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#9bedff" />
              <stop offset="50%" stopColor="#1CB0F6" />
              <stop offset="100%" stopColor="#9bedff" />
            </linearGradient>
            <radialGradient id="innerGlow" cx="50%" cy="30%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#9bedff" stopOpacity="0" />
            </radialGradient>
            <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.2" />
            </filter>
          </defs>

          {/* YoYo body - outer ring */}
          <circle
            cx="30"
            cy="30"
            r="28"
            fill="url(#yoyoGradient)"
            filter="url(#shadow)"
          />

          {/* Inner glow */}
          <circle cx="30" cy="30" r="26" fill="url(#innerGlow)" />

          {/* Inner circle (center hub) */}
          <circle cx="30" cy="30" r="18" fill="#ffffff" />
          <circle cx="30" cy="30" r="16" fill="#f8f9fa" />

          {/* Face container - slightly lower for cute look */}
          <g transform="translate(30, 32)">
            {/* Eyes */}
            <motion.g variants={eyeVariants[currentMood]} animate="animate">
              {/* Left eye */}
              <ellipse
                cx={-8}
                cy={-6}
                rx={eyeSize / 2}
                ry={eyeSize / 2}
                fill="#151515"
              />
              {/* Right eye */}
              <ellipse
                cx={8}
                cy={-6}
                rx={eyeSize / 2}
                ry={eyeSize / 2}
                fill="#151515"
              />

              {/* Eye highlights */}
              <motion.g variants={pupilVariants[currentMood]} animate="animate">
                <circle cx={-6} cy={-8} r={pupilSize / 2} fill="#ffffff" />
                <circle cx={10} cy={-8} r={pupilSize / 2} fill="#ffffff" />
              </motion.g>
            </motion.g>

            {/* Blush marks for certain moods */}
            {(currentMood === "happy" || currentMood === "excited" || currentMood === "encouraging") && (
              <>
                <ellipse cx={-14} cy={0} rx={3} ry={2} fill="#FFB6C1" opacity={0.6} />
                <ellipse cx={14} cy={0} rx={3} ry={2} fill="#FFB6C1" opacity={0.6} />
              </>
            )}

            {/* Mouth */}
            <motion.path
              d={mouthPaths[currentMood]}
              stroke="#151515"
              strokeWidth={2}
              strokeLinecap="round"
              fill="none"
              initial={false}
              animate={{ d: mouthPaths[currentMood] }}
              transition={{ duration: 0.3 }}
            />

            {/* Tear for sad mood - static */}
            {currentMood === "sad" && (
              <ellipse
                cx={12}
                cy={4}
                rx={2}
                ry={3}
                fill="#9bedff"
                opacity={0.8}
              />
            )}
          </g>

          {/* String */}
          {showString && (
            <motion.path
              d="M 30 58 Q 32 78 30 98"
              stroke="#1CB0F6"
              strokeWidth={2}
              strokeLinecap="round"
              fill="none"
              variants={stringVariants[currentMood]}
              animate="animate"
            />
          )}
        </svg>
      </motion.div>
    );
  }
);

Mascot.displayName = "Mascot";

// Preset mascot variants for common use cases
export function HappyMascot(props: Omit<MascotProps, "state" | "mood">) {
  return <Mascot mood="happy" {...props} />;
}

export function ExcitedMascot(props: Omit<MascotProps, "state" | "mood">) {
  return <Mascot mood="excited" {...props} />;
}

export function SadMascot(props: Omit<MascotProps, "state" | "mood">) {
  return <Mascot mood="sad" {...props} />;
}

export function CelebratingMascot(props: Omit<MascotProps, "state" | "mood">) {
  return <Mascot mood="celebrating" {...props} />;
}

export function ThinkingMascot(props: Omit<MascotProps, "state" | "mood">) {
  return <Mascot mood="thinking" {...props} />;
}

export function EncouragingMascot(props: Omit<MascotProps, "state" | "mood">) {
  return <Mascot mood="encouraging" {...props} />;
}

export default Mascot;
