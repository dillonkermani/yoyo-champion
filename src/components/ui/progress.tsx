"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  variant?: "default" | "brand" | "success" | "warning" | "error";
  size?: "sm" | "default" | "lg";
  showValue?: boolean;
  animated?: boolean;
}

const progressVariants = {
  default: "bg-gray-400",
  brand: "bg-gradient-to-r from-brand-teal to-brand-blue",
  success: "bg-gradient-to-r from-emerald-500 to-green-400",
  warning: "bg-gradient-to-r from-yellow-500 to-orange-400",
  error: "bg-gradient-to-r from-red-500 to-red-400",
};

const sizeVariants = {
  sm: "h-1.5",
  default: "h-2.5",
  lg: "h-4",
};

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(
  (
    {
      className,
      value = 0,
      variant = "default",
      size = "default",
      showValue = false,
      animated = true,
      ...props
    },
    ref
  ) => {
    const percentage = Math.min(100, Math.max(0, value || 0));

    return (
      <div className={cn("w-full", showValue && "space-y-1.5")}>
        {showValue && (
          <div className="flex justify-between text-xs text-gray-500">
            <span>Progress</span>
            <span>{percentage}%</span>
          </div>
        )}
        <ProgressPrimitive.Root
          ref={ref}
          className={cn(
            "relative w-full overflow-hidden rounded-full bg-gray-200",
            sizeVariants[size],
            className
          )}
          {...props}
        >
          {animated ? (
            <motion.div
              className={cn(
                "h-full w-full flex-1 rounded-full",
                progressVariants[variant]
              )}
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
              }}
            />
          ) : (
            <ProgressPrimitive.Indicator
              className={cn(
                "h-full w-full flex-1 rounded-full transition-transform duration-300",
                progressVariants[variant]
              )}
              style={{ transform: `translateX(-${100 - percentage}%)` }}
            />
          )}
        </ProgressPrimitive.Root>
      </div>
    );
  }
);
Progress.displayName = ProgressPrimitive.Root.displayName;

// Multi-segment progress for skill trees or level progress
export interface MultiProgressProps {
  segments: Array<{
    value: number;
    variant?: ProgressProps["variant"];
    label?: string;
  }>;
  size?: ProgressProps["size"];
  className?: string;
  animated?: boolean;
}

const MultiProgress = React.forwardRef<HTMLDivElement, MultiProgressProps>(
  ({ segments, size = "default", className, animated = true }, ref) => {
    const total = segments.reduce((acc, seg) => acc + seg.value, 0);

    return (
      <div
        ref={ref}
        className={cn(
          "relative w-full overflow-hidden rounded-full bg-gray-200 flex",
          sizeVariants[size],
          className
        )}
      >
        {segments.map((segment, index) => {
          const width = (segment.value / total) * 100;
          const variant = segment.variant || "default";

          if (animated) {
            return (
              <motion.div
                key={index}
                className={cn(
                  "h-full",
                  progressVariants[variant],
                  index === 0 && "rounded-l-full",
                  index === segments.length - 1 && "rounded-r-full"
                )}
                initial={{ width: 0 }}
                animate={{ width: `${width}%` }}
                transition={{
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                  delay: index * 0.1,
                }}
                title={segment.label}
              />
            );
          }

          return (
            <div
              key={index}
              className={cn(
                "h-full transition-all duration-300",
                progressVariants[variant],
                index === 0 && "rounded-l-full",
                index === segments.length - 1 && "rounded-r-full"
              )}
              style={{ width: `${width}%` }}
              title={segment.label}
            />
          );
        })}
      </div>
    );
  }
);
MultiProgress.displayName = "MultiProgress";

// Circular progress indicator
export interface CircularProgressProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  variant?: ProgressProps["variant"];
  showValue?: boolean;
  className?: string;
  animated?: boolean;
}

const CircularProgress = React.forwardRef<SVGSVGElement, CircularProgressProps>(
  (
    {
      value = 0,
      size = 60,
      strokeWidth = 6,
      variant = "brand",
      showValue = true,
      className,
      animated = true,
    },
    ref
  ) => {
    const percentage = Math.min(100, Math.max(0, value));
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (percentage / 100) * circumference;

    const strokeColors: Record<string, string> = {
      default: "stroke-gray-400",
      brand: "stroke-brand-teal",
      success: "stroke-emerald-500",
      warning: "stroke-yellow-500",
      error: "stroke-red-500",
    };

    return (
      <div className={cn("relative inline-flex items-center justify-center", className)}>
        <svg
          ref={ref}
          width={size}
          height={size}
          className="transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            className="stroke-gray-200 fill-none"
          />
          {/* Progress circle */}
          {animated ? (
            <motion.circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              strokeWidth={strokeWidth}
              className={cn("fill-none", strokeColors[variant])}
              strokeLinecap="round"
              initial={{ strokeDasharray: circumference, strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            />
          ) : (
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              strokeWidth={strokeWidth}
              className={cn("fill-none transition-all duration-300", strokeColors[variant])}
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
            />
          )}
        </svg>
        {showValue && (
          <span className="absolute text-xs font-semibold text-gray-700">
            {percentage}%
          </span>
        )}
      </div>
    );
  }
);
CircularProgress.displayName = "CircularProgress";

export { Progress, MultiProgress, CircularProgress };
