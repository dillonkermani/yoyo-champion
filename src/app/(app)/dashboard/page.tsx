"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge, DifficultyBadge } from "@/components/ui/badge";
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

const StarIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
      clipRule="evenodd"
    />
  </svg>
);

const TrophyIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 00-.584.859 6.753 6.753 0 006.138 5.6 6.73 6.73 0 002.743 1.346A6.707 6.707 0 019.279 15H8.54c-1.036 0-1.875.84-1.875 1.875V19.5h-.75a2.25 2.25 0 00-2.25 2.25c0 .414.336.75.75.75h15.19a.75.75 0 00.75-.75 2.25 2.25 0 00-2.25-2.25h-.75v-2.625c0-1.036-.84-1.875-1.875-1.875h-.739a6.706 6.706 0 01-1.112-3.173 6.73 6.73 0 002.743-1.347 6.753 6.753 0 006.139-5.6.75.75 0 00-.585-.858 47.077 47.077 0 00-3.07-.543V2.62a.75.75 0 00-.658-.744 49.22 49.22 0 00-6.093-.377c-2.063 0-4.096.128-6.093.377a.75.75 0 00-.657.744zm0 2.629c0 1.196.312 2.32.857 3.294A5.266 5.266 0 013.16 5.337a45.6 45.6 0 012.006-.343v.256zm13.5 0v-.256c.674.1 1.343.214 2.006.343a5.265 5.265 0 01-2.863 3.207 6.72 6.72 0 00.857-3.294z"
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
    year: "numeric",
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

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="bg-gradient-to-br from-white to-gray-50 border-gray-200">
          <CardContent className="pt-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-brand-black">
                  Welcome back, {user.displayName}!
                </h1>
                <p className="text-gray-500 mt-1">{currentDate}</p>
              </div>

              {/* Quick Stats */}
              <div className="flex flex-wrap gap-4 lg:gap-6">
                <div className="flex items-center gap-2 px-4 py-2 bg-brand-blue/20 rounded-full">
                  <StarIcon className="w-5 h-5 text-brand-blue" />
                  <span className="font-semibold text-brand-black">
                    Level {user.level}
                  </span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-brand-teal/20 rounded-full">
                  <TrophyIcon className="w-5 h-5 text-brand-teal" />
                  <span className="font-semibold text-brand-black">
                    {user.xp.toLocaleString()} XP
                  </span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-brand-green/30 rounded-full">
                  <FlameIcon className="w-5 h-5 text-orange-500" />
                  <span className="font-semibold text-brand-black">
                    {user.currentStreak} Day Streak
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Continue Learning Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <h2 className="text-xl font-semibold text-brand-black mb-4">
          Pick Up Where You Left Off
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Last Watched Trick */}
          {lastWatchedTrick && lastWatchedProgress ? (
            <Card hover className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex">
                  <div className="w-32 h-32 bg-gray-200 flex-shrink-0 relative">
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-300">
                      <PlayIcon className="w-10 h-10 text-gray-500" />
                    </div>
                    {/* Progress overlay */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-400">
                      <div
                        className="h-full bg-brand-blue"
                        style={{
                          width: `${Math.min(
                            100,
                            (lastWatchedProgress.watchTime /
                              (lastWatchedTrick.estimatedMinutes * 60)) *
                              100
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex-1 p-4 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <DifficultyBadge
                          level={
                            difficultyLabels[
                              lastWatchedTrick.difficulty
                            ] as any
                          }
                          showIcon={false}
                          className="text-[10px] px-2 py-0.5"
                        />
                        <Badge variant="teal" className="text-[10px] px-2 py-0.5">
                          {lastWatchedProgress.status === "watching"
                            ? "Watching"
                            : "Practicing"}
                        </Badge>
                      </div>
                      <h3 className="font-semibold text-brand-black">
                        {lastWatchedTrick.name}
                      </h3>
                      <p className="text-sm text-gray-500 line-clamp-1">
                        {lastWatchedTrick.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-400">
                        {Math.floor(lastWatchedProgress.watchTime / 60)}m
                        watched
                      </span>
                      <Button
                        variant="brand"
                        size="sm"
                        asChild
                      >
                        <Link href={`/trick/${lastWatchedTrick.slug}`}>
                          Continue
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="flex items-center justify-center h-32">
              <CardContent className="text-center">
                <p className="text-gray-500">No tricks in progress</p>
                <Button variant="brand" size="sm" className="mt-2" asChild>
                  <Link href="/library">Browse Tricks</Link>
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Next Recommended Trick */}
          {nextRecommendedTrick && (
            <Card hover className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex">
                  <div className="w-32 h-32 bg-gradient-to-br from-brand-teal/20 to-brand-blue/20 flex-shrink-0 flex items-center justify-center">
                    <SparklesIcon className="w-10 h-10 text-brand-teal" />
                  </div>
                  <div className="flex-1 p-4 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="info" className="text-[10px] px-2 py-0.5">
                          Recommended
                        </Badge>
                        <DifficultyBadge
                          level={
                            difficultyLabels[
                              nextRecommendedTrick.difficulty
                            ] as any
                          }
                          showIcon={false}
                          className="text-[10px] px-2 py-0.5"
                        />
                      </div>
                      <h3 className="font-semibold text-brand-black">
                        {nextRecommendedTrick.name}
                      </h3>
                      <p className="text-sm text-gray-500 line-clamp-1">
                        {nextRecommendedTrick.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-400">
                        +{nextRecommendedTrick.xpReward} XP
                      </span>
                      <Button variant="teal" size="sm" asChild>
                        <Link href={`/trick/${nextRecommendedTrick.slug}`}>
                          Start Learning
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </motion.section>

      {/* Active Paths Progress */}
      {activePathsWithProgress.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-brand-black">
              Active Learning Paths
            </h2>
            <Link
              href="/paths"
              className="text-sm text-brand-teal hover:underline flex items-center gap-1"
            >
              View All <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activePathsWithProgress.map(
              ({ path, progress }) =>
                path && (
                  <Card key={path.id} hover>
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg">{path.title}</CardTitle>
                          <CardDescription className="line-clamp-1">
                            {path.description}
                          </CardDescription>
                        </div>
                        <DifficultyBadge
                          level={difficultyLabels[path.difficulty] as any}
                          showIcon={true}
                        />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Progress</span>
                          <span className="font-medium text-brand-black">
                            {progress.completed}/{progress.total} tricks
                          </span>
                        </div>
                        <Progress
                          value={progress.percentage}
                          variant="brand"
                          size="default"
                        />
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-400">
                            {progress.percentage}% complete
                          </span>
                          <Button variant="brand" size="sm" asChild>
                            <Link href={`/paths/${path.slug}`}>
                              Continue Path
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
            )}
          </div>
        </motion.section>
      )}

      {/* Skills Overview & Streak/Activity Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Skills Overview */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ChartIcon className="w-5 h-5 text-brand-blue" />
                Skills Overview
              </CardTitle>
              <CardDescription>
                Your progress across trick categories
              </CardDescription>
            </CardHeader>
            <CardContent>
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
                        <span className="text-brand-black font-medium">
                          {genreLabels[genre]}
                        </span>
                        <span className="text-gray-500">
                          {skill.mastered}/{skill.total}
                        </span>
                      </div>
                      <Progress
                        value={percentage}
                        variant="brand"
                        size="sm"
                      />
                    </div>
                  );
                })}
              </div>
              {/* Placeholder for skill radar chart */}
              <div className="mt-6 p-4 bg-gray-100 rounded-lg text-center text-gray-400 text-sm">
                Skill Radar Chart (Coming Soon)
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Streak & Activity */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.35 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FlameIcon className="w-5 h-5 text-orange-500" />
                Streak & Activity
              </CardTitle>
              <CardDescription>
                Keep your practice streak alive!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <FlameIcon className="w-8 h-8 text-orange-500" />
                    <span className="text-3xl font-bold text-brand-black">
                      {user.currentStreak}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">Current Streak</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-brand-teal/10 to-brand-teal/20 rounded-xl">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <TrophyIcon className="w-8 h-8 text-brand-teal" />
                    <span className="text-3xl font-bold text-brand-black">
                      {user.longestStreak}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">Longest Streak</p>
                </div>
              </div>

              {/* Calendar Heatmap Placeholder */}
              <div className="p-4 bg-gray-100 rounded-lg text-center text-gray-400 text-sm mb-4">
                Activity Calendar Heatmap (Coming Soon)
              </div>

              {/* Weekly Goal */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-brand-black font-medium">
                    Weekly Goal
                  </span>
                  <span className="text-gray-500">
                    {weeklyGoal.current}/{weeklyGoal.target} tricks
                  </span>
                </div>
                <Progress
                  value={(weeklyGoal.current / weeklyGoal.target) * 100}
                  variant="success"
                  size="default"
                />
              </div>
            </CardContent>
          </Card>
        </motion.section>
      </div>

      {/* Recent Achievements */}
      {userBadges.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-brand-black">
              Recent Achievements
            </h2>
            <Link
              href="/profile/achievements"
              className="text-sm text-brand-teal hover:underline flex items-center gap-1"
            >
              View All Achievements <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {userBadges.map((badge) => (
              <Card key={badge.id} hover className="text-center">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-brand-teal/20 to-brand-blue/20 flex items-center justify-center">
                    <TrophyIcon className="w-8 h-8 text-brand-teal" />
                  </div>
                  <h3 className="font-semibold text-brand-black text-sm">
                    {badge.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                    {badge.description}
                  </p>
                  <Badge
                    variant={
                      badge.rarity === "legendary"
                        ? "brand"
                        : badge.rarity === "epic"
                        ? "teal"
                        : badge.rarity === "rare"
                        ? "blue"
                        : "default"
                    }
                    className="mt-2 text-[10px]"
                  >
                    {badge.rarity.charAt(0).toUpperCase() + badge.rarity.slice(1)}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.section>
      )}

      {/* Quick Actions */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.45 }}
      >
        <h2 className="text-xl font-semibold text-brand-black mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Button
            variant="secondary"
            size="lg"
            className="h-auto py-6 flex-col gap-2"
            asChild
          >
            <Link href="/library">
              <BookIcon className="w-6 h-6 text-brand-blue" />
              <span>Browse Tricks</span>
            </Link>
          </Button>
          <Button
            variant="secondary"
            size="lg"
            className="h-auto py-6 flex-col gap-2"
            asChild
          >
            <Link href="/paths">
              <ChartIcon className="w-6 h-6 text-brand-teal" />
              <span>Start New Path</span>
            </Link>
          </Button>
          <Button
            variant="secondary"
            size="lg"
            className="h-auto py-6 flex-col gap-2"
            asChild
          >
            <Link
              href={
                nextRecommendedTrick
                  ? `/trick/${nextRecommendedTrick.slug}`
                  : "/library"
              }
            >
              <ShuffleIcon className="w-6 h-6 text-brand-green" />
              <span>Random Trick</span>
            </Link>
          </Button>
        </div>
      </motion.section>

      {/* Recommended Gear Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
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
