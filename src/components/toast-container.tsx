"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUIStore, selectToasts, type Toast } from "@/stores";
import {
  useGamificationStore,
  selectRecentAchievements,
  type Achievement,
} from "@/stores";
import { AchievementToastStack } from "@/components/gamification/achievement-toast";
import { useMounted } from "@/lib/hooks/use-mounted";

const toastIcons = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
} as const;

const toastStyles = {
  success: {
    bg: "bg-fun-blue/10 border-fun-blue/30",
    icon: "text-fun-blue",
    text: "text-brand-black",
  },
  error: {
    bg: "bg-red-50 border-red-200",
    icon: "text-red-600",
    text: "text-red-800",
  },
  warning: {
    bg: "bg-yellow-50 border-yellow-200",
    icon: "text-yellow-600",
    text: "text-yellow-800",
  },
  info: {
    bg: "bg-blue-50 border-blue-200",
    icon: "text-blue-600",
    text: "text-blue-800",
  },
} as const;

interface ToastItemProps {
  toast: Toast;
  onDismiss: () => void;
}

function ToastItem({ toast, onDismiss }: ToastItemProps) {
  const Icon = toastIcons[toast.type];
  const styles = toastStyles[toast.type];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 100, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className={cn(
        "pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg border shadow-lg",
        styles.bg
      )}
    >
      <div className="p-4">
        <div className="flex items-start gap-3">
          <Icon className={cn("h-5 w-5 flex-shrink-0", styles.icon)} />
          <div className="flex-1 min-w-0">
            <p className={cn("text-sm font-medium", styles.text)}>
              {toast.message}
            </p>
          </div>
          <button
            onClick={onDismiss}
            className={cn(
              "flex-shrink-0 rounded-md p-1 hover:bg-black/5 transition-colors",
              styles.text
            )}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export function ToastContainer() {
  const isMounted = useMounted();
  const toasts = useUIStore(selectToasts);
  const removeToast = useUIStore((state) => state.removeToast);
  const recentAchievements = useGamificationStore(selectRecentAchievements);
  const clearRecentAchievements = useGamificationStore(
    (state) => state.clearRecentAchievements
  );

  // Track dismissed achievement IDs locally for individual dismissal
  const [dismissedIds, setDismissedIds] = React.useState<Set<string>>(
    new Set()
  );

  // Filter out dismissed achievements
  const visibleAchievements = React.useMemo(
    () => recentAchievements.filter((a) => !dismissedIds.has(a.id)),
    [recentAchievements, dismissedIds]
  );

  // Handle individual achievement dismissal
  const handleDismissAchievement = React.useCallback((achievementId: string) => {
    setDismissedIds((prev) => new Set(prev).add(achievementId));
  }, []);

  // Handle achievement click (optional - navigate to achievements page)
  const handleAchievementClick = React.useCallback((_achievement: Achievement) => {
    // Could navigate to achievements page or show details modal
    // For now, just dismiss
  }, []);

  // Clear dismissed IDs when all achievements are cleared from store
  React.useEffect(() => {
    if (recentAchievements.length === 0) {
      setDismissedIds(new Set());
    }
  }, [recentAchievements.length]);

  // Clear all achievements from store when all are dismissed locally
  React.useEffect(() => {
    if (
      recentAchievements.length > 0 &&
      visibleAchievements.length === 0 &&
      dismissedIds.size > 0
    ) {
      clearRecentAchievements();
      setDismissedIds(new Set());
    }
  }, [
    recentAchievements.length,
    visibleAchievements.length,
    dismissedIds.size,
    clearRecentAchievements,
  ]);

  // Don't render on server
  if (!isMounted) {
    return null;
  }

  // Use portal to render at document body level
  return createPortal(
    <>
      {/* Achievement toasts - centered top */}
      {visibleAchievements.length > 0 && (
        <AchievementToastStack
          achievements={visibleAchievements}
          onDismiss={handleDismissAchievement}
          onAchievementClick={handleAchievementClick}
          position="top"
        />
      )}

      {/* Generic toasts - top right */}
      <div
        className="fixed top-4 right-4 z-50 flex flex-col gap-2 pointer-events-none"
        aria-live="polite"
        aria-label="Notifications"
      >
        <AnimatePresence mode="popLayout">
          {toasts.map((toast) => (
            <ToastItem
              key={toast.id}
              toast={toast}
              onDismiss={() => removeToast(toast.id)}
            />
          ))}
        </AnimatePresence>
      </div>
    </>,
    document.body
  );
}

export default ToastContainer;
