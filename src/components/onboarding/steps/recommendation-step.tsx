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
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-blue/20 mb-4">
          <Sparkles className="h-8 w-8 text-brand-blue" />
        </div>
        <h2 className="text-2xl font-bold text-brand-black mb-2">
          Your Personalized Path
        </h2>
        <p className="text-muted-foreground">
          Based on your selections, we recommend this learning path
        </p>
      </motion.div>

      {/* Recommended path card */}
      <motion.div variants={itemVariants}>
        <Card className="overflow-hidden border-2 border-brand-blue">
          {/* Gradient header */}
          <div className="h-3 bg-gradient-to-r from-brand-blue via-brand-teal to-brand-green" />

          <CardContent className="p-6">
            {/* Path title and instructor */}
            <div className="mb-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-xl font-bold text-brand-black">
                  {path.title}
                </h3>
                {path.isFeatured && (
                  <span className="flex items-center gap-1 px-2 py-1 text-xs font-medium bg-brand-blue/20 text-brand-black rounded-full">
                    <Star className="h-3 w-3" />
                    Featured
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                with {path.instructor.name}
              </p>
            </div>

            {/* Description */}
            <p className="text-sm text-brand-black/80 mb-6 line-clamp-3">
              {path.description}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-3 bg-surface-secondary rounded-lg">
                <Clock className="h-5 w-5 mx-auto mb-1 text-brand-teal" />
                <div className="text-lg font-bold text-brand-black">
                  {estimatedWeeks}
                </div>
                <div className="text-xs text-muted-foreground">weeks</div>
              </div>
              <div className="text-center p-3 bg-surface-secondary rounded-lg">
                <BookOpen className="h-5 w-5 mx-auto mb-1 text-brand-teal" />
                <div className="text-lg font-bold text-brand-black">
                  {totalTricks}
                </div>
                <div className="text-xs text-muted-foreground">tricks</div>
              </div>
              <div className="text-center p-3 bg-surface-secondary rounded-lg">
                <Trophy className="h-5 w-5 mx-auto mb-1 text-brand-teal" />
                <div className="text-lg font-bold text-brand-black">
                  {totalXp.toLocaleString()}
                </div>
                <div className="text-xs text-muted-foreground">XP</div>
              </div>
            </div>

            {/* Difficulty */}
            <div className="flex items-center justify-between mb-6">
              <span className="text-sm text-muted-foreground">Difficulty</span>
              <DifficultyIndicator level={path.difficulty} />
            </div>

            {/* What you'll learn preview */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-brand-black mb-2">
                What you&apos;ll learn:
              </h4>
              <ul className="space-y-1">
                {path.modules.slice(0, 3).map((module) => (
                  <li
                    key={module.id}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <ChevronRight className="h-4 w-4 text-brand-teal" />
                    {module.title}
                  </li>
                ))}
                {path.modules.length > 3 && (
                  <li className="text-sm text-brand-teal font-medium pl-6">
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
              className="w-full"
            >
              Start This Path
              <ChevronRight className="ml-2 h-5 w-5" />
            </MotionButton>
          </CardContent>
        </Card>
      </motion.div>

      {/* Alternative option */}
      <motion.div variants={itemVariants} className="text-center">
        <Button variant="ghost" onClick={handleBrowsePaths}>
          Browse All Paths
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </motion.div>
    </motion.div>
  );
}
