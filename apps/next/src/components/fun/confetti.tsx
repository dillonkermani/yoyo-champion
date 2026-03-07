"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ConfettiPiece {
  id: number;
  x: number;
  color: string;
  shape: "circle" | "square" | "string" | "star";
  size: number;
  delay: number;
  duration: number;
  rotation: number;
}

export interface ConfettiProps {
  /** Whether confetti is active */
  active?: boolean;
  /** Number of confetti pieces */
  count?: number;
  /** Custom colors array */
  colors?: string[];
  /** Duration in seconds */
  duration?: number;
  /** Shapes to include */
  shapes?: ("circle" | "square" | "string" | "star")[];
  /** Callback when animation completes */
  onComplete?: () => void;
  /** Container className */
  className?: string;
  /** Origin point for explosion (0-100 percentage) */
  origin?: { x: number; y: number };
  /** Spread angle in degrees */
  spread?: number;
  /** Whether to loop the animation */
  loop?: boolean;
}

const defaultColors = [
  "#1CB0F6", // aqua-blue
  "#9bedff", // brand-blue
  "#1CB0F6", // fun-blue (formerly brand-teal)
  "#FFD700", // gold
  "#FF6B6B", // coral
  "#A78BFA", // purple
  "#F472B6", // pink
];

function generateConfettiPieces(
  count: number,
  colors: string[],
  shapes: ("circle" | "square" | "string" | "star")[],
  duration: number
): ConfettiPiece[] {
  return Array.from({ length: count }, (_, i) => {
    const colorIndex = Math.floor(Math.random() * colors.length);
    const shapeIndex = Math.floor(Math.random() * shapes.length);
    return {
      id: i,
      x: Math.random() * 100,
      color: colors[colorIndex] as string,
      shape: shapes[shapeIndex] as "circle" | "square" | "string" | "star",
      size: Math.random() * 8 + 4,
      delay: Math.random() * 0.5,
      duration: duration * (0.8 + Math.random() * 0.4),
      rotation: Math.random() * 360,
    };
  });
}

function ConfettiShape({
  shape,
  color,
  size,
}: {
  shape: ConfettiPiece["shape"];
  color: string;
  size: number;
}) {
  switch (shape) {
    case "circle":
      return (
        <div
          className="rounded-full"
          style={{
            width: size,
            height: size,
            backgroundColor: color,
          }}
        />
      );
    case "square":
      return (
        <div
          className="rounded-sm"
          style={{
            width: size,
            height: size,
            backgroundColor: color,
          }}
        />
      );
    case "string":
      return (
        <div
          className="rounded-full"
          style={{
            width: size * 0.3,
            height: size * 2,
            backgroundColor: color,
          }}
        />
      );
    case "star":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill={color}
        >
          <path d="M12 2L14.09 8.26L20.18 9.27L15.54 13.14L16.82 19.02L12 16.27L7.18 19.02L8.46 13.14L3.82 9.27L9.91 8.26L12 2Z" />
        </svg>
      );
  }
}

export function Confetti({
  active = false,
  count = 50,
  colors = defaultColors,
  duration = 2,
  shapes = ["circle", "square", "string"],
  onComplete,
  className,
  origin = { x: 50, y: 50 },
  spread = 180,
  loop = false,
}: ConfettiProps) {
  const [pieces, setPieces] = React.useState<ConfettiPiece[]>([]);
  const timeoutRef = React.useRef<NodeJS.Timeout>();

  React.useEffect(() => {
    if (active) {
      setPieces(generateConfettiPieces(count, colors, shapes, duration));

      if (!loop) {
        timeoutRef.current = setTimeout(() => {
          setPieces([]);
          onComplete?.();
        }, (duration + 0.5) * 1000);
      }
    } else {
      setPieces([]);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [active, count, colors, shapes, duration, onComplete, loop]);

  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-0 overflow-hidden z-50",
        className
      )}
    >
      <AnimatePresence>
        {pieces.map((piece) => {
          const angle = (Math.random() - 0.5) * spread * (Math.PI / 180);
          const velocity = 300 + Math.random() * 200;
          const endX = Math.cos(angle - Math.PI / 2) * velocity;
          const endY = Math.sin(angle - Math.PI / 2) * velocity + 400;

          return (
            <motion.div
              key={piece.id}
              className="absolute"
              style={{
                left: `${origin.x}%`,
                top: `${origin.y}%`,
              }}
              initial={{
                opacity: 1,
                scale: 0,
                x: 0,
                y: 0,
                rotate: 0,
              }}
              animate={{
                opacity: [1, 1, 0],
                scale: [0, 1, 0.8],
                x: [0, endX * 0.3, endX],
                y: [0, endY * 0.2, endY],
                rotate: [0, piece.rotation, piece.rotation * 2],
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: piece.duration,
                delay: piece.delay,
                ease: [0.25, 0.46, 0.45, 0.94],
                repeat: loop ? Infinity : 0,
                repeatDelay: loop ? 0.5 : 0,
              }}
            >
              <ConfettiShape
                shape={piece.shape}
                color={piece.color}
                size={piece.size}
              />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

// Preset confetti explosions
export function SuccessConfetti({ active, onComplete }: { active: boolean; onComplete?: () => void }) {
  // Reduce particles on mobile for performance
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
  return (
    <Confetti
      active={active}
      count={isMobile ? 30 : 60}
      colors={["#1CB0F6", "#e3f2e6", "#9bedff", "#FFD700"]}
      duration={2.5}
      shapes={["circle", "square", "star"]}
      {...(onComplete ? { onComplete } : {})}
    />
  );
}

export function LevelUpConfetti({ active, onComplete }: { active: boolean; onComplete?: () => void }) {
  // Reduce particles on mobile for performance
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
  return (
    <Confetti
      active={active}
      count={isMobile ? 50 : 100}
      colors={["#FFD700", "#FFA500", "#FF6B6B", "#A78BFA", "#9bedff"]}
      duration={3}
      shapes={["star", "circle", "square", "string"]}
      spread={360}
      {...(onComplete ? { onComplete } : {})}
    />
  );
}

export function AchievementConfetti({ active, onComplete }: { active: boolean; onComplete?: () => void }) {
  // Reduce particles on mobile for performance
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
  return (
    <Confetti
      active={active}
      count={isMobile ? 40 : 80}
      colors={["#FFD700", "#FFA500", "#FFEC8B"]}
      duration={2.5}
      shapes={["star", "square"]}
      {...(onComplete ? { onComplete } : {})}
    />
  );
}

export default Confetti;
