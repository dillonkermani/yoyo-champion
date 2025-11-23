"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  getPathBySlug,
  getTrickById,
  calculatePathProgress,
  getNextUnlockedModule,
} from "@/lib/data";
import {
  useProgressStore,
  selectMasteredTricks,
  useGamificationStore,
  selectXp,
} from "@/stores";
import { PathProgress, ModuleCard, ModuleCardSkeleton } from "@/components/paths";
import { Badge, DifficultyBadge } from "@/components/ui/badge";
import type { PathModule, TrickDifficulty, Trick } from "@/lib/data/types";
import type { TrickStatus } from "@/stores/progress-store";

// Difficulty level mapping
const difficultyLevelMap: Record<TrickDifficulty, "beginner" | "intermediate" | "advanced" | "master" | "legendary"> = {
  1: "beginner",
  2: "intermediate",
  3: "advanced",
  4: "master",
  5: "legendary",
};

export default function PathDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.["slug"] as string;

  const [expandedModuleId, setExpandedModuleId] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  // Get path data
  const path = React.useMemo(() => getPathBySlug(slug), [slug]);

  // Get user progress from stores
  const masteredTricks = useProgressStore(selectMasteredTricks);
  const pathProgress = useProgressStore((state) => state.pathProgress);
  const startPath = useProgressStore((state) => state.startPath);
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

  // Calculate path progress
  const progress = React.useMemo(() => {
    if (!path) return null;
    return calculatePathProgress(path.id, completedTrickIds);
  }, [path, completedTrickIds]);

  // Get current path progress state
  const currentPathProgress = path ? pathProgress[path.id] : null;
  const hasStarted = !!currentPathProgress;
  const isComplete = currentPathProgress?.completedAt !== null && currentPathProgress?.completedAt !== undefined;

  // Get next unlocked module
  const nextModuleId = React.useMemo(() => {
    if (!path) return null;
    return getNextUnlockedModule(path.id, completedTrickIds, userXp);
  }, [path, completedTrickIds, userXp]);

  // Get all tricks for the path
  const pathTricks = React.useMemo(() => {
    if (!path) return [];
    const trickIds = path.modules.flatMap((m) => m.tricks);
    const uniqueIds = Array.from(new Set(trickIds));
    return uniqueIds
      .map((id) => getTrickById(id))
      .filter((t): t is Trick => t !== undefined);
  }, [path]);

  // Check if module is locked
  const isModuleLocked = React.useCallback(
    (module: PathModule, index: number): boolean => {
      if (!path || index === 0) return false;

      const reqs = module.unlockRequirements;
      if (!reqs) return false;

      // Check previous module completion
      if (reqs.previousModuleId) {
        const prevModule = path.modules.find((m) => m.id === reqs.previousModuleId);
        if (prevModule && !prevModule.tricks.every((t) => completedTrickIds.includes(t))) {
          return true;
        }
      }

      // Check required tricks
      if (reqs.tricksRequired && !reqs.tricksRequired.every((t) => completedTrickIds.includes(t))) {
        return true;
      }

      // Check required XP
      if (reqs.xpRequired && userXp < reqs.xpRequired) {
        return true;
      }

      return false;
    },
    [path, completedTrickIds, userXp]
  );

  // Handle start path
  const handleStartPath = () => {
    if (!path) return;
    const firstModule = path.modules[0];
    if (firstModule) {
      startPath(path.id, firstModule.id);
      setExpandedModuleId(firstModule.id);
    }
  };

  // Handle module click from progress tracker
  const handleModuleClick = (moduleId: string) => {
    setExpandedModuleId(expandedModuleId === moduleId ? null : moduleId);
  };

  // Handle trick click
  const handleTrickClick = (trickId: string) => {
    const trick = getTrickById(trickId);
    if (trick) {
      router.push(`/trick/${trick.slug}`);
    }
  };

  // Simulate loading
  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  // Expand current module on load
  React.useEffect(() => {
    if (currentPathProgress?.currentModuleId && !expandedModuleId) {
      setExpandedModuleId(currentPathProgress.currentModuleId);
    } else if (nextModuleId && !expandedModuleId) {
      setExpandedModuleId(nextModuleId);
    }
  }, [currentPathProgress, nextModuleId, expandedModuleId]);

  // 404 if path not found
  if (!path && !isLoading) {
    return (
      <div className="min-h-screen bg-surface-primary flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-brand-black mb-2">Path Not Found</h1>
          <p className="text-muted-foreground mb-4">The learning path you&apos;re looking for doesn&apos;t exist.</p>
          <Link
            href="/paths"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-blue text-brand-black font-medium hover:bg-brand-blue/80 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Paths
          </Link>
        </div>
      </div>
    );
  }

  if (isLoading || !path) {
    return (
      <div className="min-h-screen bg-surface-primary">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 w-64 bg-surface-secondary rounded" />
            <div className="h-4 w-96 bg-surface-secondary rounded" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <ModuleCardSkeleton key={i} />
                ))}
              </div>
              <div className="h-64 bg-surface-secondary rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-primary">
      {/* Page Header */}
      <div className="border-b border-border bg-white">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-sm text-muted-foreground mb-4"
          >
            <Link href="/paths" className="hover:text-brand-black transition-colors">
              Learning Paths
            </Link>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-brand-black truncate">{path.title}</span>
          </motion.div>

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            {/* Path Info */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex-1 min-w-0"
            >
              <div className="flex flex-wrap items-center gap-3 mb-3">
                {path.isFeatured && (
                  <Badge variant="brand">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                    </svg>
                    Featured
                  </Badge>
                )}
                <DifficultyBadge level={difficultyLevelMap[path.difficulty]} />
                {isComplete && (
                  <Badge variant="success">
                    <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    Completed
                  </Badge>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-brand-black mb-3">
                {path.title}
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl">
                {path.description}
              </p>

              {/* Stats */}
              <div className="flex flex-wrap items-center gap-6 mt-6 text-sm">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-brand-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="font-semibold text-brand-black">{path.estimatedDays} days</span>
                  <span className="text-muted-foreground">to complete</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-brand-teal" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </svg>
                  <span className="font-semibold text-brand-black">{path.totalXp.toLocaleString()} XP</span>
                  <span className="text-muted-foreground">total reward</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-brand-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  <span className="font-semibold text-brand-black">{path.modules.length} modules</span>
                  <span className="text-muted-foreground">
                    ({pathTricks.length} tricks)
                  </span>
                </div>
              </div>

              {/* Progress Bar (if started) */}
              {hasStarted && progress && (
                <div className="mt-6 max-w-md">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-muted-foreground">
                      {progress.completed} of {progress.total} tricks completed
                    </span>
                    <span className="font-semibold text-brand-teal">{progress.percentage}%</span>
                  </div>
                  <div className="h-3 rounded-full bg-surface-secondary overflow-hidden">
                    <motion.div
                      className={cn(
                        "h-full rounded-full",
                        isComplete ? "bg-brand-green" : "bg-brand-blue"
                      )}
                      initial={{ width: 0 }}
                      animate={{ width: `${progress.percentage}%` }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>
                </div>
              )}
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="flex-shrink-0"
            >
              {!hasStarted ? (
                <button
                  onClick={handleStartPath}
                  className="w-full lg:w-auto px-8 py-3 rounded-full bg-brand-blue text-brand-black font-semibold hover:bg-brand-blue/80 transition-colors shadow-sm"
                >
                  Start Path
                </button>
              ) : !isComplete ? (
                <button
                  onClick={() => nextModuleId && setExpandedModuleId(nextModuleId)}
                  className="w-full lg:w-auto px-8 py-3 rounded-full bg-brand-blue text-brand-black font-semibold hover:bg-brand-blue/80 transition-colors shadow-sm"
                >
                  Continue Learning
                </button>
              ) : (
                <div className="px-6 py-3 rounded-full bg-brand-green text-brand-black font-semibold text-center">
                  <svg className="w-5 h-5 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Path Complete!
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Modules List - Main Content */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-bold text-brand-black mb-4">Path Modules</h2>
            {path.modules.map((module, index) => (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <ModuleCard
                  module={module}
                  moduleNumber={index + 1}
                  tricks={pathTricks}
                  getTrickStatus={getTrickStatus}
                  isLocked={isModuleLocked(module, index)}
                  isExpanded={expandedModuleId === module.id}
                  onExpandToggle={() => handleModuleClick(module.id)}
                  onTrickClick={handleTrickClick}
                />
              </motion.div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Instructor Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="rounded-xl border border-border bg-white p-6"
            >
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                Your Instructor
              </h3>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-brand-teal/20 flex items-center justify-center overflow-hidden">
                  <span className="text-lg font-semibold text-brand-teal">
                    {path.instructor.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-brand-black">{path.instructor.name}</p>
                  <p className="text-sm text-muted-foreground">{path.instructor.title}</p>
                </div>
              </div>
              {path.instructor.name === "Gentry Stein" && (
                <p className="mt-4 text-sm text-muted-foreground">
                  World YoYo Champion and founder of YoYoChampion. Gentry has helped millions of throwers improve their skills through his tutorials and training programs.
                </p>
              )}
            </motion.div>

            {/* What You'll Learn */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="rounded-xl border border-border bg-white p-6"
            >
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                What You&apos;ll Learn
              </h3>
              <ul className="space-y-3">
                {path.modules.slice(0, 4).map((module) => (
                  <li key={module.id} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-brand-teal flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-brand-black">{module.title}</span>
                  </li>
                ))}
                {path.modules.length > 4 && (
                  <li className="text-sm text-muted-foreground pl-8">
                    +{path.modules.length - 4} more modules
                  </li>
                )}
              </ul>
            </motion.div>

            {/* Prerequisites (if any) */}
            {path.modules[0]?.unlockRequirements?.tricksRequired && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="rounded-xl border border-border bg-white p-6"
              >
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                  Prerequisites
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Complete these tricks before starting this path:
                </p>
                <ul className="space-y-2">
                  {path.modules[0].unlockRequirements.tricksRequired.map((trickId) => {
                    const trick = getTrickById(trickId);
                    const isCompleted = completedTrickIds.includes(trickId);
                    return trick ? (
                      <li key={trickId} className="flex items-center gap-2 text-sm">
                        {isCompleted ? (
                          <svg className="w-4 h-4 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        )}
                        <span className={isCompleted ? "text-brand-black line-through opacity-70" : "text-brand-black"}>
                          {trick.name}
                        </span>
                      </li>
                    ) : null;
                  })}
                </ul>
              </motion.div>
            )}

            {/* Visual Progress Tracker */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
              className="rounded-xl border border-border bg-white p-6"
            >
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                Your Progress
              </h3>
              <PathProgress
                modules={path.modules}
                completedModules={currentPathProgress?.completedModules || []}
                currentModuleId={currentPathProgress?.currentModuleId || nextModuleId}
                onModuleClick={handleModuleClick}
                isModuleLocked={isModuleLocked}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
