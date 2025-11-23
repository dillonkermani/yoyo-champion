"use client";

import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Clock,
  Trophy,
  Star,
  ChevronRight,
  Sparkles,
  BookOpen,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { MotionButton, Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  useOnboardingStore,
  selectSkillLevel,
  selectGoals,
  selectRecommendedPaths,
} from "@/stores";
import { mockPaths } from "@/lib/data/mock-paths";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

// Difficulty indicator component
function DifficultyIndicator({ level }: { level: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "w-2 h-2 rounded-full",
            i < level ? "bg-brand-teal" : "bg-gray-200"
          )}
        />
      ))}
    </div>
  );
}

// Get a personalized recommendation based on user selections
function useRecommendation() {
  const skillLevel = useOnboardingStore(selectSkillLevel);
  const goals = useOnboardingStore(selectGoals);
  const recommendedPathIds = useOnboardingStore(selectRecommendedPaths);

  return useMemo(() => {
    // Find the best matching path from mock data
    // mockPaths is guaranteed to have at least one element (static data)
    const defaultPath = mockPaths[0]!;
    let recommendedPath = defaultPath; // Default to first path

    // Logic to select best path based on skill level
    if (skillLevel === "never" || skillLevel === "beginner") {
      recommendedPath =
        mockPaths.find((p) => p.slug === "beginner-to-intermediate") ||
        defaultPath;
    } else if (skillLevel === "intermediate") {
      recommendedPath =
        mockPaths.find((p) => p.slug === "master-fundamentals") || mockPaths[1] || defaultPath;
    } else if (skillLevel === "advanced" || skillLevel === "expert") {
      if (goals.includes("compete")) {
        recommendedPath =
          mockPaths.find((p) => p.slug === "competition-prep-gentry") ||
          mockPaths[3] || defaultPath;
      } else {
        recommendedPath =
          mockPaths.find((p) => p.slug === "slack-tricks-mastery") ||
          mockPaths[2] || defaultPath;
      }
    }

    // Calculate estimated completion based on daily practice
    const estimatedWeeks = Math.ceil(recommendedPath.estimatedDays / 7);
    const totalTricks = recommendedPath.modules.reduce(
      (acc, m) => acc + m.tricks.length,
      0
    );

    return {
      path: recommendedPath,
      estimatedWeeks,
      totalTricks,
      totalXp: recommendedPath.totalXp,
      pathIds: recommendedPathIds,
    };
  }, [skillLevel, goals, recommendedPathIds]);
}

export function RecommendationStep() {
  const router = useRouter();
  const { path, estimatedWeeks, totalTricks, totalXp } = useRecommendation();

  const completeOnboarding = useOnboardingStore(
    (state) => state.completeOnboarding
  );
  const setRecommendedPath = useOnboardingStore(
    (state) => state.setRecommendedPath
  );

  useEffect(() => {
    // Set the recommended path ID in the store
    setRecommendedPath(path.id);
  }, [path.id, setRecommendedPath]);

  const handleStartPath = () => {
    completeOnboarding();
    router.push(`/paths/${path.slug}`);
  };

  const handleBrowsePaths = () => {
    completeOnboarding();
    router.push("/paths");
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-brand-blue/20 mb-3 sm:mb-4">
          <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-brand-blue" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-brand-black mb-1 sm:mb-2">
          Your Personalized Path
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground">
          Based on your selections, we recommend this learning path
        </p>
      </motion.div>

      {/* Recommended path card */}
      <motion.div variants={itemVariants}>
        <Card className="overflow-hidden border-2 border-brand-blue">
          {/* Gradient header */}
          <div className="h-3 bg-gradient-to-r from-brand-blue via-brand-teal to-brand-green" />

          <CardContent className="p-4 sm:p-6">
            {/* Path title and instructor */}
            <div className="mb-3 sm:mb-4">
              <div className="flex items-start justify-between gap-2 mb-1 sm:mb-2">
                <h3 className="text-lg sm:text-xl font-bold text-brand-black">
                  {path.title}
                </h3>
                {path.isFeatured && (
                  <span className="flex-shrink-0 flex items-center gap-1 px-1.5 py-0.5 sm:px-2 sm:py-1 text-[10px] sm:text-xs font-medium bg-brand-blue/20 text-brand-black rounded-full">
                    <Star className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                    Featured
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">
                with {path.instructor.name}
              </p>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-brand-black/80 mb-4 sm:mb-6 line-clamp-2 sm:line-clamp-3">
              {path.description}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6">
              <div className="text-center p-2 sm:p-3 bg-surface-secondary rounded-lg">
                <Clock className="h-4 w-4 sm:h-5 sm:w-5 mx-auto mb-0.5 sm:mb-1 text-brand-teal" />
                <div className="text-base sm:text-lg font-bold text-brand-black">
                  {estimatedWeeks}
                </div>
                <div className="text-[10px] sm:text-xs text-muted-foreground">weeks</div>
              </div>
              <div className="text-center p-2 sm:p-3 bg-surface-secondary rounded-lg">
                <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 mx-auto mb-0.5 sm:mb-1 text-brand-teal" />
                <div className="text-base sm:text-lg font-bold text-brand-black">
                  {totalTricks}
                </div>
                <div className="text-[10px] sm:text-xs text-muted-foreground">tricks</div>
              </div>
              <div className="text-center p-2 sm:p-3 bg-surface-secondary rounded-lg">
                <Trophy className="h-4 w-4 sm:h-5 sm:w-5 mx-auto mb-0.5 sm:mb-1 text-brand-teal" />
                <div className="text-base sm:text-lg font-bold text-brand-black">
                  {totalXp.toLocaleString()}
                </div>
                <div className="text-[10px] sm:text-xs text-muted-foreground">XP</div>
              </div>
            </div>

            {/* Difficulty */}
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <span className="text-xs sm:text-sm text-muted-foreground">Difficulty</span>
              <DifficultyIndicator level={path.difficulty} />
            </div>

            {/* What you'll learn preview */}
            <div className="mb-4 sm:mb-6">
              <h4 className="text-xs sm:text-sm font-medium text-brand-black mb-1.5 sm:mb-2">
                What you&apos;ll learn:
              </h4>
              <ul className="space-y-0.5 sm:space-y-1">
                {path.modules.slice(0, 3).map((module) => (
                  <li
                    key={module.id}
                    className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted-foreground"
                  >
                    <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 text-brand-teal flex-shrink-0" />
                    <span className="truncate">{module.title}</span>
                  </li>
                ))}
                {path.modules.length > 3 && (
                  <li className="text-xs sm:text-sm text-brand-teal font-medium pl-5 sm:pl-6">
                    + {path.modules.length - 3} more modules
                  </li>
                )}
              </ul>
            </div>

            {/* CTA */}
            <MotionButton
              variant="brand"
              size="lg"
              onClick={handleStartPath}
              className="w-full min-h-[48px] touch-manipulation"
            >
              Start This Path
              <ChevronRight className="ml-2 h-5 w-5" />
            </MotionButton>
          </CardContent>
        </Card>
      </motion.div>

      {/* Alternative option */}
      <motion.div variants={itemVariants} className="text-center">
        <Button variant="ghost" onClick={handleBrowsePaths} className="min-h-[44px] touch-manipulation">
          Browse All Paths
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </motion.div>
    </motion.div>
  );
}
