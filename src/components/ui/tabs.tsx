"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const Tabs = TabsPrimitive.Root;

export interface TabsListProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> {
  variant?: "default" | "pills" | "underline";
}

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  TabsListProps
>(({ className, variant = "default", ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center gap-1 text-gray-500",
      variant === "default" && "rounded-lg bg-gray-100 p-1",
      variant === "pills" && "gap-2",
      variant === "underline" && "border-b border-gray-200 gap-0",
      className
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

export interface TabsTriggerProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> {
  variant?: "default" | "pills" | "underline";
}

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ className, variant = "default", ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
      variant === "default" &&
        "rounded-md px-3 py-1.5 data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm",
      variant === "pills" &&
        "rounded-full px-4 py-2 data-[state=active]:bg-brand-teal data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:shadow-brand-teal/25",
      variant === "underline" &&
        "px-4 py-3 border-b-2 border-transparent -mb-px data-[state=active]:border-brand-teal data-[state=active]:text-gray-900",
      className
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-4 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

// Animated tabs content with fade and slide
const AnimatedTabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-4 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2",
      className
    )}
    {...props}
  >
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  </TabsPrimitive.Content>
));
AnimatedTabsContent.displayName = "AnimatedTabsContent";

// Video angle tabs specifically for yoyo tutorial viewing
export interface VideoAngleTabsProps {
  angles: Array<{
    id: string;
    label: string;
    icon?: React.ReactNode;
  }>;
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
}

const VideoAngleTabs: React.FC<VideoAngleTabsProps> = ({
  angles,
  value,
  onValueChange,
  className,
}) => {
  return (
    <Tabs value={value} onValueChange={onValueChange} className={className}>
      <TabsList variant="pills" className="bg-navy-dark/80 backdrop-blur-sm p-1 rounded-full">
        {angles.map((angle) => (
          <TabsTrigger
            key={angle.id}
            value={angle.id}
            variant="pills"
            className="text-xs px-3 py-1.5"
          >
            {angle.icon && <span className="mr-1.5">{angle.icon}</span>}
            {angle.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};
VideoAngleTabs.displayName = "VideoAngleTabs";

export { Tabs, TabsList, TabsTrigger, TabsContent, AnimatedTabsContent, VideoAngleTabs };
