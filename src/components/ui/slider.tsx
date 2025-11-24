"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

export interface SliderProps
  extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  variant?: "default" | "brand";
  showValue?: boolean;
  formatValue?: (value: number) => string;
}

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(
  (
    {
      className,
      variant = "default",
      showValue = false,
      formatValue,
      value,
      defaultValue,
      ...props
    },
    ref
  ) => {
    const currentValue = value || defaultValue || [0];
    const firstValue = currentValue[0] ?? 0;
    const displayValue = formatValue
      ? formatValue(firstValue)
      : firstValue.toString();

    return (
      <div className={cn("relative", showValue && "pb-6")}>
        <SliderPrimitive.Root
          ref={ref}
          className={cn(
            "relative flex w-full touch-none select-none items-center",
            className
          )}
          {...(value !== undefined ? { value } : {})}
          {...(defaultValue !== undefined ? { defaultValue } : {})}
          {...props}
        >
          <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-gray-200">
            <SliderPrimitive.Range
              className={cn(
                "absolute h-full",
                variant === "default" && "bg-gray-400",
                variant === "brand" &&
                  "bg-gradient-to-r from-fun-blue to-brand-blue"
              )}
            />
          </SliderPrimitive.Track>
          <SliderPrimitive.Thumb
            className={cn(
              "block h-5 w-5 rounded-full border-2 bg-white ring-offset-white transition-all duration-150",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fun-blue focus-visible:ring-offset-2",
              "disabled:pointer-events-none disabled:opacity-50",
              "hover:scale-110 active:scale-95",
              variant === "default" && "border-gray-400",
              variant === "brand" && "border-fun-blue shadow-md shadow-fun-blue/25"
            )}
          />
        </SliderPrimitive.Root>
        {showValue && (
          <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 text-xs text-gray-500 font-medium">
            {displayValue}
          </span>
        )}
      </div>
    );
  }
);
Slider.displayName = SliderPrimitive.Root.displayName;

// Playback speed slider specifically for video controls
export interface PlaybackSpeedSliderProps {
  value: number;
  onValueChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
}

const speedPresets = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

const PlaybackSpeedSlider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  PlaybackSpeedSliderProps
>(
  (
    {
      value = 1,
      onValueChange,
      min = 0.25,
      max = 2,
      step = 0.25,
      className,
    },
    ref
  ) => {
    const formatSpeed = (speed: number): string => `${speed}x`;

    return (
      <div className={cn("space-y-3", className)}>
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500 font-medium">
            Playback Speed
          </span>
          <span className="text-sm font-semibold text-fun-blue">
            {formatSpeed(value)}
          </span>
        </div>
        <Slider
          ref={ref}
          value={[value]}
          onValueChange={(values) => onValueChange(values[0] ?? 1)}
          min={min}
          max={max}
          step={step}
          variant="brand"
        />
        <div className="flex justify-between text-[10px] text-gray-500">
          {speedPresets
            .filter((s) => s >= min && s <= max)
            .map((speed) => (
              <button
                key={speed}
                onClick={() => onValueChange(speed)}
                className={cn(
                  "px-1.5 py-0.5 rounded transition-colors hover:text-gray-700",
                  value === speed && "text-fun-blue font-medium"
                )}
              >
                {formatSpeed(speed)}
              </button>
            ))}
        </div>
      </div>
    );
  }
);
PlaybackSpeedSlider.displayName = "PlaybackSpeedSlider";

// Range slider for filtering (e.g., difficulty range)
export interface RangeSliderProps
  extends Omit<SliderProps, "value" | "onValueChange" | "defaultValue"> {
  value?: [number, number];
  onValueChange?: (value: [number, number]) => void;
  defaultValue?: [number, number];
}

const RangeSlider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  RangeSliderProps
>(
  (
    {
      className,
      variant = "brand",
      value,
      onValueChange,
      defaultValue = [0, 100],
      showValue = true,
      formatValue,
      ...props
    },
    ref
  ) => {
    const currentValue = value || defaultValue;
    const formatDisplay = formatValue || ((v: number) => v.toString());

    return (
      <div className="space-y-2">
        {showValue && (
          <div className="flex justify-between text-xs text-gray-500">
            <span>{formatDisplay(currentValue[0])}</span>
            <span>{formatDisplay(currentValue[1])}</span>
          </div>
        )}
        <SliderPrimitive.Root
          ref={ref}
          className={cn(
            "relative flex w-full touch-none select-none items-center",
            className
          )}
          {...(value !== undefined ? { value } : {})}
          {...(onValueChange !== undefined ? { onValueChange: onValueChange as (value: number[]) => void } : {})}
          {...(defaultValue !== undefined ? { defaultValue } : {})}
          {...props}
        >
          <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-gray-200">
            <SliderPrimitive.Range
              className={cn(
                "absolute h-full",
                variant === "default" && "bg-gray-400",
                variant === "brand" &&
                  "bg-gradient-to-r from-fun-blue to-brand-blue"
              )}
            />
          </SliderPrimitive.Track>
          <SliderPrimitive.Thumb
            className={cn(
              "block h-5 w-5 rounded-full border-2 bg-white ring-offset-white transition-all duration-150",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fun-blue focus-visible:ring-offset-2",
              "disabled:pointer-events-none disabled:opacity-50",
              "hover:scale-110 active:scale-95",
              variant === "brand" && "border-fun-blue shadow-md shadow-fun-blue/25"
            )}
          />
          <SliderPrimitive.Thumb
            className={cn(
              "block h-5 w-5 rounded-full border-2 bg-white ring-offset-white transition-all duration-150",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fun-blue focus-visible:ring-offset-2",
              "disabled:pointer-events-none disabled:opacity-50",
              "hover:scale-110 active:scale-95",
              variant === "brand" && "border-fun-blue shadow-md shadow-fun-blue/25"
            )}
          />
        </SliderPrimitive.Root>
      </div>
    );
  }
);
RangeSlider.displayName = "RangeSlider";

export { Slider, PlaybackSpeedSlider, RangeSlider };
