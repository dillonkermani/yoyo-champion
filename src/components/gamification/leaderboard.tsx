"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Medal, Crown, ChevronUp, ChevronDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGamificationStore, selectLevel, selectLifetimeXp } from "@/stores";

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  username: string;
  displayName: string;
  avatarUrl?: string;
  xp: number;
  level: number;
  tricksMastered: number;
  trend?: "up" | "down" | "same";
  trendAmount?: number;
  isCurrentUser?: boolean;
}

export interface LeaderboardProps {
  className?: string;
  initialData?: LeaderboardEntry[];
  currentUserId?: string;
}

// Mock leaderboard data (in production, this would come from an API)
const generateMockLeaderboard = (
  timeframe: string,
  currentUserXp: number,
  currentUserLevel: number
): LeaderboardEntry[] => {
  const mockUsers = [
    { username: "yoyomaster", displayName: "YoYo Master", xp: 52450, level: 42, tricks: 156 },
    { username: "stringking", displayName: "String King", xp: 48200, level: 39, tricks: 142 },
    { username: "trickwizard", displayName: "Trick Wizard", xp: 45100, level: 37, tricks: 138 },
    { username: "spinpro", displayName: "Spin Pro", xp: 41800, level: 35, tricks: 125 },
    { username: "looplegend", displayName: "Loop Legend", xp: 38500, level: 33, tricks: 118 },
    { username: "throwchamp", displayName: "Throw Champ", xp: 35200, level: 31, tricks: 108 },
    { username: "sleepstar", displayName: "Sleep Star", xp: 32100, level: 29, tricks: 98 },
    { username: "bindboss", displayName: "Bind Boss", xp: 28900, level: 27, tricks: 89 },
    { username: "whipwonder", displayName: "Whip Wonder", xp: 25700, level: 25, tricks: 78 },
    { username: "slakerider", displayName: "Slak Rider", xp: 22500, level: 23, tricks: 68 },
  ];

  // Adjust XP based on timeframe
  const multiplier = timeframe === "weekly" ? 0.1 : timeframe === "monthly" ? 0.3 : 1;

  // Insert current user based on XP
  const adjustedUsers = mockUsers.map((user) => ({
    ...user,
    xp: Math.floor(user.xp * multiplier),
  }));

  // Add current user
  const currentUser: LeaderboardEntry = {
    rank: 0,
    userId: "current",
    username: "you",
    displayName: "You",
    xp: Math.floor(currentUserXp * multiplier),
    level: currentUserLevel,
    tricksMastered: 25,
    isCurrentUser: true,
    trend: "up",
    trendAmount: 3,
  };

  // Combine and sort
  const allUsers: LeaderboardEntry[] = [...adjustedUsers.map((u, i): LeaderboardEntry => ({
    rank: i + 1,
    userId: u.username,
    username: u.username,
    displayName: u.displayName,
    xp: u.xp,
    level: u.level,
    tricksMastered: u.tricks,
    trend: (["up", "down", "same"] as const)[Math.floor(Math.random() * 3)] as "up" | "down" | "same",
    trendAmount: Math.floor(Math.random() * 5),
  })), currentUser];

  // Sort by XP and assign ranks
  allUsers.sort((a, b) => b.xp - a.xp);
  return allUsers.map((user, index) => ({ ...user, rank: index + 1 }));
};

// Rank badge component
const RankBadge: React.FC<{ rank: number }> = ({ rank }) => {
  if (rank === 1) {
    return (
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-gold to-yellow-500 flex items-center justify-center shadow-md">
        <Crown className="w-4 h-4 text-white" />
      </div>
    );
  }
  if (rank === 2) {
    return (
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-300 to-slate-400 flex items-center justify-center shadow-md">
        <Medal className="w-4 h-4 text-white" />
      </div>
    );
  }
  if (rank === 3) {
    return (
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-600 to-amber-700 flex items-center justify-center shadow-md">
        <Medal className="w-4 h-4 text-white" />
      </div>
    );
  }
  return (
    <div className="w-8 h-8 rounded-full bg-surface-secondary flex items-center justify-center">
      <span className="text-sm font-semibold text-muted-foreground">{rank}</span>
    </div>
  );
};

// Trend indicator
const TrendIndicator: React.FC<{ trend: LeaderboardEntry["trend"]; amount?: number }> = ({
  trend,
  amount,
}) => {
  if (!trend || trend === "same") {
    return <Minus className="w-3 h-3 text-muted-foreground" />;
  }

  return (
    <div
      className={cn(
        "flex items-center gap-0.5 text-xs font-medium",
        trend === "up" ? "text-brand-green" : "text-red-500"
      )}
    >
      {trend === "up" ? (
        <ChevronUp className="w-3 h-3" />
      ) : (
        <ChevronDown className="w-3 h-3" />
      )}
      {amount && <span>{amount}</span>}
    </div>
  );
};

// Leaderboard row
const LeaderboardRow: React.FC<{
  entry: LeaderboardEntry;
  index: number;
}> = ({ entry, index }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.05 }}
    className={cn(
      "flex items-center gap-3 p-3 rounded-lg transition-colors",
      entry.isCurrentUser
        ? "bg-brand-teal/10 border border-brand-teal/30"
        : "hover:bg-surface-secondary"
    )}
  >
    <RankBadge rank={entry.rank} />

    <Avatar className="w-10 h-10">
      {entry.avatarUrl ? (
        <AvatarImage src={entry.avatarUrl} alt={entry.displayName} />
      ) : (
        <AvatarFallback className={entry.isCurrentUser ? "bg-brand-teal text-white" : ""}>
          {entry.displayName.charAt(0).toUpperCase()}
        </AvatarFallback>
      )}
    </Avatar>

    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2">
        <p
          className={cn(
            "font-medium truncate",
            entry.isCurrentUser ? "text-brand-teal" : "text-brand-black"
          )}
        >
          {entry.displayName}
          {entry.isCurrentUser && " (You)"}
        </p>
        <TrendIndicator trend={entry.trend} {...(entry.trendAmount !== undefined && { amount: entry.trendAmount })} />
      </div>
      <p className="text-xs text-muted-foreground">
        Level {entry.level} - {entry.tricksMastered} tricks
      </p>
    </div>

    <div className="text-right">
      <p className="font-bold text-brand-black">{entry.xp.toLocaleString()}</p>
      <p className="text-xs text-muted-foreground">XP</p>
    </div>
  </motion.div>
);

export const Leaderboard = React.forwardRef<HTMLDivElement, LeaderboardProps>(
  ({ className, initialData, currentUserId: _currentUserId }, ref) => {
    const [timeframe, setTimeframe] = React.useState<"weekly" | "monthly" | "all-time">("weekly");
    const currentUserXp = useGamificationStore(selectLifetimeXp);
    const currentUserLevel = useGamificationStore(selectLevel);

    // Generate leaderboard data
    const leaderboardData = React.useMemo(
      () =>
        initialData ||
        generateMockLeaderboard(timeframe, currentUserXp, currentUserLevel),
      [timeframe, currentUserXp, currentUserLevel, initialData]
    );

    // Find current user's position
    const currentUserEntry = leaderboardData.find((e) => e.isCurrentUser);

    return (
      <Card ref={ref} className={cn("overflow-hidden", className)}>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Trophy className="w-5 h-5 text-brand-gold" />
            Leaderboard
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Timeframe tabs */}
          <Tabs value={timeframe} onValueChange={(v) => setTimeframe(v as typeof timeframe)}>
            <TabsList className="w-full bg-surface-secondary p-1 rounded-lg">
              <TabsTrigger
                value="weekly"
                className="flex-1 text-xs data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                Weekly
              </TabsTrigger>
              <TabsTrigger
                value="monthly"
                className="flex-1 text-xs data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                Monthly
              </TabsTrigger>
              <TabsTrigger
                value="all-time"
                className="flex-1 text-xs data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                All Time
              </TabsTrigger>
            </TabsList>

            <AnimatePresence mode="wait">
              <TabsContent value={timeframe} className="mt-4 space-y-2">
                {leaderboardData.slice(0, 10).map((entry, index) => (
                  <LeaderboardRow key={entry.userId} entry={entry} index={index} />
                ))}
              </TabsContent>
            </AnimatePresence>
          </Tabs>

          {/* Current user highlight if not in top 10 */}
          {currentUserEntry && currentUserEntry.rank > 10 && (
            <div className="pt-3 border-t border-border">
              <p className="text-xs text-muted-foreground mb-2">Your Position</p>
              <LeaderboardRow entry={currentUserEntry} index={0} />
            </div>
          )}

          {/* Placeholder message */}
          <div className="text-center py-4 border-t border-border">
            <p className="text-xs text-muted-foreground">
              Leaderboard updates daily. Keep practicing to climb the ranks!
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }
);
Leaderboard.displayName = "Leaderboard";
