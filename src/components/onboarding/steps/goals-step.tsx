"use client";

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
} from "lucide-react";
import { MotionCard } from "@/components/ui/card";
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

  return (
    <MotionCard
      variants={cardVariants}
      onClick={onToggle}
      className={cn(
        "cursor-pointer transition-all duration-200 p-4",
        isSelected
          ? "border-2 border-brand-blue bg-brand-blue/5 shadow-card"
          : "border border-border hover:border-brand-teal/50"
      )}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
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
    </MotionCard>
  );
}

export function GoalsStep() {
  const selectedGoals = useOnboardingStore(selectGoals);
  const toggleGoal = useOnboardingStore((state) => state.toggleGoal);

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
            onToggle={() => toggleGoal(goal)}
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
    </motion.div>
  );
}
