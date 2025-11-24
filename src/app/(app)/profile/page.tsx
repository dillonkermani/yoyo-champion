"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Camera,
  Edit2,
  Settings,
  Calendar,
  Target,
  Route,
  Clock,
  ChevronRight,
  Zap,
  Award,
  Play,
  CheckCircle,
  BookOpen,
  Heart,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  useUserStore,
  useProgressStore,
  useGamificationStore,
  useOnboardingStore,
  selectUser,
  selectLevel,
  selectLevelProgress,
  selectLifetimeXp,
  selectBadges,
  selectCurrentStreak,
  selectTotalTricksMastered,
  selectTotalWatchTime,
  selectCompletedPaths,
  selectPreferredStyles,
  selectSkillLevel,
  SKILL_LEVEL_METADATA,
  STYLE_METADATA,
} from "@/stores";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  StreakDisplay,
  LevelBadge,
  BadgeCard,
  MiniBadge,
} from "@/components/gamification";

// Activity item type
interface ActivityItem {
  id: string;
  type: "trick_mastered" | "module_completed" | "path_started" | "badge_earned" | "streak_milestone";
  title: string;
  description: string;
  timestamp: Date;
  icon: React.ReactNode;
}

// Mock activity data - in a real app, this would come from the store
const mockActivities: ActivityItem[] = [
  {
    id: "1",
    type: "trick_mastered",
    title: "Mastered Trapeze",
    description: "You nailed it! The foundation of 1A play.",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    icon: <CheckCircle className="w-4 h-4 text-fun-blue" />,
  },
  {
    id: "2",
    type: "module_completed",
    title: "Completed Module 3 of Beginner Path",
    description: "String mounting basics mastered.",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    icon: <BookOpen className="w-4 h-4 text-brand-blue" />,
  },
  {
    id: "3",
    type: "path_started",
    title: "Started Slack Tricks Path",
    description: "New adventure awaits!",
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    icon: <Play className="w-4 h-4 text-purple-500" />,
  },
  {
    id: "4",
    type: "badge_earned",
    title: "Earned 'Week Warrior' Badge",
    description: "7-day streak achieved!",
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    icon: <Award className="w-4 h-4 text-brand-gold" />,
  },
];

// Format relative time
const formatRelativeTime = (date: Date): string => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 60) {
    return `${diffMins} minute${diffMins !== 1 ? "s" : ""} ago`;
  }
  if (diffHours < 24) {
    return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
  }
  if (diffDays < 7) {
    return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;
  }
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

// Format watch time
const formatWatchTime = (seconds: number): string => {
  if (seconds < 3600) {
    return `${Math.floor(seconds / 60)} min`;
  }
  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
};

// Profile Header Component
const ProfileHeader: React.FC = () => {
  const user = useUserStore(selectUser);
  const level = useGamificationStore(selectLevel);
  const levelProgress = useGamificationStore(selectLevelProgress);
  const currentStreak = useProgressStore(selectCurrentStreak);

  const displayName = user?.displayName || "YoYo Enthusiast";
  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : "November 2024";

  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <Card className="overflow-hidden">
      {/* Banner gradient */}
      <div className="h-24 bg-gradient-to-r from-fun-blue via-brand-blue to-purple-500" />

      <CardContent className="relative pb-6">
        {/* Avatar with edit button */}
        <div className="absolute -top-12 left-6">
          <div className="relative">
            <Avatar size="2xl" variant="brand" className="border-4 border-white shadow-lg">
              <AvatarImage src={user?.avatarUrl} alt={displayName} />
              <AvatarFallback className="text-2xl bg-xp text-white">
                {initials}
              </AvatarFallback>
            </Avatar>
            <button
              className="absolute bottom-0 right-0 p-2 rounded-full bg-white shadow-md border border-border hover:bg-surface-secondary transition-colors"
              aria-label="Edit avatar"
            >
              <Camera className="w-4 h-4 text-brand-black" />
            </button>
          </div>
        </div>

        {/* Settings button */}
        <div className="flex justify-end mb-8">
          <Link href="/profile/settings">
            <Button variant="outline" size="sm" className="gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </Button>
          </Link>
        </div>

        {/* User info */}
        <div className="mt-4 space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-brand-black">{displayName}</h1>
                <button className="p-1 hover:bg-surface-secondary rounded-full transition-colors">
                  <Edit2 className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
              <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>Member since {memberSince}</span>
              </div>
            </div>

            {/* Level and streak */}
            <div className="flex items-center gap-4">
              <div className="text-center">
                <LevelBadge level={level} size="lg" />
                <p className="text-xs text-muted-foreground mt-1">Level {level}</p>
              </div>
              <div className="h-12 w-px bg-border" />
              <div className="text-center">
                <div className="text-2xl font-bold text-brand-black">{currentStreak}</div>
                <p className="text-xs text-muted-foreground">Day Streak</p>
              </div>
            </div>
          </div>

          {/* XP Progress */}
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Level Progress</span>
              <span className="text-brand-gold font-medium">
                {levelProgress.current} / {levelProgress.required} XP
              </span>
            </div>
            <Progress
              value={(levelProgress.current / levelProgress.required) * 100}
              className="h-2"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Stats Overview Component
const StatsOverview: React.FC = () => {
  const lifetimeXp = useGamificationStore(selectLifetimeXp);
  const totalTricksMastered = useProgressStore(selectTotalTricksMastered);
  const totalWatchTime = useProgressStore(selectTotalWatchTime);
  const completedPaths = useProgressStore(selectCompletedPaths);

  const stats = [
    {
      icon: <Target className="w-5 h-5 text-fun-blue" />,
      label: "Tricks Mastered",
      value: totalTricksMastered,
    },
    {
      icon: <Route className="w-5 h-5 text-brand-blue" />,
      label: "Paths Completed",
      value: completedPaths.length,
    },
    {
      icon: <Zap className="w-5 h-5 text-brand-gold" />,
      label: "Total XP",
      value: lifetimeXp.toLocaleString(),
    },
    {
      icon: <Clock className="w-5 h-5 text-purple-500" />,
      label: "Watch Time",
      value: formatWatchTime(totalWatchTime),
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="p-4 text-center hover:shadow-md transition-shadow">
            <div className="flex justify-center mb-2">{stat.icon}</div>
            <p className="text-2xl font-bold text-brand-black">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

// Featured Badges Component
const FeaturedBadges: React.FC = () => {
  const badges = useGamificationStore(selectBadges);
  const displayBadges = badges.slice(0, 5);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Award className="w-5 h-5 text-brand-gold" />
          Featured Badges
        </CardTitle>
        <Link
          href="/profile/achievements"
          className="text-sm text-fun-blue hover:underline flex items-center gap-1"
        >
          View All
          <ChevronRight className="w-4 h-4" />
        </Link>
      </CardHeader>
      <CardContent>
        {displayBadges.length > 0 ? (
          <div className="flex flex-wrap gap-3">
            {displayBadges.map((badge) => (
              <MiniBadge key={badge.id} badge={badge} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Award className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">
              Complete tricks and maintain streaks to earn badges!
            </p>
          </div>
        )}

        {/* Recent achievements */}
        {badges.length > 0 && badges[0] && (
          <div className="mt-4 pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground mb-2">Recent Achievement</p>
            <div className="flex items-center gap-3">
              <BadgeCard badge={badges[0]} showDetails={false} className="max-w-[200px]" />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Activity Feed Component
const ActivityFeed: React.FC = () => {
  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Clock className="w-5 h-5 text-fun-blue" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockActivities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-3"
            >
              {/* Timeline indicator */}
              <div className="flex flex-col items-center">
                <div className="p-2 rounded-full bg-surface-secondary">{activity.icon}</div>
                {index < mockActivities.length - 1 && (
                  <div className="w-0.5 h-8 bg-border mt-2" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="font-medium text-brand-black">{activity.title}</p>
                <p className="text-sm text-muted-foreground">{activity.description}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {formatRelativeTime(activity.timestamp)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// Learning Stats Component
const LearningStats: React.FC = () => {
  const skillLevel = useOnboardingStore(selectSkillLevel);
  const preferredStyles = useOnboardingStore(selectPreferredStyles);

  const skillMeta = skillLevel ? SKILL_LEVEL_METADATA[skillLevel] : null;

  // Mock genre data - in a real app, this would be calculated from progress
  const genres = [
    { name: "String Tricks", percentage: 65, color: "bg-xp" },
    { name: "Slack", percentage: 40, color: "bg-brand-blue" },
    { name: "Tech", percentage: 25, color: "bg-purple-500" },
    { name: "Flow", percentage: 15, color: "bg-brand-gold" },
  ];

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Target className="w-5 h-5 text-fun-blue" />
          Learning Stats
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Skill breakdown */}
        <div>
          <p className="text-sm font-medium text-brand-black mb-3">Skill Breakdown</p>
          <div className="space-y-3">
            {genres.map((genre) => (
              <div key={genre.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">{genre.name}</span>
                  <span className="font-medium">{genre.percentage}%</span>
                </div>
                <div className="h-2 rounded-full bg-surface-secondary overflow-hidden">
                  <motion.div
                    className={cn("h-full rounded-full", genre.color)}
                    initial={{ width: 0 }}
                    animate={{ width: `${genre.percentage}%` }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Favorite styles */}
        <div className="pt-4 border-t border-border">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-red-400" />
              <span className="text-sm font-medium text-brand-black">Preferred Styles</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {preferredStyles.map((style) => (
              <span
                key={style}
                className="px-3 py-1 rounded-full text-xs font-medium bg-fun-blue/10 text-fun-blue"
              >
                {STYLE_METADATA[style]?.label || style}
              </span>
            ))}
            {preferredStyles.length === 0 && (
              <span className="text-sm text-muted-foreground">Not set yet</span>
            )}
          </div>
        </div>

        {/* Current skill level */}
        {skillMeta && (
          <div className="pt-4 border-t border-border">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Current Level</span>
              <span className="text-sm font-medium text-brand-black">{skillMeta.label}</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Main Profile Page
export default function ProfilePage() {
  return (
    <div className="container max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Profile Header */}
      <ProfileHeader />

      {/* Stats Overview */}
      <StatsOverview />

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column - 2/3 width */}
        <div className="lg:col-span-2 space-y-8">
          {/* Streak Display */}
          <StreakDisplay variant="full" showWarning={true} />

          {/* Activity Feed */}
          <ActivityFeed />
        </div>

        {/* Right column - 1/3 width */}
        <div className="space-y-8">
          {/* Featured Badges */}
          <FeaturedBadges />

          {/* Learning Stats */}
          <LearningStats />
        </div>
      </div>
    </div>
  );
}
