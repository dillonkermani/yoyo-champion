"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { PathModule } from "@/lib/data/types";

export interface PathProgressProps {
  modules: PathModule[];
  completedModules: string[];
  currentModuleId: string | null;
  onModuleClick?: (moduleId: string) => void;
  isModuleLocked?: (module: PathModule, index: number) => boolean;
  className?: string;
}

export function PathProgress({
  modules,
  completedModules,
  currentModuleId,
  onModuleClick,
  isModuleLocked,
  className,
}: PathProgressProps) {
  const getModuleStatus = (module: PathModule, index: number) => {
    if (completedModules.includes(module.id)) return "completed";
    if (module.id === currentModuleId) return "current";
    if (isModuleLocked?.(module, index)) return "locked";
    return "available";
  };

  return (
    <div className={cn("relative", className)}>
      {/* Vertical connecting line */}
      <div className="absolute left-[19px] top-[40px] bottom-[40px] w-0.5 bg-border" />

      {/* Progress fill line */}
      <motion.div
        className="absolute left-[19px] top-[40px] w-0.5 bg-brand-teal"
        initial={{ height: 0 }}
        animate={{
          height: `${Math.max(0, (completedModules.length / modules.length) * 100 - 10)}%`,
        }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Module Steps */}
      <div className="space-y-6">
        {modules.map((module, index) => {
          const status = getModuleStatus(module, index);
          const isClickable = status !== "locked" && onModuleClick;

          return (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={cn(
                "relative flex items-start gap-4 group",
                isClickable && "cursor-pointer"
              )}
              onClick={() => isClickable && onModuleClick(module.id)}
            >
              {/* Step Indicator */}
              <div
                className={cn(
                  "relative z-10 flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200",
                  status === "completed" && "bg-brand-teal text-white",
                  status === "current" && "bg-brand-blue text-brand-black ring-4 ring-brand-blue/20",
                  status === "available" && "bg-white border-2 border-brand-teal text-brand-teal",
                  status === "locked" && "bg-surface-secondary border-2 border-border text-muted-foreground",
                  isClickable && "group-hover:scale-110"
                )}
              >
                {status === "completed" ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : status === "locked" ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                ) : (
                  <span className="text-sm font-semibold">{index + 1}</span>
                )}
              </div>

              {/* Module Info */}
              <div
                className={cn(
                  "flex-1 min-w-0 p-4 rounded-lg transition-all duration-200",
                  status === "current" && "bg-brand-blue/10 border border-brand-blue/30",
                  status === "completed" && "bg-brand-green/10",
                  status === "available" && "bg-surface-secondary hover:bg-surface-tertiary",
                  status === "locked" && "bg-surface-secondary opacity-60"
                )}
              >
                <div className="flex items-center gap-2 mb-1">
                  <h4
                    className={cn(
                      "font-semibold text-sm",
                      status === "locked" ? "text-muted-foreground" : "text-brand-black"
                    )}
                  >
                    {module.title}
                  </h4>
                  {status === "current" && (
                    <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-brand-blue text-brand-black">
                      Current
                    </span>
                  )}
                  {status === "completed" && (
                    <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-brand-green text-brand-black">
                      Complete
                    </span>
                  )}
                </div>
                <p
                  className={cn(
                    "text-xs line-clamp-2",
                    status === "locked" ? "text-muted-foreground/70" : "text-muted-foreground"
                  )}
                >
                  {module.description}
                </p>
                <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                    {module.tricks.length} tricks
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// Horizontal variant for compact display
export interface PathProgressHorizontalProps {
  totalModules: number;
  completedModules: number;
  currentModule?: number;
  className?: string;
}

export function PathProgressHorizontal({
  totalModules,
  completedModules,
  currentModule,
  className,
}: PathProgressHorizontalProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {Array.from({ length: totalModules }).map((_, index) => {
        const isCompleted = index < completedModules;
        const isCurrent = index === (currentModule ?? completedModules);
        const isLocked = index > completedModules;

        return (
          <React.Fragment key={index}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-200",
                isCompleted && "bg-brand-teal",
                isCurrent && "bg-brand-blue ring-2 ring-brand-blue/30",
                isLocked && "bg-border"
              )}
            />
            {index < totalModules - 1 && (
              <div
                className={cn(
                  "flex-1 h-0.5 min-w-[12px] max-w-[24px]",
                  index < completedModules ? "bg-brand-teal" : "bg-border"
                )}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default PathProgress;
