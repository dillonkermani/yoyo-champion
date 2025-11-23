"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { TrickStep } from "@/lib/data";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export interface StepMarkersProps {
  steps: TrickStep[];
  duration: number;
  currentTime: number;
  currentStepId?: string | undefined;
  onStepClick: (stepId: string, timestamp: number) => void;
  className?: string;
}

export const StepMarkers: React.FC<StepMarkersProps> = ({
  steps,
  duration,
  currentTime,
  currentStepId,
  onStepClick,
  className,
}) => {
  const getMarkerPosition = (timestamp: number) => {
    return (timestamp / duration) * 100;
  };

  // Determine current step based on time
  const activeStepId = React.useMemo(() => {
    if (currentStepId) return currentStepId;

    for (let i = steps.length - 1; i >= 0; i--) {
      const step = steps[i];
      if (step && currentTime >= step.timestamp) {
        return step.id;
      }
    }
    return steps[0]?.id;
  }, [currentTime, steps, currentStepId]);

  if (duration <= 0 || steps.length === 0) return null;

  return (
    <div className={cn("relative h-4", className)}>
      <TooltipProvider delayDuration={0}>
        {steps.map((step) => {
          const position = getMarkerPosition(step.timestamp);
          const isActive = activeStepId === step.id;
          const isPast = currentTime > step.timestamp + (step.duration || 0);

          return (
            <Tooltip key={step.id}>
              <TooltipTrigger asChild>
                <button
                  onClick={() => onStepClick(step.id, step.timestamp)}
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-10"
                  style={{ left: `${position}%` }}
                >
                  <motion.div
                    initial={false}
                    animate={{
                      scale: isActive ? 1.3 : 1,
                      backgroundColor: isActive
                        ? "rgb(0, 163, 255)"
                        : isPast
                        ? "rgb(100, 116, 139)"
                        : "rgb(255, 255, 255)",
                    }}
                    transition={{ duration: 0.2 }}
                    className={cn(
                      "w-3 h-3 rounded-full border-2 cursor-pointer",
                      isActive
                        ? "border-white shadow-md shadow-electric-blue/50"
                        : isPast
                        ? "border-slate-500"
                        : "border-electric-blue hover:scale-110"
                    )}
                  />
                </button>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                variant="dark"
                className="max-w-[200px]"
              >
                <div className="space-y-1">
                  <p className="font-medium text-sm">{step.title}</p>
                  <p className="text-xs text-slate-400">
                    Step {step.order} of {steps.length}
                  </p>
                </div>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </TooltipProvider>
    </div>
  );
};

// Step list for sidebar
export interface StepListProps {
  steps: TrickStep[];
  currentStepId?: string | undefined;
  completedStepIds?: string[];
  onStepClick: (stepId: string, timestamp: number) => void;
  className?: string;
}

export const StepList: React.FC<StepListProps> = ({
  steps,
  currentStepId,
  completedStepIds = [],
  onStepClick,
  className,
}) => {
  return (
    <div className={cn("space-y-2", className)}>
      {steps.map((step) => {
        const isActive = currentStepId === step.id;
        const isCompleted = completedStepIds.includes(step.id);

        return (
          <motion.button
            key={step.id}
            onClick={() => onStepClick(step.id, step.timestamp)}
            className={cn(
              "w-full text-left p-3 rounded-lg transition-colors",
              isActive
                ? "bg-electric-blue/20 border border-electric-blue/30"
                : isCompleted
                ? "bg-navy-light/50 border border-slate-700"
                : "bg-navy-dark/50 border border-transparent hover:border-slate-700"
            )}
            initial={false}
            animate={{
              scale: isActive ? 1 : 1,
            }}
          >
            <div className="flex items-start gap-3">
              {/* Step Number */}
              <div
                className={cn(
                  "flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold",
                  isActive
                    ? "bg-electric-blue text-white"
                    : isCompleted
                    ? "bg-emerald-500 text-white"
                    : "bg-slate-700 text-slate-400"
                )}
              >
                {isCompleted ? (
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  step.order
                )}
              </div>

              {/* Step Content */}
              <div className="flex-1 min-w-0">
                <h4
                  className={cn(
                    "text-sm font-medium truncate",
                    isActive ? "text-white" : "text-slate-200"
                  )}
                >
                  {step.title}
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2 mt-0.5">
                  {step.description}
                </p>
                {step.tipText && (
                  <p className="text-xs text-amber-400 mt-1 flex items-start gap-1">
                    <span>Tip:</span>
                    <span className="line-clamp-1">{step.tipText}</span>
                  </p>
                )}
              </div>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
};

// Compact step indicator
export interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  totalSteps,
  className,
}) => {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      <span className="text-sm font-medium text-white">
        Step {currentStep}
      </span>
      <span className="text-sm text-slate-400">of {totalSteps}</span>
    </div>
  );
};

export default StepMarkers;
