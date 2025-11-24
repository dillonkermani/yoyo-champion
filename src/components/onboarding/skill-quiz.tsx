"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Check, X, Play, HelpCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button, MotionButton } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { type SkillLevel } from "@/stores";

interface QuizQuestion {
  id: string;
  trickName: string;
  description: string;
  difficulty: number;
  videoPlaceholder: string;
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "q1",
    trickName: "Sleeper",
    description:
      "Can you throw the yo-yo down and have it spin at the bottom of the string for at least 5 seconds?",
    difficulty: 1,
    videoPlaceholder: "sleeper.mp4",
  },
  {
    id: "q2",
    trickName: "Rock the Baby",
    description:
      "Can you form a triangular cradle with the string and swing the yo-yo through it?",
    difficulty: 1,
    videoPlaceholder: "rock-the-baby.mp4",
  },
  {
    id: "q3",
    trickName: "Trapeze",
    description:
      "Can you land the yo-yo on the string segment between your hands after a breakaway throw?",
    difficulty: 2,
    videoPlaceholder: "trapeze.mp4",
  },
  {
    id: "q4",
    trickName: "Double or Nothing",
    description:
      "Can you wrap the string around your fingers twice and land on the furthest string?",
    difficulty: 3,
    videoPlaceholder: "double-or-nothing.mp4",
  },
  {
    id: "q5",
    trickName: "Spirit Bomb",
    description:
      "Can you perform the complex slack and wrist mount trick ending with a suicide catch?",
    difficulty: 4,
    videoPlaceholder: "spirit-bomb.mp4",
  },
];

interface SkillQuizProps {
  onComplete: (level: SkillLevel) => void;
  onCancel: () => void;
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 200 : -200,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 200 : -200,
    opacity: 0,
  }),
};

export function SkillQuiz({ onComplete, onCancel }: SkillQuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [direction, setDirection] = useState(1);
  const [showResult, setShowResult] = useState(false);

  const currentQuestion = QUIZ_QUESTIONS[currentIndex];
  const totalQuestions = QUIZ_QUESTIONS.length;
  const progress = ((currentIndex + 1) / totalQuestions) * 100;

  const handleAnswer = useCallback(
    (canDoTrick: boolean) => {
      if (!currentQuestion) return;

      const newAnswers = { ...answers, [currentQuestion.id]: canDoTrick };
      setAnswers(newAnswers);

      // Early termination if they can't do a basic trick
      if (!canDoTrick && currentQuestion.difficulty <= 2) {
        // Calculate and show result
        setShowResult(true);
        return;
      }

      if (currentIndex < totalQuestions - 1) {
        setDirection(1);
        setCurrentIndex((prev) => prev + 1);
      } else {
        setShowResult(true);
      }
    },
    [answers, currentIndex, currentQuestion, totalQuestions]
  );

  // Calculate skill level based on answers
  const calculateSkillLevel = useCallback((): SkillLevel => {
    const answeredYes = Object.entries(answers).filter(([, v]) => v);
    const maxDifficulty = answeredYes.reduce((max, [id]) => {
      const q = QUIZ_QUESTIONS.find((q) => q.id === id);
      return q && q.difficulty > max ? q.difficulty : max;
    }, 0);

    if (maxDifficulty === 0) return "never";
    if (maxDifficulty === 1) return "beginner";
    if (maxDifficulty === 2) return "intermediate";
    if (maxDifficulty === 3) return "advanced";
    return "expert";
  }, [answers]);

  const handleComplete = useCallback(() => {
    const level = calculateSkillLevel();
    onComplete(level);
  }, [calculateSkillLevel, onComplete]);

  if (showResult) {
    const level = calculateSkillLevel();
    const levelLabels: Record<SkillLevel, string> = {
      never: "Complete Beginner",
      beginner: "Beginner",
      intermediate: "Intermediate",
      advanced: "Advanced",
      expert: "Expert",
    };

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-brand-blue/20 mb-6">
          <Check className="h-10 w-10 text-brand-blue" />
        </div>

        <h2 className="text-2xl font-bold text-brand-black mb-2">
          Quiz Complete!
        </h2>

        <p className="text-muted-foreground mb-6">
          Based on your answers, your skill level is:
        </p>

        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="inline-block px-6 py-3 rounded-full bg-fun-blue/20 mb-8"
        >
          <span className="text-2xl font-bold text-brand-black">
            {levelLabels[level]}
          </span>
        </motion.div>

        <div className="space-y-3">
          <MotionButton variant="brand" size="lg" onClick={handleComplete}>
            Continue with This Level
          </MotionButton>
          <div>
            <Button variant="ghost" onClick={onCancel}>
              Choose Manually Instead
            </Button>
          </div>
        </div>
      </motion.div>
    );
  }

  if (!currentQuestion) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={onCancel}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <span className="text-sm text-muted-foreground">
          Question {currentIndex + 1} of {totalQuestions}
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-xp"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Question card */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentQuestion.id}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.3 }}
        >
          <Card className="overflow-hidden">
            {/* Video placeholder */}
            <div className="relative aspect-video bg-surface-dark-primary flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-3">
                  <Play className="h-8 w-8 text-white" />
                </div>
                <p className="text-white/70 text-sm">
                  Video: {currentQuestion.trickName}
                </p>
              </div>
            </div>

            <CardContent className="p-6">
              {/* Trick name */}
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-xl font-bold text-brand-black">
                  {currentQuestion.trickName}
                </h3>
                <span
                  className={cn(
                    "px-2 py-0.5 text-xs font-medium rounded-full",
                    currentQuestion.difficulty <= 1 &&
                      "bg-brand-blue/20 text-fun-blue-dark",
                    currentQuestion.difficulty === 2 &&
                      "bg-yellow-100 text-yellow-700",
                    currentQuestion.difficulty === 3 &&
                      "bg-orange-100 text-orange-700",
                    currentQuestion.difficulty >= 4 &&
                      "bg-red-100 text-red-700"
                  )}
                >
                  {currentQuestion.difficulty <= 1 && "Beginner"}
                  {currentQuestion.difficulty === 2 && "Intermediate"}
                  {currentQuestion.difficulty === 3 && "Advanced"}
                  {currentQuestion.difficulty >= 4 && "Expert"}
                </span>
              </div>

              {/* Question */}
              <p className="text-brand-black/80 mb-6">
                {currentQuestion.description}
              </p>

              {/* Answer buttons */}
              <div className="flex gap-4">
                <MotionButton
                  variant="outline"
                  size="lg"
                  onClick={() => handleAnswer(false)}
                  className="flex-1 border-red-200 hover:border-red-400 hover:bg-red-50"
                >
                  <X className="mr-2 h-5 w-5 text-red-500" />
                  No, not yet
                </MotionButton>
                <MotionButton
                  variant="outline"
                  size="lg"
                  onClick={() => handleAnswer(true)}
                  className="flex-1 border-fun-blue/30 hover:border-fun-blue hover:bg-fun-blue/10"
                >
                  <Check className="mr-2 h-5 w-5 text-fun-blue" />
                  Yes, I can!
                </MotionButton>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>

      {/* Help text */}
      <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
        <HelpCircle className="h-4 w-4" />
        <span>Be honest - this helps us create the best path for you!</span>
      </div>
    </motion.div>
  );
}
