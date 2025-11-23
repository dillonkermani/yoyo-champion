"use client";

import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { cn } from "@/lib/utils";

export interface SeparatorProps
  extends React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> {
  variant?: "default" | "gradient" | "dashed";
  label?: string;
}

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  SeparatorProps
>(
  (
    {
      className,
      orientation = "horizontal",
      decorative = true,
      variant = "default",
      label,
      ...props
    },
    ref
  ) => {
    const separatorElement = (
      <SeparatorPrimitive.Root
        ref={ref}
        decorative={decorative}
        orientation={orientation}
        className={cn(
          "shrink-0",
          orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
          variant === "default" && "bg-gray-200",
          variant === "gradient" &&
            "bg-gradient-to-r from-transparent via-gray-300 to-transparent",
          variant === "dashed" && "border-t border-dashed border-gray-300 bg-transparent",
          className
        )}
        {...props}
      />
    );

    if (label) {
      return (
        <div
          className={cn(
            "flex items-center",
            orientation === "horizontal" ? "w-full" : "flex-col h-full"
          )}
        >
          <SeparatorPrimitive.Root
            decorative={decorative}
            orientation={orientation}
            className={cn(
              "shrink-0 flex-1",
              orientation === "horizontal" ? "h-[1px]" : "w-[1px]",
              variant === "default" && "bg-gray-200",
              variant === "gradient" &&
                orientation === "horizontal" &&
                "bg-gradient-to-r from-transparent via-gray-300 to-gray-300",
              variant === "gradient" &&
                orientation === "vertical" &&
                "bg-gradient-to-b from-transparent via-gray-300 to-gray-300"
            )}
          />
          <span
            className={cn(
              "text-xs text-gray-500 font-medium uppercase tracking-wider",
              orientation === "horizontal" ? "px-3" : "py-3 [writing-mode:vertical-lr]"
            )}
          >
            {label}
          </span>
          <SeparatorPrimitive.Root
            decorative={decorative}
            orientation={orientation}
            className={cn(
              "shrink-0 flex-1",
              orientation === "horizontal" ? "h-[1px]" : "w-[1px]",
              variant === "default" && "bg-gray-200",
              variant === "gradient" &&
                orientation === "horizontal" &&
                "bg-gradient-to-r from-gray-300 via-gray-300 to-transparent",
              variant === "gradient" &&
                orientation === "vertical" &&
                "bg-gradient-to-b from-gray-300 via-gray-300 to-transparent"
            )}
          />
        </div>
      );
    }

    return separatorElement;
  }
);
Separator.displayName = SeparatorPrimitive.Root.displayName;

// Decorative divider with icon
export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  variant?: SeparatorProps["variant"];
}

const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  ({ className, icon, variant = "default", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex items-center w-full", className)}
        {...props}
      >
        <div
          className={cn(
            "flex-1 h-[1px]",
            variant === "default" && "bg-gray-200",
            variant === "gradient" &&
              "bg-gradient-to-r from-transparent via-gray-300 to-gray-300"
          )}
        />
        {icon && (
          <div className="px-4 text-gray-600">{icon}</div>
        )}
        <div
          className={cn(
            "flex-1 h-[1px]",
            variant === "default" && "bg-gray-200",
            variant === "gradient" &&
              "bg-gradient-to-r from-gray-300 via-gray-300 to-transparent"
          )}
        />
      </div>
    );
  }
);
Divider.displayName = "Divider";

// Spacer component for consistent spacing
export interface SpacerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  axis?: "horizontal" | "vertical";
}

const Spacer = React.forwardRef<HTMLDivElement, SpacerProps>(
  ({ className, size = "md", axis = "vertical", ...props }, ref) => {
    const sizeMap = {
      xs: axis === "vertical" ? "h-1" : "w-1",
      sm: axis === "vertical" ? "h-2" : "w-2",
      md: axis === "vertical" ? "h-4" : "w-4",
      lg: axis === "vertical" ? "h-6" : "w-6",
      xl: axis === "vertical" ? "h-8" : "w-8",
      "2xl": axis === "vertical" ? "h-12" : "w-12",
    };

    return (
      <div
        ref={ref}
        className={cn(sizeMap[size], className)}
        aria-hidden="true"
        {...props}
      />
    );
  }
);
Spacer.displayName = "Spacer";

export { Separator, Divider, Spacer };
