"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  TrendingUp,
  Trophy,
  HelpCircle,
  BookOpen,
  ArrowLeft,
  ArrowRight,
  Zap,
} from "lucide-react";
import { Button, MotionButton } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  useOnboardingStore,
  selectSkillLevel,
  SKILL_LEVEL_METADATA,
  type SkillLevel,
} from "@/stores";
import { SkillQuiz } from "@/components/onboarding/skill-quiz";
import { Mascot, getRandomMessage, ConfettiBurst } from "@/components/fun";

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
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      type: "spring",
      bounce: 0.3,
    },
  },
};

// Skill level configuration with fun colors and emojis
const skillLevelConfig: Record<SkillLevel, {
  icon: React.ReactNode;
  emoji: string;
  color: string;
  bgColor: string;
  borderColor: string;
  description: string;
}> = {
  never: {
    icon: <BookOpen className="h-6 w-6" />,
    emoji: "🌱",
    color: "text-fun-primary",
    bgColor: "bg-fun-primary/20",
    borderColor: "border-fun-primary",
    description: "Brand new to yo-yos - let's start from scratch!",
  },
  beginner: {
    icon: <Sparkles className="h-6 w-6" />,
    emoji: "⭐",
    color: "text-fun-blue",
    bgColor: "bg-fun-blue/20",
    borderColor: "border-fun-blue",
    description: "Can do basic tricks like Sleeper and Rock the Baby",
  },
  intermediate: {
    icon: <TrendingUp className="h-6 w-6" />,
    emoji: "🔥",
    color: "text-fun-accent",
    bgColor: "bg-fun-accent/20",
    borderColor: "border-fun-accent",
    description: "Comfortable with string tricks like Trapeze and Matrix",
  },
  advanced: {
    icon: <Trophy className="h-6 w-6" />,
    emoji: "🏆",
    color: "text-fun-purple",
    bgColor: "bg-fun-purple/20",
    borderColor: "border-fun-purple",
    description: "Ready for expert combos and competition-level tricks",
  },
  expert: {
    icon: <Trophy className="h-6 w-6" />,
    emoji: "👑",
    color: "text-xp",
    bgColor: "bg-xp/20",
    borderColor: "border-xp",
    description: "Master level - time for world-class techniques!",
  },
};

interface SkillOptionProps {
  level: SkillLevel;
  isSelected: boolean;
  onClick: () => void;
  index: number;
}

function SkillOption({ level, isSelected, onClick, index }: SkillOptionProps) {
  const metadata = SKILL_LEVEL_METADATA[level];
  const config = skillLevelConfig[level];

  return (
    <motion.div
      variants={cardVariants}
      custom={index}
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div
        onClick={onClick}
        className={cn(
          "cursor-pointer transition-all duration-300 p-4 rounded-2xl border-2",
          isSelected
            ? `${config.bgColor} ${config.borderColor} shadow-lg`
            : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md"
        )}
      >
        <div className="flex items-start gap-4">
          {/* Icon with animation */}
          <motion.div
            className={cn(
              "flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center transition-all",
              isSelected
                ? `${config.bgColor} ${config.color}`
                : "bg-gray-100 text-gray-400"
            )}
            animate={isSelected ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 0.3 }}
          >
            <span className="text-2xl">{config.emoji}</span>
          </motion.div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3
                className={cn(
                  "font-bold text-lg transition-colors",
                  isSelected ? config.color : "text-gray-900"
                )}
              >
                {metadata.label}
              </h3>
              {isSelected && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-lg"
                >
                  ✓
                </motion.span>
              )}
            </div>
            <p className="text-sm text-gray-500">{config.description}</p>
          </div>

          {/* Selection indicator */}
          <AnimatePresence>
            {isSelected && (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                className={cn(
                  "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
                  config.bgColor
                )}
              >
                <svg
                  className={cn("w-5 h-5", config.color)}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Skill levels to show as main options
const MAIN_SKILL_LEVELS: SkillLevel[] = [
  "never",
  "beginner",
  "intermediate",
  "advanced",
];

export default function SkillLevelPage() {
  const router = useRouter();
  const [showQuiz, setShowQuiz] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [selectionMessage, setSelectionMessage] = useState<string | null>(null);
  const selectedLevel = useOnboardingStore(selectSkillLevel);
  const setSkillLevel = useOnboardingStore((state) => state.setSkillLevel);

  // For URL-based navigation, check if skill level is selected
  const canProceed = selectedLevel !== null;

  const handleSelect = useCallback((level: SkillLevel) => {
    setSkillLevel(level);
    setSelectionMessage(getRandomMessage("selection"));
    setTimeout(() => setSelectionMessage(null), 2000);
  }, [setSkillLevel]);

  const handleQuizComplete = useCallback((level: SkillLevel) => {
    setSkillLevel(level);
    setShowQuiz(false);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 2000);
  }, [setSkillLevel]);

  const handleBack = useCallback(() => {
    router.push("/onboarding/welcome");
  }, [router]);

  const handleNext = useCallback(() => {
    if (canProceed) {
      setShowConfetti(true);
      setTimeout(() => {
        router.push("/onboarding/goals");
      }, 300);
    }
  }, [canProceed, router]);

  if (showQuiz) {
    return (
      <SkillQuiz
        onComplete={handleQuizComplete}
        onCancel={() => setShowQuiz(false)}
      />
    );
  }

  return (
    <>
      <ConfettiBurst trigger={showConfetti} />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6 max-w-lg mx-auto"
      >
        {/* Header with mascot */}
        <motion.div variants={cardVariants} className="text-center mb-8">
          <Mascot size="md" mood={selectedLevel ? "excited" : "thinking"} className="mx-auto mb-4" />
          <h2 className="text-2xl font-black text-gray-900 mb-2">
            What&apos;s Your Skill Level?
          </h2>
          <p className="text-gray-500">
            Help us personalize your learning journey
          </p>
        </motion.div>

        {/* Selection feedback message */}
        <AnimatePresence>
          {selectionMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.9 }}
              className="text-center py-2 px-4 rounded-full bg-fun-primary/20 text-fun-primary font-bold text-sm mx-auto w-fit"
            >
              {selectionMessage}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Skill options - Colorful and bouncy */}
        <div className="space-y-3">
          {MAIN_SKILL_LEVELS.map((level, index) => (
            <SkillOption
              key={level}
              level={level}
              isSelected={selectedLevel === level}
              onClick={() => handleSelect(level)}
              index={index}
            />
          ))}
        </div>

        {/* Take quiz option - Fun button */}
        <motion.div variants={cardVariants} className="pt-4">
          <motion.button
            onClick={() => setShowQuiz(true)}
            className="w-full flex items-center justify-center gap-3 h-14 rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 hover:border-fun-blue hover:bg-fun-blue/5 transition-all font-semibold text-gray-600 hover:text-fun-blue"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="w-10 h-10 rounded-full bg-fun-blue/20 flex items-center justify-center">
              <HelpCircle className="h-5 w-5 text-fun-blue" />
            </div>
            <span>Not sure? Take a quick skill quiz</span>
            <Zap className="w-4 h-4 text-xp" />
          </motion.button>
        </motion.div>

        {/* Navigation buttons */}
        <motion.div
          variants={cardVariants}
          className="flex items-center justify-between pt-6"
        >
          <Button
            variant="ghost"
            onClick={handleBack}
            className="font-semibold"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <motion.div
            {...(canProceed && { whileHover: { scale: 1.05 } })}
            {...(canProceed && { whileTap: { scale: 0.95 } })}
          >
            <MotionButton
              variant="brand"
              onClick={handleNext}
              disabled={!canProceed}
              size="lg"
              className={cn(
                "font-bold shadow-lg transition-all",
                canProceed
                  ? "bg-gradient-to-r from-fun-primary to-fun-primary-dark shadow-fun-primary/30"
                  : "opacity-50"
              )}
            >
              Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </MotionButton>
          </motion.div>
        </motion.div>

        {/* Progress indicator */}
        <motion.div
          variants={cardVariants}
          className="flex justify-center gap-2 pt-4"
        >
          {[1, 2, 3, 4].map((step) => (
            <motion.div
              key={step}
              className={cn(
                "w-2 h-2 rounded-full transition-all",
                step <= 2 ? "bg-fun-primary" : "bg-gray-200"
              )}
              animate={step === 2 ? { scale: [1, 1.3, 1] } : {}}
              transition={{ duration: 1, repeat: Infinity }}
            />
          ))}
        </motion.div>
      </motion.div>
    </>
  );
}
