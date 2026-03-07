"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Repeat, X, Flag } from "lucide-react";

export interface LoopSectionProps {
  loopStart: number | null;
  loopEnd: number | null;
  currentTime: number;
  duration: number;
  onSetLoopStart: (time: number) => void;
  onSetLoopEnd: (time: number) => void;
  onClearLoop: () => void;
  className?: string;
}

const formatTime = (seconds: number): string => {
  if (isNaN(seconds) || !isFinite(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

export const LoopSection: React.FC<LoopSectionProps> = ({
  loopStart,
  loopEnd,
  currentTime,
  duration,
  onSetLoopStart,
  onSetLoopEnd,
  onClearLoop,
  className,
}) => {
  const hasLoop = loopStart !== null && loopEnd !== null;
  const hasStartOnly = loopStart !== null && loopEnd === null;

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
          <Repeat className="w-3.5 h-3.5" />
          Loop Section
        </span>
        {hasLoop && (
          <span className="text-xs text-electric-blue">
            {formatTime(loopStart!)} - {formatTime(loopEnd!)}
          </span>
        )}
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant={loopStart !== null ? "brand" : "secondary"}
          size="sm"
          onClick={() => onSetLoopStart(currentTime)}
          className="flex-1"
        >
          <Flag className="w-3.5 h-3.5 mr-1.5" />
          Set A
          {loopStart !== null && (
            <span className="ml-1.5 text-[10px] opacity-80">
              ({formatTime(loopStart)})
            </span>
          )}
        </Button>

        <Button
          variant={loopEnd !== null ? "brand" : "secondary"}
          size="sm"
          onClick={() => onSetLoopEnd(currentTime)}
          disabled={loopStart === null}
          className="flex-1"
        >
          <Flag className="w-3.5 h-3.5 mr-1.5" />
          Set B
          {loopEnd !== null && (
            <span className="ml-1.5 text-[10px] opacity-80">
              ({formatTime(loopEnd)})
            </span>
          )}
        </Button>

        <AnimatePresence>
          {(loopStart !== null || loopEnd !== null) && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={onClearLoop}
                className="text-slate-400 hover:text-red-400"
              >
                <X className="w-4 h-4" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Loop Status Indicator */}
      <AnimatePresence>
        {hasLoop && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="flex items-center gap-2 p-2 rounded-lg bg-electric-blue/10 border border-electric-blue/20">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-electric-blue/20">
                <Repeat className="w-3.5 h-3.5 text-electric-blue animate-pulse" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-electric-blue font-medium">
                  Loop Active
                </p>
                <p className="text-[10px] text-slate-400">
                  Looping from {formatTime(loopStart!)} to {formatTime(loopEnd!)}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Visual Loop Range on Mini Timeline */}
      {duration > 0 && (
        <div className="relative h-2 bg-navy-dark rounded-full overflow-hidden">
          {/* Current playhead */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-white z-10"
            style={{ left: `${(currentTime / duration) * 100}%` }}
          />

          {/* Loop region */}
          {hasLoop && (
            <div
              className="absolute top-0 bottom-0 bg-electric-blue/40 border-l-2 border-r-2 border-electric-blue"
              style={{
                left: `${(loopStart! / duration) * 100}%`,
                width: `${((loopEnd! - loopStart!) / duration) * 100}%`,
              }}
            />
          )}

          {/* Start marker only */}
          {hasStartOnly && (
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-electric-blue"
              style={{ left: `${(loopStart! / duration) * 100}%` }}
            />
          )}
        </div>
      )}
    </div>
  );
};

// Compact loop control for toolbar
export interface LoopButtonProps {
  isLooping: boolean;
  onToggle: () => void;
  className?: string;
}

export const LoopButton: React.FC<LoopButtonProps> = ({
  isLooping,
  onToggle,
  className,
}) => {
  return (
    <button
      onClick={onToggle}
      className={cn(
        "p-2 rounded-lg transition-colors",
        isLooping
          ? "bg-electric-blue/20 text-electric-blue"
          : "text-slate-400 hover:text-slate-200 hover:bg-white/5",
        className
      )}
    >
      <Repeat className="w-4 h-4" />
    </button>
  );
};

export default LoopSection;
