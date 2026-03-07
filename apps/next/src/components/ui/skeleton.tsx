"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "circular" | "rectangular";
  animation?: "pulse" | "shimmer" | "none";
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant = "default", animation = "pulse", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "bg-gray-200",
          variant === "default" && "rounded-md",
          variant === "circular" && "rounded-full",
          variant === "rectangular" && "rounded-none",
          animation === "pulse" && "animate-pulse",
          animation === "shimmer" &&
            "relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-gray-300/40 before:to-transparent",
          className
        )}
        {...props}
      />
    );
  }
);
Skeleton.displayName = "Skeleton";

// Pre-built skeleton patterns
const SkeletonText = React.forwardRef<
  HTMLDivElement,
  SkeletonProps & { lines?: number }
>(({ className, lines = 3, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn(
            "h-4",
            i === lines - 1 ? "w-4/5" : "w-full"
          )}
          {...props}
        />
      ))}
    </div>
  );
});
SkeletonText.displayName = "SkeletonText";

const SkeletonAvatar = React.forwardRef<
  HTMLDivElement,
  SkeletonProps & { size?: "sm" | "default" | "lg" | "xl" }
>(({ className, size = "default", ...props }, ref) => {
  const sizeClasses = {
    sm: "h-8 w-8",
    default: "h-10 w-10",
    lg: "h-12 w-12",
    xl: "h-16 w-16",
  };

  return (
    <Skeleton
      ref={ref}
      variant="circular"
      className={cn(sizeClasses[size], className)}
      {...props}
    />
  );
});
SkeletonAvatar.displayName = "SkeletonAvatar";

const SkeletonButton = React.forwardRef<
  HTMLDivElement,
  SkeletonProps & { size?: "sm" | "default" | "lg" }
>(({ className, size = "default", ...props }, ref) => {
  const sizeClasses = {
    sm: "h-8 w-20",
    default: "h-10 w-24",
    lg: "h-12 w-28",
  };

  return (
    <Skeleton
      ref={ref}
      className={cn(sizeClasses[size], "rounded-lg", className)}
      {...props}
    />
  );
});
SkeletonButton.displayName = "SkeletonButton";

// Card skeleton for trick cards
const SkeletonTrickCard = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, animation = "shimmer", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl border border-gray-200 bg-white p-4 space-y-4",
          className
        )}
        {...props}
      >
        {/* Thumbnail */}
        <Skeleton
          className="aspect-video w-full rounded-lg"
          animation={animation}
        />
        {/* Title */}
        <Skeleton className="h-5 w-3/4" animation={animation} />
        {/* Badge row */}
        <div className="flex gap-2">
          <Skeleton className="h-5 w-16 rounded-full" animation={animation} />
          <Skeleton className="h-5 w-20 rounded-full" animation={animation} />
        </div>
        {/* Description */}
        <SkeletonText lines={2} animation={animation} />
        {/* Progress */}
        <Skeleton className="h-2 w-full rounded-full" animation={animation} />
      </div>
    );
  }
);
SkeletonTrickCard.displayName = "SkeletonTrickCard";

// User profile skeleton
const SkeletonProfile = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, animation = "shimmer", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex items-center gap-4", className)}
        {...props}
      >
        <SkeletonAvatar size="lg" animation={animation} />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-5 w-32" animation={animation} />
          <Skeleton className="h-4 w-24" animation={animation} />
        </div>
      </div>
    );
  }
);
SkeletonProfile.displayName = "SkeletonProfile";

// Video player skeleton
const SkeletonVideoPlayer = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, animation = "shimmer", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl border border-gray-200 bg-white overflow-hidden",
          className
        )}
        {...props}
      >
        {/* Video area */}
        <Skeleton
          className="aspect-video w-full"
          animation={animation}
        />
        {/* Controls */}
        <div className="p-4 space-y-3">
          {/* Progress bar */}
          <Skeleton className="h-1.5 w-full rounded-full" animation={animation} />
          {/* Control buttons */}
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Skeleton className="h-8 w-8 rounded-full" animation={animation} />
              <Skeleton className="h-8 w-8 rounded-full" animation={animation} />
              <Skeleton className="h-8 w-8 rounded-full" animation={animation} />
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-8 w-16 rounded-md" animation={animation} />
              <Skeleton className="h-8 w-8 rounded-full" animation={animation} />
            </div>
          </div>
        </div>
      </div>
    );
  }
);
SkeletonVideoPlayer.displayName = "SkeletonVideoPlayer";

// List skeleton
export interface SkeletonListProps extends SkeletonProps {
  count?: number;
  itemClassName?: string;
}

const SkeletonList = React.forwardRef<HTMLDivElement, SkeletonListProps>(
  ({ className, count = 5, itemClassName, animation = "shimmer", ...props }, ref) => {
    return (
      <div ref={ref} className={cn("space-y-3", className)} {...props}>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className={cn("flex items-center gap-3", itemClassName)}>
            <SkeletonAvatar animation={animation} />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-3/4" animation={animation} />
              <Skeleton className="h-3 w-1/2" animation={animation} />
            </div>
          </div>
        ))}
      </div>
    );
  }
);
SkeletonList.displayName = "SkeletonList";

export {
  Skeleton,
  SkeletonText,
  SkeletonAvatar,
  SkeletonButton,
  SkeletonTrickCard,
  SkeletonProfile,
  SkeletonVideoPlayer,
  SkeletonList,
};
