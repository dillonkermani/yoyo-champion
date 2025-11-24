"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export type ParticleType = "sparkle" | "fire" | "star" | "bubble" | "heart";

export interface ParticleConfig {
  type: ParticleType;
  count?: number;
  colors?: string[];
  size?: "sm" | "md" | "lg";
  intensity?: "low" | "medium" | "high";
  duration?: number;
}

export interface ParticlesProps {
  /** Whether particles are active */
  active?: boolean;
  /** Particle configuration */
  config: ParticleConfig;
  /** Container className */
  className?: string;
  /** Position style */
  position?: "absolute" | "fixed" | "relative";
}

const sizeMap = {
  sm: { min: 4, max: 8 },
  md: { min: 8, max: 16 },
  lg: { min: 12, max: 24 },
};

const intensityMap = {
  low: { count: 8, speed: 0.8 },
  medium: { count: 15, speed: 1 },
  high: { count: 25, speed: 1.2 },
};

const defaultColors: Record<ParticleType, string[]> = {
  sparkle: ["#FFD700", "#FFA500", "#FFEC8B", "#9bedff"],
  fire: ["#FF4500", "#FF6B35", "#FFA500", "#FFD700"],
  star: ["#FFD700", "#9bedff", "#A78BFA", "#F472B6"],
  bubble: ["#9bedff", "#1CB0F6", "#e3f2e6", "#A78BFA"],
  heart: ["#FF6B6B", "#F472B6", "#FF4500"],
};

function SparkleParticle({ color, size }: { color: string; size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M12 0L14 8L22 10L14 12L12 20L10 12L2 10L10 8L12 0Z" />
    </svg>
  );
}

function FireParticle({ color, size }: { color: string; size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M12 2C12 2 8 6 8 12C8 15.31 10.69 18 14 18C15.5 18 16.87 17.43 17.89 16.5C16.91 19.63 13.77 22 10 22C5.58 22 2 18.42 2 14C2 8.27 7 2.5 12 2Z" />
    </svg>
  );
}

function StarParticle({ color, size }: { color: string; size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M12 2L14.09 8.26L20.18 9.27L15.54 13.14L16.82 19.02L12 16.27L7.18 19.02L8.46 13.14L3.82 9.27L9.91 8.26L12 2Z" />
    </svg>
  );
}

function BubbleParticle({ color, size }: { color: string; size: number }) {
  return (
    <div
      className="rounded-full"
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        opacity: 0.7,
        boxShadow: `inset -${size / 4}px -${size / 4}px ${size / 2}px rgba(0,0,0,0.1), inset ${size / 6}px ${size / 6}px ${size / 3}px rgba(255,255,255,0.5)`,
      }}
    />
  );
}

function HeartParticle({ color, size }: { color: string; size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" />
    </svg>
  );
}

function getParticleComponent(type: ParticleType) {
  switch (type) {
    case "sparkle":
      return SparkleParticle;
    case "fire":
      return FireParticle;
    case "star":
      return StarParticle;
    case "bubble":
      return BubbleParticle;
    case "heart":
      return HeartParticle;
  }
}

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  delay: number;
}

export function Particles({
  active = false,
  config,
  className,
  position = "absolute",
}: ParticlesProps) {
  const {
    type,
    count: customCount,
    colors = defaultColors[type],
    size = "md",
    intensity = "medium",
    duration = 2,
  } = config;

  const [particles, setParticles] = React.useState<Particle[]>([]);
  const ParticleComponent = getParticleComponent(type);
  const sizeRange = sizeMap[size];
  const intensityConfig = intensityMap[intensity];
  const particleCount = customCount ?? intensityConfig.count;

  React.useEffect(() => {
    if (active) {
      const newParticles: Particle[] = Array.from({ length: particleCount }, (_, i) => {
        const colorIndex = Math.floor(Math.random() * colors.length);
        return {
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          color: colors[colorIndex] as string,
          size: sizeRange.min + Math.random() * (sizeRange.max - sizeRange.min),
          delay: Math.random() * 0.5,
        };
      });
      setParticles(newParticles);
    } else {
      setParticles([]);
    }
  }, [active, particleCount, colors, sizeRange]);

  const getAnimation = (_particle: Particle) => {
    switch (type) {
      case "sparkle":
        return {
          opacity: [0, 1, 0],
          scale: [0, 1.2, 0],
          rotate: [0, 180, 360],
        };
      case "fire":
        return {
          opacity: [0, 1, 0],
          y: [0, -50, -100],
          scale: [0.5, 1, 0.3],
        };
      case "star":
        return {
          opacity: [0, 1, 0],
          scale: [0, 1, 0],
          rotate: [0, 360],
          y: [0, -20],
        };
      case "bubble":
        return {
          opacity: [0, 0.7, 0],
          y: [0, -80],
          x: [0, (Math.random() - 0.5) * 40],
          scale: [0.5, 1, 0.8],
        };
      case "heart":
        return {
          opacity: [0, 1, 0],
          y: [0, -60],
          scale: [0.5, 1.2, 1],
        };
    }
  };

  return (
    <div
      className={cn(
        "pointer-events-none inset-0 overflow-hidden",
        position,
        className
      )}
    >
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={getAnimation(p)}
            transition={{
              duration: duration / intensityConfig.speed,
              delay: p.delay,
              repeat: active ? Infinity : 0,
              repeatDelay: 0.2,
              ease: "easeOut",
            }}
          >
            <ParticleComponent color={p.color} size={p.size} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// Preset particle effects
export function SparkleParticles({
  active,
  intensity = "medium",
  className,
}: {
  active: boolean;
  intensity?: "low" | "medium" | "high";
  className?: string;
}) {
  return (
    <Particles
      active={active}
      config={{ type: "sparkle", intensity }}
      {...(className ? { className } : {})}
    />
  );
}

export function FireParticles({
  active,
  intensity = "medium",
  className,
}: {
  active: boolean;
  intensity?: "low" | "medium" | "high";
  className?: string;
}) {
  return (
    <Particles
      active={active}
      config={{ type: "fire", intensity }}
      {...(className ? { className } : {})}
    />
  );
}

export function StarParticles({
  active,
  intensity = "medium",
  className,
}: {
  active: boolean;
  intensity?: "low" | "medium" | "high";
  className?: string;
}) {
  return (
    <Particles
      active={active}
      config={{ type: "star", intensity }}
      {...(className ? { className } : {})}
    />
  );
}

export function XPSparkles({ active, className }: { active: boolean; className?: string }) {
  return (
    <Particles
      active={active}
      config={{
        type: "sparkle",
        colors: ["#FFD700", "#9bedff", "#1CB0F6"],
        intensity: "medium",
        size: "sm",
      }}
      {...(className ? { className } : {})}
    />
  );
}

export function StreakFire({ active, className }: { active: boolean; className?: string }) {
  return (
    <Particles
      active={active}
      config={{
        type: "fire",
        intensity: "high",
        size: "md",
      }}
      {...(className ? { className } : {})}
    />
  );
}

export function AchievementStars({ active, className }: { active: boolean; className?: string }) {
  return (
    <Particles
      active={active}
      config={{
        type: "star",
        colors: ["#FFD700", "#FFA500", "#FFEC8B"],
        intensity: "high",
        size: "lg",
      }}
      {...(className ? { className } : {})}
    />
  );
}

export default Particles;
