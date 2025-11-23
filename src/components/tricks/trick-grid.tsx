"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { TrickCard, TrickCardSkeleton } from "./trick-card";
import { Button } from "@/components/ui/button";
import type { Trick } from "@/lib/data/types";
import type { TrickStatus } from "@/stores/progress-store";

// Animation variants for grid items
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.2,
    },
  },
};

export interface TrickGridProps {
  tricks: Trick[];
  getTrickStatus?: (trickId: string) => TrickStatus | "locked";
  isLoading?: boolean;
  emptyMessage?: string;
  emptyDescription?: string;
  className?: string;
  // Pagination props
  hasMore?: boolean;
  onLoadMore?: () => void;
  loadingMore?: boolean;
}

export function TrickGrid({
  tricks,
  getTrickStatus,
  isLoading = false,
  emptyMessage = "No tricks found",
  emptyDescription = "Try adjusting your filters or search query",
  className,
  hasMore = false,
  onLoadMore,
  loadingMore = false,
}: TrickGridProps) {
  // Loading state with skeletons
  if (isLoading) {
    return (
      <div
        className={cn(
          "grid gap-4 sm:gap-6",
          "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
          className
        )}
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <TrickCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  // Empty state
  if (tricks.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          "flex flex-col items-center justify-center py-16 px-4 text-center",
          "rounded-xl border border-gray-200 bg-gray-50",
          className
        )}
      >
        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mb-4">
          <svg
            className="w-8 h-8 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{emptyMessage}</h3>
        <p className="text-sm text-gray-500 max-w-sm">{emptyDescription}</p>
      </motion.div>
    );
  }

  return (
    <div className={cn("space-y-6", className)}>
      {/* Trick Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className={cn(
          "grid gap-4 sm:gap-6",
          "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        )}
      >
        <AnimatePresence mode="popLayout">
          {tricks.map((trick) => {
            const status = getTrickStatus?.(trick.id) || "not_started";
            const isLocked = status === "locked";

            return (
              <motion.div
                key={trick.id}
                variants={itemVariants}
                layout
                exit="exit"
              >
                <TrickCard trick={trick} status={status} isLocked={isLocked} />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Load More / Pagination */}
      {hasMore && onLoadMore && (
        <div className="flex justify-center pt-4">
          <Button
            variant="secondary"
            size="lg"
            onClick={onLoadMore}
            loading={loadingMore}
            className="min-w-[200px]"
          >
            {loadingMore ? "Loading..." : "Load More Tricks"}
          </Button>
        </div>
      )}

      {/* Results count */}
      <div className="flex justify-center">
        <p className="text-sm text-gray-500">
          Showing {tricks.length} {tricks.length === 1 ? "trick" : "tricks"}
        </p>
      </div>
    </div>
  );
}

// Compact grid variant for smaller spaces
export function TrickGridCompact({
  tricks,
  getTrickStatus,
  className,
}: Omit<TrickGridProps, "isLoading" | "hasMore" | "onLoadMore" | "loadingMore">) {
  if (tricks.length === 0) {
    return (
      <div className={cn("text-center py-8 text-gray-500", className)}>
        No tricks to display
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid gap-3",
        "grid-cols-2 sm:grid-cols-3 md:grid-cols-4",
        className
      )}
    >
      {tricks.map((trick) => {
        const status = getTrickStatus?.(trick.id) || "not_started";
        const isLocked = status === "locked";

        return (
          <TrickCard
            key={trick.id}
            trick={trick}
            status={status}
            isLocked={isLocked}
          />
        );
      })}
    </div>
  );
}

export default TrickGrid;
