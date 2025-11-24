"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  getPathBySlug,
  getTrickById,
} from "@/lib/data";
import {
  useProgressStore,
  selectMasteredTricks,
  useGamificationStore,
  selectXp,
} from "@/stores";
import { TrickList, ModuleProgress } from "@/components/paths";
import { Badge, DifficultyBadge } from "@/components/ui/badge";
import type { Trick, TrickDifficulty } from "@/lib/data/types";
import type { TrickStatus } from "@/stores/progress-store";
import type { TrickListItem, TrickListStatus } from "@/components/paths/trick-list";

// Mascot messages based on progress
const mascotMessages = {
  start: [
    "Ready to learn something awesome? Let's do this!",
    "This module is going to be so much fun!",
    "Time to add some new tricks to your arsenal!",
  ],
  inProgress: [
    "You're doing great! Keep it up!",
    "Every trick you master brings you closer to becoming a champion!",
    "Don't give up - you've got this!",
  ],
  almostDone: [
    "So close! Just a little more practice!",
    "You're almost there - I can feel it!",
    "One more push and you'll complete this module!",
  ],
  complete: [
    "Amazing work! You crushed this module!",
    "Module complete! You're on fire!",
    "Incredible progress! Ready for the next challenge?",
  ],
};

const getMascotMessage = (completedPercent: number): string => {
  let messages: string[];
  if (completedPercent === 0) {
    messages = mascotMessages.start;
  } else if (completedPercent === 100) {
    messages = mascotMessages.complete;
  } else if (completedPercent >= 80) {
    messages = mascotMessages.almostDone;
  } else {
    messages = mascotMessages.inProgress;
  }
  const index = Math.floor(Math.random() * messages.length);
  return messages[index] ?? messages[0] ?? "Keep practicing!";
};

// Difficulty level mapping
const difficultyLevelMap: Record<TrickDifficulty, "beginner" | "intermediate" | "advanced" | "master" | "legendary"> = {
  1: "beginner",
  2: "intermediate",
  3: "advanced",
  4: "master",
  5: "legendary",
};

export default function ModuleDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = (params?.["slug"] as string) ?? "";
  const moduleId = (params?.["moduleId"] as string) ?? "";

  const [isLoading, setIsLoading] = React.useState(true);
  const [mascotMessage, setMascotMessage] = React.useState("");

  // Get path and module data
  const path = React.useMemo(() => getPathBySlug(slug), [slug]);
  const moduleIndex = React.useMemo(
    () => path?.modules.findIndex((m) => m.id === moduleId) ?? -1,
    [path, moduleId]
  );
  const currentModule = path?.modules[moduleIndex];
  const previousModule = moduleIndex > 0 ? path?.modules[moduleIndex - 1] : null;
  const nextModule = path?.modules[moduleIndex + 1] ?? null;

  // Get user progress from stores
  const masteredTricks = useProgressStore(selectMasteredTricks);
  const userXp = useGamificationStore(selectXp);

  // Get completed trick IDs
  const completedTrickIds = React.useMemo(
    () => masteredTricks.map((t) => t.trickId),
    [masteredTricks]
  );

  // Get trick status helper
  const getTrickStatus = React.useCallback(
    (trickId: string): TrickStatus => {
      const progress = useProgressStore.getState().trickProgress[trickId];
      if (!progress) return "not_started";
      return progress.status;
    },
    []
  );

  // Get all tricks for the module
  const moduleTricks = React.useMemo<Trick[]>(() => {
    if (!currentModule) return [];
    return currentModule.tricks
      .map((id) => getTrickById(id))
      .filter((t): t is Trick => t !== undefined);
  }, [currentModule]);

  // Calculate module progress
  const moduleProgress = React.useMemo(() => {
    if (!currentModule) return { completed: 0, total: 0, percentage: 0, xpEarned: 0, totalXp: 0 };
    const completedInModule = currentModule.tricks.filter((t) =>
      completedTrickIds.includes(t)
    );
    const totalXp = moduleTricks.reduce((sum, t) => sum + t.xpReward, 0);
    const xpEarned = moduleTricks
      .filter((t) => completedTrickIds.includes(t.id))
      .reduce((sum, t) => sum + t.xpReward, 0);

    return {
      completed: completedInModule.length,
      total: currentModule.tricks.length,
      percentage: Math.round((completedInModule.length / currentModule.tricks.length) * 100),
      xpEarned,
      totalXp,
    };
  }, [currentModule, completedTrickIds, moduleTricks]);

  // Estimate remaining time
  const estimatedTimeRemaining = React.useMemo(() => {
    const remainingTricks = moduleTricks.filter(
      (t) => !completedTrickIds.includes(t.id)
    );
    const totalMinutes = remainingTricks.reduce(
      (sum, t) => sum + t.estimatedMinutes,
      0
    );
    if (totalMinutes < 60) return `${totalMinutes} min`;
    const hours = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  }, [moduleTricks, completedTrickIds]);

  // What you'll learn points
  const learningPoints = React.useMemo(() => {
    return moduleTricks.slice(0, 4).map((t) => t.name);
  }, [moduleTricks]);

  // Prerequisites
  const prerequisites = React.useMemo(() => {
    if (!currentModule?.unlockRequirements) return [];
    const reqs = currentModule.unlockRequirements;
    const prereqTricks: string[] = [];

    if (reqs.tricksRequired) {
      reqs.tricksRequired.forEach((trickId) => {
        const trick = getTrickById(trickId);
        if (trick) prereqTricks.push(trick.name);
      });
    }

    if (reqs.previousModuleId && previousModule) {
      prereqTricks.push(`Complete "${previousModule.title}"`);
    }

    if (reqs.xpRequired) {
      prereqTricks.push(`Earn ${reqs.xpRequired} XP`);
    }

    return prereqTricks;
  }, [currentModule, previousModule]);

  // Check if module is locked
  const isModuleLocked = React.useMemo(() => {
    if (!currentModule || moduleIndex === 0) return false;
    const reqs = currentModule.unlockRequirements;
    if (!reqs) return false;

    if (reqs.previousModuleId && previousModule) {
      if (!previousModule.tricks.every((t) => completedTrickIds.includes(t))) {
        return true;
      }
    }

    if (reqs.tricksRequired && !reqs.tricksRequired.every((t) => completedTrickIds.includes(t))) {
      return true;
    }

    if (reqs.xpRequired && userXp < reqs.xpRequired) {
      return true;
    }

    return false;
  }, [currentModule, moduleIndex, previousModule, completedTrickIds, userXp]);

  // Build trick list items with status
  const trickListItems = React.useMemo<TrickListItem[]>(() => {
    return moduleTricks.map((trick, index) => {
      const status = getTrickStatus(trick.id);
      let listStatus: TrickListStatus = "available";
      let unlockRequirement: string | undefined;

      if (status === "mastered") {
        listStatus = "completed";
      } else if (status === "watching" || status === "practicing") {
        listStatus = "in_progress";
      } else {
        // Check if previous trick in module is completed
        if (index > 0) {
          const prevTrickId = currentModule?.tricks[index - 1];
          if (prevTrickId && !completedTrickIds.includes(prevTrickId)) {
            const prevTrick = getTrickById(prevTrickId);
            listStatus = "locked";
            unlockRequirement = prevTrick
              ? `Complete "${prevTrick.name}" first`
              : "Complete previous trick first";
          }
        }
      }

      return {
        trick,
        status,
        listStatus,
        unlockRequirement,
      };
    });
  }, [moduleTricks, getTrickStatus, currentModule, completedTrickIds]);

  // Progress for horizontal tracker
  const progressTricks = React.useMemo(() => {
    return moduleTricks.map((t) => ({
      id: t.id,
      name: t.name,
      status: getTrickStatus(t.id),
      xpReward: t.xpReward,
    }));
  }, [moduleTricks, getTrickStatus]);

  // Handle trick click
  const handleTrickClick = (trickId: string) => {
    const trick = getTrickById(trickId);
    if (trick) {
      router.push(`/trick/${trick.slug}`);
    }
  };

  // Handle continue button
  const handleContinue = () => {
    // Find first incomplete trick
    const firstIncompleteTrick = moduleTricks.find(
      (t) => !completedTrickIds.includes(t.id)
    );
    if (firstIncompleteTrick) {
      router.push(`/trick/${firstIncompleteTrick.slug}`);
    }
  };

  // Set mascot message on mount
  React.useEffect(() => {
    setMascotMessage(getMascotMessage(moduleProgress.percentage));
  }, [moduleProgress.percentage]);

  // Simulate loading
  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  // 404 handling
  if (!isLoading && (!path || !currentModule)) {
    return (
      <div className="min-h-screen bg-surface-primary flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-brand-black mb-2">Module Not Found</h1>
          <p className="text-muted-foreground mb-4">
            The module you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href={path ? `/paths/${path.slug}` : "/paths"}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-blue text-brand-black font-medium hover:bg-brand-blue/80 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {path ? "Back to Path" : "Back to Paths"}
          </Link>
        </div>
      </div>
    );
  }

  if (isLoading || !path || !currentModule) {
    return (
      <div className="min-h-screen bg-surface-primary">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-6 w-48 bg-surface-secondary rounded" />
            <div className="h-10 w-96 bg-surface-secondary rounded" />
            <div className="h-4 w-64 bg-surface-secondary rounded" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
              <div className="lg:col-span-2 space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-24 bg-surface-secondary rounded-xl" />
                ))}
              </div>
              <div className="h-64 bg-surface-secondary rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const isComplete = moduleProgress.percentage === 100;

  return (
    <div className="min-h-screen bg-surface-primary">
      {/* Module Header */}
      <div className="border-b border-border bg-white">
        <div className="container mx-auto px-4 py-6 md:py-8">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-sm text-muted-foreground mb-4 flex-wrap"
          >
            <Link href="/paths" className="hover:text-brand-black transition-colors">
              Paths
            </Link>
            <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            <Link
              href={`/paths/${path.slug}`}
              className="hover:text-brand-black transition-colors truncate max-w-[150px] md:max-w-none"
            >
              {path.title}
            </Link>
            <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-brand-black truncate">{currentModule.title}</span>
          </motion.div>

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            {/* Module Info */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex-1 min-w-0"
            >
              {/* Module number and badges */}
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="text-sm font-semibold text-fun-blue">
                  Module {moduleIndex + 1} of {path.modules.length}
                </span>
                <DifficultyBadge level={difficultyLevelMap[path.difficulty]} />
                {isModuleLocked && (
                  <Badge variant="outline" className="text-muted-foreground border-border">
                    <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Locked
                  </Badge>
                )}
                {isComplete && (
                  <Badge variant="success">
                    <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    Completed
                  </Badge>
                )}
              </div>

              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-brand-black mb-3">
                {currentModule.title}
              </h1>
              <p className="text-muted-foreground text-base md:text-lg max-w-2xl">
                {currentModule.description}
              </p>

              {/* Stats Row */}
              <div className="flex flex-wrap items-center gap-4 md:gap-6 mt-6 text-sm">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-fun-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  <span className="font-semibold text-brand-black">
                    {moduleProgress.completed}/{moduleProgress.total}
                  </span>
                  <span className="text-muted-foreground">tricks completed</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-fun-blue" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </svg>
                  <span className="font-semibold text-brand-black">
                    {moduleProgress.xpEarned}/{moduleProgress.totalXp}
                  </span>
                  <span className="text-muted-foreground">XP</span>
                </div>
                {!isComplete && (
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-fun-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-semibold text-brand-black">{estimatedTimeRemaining}</span>
                    <span className="text-muted-foreground">remaining</span>
                  </div>
                )}
              </div>

              {/* Progress Bar */}
              <div className="mt-6 max-w-md">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Progress</span>
                  <span className={cn("font-semibold", isComplete ? "text-fun-blue" : "text-fun-blue")}>
                    {moduleProgress.percentage}%
                  </span>
                </div>
                <div className="h-3 rounded-full bg-surface-secondary overflow-hidden">
                  <motion.div
                    className={cn(
                      "h-full rounded-full",
                      isComplete ? "bg-xp" : "bg-xp"
                    )}
                    initial={{ width: 0 }}
                    animate={{ width: `${moduleProgress.percentage}%` }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="flex-shrink-0"
            >
              {isModuleLocked ? (
                <div className="px-6 py-3 rounded-full bg-surface-secondary text-muted-foreground font-semibold text-center">
                  <svg className="w-5 h-5 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Module Locked
                </div>
              ) : isComplete ? (
                <div className="px-6 py-3 rounded-full bg-xp text-brand-black font-semibold text-center">
                  <svg className="w-5 h-5 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Module Complete!
                </div>
              ) : (
                <button
                  onClick={handleContinue}
                  className="w-full lg:w-auto px-8 py-3 rounded-full bg-brand-blue text-brand-black font-semibold hover:bg-brand-blue/80 transition-colors shadow-sm"
                >
                  {moduleProgress.completed > 0 ? "Continue" : "Start Module"}
                </button>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Tricks List - Main Content */}
          <div className="lg:col-span-2">
            {/* Visual Module Progress */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-8 p-6 rounded-xl border border-border bg-white"
            >
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                Module Progress
              </h3>
              <ModuleProgress
                tricks={progressTricks}
                onTrickClick={(trickId) => handleTrickClick(trickId)}
              />
            </motion.div>

            {/* Tricks List Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-brand-black">Tricks in this Module</h2>
              <span className="text-sm text-muted-foreground">
                {moduleProgress.completed} of {moduleProgress.total} completed
              </span>
            </div>

            {/* Trick List */}
            <TrickList
              tricks={trickListItems}
              onTrickClick={handleTrickClick}
              showXp={true}
              showDifficulty={true}
            />

            {/* Complete Module Button */}
            {isComplete && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="mt-8 p-6 rounded-xl border-2 border-fun-blue bg-fun-blue/5 text-center"
              >
                <div className="flex items-center justify-center gap-2 text-fun-blue mb-2">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                  <span className="font-bold text-lg">Module Complete!</span>
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <p className="text-muted-foreground mb-4">
                  You&apos;ve mastered all tricks in this module. +25 XP bonus!
                </p>
                {nextModule && (
                  <Link
                    href={`/paths/${path.slug}/${nextModule.id}`}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-xp text-white font-semibold hover:bg-fun-blue/90 transition-colors"
                  >
                    Next Module: {nextModule.title}
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                )}
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Mascot Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.15 }}
              className="rounded-xl border border-border bg-white p-6"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-fun-blue/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-7 h-7 text-fun-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-brand-black">YoYo Coach</p>
                  <p className="text-sm text-muted-foreground mt-1">{mascotMessage}</p>
                </div>
              </div>
            </motion.div>

            {/* Module Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="rounded-xl border border-border bg-white p-6"
            >
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                What You&apos;ll Learn
              </h3>
              <ul className="space-y-3">
                {learningPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-fun-blue flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-brand-black">{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Prerequisites */}
            {prerequisites.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.25 }}
                className="rounded-xl border border-border bg-white p-6"
              >
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                  Prerequisites
                </h3>
                <ul className="space-y-2">
                  {prerequisites.map((prereq, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <svg className="w-4 h-4 text-fun-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                      <span className="text-brand-black">{prereq}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="space-y-3"
            >
              {/* Previous/Next Module */}
              <div className="grid grid-cols-2 gap-3">
                {previousModule ? (
                  <Link
                    href={`/paths/${path.slug}/${previousModule.id}`}
                    className="flex items-center gap-2 px-4 py-3 rounded-xl border border-border bg-white hover:border-fun-blue/30 transition-colors"
                  >
                    <svg className="w-4 h-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground">Previous</p>
                      <p className="text-sm font-medium text-brand-black truncate">
                        {previousModule.title}
                      </p>
                    </div>
                  </Link>
                ) : (
                  <div />
                )}
                {nextModule ? (
                  <Link
                    href={`/paths/${path.slug}/${nextModule.id}`}
                    className="flex items-center gap-2 px-4 py-3 rounded-xl border border-border bg-white hover:border-fun-blue/30 transition-colors text-right"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground">Next</p>
                      <p className="text-sm font-medium text-brand-black truncate">
                        {nextModule.title}
                      </p>
                    </div>
                    <svg className="w-4 h-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                ) : (
                  <div />
                )}
              </div>

              {/* Back to Path */}
              <Link
                href={`/paths/${path.slug}`}
                className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl border border-border bg-white hover:border-fun-blue/30 transition-colors text-center"
              >
                <svg className="w-4 h-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span className="text-sm font-medium text-brand-black">Back to {path.title}</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
