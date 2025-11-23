"use client";

import * as React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  elevated?: boolean;
  hover?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, elevated = false, hover = false, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-xl border border-border bg-white text-brand-black",
        elevated ? "shadow-card" : "shadow-subtle",
        hover && "transition-all duration-200 hover:shadow-elevated hover:border-brand-teal/30",
        className
      )}
      {...props}
    />
  )
);
Card.displayName = "Card";

// Motion Card with hover animations
export interface MotionCardProps
  extends Omit<HTMLMotionProps<"div">, "ref">,
    Omit<CardProps, keyof HTMLMotionProps<"div">> {}

const MotionCard = React.forwardRef<HTMLDivElement, MotionCardProps>(
  ({ className, elevated = false, hover = false, children }, ref) => (
    <motion.div
      ref={ref}
      className={cn(
        "rounded-xl border border-border bg-white text-brand-black",
        elevated ? "shadow-card" : "shadow-subtle",
        className
      )}
      {...(hover
        ? {
            whileHover: {
              scale: 1.01,
              boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
            },
          }
        : {})}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  )
);
MotionCard.displayName = "MotionCard";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
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
      "text-xl font-semibold leading-none tracking-tight text-brand-black",
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
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
