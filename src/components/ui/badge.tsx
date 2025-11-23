"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-brand-teal focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-surface-secondary text-brand-black",
        secondary:
          "border-border bg-white text-brand-black",
        outline:
          "border-border text-brand-black bg-transparent",
        // Brand variants
        teal:
          "border-transparent bg-brand-teal/20 text-brand-black",
        blue:
          "border-transparent bg-brand-blue text-brand-black",
        green:
          "border-transparent bg-brand-green text-brand-black",
        // Difficulty level variants
        beginner:
          "border-transparent bg-brand-green text-brand-black",
        intermediate:
          "border-transparent bg-brand-blue text-brand-black",
        advanced:
          "border-transparent bg-brand-teal/30 text-brand-black",
        master:
          "border-transparent bg-brand-teal text-white",
        legendary:
          "border-transparent bg-brand-black text-white",
        // Status variants
        success:
          "border-transparent bg-brand-green text-brand-black",
        warning:
          "border-transparent bg-amber-100 text-amber-800",
        error:
          "border-transparent bg-red-100 text-red-800",
        info:
          "border-transparent bg-brand-blue/50 text-brand-black",
        // Sale/completed states
        sale:
          "border-transparent bg-brand-green text-brand-black font-semibold",
        completed:
          "border-transparent bg-brand-green text-brand-black",
        // Brand variant
        brand:
          "border-transparent bg-brand-blue text-brand-black font-semibold",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  animated?: boolean;
  pulse?: boolean;
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, animated = false, pulse = false, children, ...props }, ref) => {
    if (animated) {
      return (
        <motion.div
          ref={ref}
          className={cn(badgeVariants({ variant }), className)}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          {children}
        </motion.div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(
          badgeVariants({ variant }),
          pulse && "animate-pulse",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Badge.displayName = "Badge";

// Difficulty badge with icon support
export interface DifficultyBadgeProps extends Omit<BadgeProps, "variant"> {
  level: "beginner" | "intermediate" | "advanced" | "master" | "legendary";
  showIcon?: boolean;
}

const difficultyIcons: Record<DifficultyBadgeProps["level"], string> = {
  beginner: "1",
  intermediate: "2",
  advanced: "3",
  master: "4",
  legendary: "5",
};

const difficultyLabels: Record<DifficultyBadgeProps["level"], string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
  master: "Master",
  legendary: "Legendary",
};

const DifficultyBadge = React.forwardRef<HTMLDivElement, DifficultyBadgeProps>(
  ({ level, showIcon = true, className, children, ...props }, ref) => (
    <Badge
      ref={ref}
      variant={level}
      className={cn("gap-1.5", className)}
      {...props}
    >
      {showIcon && (
        <span className="flex items-center justify-center w-4 h-4 rounded-full bg-current/10 text-[10px] font-bold">
          {difficultyIcons[level]}
        </span>
      )}
      {children || difficultyLabels[level]}
    </Badge>
  )
);
DifficultyBadge.displayName = "DifficultyBadge";

export { Badge, DifficultyBadge, badgeVariants };
