"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { TrickStep } from "@/lib/data/types";
import {
  CheckCircle2,
  Play,
  Lightbulb,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";

export interface LessonStepsProps {
  steps: TrickStep[];
  currentStepIndex: number;
  completedSteps: number[];
  onStepSelect: (index: number) => void;
  onStepComplete: (index: number) => void;
  onSeekToTimestamp: (timestamp: number) => void;
  commonMistakes?: string[];
  className?: string;
}

const formatTime = (seconds: number): string => {
  if (isNaN(seconds) || !isFinite(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

export function LessonSteps({
  steps,
  currentStepIndex,
  completedSteps,
  onStepSelect,
  onStepComplete,
  onSeekToTimestamp,
  commonMistakes = [],
  className,
}: LessonStepsProps) {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const currentStep = steps[currentStepIndex];

  // Auto-scroll to current step on mobile
  React.useEffect(() => {
    if (scrollContainerRef.current && currentStepIndex >= 0) {
      const stepElements = scrollContainerRef.current.querySelectorAll("[data-step]");
      const currentElement = stepElements[currentStepIndex];
      if (currentElement) {
        currentElement.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  }, [currentStepIndex]);

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      onStepSelect(currentStepIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      onStepSelect(currentStepIndex + 1);
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Horizontal Step Navigation - Duolingo Style */}
      <div className="relative">
        {/* Step Progress Dots */}
        <div
          ref={scrollContainerRef}
          className="flex items-center gap-2 overflow-x-auto py-3 px-1 scrollbar-hide snap-x snap-mandatory"
        >
          {steps.map((step, index) => {
            const isCompleted = completedSteps.includes(index);
            const isCurrent = index === currentStepIndex;
            const isLocked = index > Math.max(...completedSteps, currentStepIndex) + 1 && completedSteps.length > 0;

            return (
              <motion.button
                key={step.id}
                data-step={index}
                onClick={() => !isLocked && onStepSelect(index)}
                className={cn(
                  "relative flex-shrink-0 snap-center transition-all duration-200",
                  isLocked ? "cursor-not-allowed" : "cursor-pointer"
                )}
                whileHover={!isLocked ? { scale: 1.1 } : {}}
                whileTap={!isLocked ? { scale: 0.95 } : {}}
              >
                {/* Step Circle */}
                <div
                  className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center border-3 transition-all duration-300",
                    isCompleted && "bg-fun-blue border-fun-blue text-white",
                    isCurrent && !isCompleted && "bg-fun-blue border-fun-blue text-white ring-4 ring-fun-blue/30",
                    !isCurrent && !isCompleted && !isLocked && "bg-white border-gray-300 text-gray-600 hover:border-fun-blue",
                    isLocked && "bg-gray-100 border-gray-200 text-gray-400"
                  )}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-6 h-6" />
                  ) : (
                    <span className="text-lg font-bold">{step.order}</span>
                  )}
                </div>

                {/* Current Step Pulse */}
                {isCurrent && !isCompleted && (
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-fun-blue"
                    initial={{ scale: 1, opacity: 1 }}
                    animate={{ scale: 1.4, opacity: 0 }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}

                {/* Step Label (visible on hover or current) */}
                <AnimatePresence>
                  {isCurrent && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap"
                    >
                      <span className="text-xs font-medium text-fun-blue">
                        Step {step.order}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </div>

        {/* Progress Line */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -z-10 mx-6 -translate-y-1/2">
          <motion.div
            className="h-full bg-gradient-to-r from-fun-blue to-fun-purple rounded-full"
            initial={{ width: 0 }}
            animate={{
              width: `${((Math.max(...completedSteps, -1) + 1) / steps.length) * 100}%`,
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Current Step Detail Card */}
      <AnimatePresence mode="wait">
        {currentStep && (
          <motion.div
            key={currentStep.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl border-2 border-gray-100 shadow-lg overflow-hidden"
          >
            {/* Step Header */}
            <div className="bg-gradient-to-r from-fun-blue/10 to-fun-purple/10 px-5 py-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-fun-blue text-white flex items-center justify-center font-bold text-lg">
                    {currentStep.order}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-brand-black">
                      {currentStep.title}
                    </h3>
                    <button
                      onClick={() => onSeekToTimestamp(currentStep.timestamp)}
                      className="text-sm text-fun-blue hover:text-fun-blue-dark flex items-center gap-1 transition-colors"
                    >
                      <Play className="w-3.5 h-3.5" />
                      Jump to {formatTime(currentStep.timestamp)}
                    </button>
                  </div>
                </div>

                {/* Got it! Button */}
                <Button
                  variant={completedSteps.includes(currentStepIndex) ? "success" : "default"}
                  size="sm"
                  onClick={() => onStepComplete(currentStepIndex)}
                  className="gap-2"
                >
                  {completedSteps.includes(currentStepIndex) ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      Got it!
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Got it!
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Step Content */}
            <div className="p-5 space-y-4">
              {/* Instructions */}
              <p className="text-brand-black leading-relaxed">
                {currentStep.description}
              </p>

              {/* Pro Tip Callout */}
              {currentStep.tipText && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-r from-xp/20 to-xp-light/20 border border-xp/30"
                >
                  <div className="w-8 h-8 rounded-full bg-xp flex items-center justify-center flex-shrink-0">
                    <Lightbulb className="w-4 h-4 text-brand-black" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-brand-black mb-0.5">
                      Pro Tip
                    </p>
                    <p className="text-sm text-brand-black/80">
                      {currentStep.tipText}
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Common Mistake Warning (show one relevant to this step if available) */}
              {commonMistakes.length > 0 && currentStepIndex < commonMistakes.length && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-start gap-3 p-4 rounded-xl bg-fun-red/10 border border-fun-red/20"
                >
                  <div className="w-8 h-8 rounded-full bg-fun-red/20 flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="w-4 h-4 text-fun-red" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-fun-red mb-0.5">
                      Watch Out!
                    </p>
                    <p className="text-sm text-brand-black/80">
                      {commonMistakes[currentStepIndex]}
                    </p>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Navigation Footer */}
            <div className="flex items-center justify-between px-5 py-4 bg-gray-50 border-t border-gray-100">
              <Button
                variant="ghost"
                size="sm"
                onClick={handlePrevious}
                disabled={currentStepIndex === 0}
                className="gap-1"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>

              <div className="flex items-center gap-1.5">
                {steps.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => onStepSelect(index)}
                    className={cn(
                      "w-2 h-2 rounded-full transition-all",
                      index === currentStepIndex && "w-6 bg-fun-blue",
                      index !== currentStepIndex && completedSteps.includes(index) && "bg-fun-blue",
                      index !== currentStepIndex && !completedSteps.includes(index) && "bg-gray-300"
                    )}
                  />
                ))}
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleNext}
                disabled={currentStepIndex === steps.length - 1}
                className="gap-1"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Compact step indicator for header/toolbar
export interface StepIndicatorProps {
  total: number;
  completed: number;
  current: number;
  className?: string;
}

export function StepIndicator({
  total,
  completed,
  current,
  className,
}: StepIndicatorProps) {
  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      {Array.from({ length: total }).map((_, index) => {
        const isCompleted = index < completed;
        const isCurrent = index === current;

        return (
          <motion.div
            key={index}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              isCompleted && "bg-fun-blue w-2",
              isCurrent && "bg-fun-blue w-4",
              !isCompleted && !isCurrent && "bg-gray-300 w-2"
            )}
            initial={isCompleted ? { scale: 0 } : {}}
            animate={isCompleted ? { scale: 1 } : {}}
            transition={{ delay: index * 0.05, type: "spring", stiffness: 500 }}
          />
        );
      })}
    </div>
  );
}

// Mini lesson progress for cards
export interface MiniLessonProgressProps {
  stepsCompleted: number;
  totalSteps: number;
  className?: string;
}

export function MiniLessonProgress({
  stepsCompleted,
  totalSteps,
  className,
}: MiniLessonProgressProps) {
  const percentage = (stepsCompleted / totalSteps) * 100;

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-fun-blue to-fun-blue-light rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      <span className="text-xs font-medium text-muted-foreground">
        {stepsCompleted}/{totalSteps}
      </span>
    </div>
  );
}

export default LessonSteps;
