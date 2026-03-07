"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import { Gauge } from "lucide-react";

export interface SpeedControlProps {
  value: number;
  onValueChange: (value: number) => void;
  className?: string;
  variant?: "slider" | "buttons" | "compact";
}

const speedPresets = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 2];

export const SpeedControl: React.FC<SpeedControlProps> = ({
  value = 1,
  onValueChange,
  className,
  variant = "slider",
}) => {
  const formatSpeed = (speed: number): string => `${speed}x`;

  if (variant === "compact") {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <Gauge className="w-4 h-4 text-slate-400" />
        <select
          value={value}
          onChange={(e) => onValueChange(parseFloat(e.target.value))}
          className="bg-transparent text-sm text-white border-none focus:outline-none focus:ring-0 cursor-pointer appearance-none pr-4"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right center",
          }}
        >
          {speedPresets.map((speed) => (
            <option key={speed} value={speed} className="bg-navy-dark">
              {formatSpeed(speed)}
            </option>
          ))}
        </select>
      </div>
    );
  }

  if (variant === "buttons") {
    return (
      <div className={cn("space-y-2", className)}>
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
            <Gauge className="w-3.5 h-3.5" />
            Speed
          </span>
          <span className="text-sm font-semibold text-electric-blue">
            {formatSpeed(value)}
          </span>
        </div>
        <div className="flex gap-1">
          {speedPresets.map((speed) => (
            <button
              key={speed}
              onClick={() => onValueChange(speed)}
              className={cn(
                "flex-1 py-1.5 text-xs font-medium rounded-md transition-all",
                value === speed
                  ? "bg-electric-blue text-white"
                  : "bg-navy-dark text-slate-400 hover:text-slate-200 hover:bg-navy"
              )}
            >
              {formatSpeed(speed)}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Default slider variant
  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
          <Gauge className="w-3.5 h-3.5" />
          Playback Speed
        </span>
        <span className="text-sm font-semibold text-electric-blue">
          {formatSpeed(value)}
        </span>
      </div>
      <Slider
        value={[value]}
        onValueChange={(values) => onValueChange(values[0] ?? 1)}
        min={0.25}
        max={2}
        step={0.25}
        variant="brand"
      />
      <div className="flex justify-between text-[10px] text-slate-500">
        {speedPresets.map((speed) => (
          <button
            key={speed}
            onClick={() => onValueChange(speed)}
            className={cn(
              "px-1.5 py-0.5 rounded transition-colors hover:text-slate-300",
              value === speed && "text-electric-blue font-medium"
            )}
          >
            {formatSpeed(speed)}
          </button>
        ))}
      </div>
    </div>
  );
};

// Speed indicator badge for displaying current speed
export interface SpeedBadgeProps {
  speed: number;
  className?: string;
}

export const SpeedBadge: React.FC<SpeedBadgeProps> = ({ speed, className }) => {
  if (speed === 1) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium",
        speed < 1
          ? "bg-amber-500/20 text-amber-400"
          : "bg-fun-blue/20 text-fun-blue",
        className
      )}
    >
      <Gauge className="w-3 h-3" />
      {speed}x
    </motion.div>
  );
};

export default SpeedControl;
