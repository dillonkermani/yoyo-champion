"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { DifficultyBadge } from "@/components/ui/badge";
import {
  mockUser,
  mockUserProgress,
  mockTricks,
  getPathById,
  getTrickById,
  getBadgesForUser,
  calculatePathProgress,
} from "@/lib/data";
import type { TrickGenre } from "@/lib/data/types";
import { ProductRecommendation } from "@/components/products";
import {
  Mascot,
  StreakFire,
  XPBadge,
  LevelProgress,
  DailyGoal,
  AchievementBadge,
  StatCard,
  BounceCard,
  getRandomMessage,
} from "@/components/fun";

// Icons (using simple SVG icons)
const FlameIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177A7.547 7.547 0 016.648 6.61a.75.75 0 00-1.152-.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248zM15.75 14.25a3.75 3.75 0 11-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 011.925-3.545 3.75 3.75 0 013.255 3.717z"
      clipRule="evenodd"
    />
  </svg>
);

const PlayIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
      clipRule="evenodd"
    />
  </svg>
);

const BookIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 001 .707A8.237 8.237 0 016 18.75c1.995 0 3.823.707 5.25 1.886V4.533zM12.75 20.636A8.214 8.214 0 0118 18.75c.966 0 1.89.166 2.75.47a.75.75 0 001-.708V4.262a.75.75 0 00-.5-.707A9.735 9.735 0 0018 3a9.707 9.707 0 00-5.25 1.533v16.103z" />
  </svg>
);

const SparklesIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75 3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5zM18 1.5a.75.75 0 01.728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 010 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 01-1.456 0l-.258-1.036a2.625 2.625 0 00-1.91-1.91l-1.036-.258a.75.75 0 010-1.456l1.036-.258a2.625 2.625 0 001.91-1.91l.258-1.036A.75.75 0 0118 1.5zM16.5 15a.75.75 0 01.712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 010 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 01-1.422 0l-.395-1.183a1.5 1.5 0 00-.948-.948l-1.183-.395a.75.75 0 010-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0116.5 15z"
      clipRule="evenodd"
    />
  </svg>
);

const ChartIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z" />
  </svg>
);

const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z"
      clipRule="evenodd"
    />
  </svg>
);

const ShuffleIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-3.183a.75.75 0 100 1.5h4.992a.75.75 0 00.75-.75V4.356a.75.75 0 00-1.5 0v3.18l-1.9-1.9A9 9 0 003.306 9.67a.75.75 0 101.45.388zm15.408 3.352a.75.75 0 00-.919.53 7.5 7.5 0 01-12.548 3.364l-1.902-1.903h3.183a.75.75 0 000-1.5H2.984a.75.75 0 00-.75.75v4.992a.75.75 0 001.5 0v-3.18l1.9 1.9a9 9 0 0015.059-4.035.75.75 0 00-.53-.918z"
      clipRule="evenodd"
    />
  </svg>
);

// Genre label mapping
const genreLabels: Record<TrickGenre, string> = {
  basics: "Foundations",
  string: "String Tricks",
  slack: "Slack Tricks",
  tech: "Tech Tricks",
  flow: "Flow Tricks",
  horizontal: "Horizontal",
  speed: "Speed Tricks",
  grinds: "Grinds",
  regens: "Regens",
  hops: "Hops",
};

// Difficulty level mapping
const difficultyLabels: Record<number, string> = {
  1: "beginner",
  2: "intermediate",
  3: "advanced",
  4: "master",
  5: "legendary",
};

export default function DashboardPage() {
  // For demo purposes, use mock data
  // In production, these would come from authenticated user stores
  const user = mockUser;
  const userProgress = mockUserProgress;

  // Get current date
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  // Calculate skills by category
  const skillsByCategory = React.useMemo(() => {
    const categories: Record<TrickGenre, { mastered: number; total: number }> = {
      basics: { mastered: 0, total: 0 },
      string: { mastered: 0, total: 0 },
      slack: { mastered: 0, total: 0 },
      tech: { mastered: 0, total: 0 },
      flow: { mastered: 0, total: 0 },
      horizontal: { mastered: 0, total: 0 },
      speed: { mastered: 0, total: 0 },
      grinds: { mastered: 0, total: 0 },
      regens: { mastered: 0, total: 0 },
      hops: { mastered: 0, total: 0 },
    };

    mockTricks.forEach((trick) => {
      categories[trick.genre].total++;
      if (user.completedTricks.includes(trick.id)) {
        categories[trick.genre].mastered++;
      }
    });

    return categories;
  }, [user.completedTricks]);

  // Get last watched trick (in progress)
  const lastWatchedProgress = userProgress
    .filter((p) => p.status === "watching" || p.status === "practicing")
    .sort((a, b) => {
      const dateA = a.watchedAt ? new Date(a.watchedAt).getTime() : 0;
      const dateB = b.watchedAt ? new Date(b.watchedAt).getTime() : 0;
      return dateB - dateA;
    })[0];

  const lastWatchedTrick = lastWatchedProgress
    ? getTrickById(lastWatchedProgress.trickId)
    : null;

  // Get next recommended trick (first unwatched trick with met prerequisites)
  const nextRecommendedTrick = React.useMemo(() => {
    const unwatchedTricks = mockTricks.filter(
      (trick) =>
        !user.completedTricks.includes(trick.id) &&
        !userProgress.some(
          (p) =>
            p.trickId === trick.id &&
            (p.status === "watching" || p.status === "practicing")
        )
    );

    // Find a trick whose prerequisites are all completed
    return unwatchedTricks.find((trick) =>
      trick.prerequisites.every((prereq) =>
        user.completedTricks.includes(prereq)
      )
    );
  }, [user.completedTricks, userProgress]);

  // Get active learning paths with progress
  const activePathsWithProgress = user.activePaths.map((pathId) => {
    const path = getPathById(pathId);
    const progress = calculatePathProgress(pathId, user.completedTricks);
    return { path, progress };
  });

  // Get user badges
  const userBadges = getBadgesForUser(user.badges).slice(-4); // Last 4 badges

  // Weekly goal (mock - 5 tricks per week)
  const weeklyGoal = { current: 3, target: 5 };

  // XP to next level calculation
  const xpToNextLevel = 1000;
  const currentLevelXP = user.xp % xpToNextLevel;

  // Get encouraging message
  const [encouragingMessage] = React.useState(() =>
    user.currentStreak >= 7 ? getRandomMessage("streak") : getRandomMessage("greeting")
  );

  return (
    <div className="space-y-8 pb-8">
      {/* Hero Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-fun-blue via-fun-blue-dark to-fun-purple p-4 sm:p-6 lg:p-8 text-white"
      >
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="relative flex flex-col lg:flex-row lg:items-center gap-4 sm:gap-6">
          {/* Mascot and Welcome */}
          <div className="flex items-center gap-3 sm:gap-4 flex-1">
            <Mascot
              size="md"
              mood={user.currentStreak >= 7 ? "celebrating" : "happy"}
              className="flex-shrink-0 hidden sm:block"
            />
            <Mascot
              size="sm"
              mood={user.currentStreak >= 7 ? "celebrating" : "happy"}
              className="flex-shrink-0 sm:hidden"
            />
            <div className="min-w-0">
              <motion.h1
                className="text-xl sm:text-2xl lg:text-4xl font-black mb-0.5 sm:mb-1 truncate"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                Hey, {user.displayName}!
              </motion.h1>
              <motion.p
                className="text-white/80 text-sm sm:text-lg line-clamp-1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                {encouragingMessage}
              </motion.p>
              <motion.p
                className="text-white/60 text-xs sm:text-sm mt-0.5 sm:mt-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {currentDate}
              </motion.p>
            </div>
          </div>

          {/* Stats Row */}
          <motion.div
            className="flex flex-wrap gap-2 sm:gap-3 lg:gap-4 mt-2 sm:mt-0"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <LevelProgress
              level={user.level}
              currentXP={currentLevelXP}
              requiredXP={xpToNextLevel}
              size={56}
              className="bg-white/10 rounded-full p-0.5 sm:p-1 sm:[&]:hidden"
            />
            <LevelProgress
              level={user.level}
              currentXP={currentLevelXP}
              requiredXP={xpToNextLevel}
              size={70}
              className="bg-white/10 rounded-full p-1 hidden sm:block"
            />
            <StreakFire
              count={user.currentStreak}
              size="sm"
              showLabel={false}
              className="sm:hidden"
            />
            <StreakFire
              count={user.currentStreak}
              size="md"
              showLabel={false}
              className="hidden sm:block"
            />
          </motion.div>
        </div>

        {/* XP Progress Bar */}
        <motion.div
          className="mt-4 sm:mt-6 relative"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-between mb-1.5 sm:mb-2 text-xs sm:text-sm">
            <span className="font-semibold flex items-center gap-1.5 sm:gap-2">
              <span className="text-base sm:text-xl">⭐</span> {user.xp.toLocaleString()} XP Total
            </span>
            <span className="text-white/70">{xpToNextLevel - currentLevelXP} XP to Level {user.level + 1}</span>
          </div>
          <div className="h-2 sm:h-3 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-xp to-xp-light rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(currentLevelXP / xpToNextLevel) * 100}%` }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
            />
          </div>
        </motion.div>

        {/* Fire message for streaks */}
        {user.currentStreak >= 3 && (
          <motion.div
            className="mt-3 sm:mt-4 inline-flex items-center gap-1.5 sm:gap-2 bg-streak/30 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-bold"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, type: "spring", bounce: 0.5 }}
          >
            <span className="text-base sm:text-xl">🔥</span>
            You&apos;re on fire! {user.currentStreak} day streak!
          </motion.div>
        )}
      </motion.div>

      {/* Continue Learning Card - Big and Bold */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <h2 className="text-xl sm:text-2xl font-black text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
          <span className="text-2xl sm:text-3xl">🎯</span> Continue Learning
        </h2>

        {lastWatchedTrick && lastWatchedProgress ? (
          <BounceCard className="overflow-hidden border-2 border-fun-blue/20 hover:border-fun-blue">
            <Link href={`/trick/${lastWatchedTrick.slug}`} className="block min-h-[44px]">
              <div className="flex flex-col sm:flex-row">
                <div className="sm:w-44 lg:w-48 h-28 sm:h-auto bg-gradient-to-br from-fun-blue/20 to-fun-purple/20 flex-shrink-0 relative flex items-center justify-center">
                  <motion.div
                    className="w-16 h-16 rounded-full bg-fun-blue flex items-center justify-center shadow-lg"
                    whileHover={{ scale: 1.1 }}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <PlayIcon className="w-8 h-8 text-white ml-1" />
                  </motion.div>
                  {/* Progress ring */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="rgba(28,176,246,0.2)"
                      strokeWidth="4"
                    />
                    <motion.circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#1CB0F6"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeDasharray={283}
                      initial={{ strokeDashoffset: 283 }}
                      animate={{
                        strokeDashoffset: 283 - (283 * Math.min(100, (lastWatchedProgress.watchTime / (lastWatchedTrick.estimatedMinutes * 60)) * 100)) / 100
                      }}
                      transition={{ duration: 1 }}
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                </div>
                <div className="flex-1 p-3 sm:p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                      <span className="px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-fun-accent/20 text-fun-accent text-[10px] sm:text-xs font-bold">
                        IN PROGRESS
                      </span>
                      <DifficultyBadge
                        level={difficultyLabels[lastWatchedTrick.difficulty] as any}
                        showIcon={false}
                        className="text-[10px] px-2 py-0.5"
                      />
                    </div>
                    <h3 className="font-bold text-base sm:text-xl text-gray-900 mb-0.5 sm:mb-1">
                      {lastWatchedTrick.name}
                    </h3>
                    <p className="text-gray-500 text-sm sm:text-base line-clamp-1">
                      {lastWatchedTrick.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-3 sm:mt-4">
                    <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500">
                      <span>{Math.floor(lastWatchedProgress.watchTime / 60)}m watched</span>
                      <XPBadge amount={lastWatchedTrick.xpReward} size="sm" showPlus={true} animate={false} />
                    </div>
                    <motion.div
                      className="px-4 py-1.5 sm:px-6 sm:py-2 bg-fun-blue text-white font-bold rounded-full text-sm sm:text-base min-h-[44px] flex items-center"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Continue
                    </motion.div>
                  </div>
                </div>
              </div>
            </Link>
          </BounceCard>
        ) : nextRecommendedTrick ? (
          <BounceCard className="overflow-hidden border-2 border-fun-blue/20 hover:border-fun-blue">
            <Link href={`/trick/${nextRecommendedTrick.slug}`} className="block">
              <div className="flex flex-col sm:flex-row">
                <div className="sm:w-48 h-32 sm:h-auto bg-gradient-to-br from-fun-blue/20 to-fun-purple/20 flex-shrink-0 flex items-center justify-center">
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <SparklesIcon className="w-16 h-16 text-fun-blue" />
                  </motion.div>
                </div>
                <div className="flex-1 p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 rounded-full bg-fun-blue/20 text-fun-blue text-xs font-bold">
                      RECOMMENDED
                    </span>
                  </div>
                  <h3 className="font-bold text-xl text-gray-900 mb-1">
                    {nextRecommendedTrick.name}
                  </h3>
                  <p className="text-gray-500 line-clamp-1 mb-4">
                    {nextRecommendedTrick.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <XPBadge amount={nextRecommendedTrick.xpReward} size="md" showPlus={true} />
                    <motion.div
                      className="px-6 py-2 bg-fun-blue text-white font-bold rounded-full"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Start Learning
                    </motion.div>
                  </div>
                </div>
              </div>
            </Link>
          </BounceCard>
        ) : (
          <BounceCard className="p-8 text-center">
            <Mascot size="lg" mood="thinking" className="mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">All caught up!</h3>
            <p className="text-gray-500 mb-4">Browse the library to discover new tricks</p>
            <Button variant="brand" size="lg" asChild>
              <Link href="/library">Browse Tricks</Link>
            </Button>
          </BounceCard>
        )}
      </motion.section>

      {/* Stats Grid */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
          <StatCard
            icon="🏆"
            label="Tricks Mastered"
            value={user.completedTricks.length}
            color="primary"
          />
          <StatCard
            icon="⭐"
            label="Total XP"
            value={user.xp.toLocaleString()}
            color="xp"
          />
          <StatCard
            icon="🔥"
            label="Best Streak"
            value={user.longestStreak}
            color="streak"
          />
          <StatCard
            icon="📚"
            label="Active Paths"
            value={user.activePaths.length}
            color="accent"
          />
        </div>
      </motion.section>

      {/* Daily Goal */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.25 }}
      >
        <DailyGoal
          current={weeklyGoal.current}
          target={weeklyGoal.target}
          icon="target"
          label="Weekly Goal: Master Tricks"
        />
      </motion.section>

      {/* Active Paths Progress */}
      {activePathsWithProgress.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 flex items-center gap-2">
              <span className="text-2xl sm:text-3xl">🛤️</span> Learning Paths
            </h2>
            <Link
              href="/paths"
              className="text-fun-blue hover:text-fun-blue-dark font-bold flex items-center gap-1 text-sm sm:text-base min-h-[44px] min-w-[44px] justify-center"
            >
              View All <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {activePathsWithProgress.map(
              ({ path, progress }, index) =>
                path && (
                  <BounceCard key={path.id} delay={index * 0.1}>
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-bold text-lg text-gray-900">{path.title}</h3>
                          <p className="text-sm text-gray-500 line-clamp-1">
                            {path.description}
                          </p>
                        </div>
                        <DifficultyBadge
                          level={difficultyLabels[path.difficulty] as any}
                          showIcon={true}
                        />
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Progress</span>
                          <span className="font-bold text-fun-blue">
                            {progress.completed}/{progress.total} tricks
                          </span>
                        </div>
                        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-fun-blue to-fun-blue-light rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress.percentage}%` }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-400 font-semibold">
                            {progress.percentage}% complete
                          </span>
                          <Button variant="brand" size="sm" asChild>
                            <Link href={`/paths/${path.slug}`}>
                              Continue
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </BounceCard>
                )
            )}
          </div>
        </motion.section>
      )}

      {/* Skills Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.35 }}
        >
          <BounceCard>
            <div className="p-5">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
                <ChartIcon className="w-5 h-5 text-fun-blue" />
                Skills Overview
              </h3>
              <div className="space-y-4">
                {(
                  ["basics", "string", "slack", "tech", "flow", "horizontal"] as TrickGenre[]
                ).map((genre) => {
                  const skill = skillsByCategory[genre];
                  const percentage =
                    skill.total > 0
                      ? Math.round((skill.mastered / skill.total) * 100)
                      : 0;
                  return (
                    <div key={genre} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-semibold text-gray-700">
                          {genreLabels[genre]}
                        </span>
                        <span className="text-gray-500">
                          {skill.mastered}/{skill.total}
                        </span>
                      </div>
                      <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-fun-blue to-fun-blue-light rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </BounceCard>
        </motion.section>

        {/* Streak & Activity */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <BounceCard>
            <div className="p-5">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
                <FlameIcon className="w-5 h-5 text-streak" />
                Streak & Activity
              </h3>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-4 bg-gradient-to-br from-streak/10 to-orange-100 rounded-2xl">
                  <StreakFire count={user.currentStreak} size="md" />
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-xp/10 to-yellow-100 rounded-2xl">
                  <div className="text-3xl mb-1">🏆</div>
                  <span className="text-2xl font-black text-gray-900">{user.longestStreak}</span>
                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Best Streak</p>
                </div>
              </div>

              {/* Calendar Heatmap Placeholder */}
              <div className="p-4 bg-gray-50 rounded-xl text-center text-gray-400 text-sm border-2 border-dashed border-gray-200">
                <span className="text-2xl mb-2 block">📅</span>
                Activity Calendar Coming Soon
              </div>
            </div>
          </BounceCard>
        </motion.section>
      </div>

      {/* Recent Achievements */}
      {userBadges.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.45 }}
        >
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 flex items-center gap-2">
              <span className="text-2xl sm:text-3xl">🏅</span> Recent Achievements
            </h2>
            <Link
              href="/profile/achievements"
              className="text-fun-blue hover:text-fun-blue-dark font-bold flex items-center gap-1 text-sm sm:text-base min-h-[44px] min-w-[44px] justify-center"
            >
              View All <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
            {userBadges.map((badge, index) => (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <AchievementBadge
                  icon={badge.rarity === "legendary" ? "🌟" : badge.rarity === "epic" ? "💎" : badge.rarity === "rare" ? "✨" : "🎖️"}
                  name={badge.name}
                  description={badge.description}
                  rarity={badge.rarity as any}
                  unlocked={true}
                />
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      {/* Quick Actions */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
      >
        <h2 className="text-xl sm:text-2xl font-black text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
          <span className="text-2xl sm:text-3xl">⚡</span> Quick Actions
        </h2>
        <div className="grid grid-cols-3 gap-2 sm:gap-4">
          <motion.div whileHover={{ scale: 1.02, y: -4 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/library"
              className="flex flex-col items-center gap-2 sm:gap-3 p-3 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-br from-fun-blue/10 to-fun-blue/5 border-2 border-fun-blue/20 hover:border-fun-blue transition-colors min-h-[100px] sm:min-h-[130px]"
            >
              <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-fun-blue/20 flex items-center justify-center">
                <BookIcon className="w-5 h-5 sm:w-7 sm:h-7 text-fun-blue" />
              </div>
              <span className="font-bold text-gray-900 text-xs sm:text-base text-center">Browse Tricks</span>
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02, y: -4 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/paths"
              className="flex flex-col items-center gap-2 sm:gap-3 p-3 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-br from-fun-purple/10 to-fun-purple/5 border-2 border-fun-purple/20 hover:border-fun-purple transition-colors min-h-[100px] sm:min-h-[130px]"
            >
              <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-fun-purple/20 flex items-center justify-center">
                <ChartIcon className="w-5 h-5 sm:w-7 sm:h-7 text-fun-purple" />
              </div>
              <span className="font-bold text-gray-900 text-xs sm:text-base text-center">Learning Paths</span>
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02, y: -4 }} whileTap={{ scale: 0.98 }}>
            <Link
              href={nextRecommendedTrick ? `/trick/${nextRecommendedTrick.slug}` : "/library"}
              className="flex flex-col items-center gap-2 sm:gap-3 p-3 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-br from-fun-accent/10 to-fun-accent/5 border-2 border-fun-accent/20 hover:border-fun-accent transition-colors min-h-[100px] sm:min-h-[130px]"
            >
              <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-fun-accent/20 flex items-center justify-center">
                <ShuffleIcon className="w-5 h-5 sm:w-7 sm:h-7 text-fun-accent" />
              </div>
              <span className="font-bold text-gray-900 text-xs sm:text-base text-center">Random Trick</span>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Recommended Gear Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.55 }}
      >
        <ProductRecommendation
          context="dashboard"
          userSkillLevel={user.level <= 3 ? "beginner" : user.level <= 7 ? "intermediate" : "advanced"}
          maxProducts={3}
          variant="horizontal"
        />
      </motion.div>
    </div>
  );
}
