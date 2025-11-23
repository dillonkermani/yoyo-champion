"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  TrendingUp,
  Trophy,
  HelpCircle,
  BookOpen,
} from "lucide-react";
import { MotionCard } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  useOnboardingStore,
  selectSkillLevel,
  SKILL_LEVEL_METADATA,
  type SkillLevel,
} from "@/stores";
import { SkillQuiz } from "../skill-quiz";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
    },
  },
};

interface SkillOptionProps {
  level: SkillLevel;
  isSelected: boolean;
  onClick: () => void;
  icon: React.ReactNode;
}

function SkillOption({ level, isSelected, onClick, icon }: SkillOptionProps) {
  const metadata = SKILL_LEVEL_METADATA[level];

  return (
    <MotionCard
      variants={cardVariants}
      onClick={onClick}
      className={cn(
        "cursor-pointer transition-all duration-200 p-4",
        isSelected
          ? "border-2 border-brand-blue bg-brand-blue/5 shadow-elevated"
          : "border border-border hover:border-brand-teal/50 hover:shadow-card"
      )}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-start gap-4">
        <div
          className={cn(
            "flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-colors",
            isSelected
              ? "bg-brand-blue text-brand-black"
              : "bg-surface-secondary text-muted-foreground"
          )}
        >
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3
            className={cn(
              "font-semibold mb-1 transition-colors",
              isSelected ? "text-brand-black" : "text-brand-black"
            )}
          >
            {metadata.label}
          </h3>
          <p className="text-sm text-muted-foreground">{metadata.description}</p>
        </div>
        {isSelected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-blue flex items-center justify-center"
          >
            <svg
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
            </svg>
          </motion.div>
        )}
      </div>
    </MotionCard>
  );
}

const skillLevelIcons: Record<SkillLevel, React.ReactNode> = {
  never: <BookOpen className="h-6 w-6" />,
  beginner: <Sparkles className="h-6 w-6" />,
  intermediate: <TrendingUp className="h-6 w-6" />,
  advanced: <Trophy className="h-6 w-6" />,
  expert: <Trophy className="h-6 w-6" />,
};

// Skill levels to show as main options
const MAIN_SKILL_LEVELS: SkillLevel[] = [
  "never",
  "beginner",
  "intermediate",
  "advanced",
];

export function SkillLevelStep() {
  const [showQuiz, setShowQuiz] = useState(false);
  const selectedLevel = useOnboardingStore(selectSkillLevel);
  const setSkillLevel = useOnboardingStore((state) => state.setSkillLevel);

  const handleSelect = (level: SkillLevel) => {
    setSkillLevel(level);
  };

  const handleQuizComplete = (level: SkillLevel) => {
    setSkillLevel(level);
    setShowQuiz(false);
  };

  if (showQuiz) {
    return (
      <SkillQuiz
        onComplete={handleQuizComplete}
        onCancel={() => setShowQuiz(false)}
      />
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={cardVariants} className="text-center mb-8">
        <h2 className="text-2xl font-bold text-brand-black mb-2">
          What&apos;s Your Skill Level?
        </h2>
        <p className="text-muted-foreground">
          Help us personalize your learning path
        </p>
      </motion.div>

      {/* Skill options */}
      <div className="space-y-3">
        {MAIN_SKILL_LEVELS.map((level) => (
          <SkillOption
            key={level}
            level={level}
            isSelected={selectedLevel === level}
            onClick={() => handleSelect(level)}
            icon={skillLevelIcons[level]}
          />
        ))}
      </div>

      {/* Take quiz option */}
      <motion.div variants={cardVariants} className="pt-4">
        <Button
          variant="outline"
          onClick={() => setShowQuiz(true)}
          className="w-full flex items-center justify-center gap-2 h-14"
        >
          <HelpCircle className="h-5 w-5 text-brand-teal" />
          <span>Not sure? Take a quick skill quiz</span>
        </Button>
      </motion.div>
    </motion.div>
  );
}
