"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  BookOpen,
  Target,
  Trophy,
  Star,
  Users,
  Smile,
  Activity,
  Coffee,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  useOnboardingStore,
  selectGoals,
  GOAL_METADATA,
  type Goal,
} from "@/stores";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
    },
  },
};

// Map goal icons
const goalIcons: Record<Goal, React.ReactNode> = {
  learn_basics: <BookOpen className="h-5 w-5" />,
  master_string_tricks: <Target className="h-5 w-5" />,
  compete: <Trophy className="h-5 w-5" />,
  perform: <Star className="h-5 w-5" />,
  teach_others: <Users className="h-5 w-5" />,
  just_fun: <Smile className="h-5 w-5" />,
  fitness: <Activity className="h-5 w-5" />,
  stress_relief: <Coffee className="h-5 w-5" />,
};

const ALL_GOALS: Goal[] = [
  "learn_basics",
  "master_string_tricks",
  "compete",
  "perform",
  "teach_others",
  "just_fun",
  "fitness",
  "stress_relief",
];

interface GoalOptionProps {
  goal: Goal;
  isSelected: boolean;
  onToggle: () => void;
}

function GoalOption({ goal, isSelected, onToggle }: GoalOptionProps) {
  const metadata = GOAL_METADATA[goal];

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      onToggle();
    },
    [onToggle]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onToggle();
      }
    },
    [onToggle]
  );

  return (
    <motion.div variants={cardVariants}>
      <Card
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="checkbox"
        aria-checked={isSelected}
        className={cn(
          "cursor-pointer transition-all duration-200 p-4 select-none",
          isSelected
            ? "border-2 border-brand-blue bg-brand-blue/5 shadow-card"
            : "border border-border hover:border-brand-teal/50"
        )}
      >
        <div className="flex items-center gap-3">
          {/* Checkbox */}
          <div
            className={cn(
              "flex-shrink-0 w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all",
              isSelected
                ? "border-brand-blue bg-brand-blue"
                : "border-gray-300 bg-white"
            )}
          >
            {isSelected && (
              <motion.svg
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-4 h-4 text-brand-black"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </motion.svg>
            )}
          </div>

          {/* Icon */}
          <div
            className={cn(
              "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors",
              isSelected
                ? "bg-brand-blue text-brand-black"
                : "bg-surface-secondary text-muted-foreground"
            )}
          >
            {goalIcons[goal]}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-brand-black text-sm">
              {metadata.label}
            </h3>
            <p className="text-xs text-muted-foreground truncate">
              {metadata.description}
            </p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

export default function GoalsPage() {
  const router = useRouter();
  const selectedGoals = useOnboardingStore(selectGoals);
  const toggleGoal = useOnboardingStore((state) => state.toggleGoal);

  const handleToggleGoal = useCallback(
    (goal: Goal) => {
      toggleGoal(goal);
    },
    [toggleGoal]
  );

  const handleBack = useCallback(() => {
    router.push("/onboarding/skill-level");
  }, [router]);

  const handleNext = useCallback(() => {
    if (selectedGoals.length > 0) {
      router.push("/onboarding/styles");
    }
  }, [selectedGoals.length, router]);

  const canProceed = selectedGoals.length > 0;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={cardVariants} className="text-center mb-6">
        <h2 className="text-2xl font-bold text-brand-black mb-2">
          What Are Your Goals?
        </h2>
        <p className="text-muted-foreground">
          Select all that apply - you can change these later
        </p>
      </motion.div>

      {/* Selected count */}
      <motion.div variants={cardVariants} className="text-center">
        <span
          className={cn(
            "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-colors",
            selectedGoals.length > 0
              ? "bg-brand-blue/20 text-brand-black"
              : "bg-gray-100 text-muted-foreground"
          )}
        >
          {selectedGoals.length} selected
        </span>
      </motion.div>

      {/* Goal grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {ALL_GOALS.map((goal) => (
          <GoalOption
            key={goal}
            goal={goal}
            isSelected={selectedGoals.includes(goal)}
            onToggle={() => handleToggleGoal(goal)}
          />
        ))}
      </div>

      {/* Hint */}
      {selectedGoals.length === 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-sm text-muted-foreground"
        >
          Select at least one goal to continue
        </motion.p>
      )}

      {/* Navigation buttons */}
      <motion.div
        variants={cardVariants}
        className="flex items-center justify-between mt-8 pt-4"
      >
        <Button variant="ghost" onClick={handleBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <Button
          variant="brand"
          onClick={handleNext}
          disabled={!canProceed}
          size="lg"
        >
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </motion.div>
    </motion.div>
  );
}
