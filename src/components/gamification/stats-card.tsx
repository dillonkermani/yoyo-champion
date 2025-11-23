"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Zap,
  Target,
  Route,
  Clock,
  Timer,
  Heart,
  TrendingUp,
  Award,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  useGamificationStore,
  useProgressStore,
  selectLifetimeXp,
  selectTotalTricksMastered,
  selectTotalWatchTime,
  selectCompletedPaths,
} from "@/stores";

export interface StatsCardProps {
  className?: string;
  variant?: "compact" | "detailed";
}

// Stat item component
interface StatItemProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  subValue?: string;
  trend?: "up" | "down" | "neutral";
  color?: string;
}

const StatItem: React.FC<StatItemProps> = ({
  icon,
  label,
  value,
  subValue,
  trend,
  color = "text-brand-teal",
}) => (
  <motion.div
    className="flex items-start gap-3 p-3 rounded-lg bg-surface-secondary/50 hover:bg-surface-secondary transition-colors"
    whileHover={{ scale: 1.02 }}
    transition={{ duration: 0.2 }}
  >
    <div className={cn("p-2 rounded-lg bg-white shadow-sm", color)}>
      {icon}
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-xs text-muted-foreground">{label}</p>
      <div className="flex items-baseline gap-2">
        <p className="text-lg font-bold text-brand-black">{value}</p>
        {subValue && (
          <span className="text-xs text-muted-foreground">{subValue}</span>
        )}
        {trend && (
          <TrendingUp
            className={cn(
              "w-3 h-3",
              trend === "up"
                ? "text-brand-green"
                : trend === "down"
                ? "text-red-500 rotate-180"
                : "text-muted-foreground"
            )}
          />
        )}
      </div>
    </div>
  </motion.div>
);

// Format time from seconds to readable string
const formatWatchTime = (seconds: number): { value: string; unit: string } => {
  if (seconds < 60) {
    return { value: seconds.toString(), unit: "sec" };
  }
  if (seconds < 3600) {
    return { value: Math.floor(seconds / 60).toString(), unit: "min" };
  }
  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  return {
    value: hours.toString(),
    unit: mins > 0 ? `hr ${mins}m` : "hr",
  };
};

// Calculate average session length
const calculateAverageSession = (
  totalTime: number,
  totalSessions: number
): string => {
  if (totalSessions === 0) return "0 min";
  const avgSeconds = totalTime / totalSessions;
  const mins = Math.floor(avgSeconds / 60);
  return `${mins} min`;
};

export const StatsCard = React.forwardRef<HTMLDivElement, StatsCardProps>(
  ({ className, variant = "detailed" }, ref) => {
    const lifetimeXp = useGamificationStore(selectLifetimeXp);
    const totalTricksMastered = useProgressStore(selectTotalTricksMastered);
    const totalWatchTime = useProgressStore(selectTotalWatchTime);
    const completedPaths = useProgressStore(selectCompletedPaths);
    const badges = useGamificationStore((state) => state.badges);

    // Derived stats
    const watchTimeFormatted = formatWatchTime(totalWatchTime);
    const totalPathsCompleted = completedPaths.length;

    // Simulate session count (in real app, this would be tracked)
    const estimatedSessions = Math.max(1, Math.floor(totalWatchTime / 600)); // Assume 10 min avg
    const avgSessionLength = calculateAverageSession(totalWatchTime, estimatedSessions);

    // Determine favorite style based on trick progress (placeholder logic)
    const favoriteStyle = totalTricksMastered >= 10 ? "1A String" : "Getting started";

    if (variant === "compact") {
      return (
        <div
          ref={ref}
          className={cn("grid grid-cols-2 gap-3", className)}
        >
          <div className="p-3 rounded-lg bg-white border border-border">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-brand-gold" />
              <span className="text-xs text-muted-foreground">Total XP</span>
            </div>
            <p className="text-xl font-bold text-brand-black mt-1">
              {lifetimeXp.toLocaleString()}
            </p>
          </div>
          <div className="p-3 rounded-lg bg-white border border-border">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-brand-teal" />
              <span className="text-xs text-muted-foreground">Mastered</span>
            </div>
            <p className="text-xl font-bold text-brand-black mt-1">
              {totalTricksMastered}
            </p>
          </div>
        </div>
      );
    }

    return (
      <Card ref={ref} className={cn("overflow-hidden", className)}>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <TrendingUp className="w-5 h-5 text-brand-teal" />
            Your Statistics
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <StatItem
              icon={<Zap className="w-4 h-4" />}
              label="Total XP Earned"
              value={lifetimeXp.toLocaleString()}
              color="text-brand-gold"
            />
            <StatItem
              icon={<Target className="w-4 h-4" />}
              label="Tricks Mastered"
              value={totalTricksMastered}
              subValue="tricks"
              color="text-brand-teal"
            />
            <StatItem
              icon={<Route className="w-4 h-4" />}
              label="Paths Completed"
              value={totalPathsCompleted}
              subValue="paths"
              color="text-brand-blue"
            />
            <StatItem
              icon={<Clock className="w-4 h-4" />}
              label="Total Watch Time"
              value={watchTimeFormatted.value}
              subValue={watchTimeFormatted.unit}
              color="text-purple-500"
            />
            <StatItem
              icon={<Timer className="w-4 h-4" />}
              label="Avg Session"
              value={avgSessionLength}
              color="text-orange-500"
            />
            <StatItem
              icon={<Award className="w-4 h-4" />}
              label="Badges Earned"
              value={badges.length}
              subValue="badges"
              color="text-brand-gold"
            />
          </div>

          {/* Favorite trick style */}
          <div className="pt-3 border-t border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-red-400" />
                <span className="text-sm text-muted-foreground">Favorite Style</span>
              </div>
              <span className="text-sm font-medium text-brand-black">
                {favoriteStyle}
              </span>
            </div>
          </div>

          {/* Motivational message */}
          <motion.div
            className="p-3 rounded-lg bg-brand-teal/10 border border-brand-teal/20"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-sm text-brand-black">
              {totalTricksMastered === 0
                ? "Start your journey! Watch your first trick tutorial."
                : totalTricksMastered < 5
                ? "Great start! Keep practicing to master more tricks."
                : totalTricksMastered < 20
                ? "You're making excellent progress! Keep it up!"
                : "Amazing dedication! You're becoming a yo-yo master!"}
            </p>
          </motion.div>
        </CardContent>
      </Card>
    );
  }
);
StatsCard.displayName = "StatsCard";
