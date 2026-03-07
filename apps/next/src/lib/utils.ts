import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names using clsx and tailwind-merge
 * Handles conditional classes and resolves Tailwind CSS conflicts
 * @param inputs - Class values to merge
 * @returns Merged class string
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Brand color utilities
 */
export const brandColors = {
  electricBlue: "hsl(210, 100%, 50%)",
  electricBlueLight: "hsl(210, 100%, 60%)",
  electricBlueDark: "hsl(210, 100%, 40%)",
  navy: "hsl(220, 40%, 13%)",
  navyLight: "hsl(220, 35%, 18%)",
  navyDark: "hsl(220, 45%, 8%)",
  gold: "hsl(45, 100%, 50%)",
  goldLight: "hsl(45, 100%, 60%)",
  goldDark: "hsl(45, 100%, 40%)",
} as const;

/**
 * Animation durations for consistent motion
 */
export const animationDurations = {
  fast: 0.15,
  normal: 0.2,
  slow: 0.3,
  slower: 0.5,
} as const;

/**
 * Easing functions for Framer Motion
 */
export const easings = {
  easeOut: [0.16, 1, 0.3, 1],
  easeIn: [0.7, 0, 0.84, 0],
  easeInOut: [0.83, 0, 0.17, 1],
  spring: { type: "spring", stiffness: 400, damping: 30 },
} as const;
