"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Award,
  Trophy,
  Target,
  Lock,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  useGamificationStore,
  useProgressStore,
  selectBadges,
  selectLifetimeXp,
  selectCurrentStreak,
  selectTotalTricksMastered,
  BADGE_DEFINITIONS,
  type Badge,
} from "@/stores";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  BadgeGrid,
  BadgeCard,
  rarityConfig,
} from "@/components/gamification";

// Badge Detail Modal
interface BadgeDetailModalProps {
  badge: Badge | null;
  isLocked: boolean;
  onClose: () => void;
}

const BadgeDetailModal: React.FC<BadgeDetailModalProps> = ({ badge, isLocked, onClose }) => {
  if (!badge && !isLocked) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl"
        >
          {badge ? (
            <BadgeCard badge={badge} showDetails={true} className="border-0 shadow-none" />
          ) : (
            <div className="text-center py-8">
              <Lock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-brand-black mb-2">Locked Badge</h3>
              <p className="text-sm text-muted-foreground">
                Keep practicing to unlock this badge!
              </p>
            </div>
          )}
          <Button onClick={onClose} variant="outline" className="w-full mt-4">
            Close
          </Button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Progress Overview Component
const ProgressOverview: React.FC = () => {
  const badges = useGamificationStore(selectBadges);
  const lifetimeXp = useGamificationStore(selectLifetimeXp);
  const currentStreak = useProgressStore(selectCurrentStreak);
  const tricksMastered = useProgressStore(selectTotalTricksMastered);

  const totalBadges = Object.keys(BADGE_DEFINITIONS).length;
  const earnedCount = badges.length;
  const progressPercentage = (earnedCount / totalBadges) * 100;

  // Calculate badges by rarity
  const badgesByRarity = badges.reduce(
    (acc, badge) => {
      acc[badge.rarity] = (acc[badge.rarity] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  return (
    <Card className="overflow-hidden">
      {/* Header with gradient */}
      <div className="h-2 bg-gradient-to-r from-brand-gold via-yellow-400 to-amber-500" />
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-brand-gold" />
          Achievement Progress
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Total Badges</span>
            <span className="font-medium">
              {earnedCount} / {totalBadges}
            </span>
          </div>
          <Progress value={progressPercentage} className="h-3" />
          <p className="text-xs text-muted-foreground text-right">
            {Math.round(progressPercentage)}% Complete
          </p>
        </div>

        {/* Rarity breakdown */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {(["common", "uncommon", "rare", "epic", "legendary"] as const).map((rarity) => {
            const config = rarityConfig[rarity];
            const count = badgesByRarity[rarity] || 0;

            return (
              <div
                key={rarity}
                className={cn(
                  "p-3 rounded-lg border text-center",
                  config.bg,
                  config.border
                )}
              >
                <p className="text-2xl font-bold text-brand-black">{count}</p>
                <p className={cn("text-xs font-medium", config.text)}>{config.label}</p>
              </div>
            );
          })}
        </div>

        {/* Stats that affect badges */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-brand-gold">
              <Sparkles className="w-4 h-4" />
              <span className="text-lg font-bold">{lifetimeXp.toLocaleString()}</span>
            </div>
            <p className="text-xs text-muted-foreground">Total XP</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-fun-blue">
              <Target className="w-4 h-4" />
              <span className="text-lg font-bold">{tricksMastered}</span>
            </div>
            <p className="text-xs text-muted-foreground">Tricks Mastered</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-orange-500">
              <TrendingUp className="w-4 h-4" />
              <span className="text-lg font-bold">{currentStreak}</span>
            </div>
            <p className="text-xs text-muted-foreground">Day Streak</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Next Badges to Unlock Component
const NextBadgesToUnlock: React.FC = () => {
  const badges = useGamificationStore(selectBadges);
  const currentStreak = useProgressStore(selectCurrentStreak);
  const tricksMastered = useProgressStore(selectTotalTricksMastered);
  const lifetimeXp = useGamificationStore(selectLifetimeXp);

  const earnedBadgeIds = new Set(badges.map((b) => b.id));

  // Find badges that are close to being unlocked
  const nextBadges = React.useMemo(() => {
    const suggestions: Array<{
      badge: (typeof BADGE_DEFINITIONS)[keyof typeof BADGE_DEFINITIONS];
      progress: number;
      requirement: string;
    }> = [];

    // Check streak badges
    if (!earnedBadgeIds.has("streak_3") && currentStreak < 3) {
      suggestions.push({
        badge: BADGE_DEFINITIONS.streak_3,
        progress: (currentStreak / 3) * 100,
        requirement: `${3 - currentStreak} more days`,
      });
    }
    if (!earnedBadgeIds.has("streak_7") && currentStreak < 7 && earnedBadgeIds.has("streak_3")) {
      suggestions.push({
        badge: BADGE_DEFINITIONS.streak_7,
        progress: (currentStreak / 7) * 100,
        requirement: `${7 - currentStreak} more days`,
      });
    }

    // Check mastery badges
    if (!earnedBadgeIds.has("first_trick") && tricksMastered < 1) {
      suggestions.push({
        badge: BADGE_DEFINITIONS.first_trick,
        progress: 0,
        requirement: "Master your first trick",
      });
    }
    if (!earnedBadgeIds.has("tricks_10") && tricksMastered < 10 && earnedBadgeIds.has("first_trick")) {
      suggestions.push({
        badge: BADGE_DEFINITIONS.tricks_10,
        progress: (tricksMastered / 10) * 100,
        requirement: `${10 - tricksMastered} more tricks`,
      });
    }

    // Check XP badges
    if (!earnedBadgeIds.has("xp_1000") && lifetimeXp < 1000) {
      suggestions.push({
        badge: BADGE_DEFINITIONS.xp_1000,
        progress: (lifetimeXp / 1000) * 100,
        requirement: `${(1000 - lifetimeXp).toLocaleString()} more XP`,
      });
    }

    return suggestions.slice(0, 3);
  }, [earnedBadgeIds, currentStreak, tricksMastered, lifetimeXp]);

  if (nextBadges.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Target className="w-5 h-5 text-fun-blue" />
          Next Badges to Unlock
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {nextBadges.map(({ badge, progress, requirement }) => {
            const config = rarityConfig[badge.rarity];

            return (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={cn(
                  "p-4 rounded-lg border-2 border-dashed",
                  config.border,
                  "bg-white"
                )}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center",
                      config.iconBg,
                      "opacity-50"
                    )}
                  >
                    <Lock className="w-6 h-6 text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-brand-black">{badge.name}</h4>
                      <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full", config.text, config.bg)}>
                        {config.label}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{badge.description}</p>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">{requirement}</span>
                        <span className="font-medium">{Math.round(progress)}%</span>
                      </div>
                      <Progress value={progress} className="h-1.5" />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

// Recent Achievements Component
const RecentAchievements: React.FC = () => {
  const recentAchievements = useGamificationStore((state) => state.recentAchievements);
  const displayAchievements = recentAchievements.slice(0, 5);

  if (displayAchievements.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Award className="w-5 h-5 text-brand-gold" />
          Recent Achievements
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {displayAchievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-3 p-3 rounded-lg bg-surface-secondary"
            >
              <BadgeCard
                badge={achievement.badge}
                showDetails={false}
                className="w-16 h-16 flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-brand-black">{achievement.badge.name}</h4>
                <p className="text-xs text-muted-foreground truncate">
                  {achievement.badge.description}
                </p>
                <p className="text-xs text-brand-gold mt-1">+{achievement.xpAwarded} XP</p>
              </div>
              <div className="text-xs text-muted-foreground">
                {new Date(achievement.timestamp).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// Main Achievements Page
export default function AchievementsPage() {
  const [selectedBadge, setSelectedBadge] = React.useState<{
    badge: Badge | null;
    isLocked: boolean;
  } | null>(null);

  const handleBadgeClick = (badge: Badge | null, isLocked: boolean) => {
    setSelectedBadge({ badge, isLocked });
  };

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link href="/profile">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-brand-black">Achievements</h1>
          <p className="text-muted-foreground">Track your progress and unlock badges</p>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column - Main badge grid */}
        <div className="lg:col-span-2 space-y-8">
          {/* Progress Overview */}
          <ProgressOverview />

          {/* Badge Grid */}
          <Card>
            <CardContent className="pt-6">
              <BadgeGrid onBadgeClick={handleBadgeClick} />
            </CardContent>
          </Card>
        </div>

        {/* Right column - Sidebar */}
        <div className="space-y-8">
          {/* Next badges to unlock */}
          <NextBadgesToUnlock />

          {/* Recent achievements */}
          <RecentAchievements />
        </div>
      </div>

      {/* Badge Detail Modal */}
      {selectedBadge && (
        <BadgeDetailModal
          badge={selectedBadge.badge}
          isLocked={selectedBadge.isLocked}
          onClose={() => setSelectedBadge(null)}
        />
      )}
    </div>
  );
}
