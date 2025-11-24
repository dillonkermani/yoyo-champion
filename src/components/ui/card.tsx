"use client";

import * as React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  elevated?: boolean;
  hover?: boolean;
  variant?: "default" | "fun" | "achievement" | "streak" | "xp" | "lesson";
  glowColor?: "green" | "blue" | "purple" | "orange" | "yellow" | "red" | "pink";
}

const variantStyles = {
  default: "border-gray-100",
  fun: "border-fun-blue/20 hover:border-fun-blue",
  achievement: "border-xp/30 bg-gradient-to-br from-xp/5 to-xp-light/10",
  streak: "border-fun-red/30 bg-gradient-to-br from-fun-red/5 to-fun-orange/10",
  xp: "border-xp/30 bg-gradient-to-br from-xp/5 to-xp-light/10",
  lesson: "border-fun-blue/20 hover:border-fun-blue",
};

const glowStyles = {
  green: "hover:shadow-fun-blue",
  blue: "hover:shadow-fun-blue",
  purple: "hover:shadow-fun-purple",
  orange: "hover:shadow-fun-orange",
  yellow: "hover:shadow-fun-yellow",
  red: "hover:shadow-fun-red",
  pink: "hover:shadow-fun-pink",
};

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, elevated = false, hover = false, variant = "default", glowColor, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-3xl border-2 bg-white text-brand-black transition-all duration-200",
        elevated ? "shadow-elevated" : "shadow-card",
        hover && "hover:-translate-y-1 hover:shadow-elevated cursor-pointer",
        variantStyles[variant],
        glowColor && hover && glowStyles[glowColor],
        className
      )}
      {...props}
    />
  )
);
Card.displayName = "Card";

// Motion Card with bouncy hover animations
export interface MotionCardProps
  extends Omit<HTMLMotionProps<"div">, "ref">,
    Omit<CardProps, keyof HTMLMotionProps<"div">> {
  bouncy?: boolean;
}

const MotionCard = React.forwardRef<HTMLDivElement, MotionCardProps>(
  ({ className, elevated = false, hover = false, variant = "default", glowColor, bouncy = true, children }, ref) => (
    <motion.div
      ref={ref}
      className={cn(
        "rounded-3xl border-2 bg-white text-brand-black",
        elevated ? "shadow-elevated" : "shadow-card",
        variantStyles[variant],
        glowColor && hover && glowStyles[glowColor],
        className
      )}
      {...(hover && {
        whileHover: {
          scale: bouncy ? 1.02 : 1.01,
          y: bouncy ? -4 : -2,
          boxShadow: "0 8px 25px rgba(0, 0, 0, 0.12)",
        },
      })}
      {...(hover && { whileTap: { scale: 0.98, y: 0 } })}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 17
      }}
    >
      {children}
    </motion.div>
  )
);
MotionCard.displayName = "MotionCard";

// Achievement Card with special effects
export interface AchievementCardProps extends React.HTMLAttributes<HTMLDivElement> {
  unlocked?: boolean;
  glowing?: boolean;
}

const AchievementCard = React.forwardRef<HTMLDivElement, AchievementCardProps>(
  ({ className, unlocked = false, glowing = false, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-3xl border-2 bg-white text-brand-black transition-all duration-300",
        "shadow-card hover:-translate-y-1",
        unlocked
          ? "border-xp bg-gradient-to-br from-xp/10 to-xp-light/20 hover:shadow-fun-yellow"
          : "border-gray-200 opacity-60 grayscale hover:opacity-80",
        glowing && unlocked && "glow-pulse-yellow achievement-shine",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);
AchievementCard.displayName = "AchievementCard";

// Lesson Card for course content
export interface LessonCardProps extends React.HTMLAttributes<HTMLDivElement> {
  completed?: boolean;
  locked?: boolean;
  current?: boolean;
}

const LessonCard = React.forwardRef<HTMLDivElement, LessonCardProps>(
  ({ className, completed = false, locked = false, current = false, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-3xl border-2 bg-white text-brand-black transition-all duration-200",
        "shadow-card hover:-translate-y-1",
        completed && "border-fun-blue bg-fun-blue/5 hover:shadow-fun-blue",
        current && "border-fun-blue bg-fun-blue/5 hover:shadow-fun-blue ring-2 ring-fun-blue/30",
        locked && "border-gray-200 bg-gray-50 opacity-60 cursor-not-allowed hover:translate-y-0",
        !completed && !locked && !current && "border-gray-200 hover:border-fun-blue hover:shadow-fun-blue",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);
LessonCard.displayName = "LessonCard";

// Streak Card
const StreakCard = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-3xl border-2 border-fun-red/30 bg-gradient-to-br from-fun-red/5 to-fun-orange/10",
        "text-brand-black shadow-card transition-all duration-200",
        "hover:-translate-y-1 hover:shadow-fun-red hover:border-fun-red",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);
StreakCard.displayName = "StreakCard";

// XP Card
const XPCard = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-3xl border-2 border-xp/30 bg-gradient-to-br from-xp/5 to-xp-light/10",
        "text-brand-black shadow-card transition-all duration-200",
        "hover:-translate-y-1 hover:shadow-fun-yellow hover:border-xp",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);
XPCard.displayName = "XPCard";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-2 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-xl font-bold leading-none tracking-tight text-brand-black",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export {
  Card,
  MotionCard,
  AchievementCard,
  LessonCard,
  StreakCard,
  XPCard,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
