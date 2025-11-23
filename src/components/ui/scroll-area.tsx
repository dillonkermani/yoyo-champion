"use client";

import * as React from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { cn } from "@/lib/utils";

export interface ScrollAreaProps
  extends React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> {
  orientation?: "vertical" | "horizontal" | "both";
  scrollbarVariant?: "default" | "thin" | "hidden";
}

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  ScrollAreaProps
>(
  (
    {
      className,
      children,
      orientation = "vertical",
      scrollbarVariant = "default",
      ...props
    },
    ref
  ) => (
    <ScrollAreaPrimitive.Root
      ref={ref}
      className={cn("relative overflow-hidden", className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
        {children}
      </ScrollAreaPrimitive.Viewport>
      {(orientation === "vertical" || orientation === "both") && (
        <ScrollBar orientation="vertical" variant={scrollbarVariant} />
      )}
      {(orientation === "horizontal" || orientation === "both") && (
        <ScrollBar orientation="horizontal" variant={scrollbarVariant} />
      )}
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  )
);
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;

export interface ScrollBarProps
  extends React.ComponentPropsWithoutRef<
    typeof ScrollAreaPrimitive.ScrollAreaScrollbar
  > {
  variant?: "default" | "thin" | "hidden";
}

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  ScrollBarProps
>(({ className, orientation = "vertical", variant = "default", ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" && [
        "h-full border-l border-l-transparent p-[1px]",
        variant === "default" && "w-2.5",
        variant === "thin" && "w-1.5",
        variant === "hidden" && "w-0 opacity-0",
      ],
      orientation === "horizontal" && [
        "h-2.5 flex-col border-t border-t-transparent p-[1px]",
        variant === "default" && "h-2.5",
        variant === "thin" && "h-1.5",
        variant === "hidden" && "h-0 opacity-0",
      ],
      className
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb
      className={cn(
        "relative flex-1 rounded-full bg-gray-300 transition-colors hover:bg-gray-400",
        variant === "hidden" && "opacity-0"
      )}
    />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
));
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

// Horizontal scroll container for cards/items
export interface HorizontalScrollProps extends React.HTMLAttributes<HTMLDivElement> {
  showScrollbar?: boolean;
  gap?: "sm" | "default" | "lg";
  padding?: boolean;
}

const HorizontalScroll = React.forwardRef<HTMLDivElement, HorizontalScrollProps>(
  (
    { className, children, showScrollbar = false, gap = "default", padding = true, dir },
    ref
  ) => {
    const gapClasses = {
      sm: "gap-2",
      default: "gap-4",
      lg: "gap-6",
    };

    return (
      <ScrollArea
        ref={ref}
        orientation="horizontal"
        scrollbarVariant={showScrollbar ? "thin" : "hidden"}
        className={cn("w-full", className)}
        {...(dir ? { dir: dir as "ltr" | "rtl" } : {})}
      >
        <div
          className={cn(
            "flex",
            gapClasses[gap],
            padding && "pb-4"
          )}
        >
          {children}
        </div>
      </ScrollArea>
    );
  }
);
HorizontalScroll.displayName = "HorizontalScroll";

// Virtual scroll area for large lists (basic implementation)
export interface VirtualScrollAreaProps extends ScrollAreaProps {
  itemCount: number;
  itemHeight: number;
  overscan?: number;
  renderItem: (index: number) => React.ReactNode;
}

const VirtualScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  VirtualScrollAreaProps
>(
  (
    {
      className,
      itemCount,
      itemHeight,
      overscan = 5,
      renderItem,
      ...props
    },
    ref
  ) => {
    const [scrollTop, setScrollTop] = React.useState(0);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const [containerHeight, setContainerHeight] = React.useState(0);

    React.useEffect(() => {
      if (!containerRef.current) return;

      const resizeObserver = new ResizeObserver((entries) => {
        const entry = entries[0];
        if (entry) {
          setContainerHeight(entry.contentRect.height);
        }
      });
      resizeObserver.observe(containerRef.current);
      return () => resizeObserver.disconnect();
    }, []);

    const totalHeight = itemCount * itemHeight;
    const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
    const endIndex = Math.min(
      itemCount - 1,
      Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan
    );

    const visibleItems = [];
    for (let i = startIndex; i <= endIndex; i++) {
      visibleItems.push(
        <div
          key={i}
          style={{
            position: "absolute",
            top: i * itemHeight,
            height: itemHeight,
            width: "100%",
          }}
        >
          {renderItem(i)}
        </div>
      );
    }

    return (
      <ScrollArea
        ref={ref}
        className={cn("relative", className)}
        {...props}
      >
        <div
          ref={containerRef}
          className="h-full w-full overflow-auto"
          onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
        >
          <div style={{ height: totalHeight, position: "relative" }}>
            {visibleItems}
          </div>
        </div>
      </ScrollArea>
    );
  }
);
VirtualScrollArea.displayName = "VirtualScrollArea";

export { ScrollArea, ScrollBar, HorizontalScroll, VirtualScrollArea };
