"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-bold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fun-blue focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        // Default - Aqua Blue (Primary)
        default:
          "rounded-2xl bg-fun-blue text-white shadow-fun-blue hover:bg-fun-blue-light hover:-translate-y-0.5 active:translate-y-0 active:scale-95",
        // Secondary - Outlined style
        secondary:
          "rounded-2xl bg-white text-brand-black border-2 border-gray-200 hover:border-fun-blue hover:text-fun-blue hover:-translate-y-0.5 active:translate-y-0 active:scale-95",
        // Outline - Bold border
        outline:
          "rounded-2xl border-2 border-brand-black text-brand-black bg-transparent hover:bg-brand-black hover:text-white active:scale-95",
        // Ghost - Minimal
        ghost:
          "rounded-2xl text-brand-black hover:bg-gray-100 active:bg-gray-200",
        // Destructive - Red
        destructive:
          "rounded-2xl bg-fun-red text-white shadow-fun-red hover:bg-fun-red-light hover:-translate-y-0.5 active:translate-y-0 active:scale-95",
        // Brand - Original brand blue
        brand:
          "rounded-2xl bg-brand-blue text-brand-black font-bold shadow-fun-blue hover:bg-brand-blue/90 hover:-translate-y-0.5 active:translate-y-0 active:scale-95",
        // Link style
        link: "text-fun-blue underline-offset-4 hover:underline",
        // Gold variant (formerly teal)
        teal:
          "rounded-2xl bg-xp text-brand-black font-bold hover:bg-xp-light hover:-translate-y-0.5 active:translate-y-0 active:scale-95",

        // === NEW FUN VARIANTS ===
        // Success - Gold (like completing a lesson/achievement)
        success:
          "rounded-2xl bg-xp text-brand-black shadow-fun-yellow-lg hover:bg-xp-light hover:-translate-y-1 hover:shadow-glow-yellow active:translate-y-0 active:scale-95",
        // Streak - Fire gradient for streaks
        streak:
          "rounded-2xl text-white shadow-fun-red hover:-translate-y-1 active:translate-y-0 active:scale-95 bg-gradient-to-r from-fun-red to-fun-orange hover:shadow-glow-red",
        // XP - Gold gradient for XP/rewards
        xp:
          "rounded-2xl text-brand-black shadow-fun-yellow hover:-translate-y-1 active:translate-y-0 active:scale-95 bg-gradient-to-r from-xp to-xp-light hover:shadow-glow-yellow",
        // Fun Blue - Bright blue
        funBlue:
          "rounded-2xl bg-fun-blue text-white shadow-fun-blue-lg hover:bg-fun-blue-light hover:-translate-y-1 hover:shadow-glow-blue active:translate-y-0 active:scale-95",
        // Fun Purple - Playful purple
        funPurple:
          "rounded-2xl bg-fun-purple text-white shadow-fun-purple-lg hover:bg-fun-purple-light hover:-translate-y-1 hover:shadow-glow-purple active:translate-y-0 active:scale-95",
        // Fun Orange - Energetic orange
        funOrange:
          "rounded-2xl bg-fun-orange text-white shadow-fun-orange-lg hover:bg-fun-orange-light hover:-translate-y-1 active:translate-y-0 active:scale-95",
        // Fun Pink - Playful pink
        funPink:
          "rounded-2xl bg-fun-pink text-white shadow-fun-pink-lg hover:bg-fun-pink-light hover:-translate-y-1 active:translate-y-0 active:scale-95",
        // Celebration - Rainbow gradient
        celebration:
          "rounded-2xl text-white hover:-translate-y-1 active:translate-y-0 active:scale-95 bg-gradient-to-r from-fun-red via-fun-yellow to-fun-blue animate-pulse",
      },
      size: {
        sm: "h-10 px-4 text-sm",
        default: "h-12 px-6 py-3 text-base",
        lg: "h-14 px-8 text-lg",
        xl: "h-16 px-10 text-xl",
        icon: "h-12 w-12 p-0 rounded-full",
        "icon-sm": "h-10 w-10 p-0 rounded-full",
        "icon-lg": "h-14 w-14 p-0 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  sparkle?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, asChild = false, loading = false, sparkle = false, children, disabled, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, className }),
          sparkle && "sparkle"
        )}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <svg
              className="animate-spin h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Loading...</span>
          </span>
        ) : (
          children
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";

// Animated button variant using Framer Motion
export interface MotionButtonProps
  extends Omit<HTMLMotionProps<"button">, "ref">,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  sparkle?: boolean;
  bouncy?: boolean;
}

const MotionButton = React.forwardRef<HTMLButtonElement, MotionButtonProps>(
  ({ className, variant, size, loading = false, sparkle = false, bouncy = true, children, disabled, ...props }, ref) => {
    return (
      <motion.button
        className={cn(
          buttonVariants({ variant, size, className }),
          sparkle && "sparkle"
        )}
        ref={ref}
        disabled={disabled || loading}
        whileHover={bouncy ? { scale: 1.05, y: -2 } : { scale: 1.02 }}
        whileTap={{ scale: 0.95, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 17
        }}
        {...props}
      >
        {loading ? (
          <motion.span
            className="flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </motion.svg>
            <span>Loading...</span>
          </motion.span>
        ) : (
          children
        )}
      </motion.button>
    );
  }
);
MotionButton.displayName = "MotionButton";

// Fun icon button for actions like hearts, streaks, XP
export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  color?: "teal" | "blue" | "purple" | "orange" | "yellow" | "red" | "pink";
  glow?: boolean;
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, icon, color = "blue", glow = false, ...props }, ref) => {
    const colorClasses = {
      teal: "bg-xp text-brand-black hover:bg-xp-light shadow-fun-yellow",
      blue: "bg-fun-blue text-white hover:bg-fun-blue-light shadow-fun-blue",
      purple: "bg-fun-purple text-white hover:bg-fun-purple-light shadow-fun-purple",
      orange: "bg-fun-orange text-white hover:bg-fun-orange-light shadow-fun-orange",
      yellow: "bg-xp text-brand-black hover:bg-xp-light shadow-fun-yellow",
      red: "bg-fun-red text-white hover:bg-fun-red-light shadow-fun-red",
      pink: "bg-fun-pink text-white hover:bg-fun-pink-light shadow-fun-pink",
    };

    const glowClasses = {
      teal: "hover:shadow-glow-blue",
      blue: "hover:shadow-glow-blue",
      purple: "hover:shadow-glow-purple",
      orange: "hover:shadow-glow-blue",
      yellow: "hover:shadow-glow-yellow",
      red: "hover:shadow-glow-red",
      pink: "hover:shadow-glow-purple",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "h-12 w-12 rounded-full flex items-center justify-center transition-all duration-200",
          "hover:-translate-y-1 active:translate-y-0 active:scale-95",
          colorClasses[color],
          glow && glowClasses[color],
          className
        )}
        {...props}
      >
        {icon}
      </button>
    );
  }
);
IconButton.displayName = "IconButton";

export { Button, MotionButton, IconButton, buttonVariants };
