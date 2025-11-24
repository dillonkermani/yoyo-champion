"use client";

import * as React from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { getTrickBySlug } from "@/lib/data/mock-tricks";
import { useProgressStore } from "@/stores/progress-store";
import { TrickPlayer } from "@/components/video";
import { Button, MotionButton } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge, DifficultyBadge } from "@/components/ui/badge";
import { TrickMasteryCelebration } from "@/components/fun/celebration";
import { SuccessConfetti } from "@/components/fun/confetti";
import type { TrickDifficulty } from "@/lib/data/types";
import {
  ArrowLeft,
  Target,
  CheckCircle2,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Trophy,
  Flame,
  Star,
  Timer,
  Award,
} from "lucide-react";

const difficultyMap: Record<TrickDifficulty, "beginner" | "intermediate" | "advanced" | "master" | "legendary"> = {
  1: "beginner",
  2: "intermediate",
  3: "advanced",
  4: "master",
  5: "legendary",
};

interface SelfAssessmentItem {
  id: string;
  label: string;
  description: string;
  checked: boolean;
}

const defaultAssessmentItems: Omit<SelfAssessmentItem, "checked">[] = [
  {
    id: "start",
    label: "I can start the trick",
    description: "Get into the starting position and initiate the motion",
  },
  {
    id: "complete",
    label: "I can complete the motion",
    description: "Execute all steps from start to finish",
  },
  {
    id: "consistent",
    label: "I can land it consistently",
    description: "Land the trick 3 out of 5 attempts",
  },
  {
    id: "smooth",
    label: "I can do it smoothly",
    description: "Perform with flow and confidence",
  },
];

export default function PracticeModePage() {
  const params = useParams();
  const slug = params["slug"] as string;
  const trick = getTrickBySlug(slug);

  const { getTrickProgress, markTrickMastered } = useProgressStore();

  // Practice state
  const [attemptCount, setAttemptCount] = React.useState(0);
  const [isTimerRunning, setIsTimerRunning] = React.useState(false);
  const [practiceTime, setPracticeTime] = React.useState(0);
  const [assessmentItems, setAssessmentItems] = React.useState<SelfAssessmentItem[]>(
    defaultAssessmentItems.map((item) => ({ ...item, checked: false }))
  );

  // Mastery test state
  const [showMasteryTest, setShowMasteryTest] = React.useState(false);
  const [masteryAttempts, setMasteryAttempts] = React.useState<("success" | "fail" | null)[]>([null, null, null]);
  const [currentMasteryAttempt, setCurrentMasteryAttempt] = React.useState(0);
  const [showCelebration, setShowCelebration] = React.useState(false);
  const [xpEarned, setXpEarned] = React.useState(0);

  // Hydrate store
  React.useEffect(() => {
    useProgressStore.persist.rehydrate();
  }, []);

  // Timer effect
  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setPracticeTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  if (!trick) {
    notFound();
  }

  const progress = getTrickProgress(trick.id);
  const isMastered = progress?.status === "mastered";

  const completedChecks = assessmentItems.filter((item) => item.checked).length;
  const allChecksComplete = completedChecks === assessmentItems.length;
  const assessmentProgress = (completedChecks / assessmentItems.length) * 100;

  const handleCheckToggle = (id: string) => {
    setAssessmentItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const incrementAttempt = () => {
    setAttemptCount((prev) => prev + 1);
  };

  const resetPractice = () => {
    setAttemptCount(0);
    setPracticeTime(0);
    setIsTimerRunning(false);
    setAssessmentItems(defaultAssessmentItems.map((item) => ({ ...item, checked: false })));
  };

  const handleMasteryAttempt = (success: boolean) => {
    const newAttempts = [...masteryAttempts];
    newAttempts[currentMasteryAttempt] = success ? "success" : "fail";
    setMasteryAttempts(newAttempts);

    // Check if failed (any failure means restart)
    if (!success) {
      setTimeout(() => {
        setMasteryAttempts([null, null, null]);
        setCurrentMasteryAttempt(0);
      }, 1500);
      return;
    }

    // Check if completed all 3
    if (currentMasteryAttempt === 2 && success) {
      // All 3 successful!
      const result = markTrickMastered(trick.id);
      setXpEarned(result.xpGained);
      setShowCelebration(true);
      setTimeout(() => {
        setShowMasteryTest(false);
      }, 3000);
    } else {
      setCurrentMasteryAttempt((prev) => prev + 1);
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-surface pb-24">
      {/* Celebration */}
      <TrickMasteryCelebration
        active={showCelebration}
        trickName={trick.name}
        onComplete={() => setShowCelebration(false)}
      />
      <SuccessConfetti active={showCelebration} />

      {/* Header */}
      <div className="border-b border-border bg-white sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href={`/trick/${slug}`}>
                <Button variant="ghost" size="icon" className="shrink-0">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>

              <div>
                <motion.h1
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xl md:text-2xl font-bold text-brand-black"
                >
                  Practice: {trick.name}
                </motion.h1>
                <div className="flex items-center gap-2 mt-1">
                  <DifficultyBadge level={difficultyMap[trick.difficulty]} />
                  {isMastered && (
                    <Badge variant="success" className="gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Mastered
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            {/* Practice Stats */}
            <div className="hidden sm:flex items-center gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-fun-blue">{attemptCount}</div>
                <div className="text-xs text-muted-foreground">Attempts</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-fun-purple">{formatTime(practiceTime)}</div>
                <div className="text-xs text-muted-foreground">Practice Time</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Video Player Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <Card>
              <CardContent className="p-0">
                <TrickPlayer
                  trick={trick}
                  autoPlay={false}
                />
              </CardContent>
            </Card>

            {/* Quick Practice Controls */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-brand-black flex items-center gap-2">
                    <Target className="w-5 h-5 text-fun-blue" />
                    Practice Session
                  </h3>
                  <Button variant="ghost" size="sm" onClick={resetPractice}>
                    <RotateCcw className="w-4 h-4 mr-1" />
                    Reset
                  </Button>
                </div>

                {/* Timer and Counter */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-surface-secondary rounded-xl p-4 text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Timer className="w-5 h-5 text-fun-purple" />
                      <span className="text-2xl font-bold text-brand-black">
                        {formatTime(practiceTime)}
                      </span>
                    </div>
                    <Button
                      variant={isTimerRunning ? "funPurple" : "secondary"}
                      size="sm"
                      onClick={() => setIsTimerRunning(!isTimerRunning)}
                      className="w-full"
                    >
                      {isTimerRunning ? (
                        <>
                          <Pause className="w-4 h-4 mr-1" />
                          Pause
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 mr-1" />
                          Start Timer
                        </>
                      )}
                    </Button>
                  </div>

                  <div className="bg-surface-secondary rounded-xl p-4 text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Flame className="w-5 h-5 text-fun-orange" />
                      <span className="text-2xl font-bold text-brand-black">
                        {attemptCount}
                      </span>
                    </div>
                    <Button
                      variant="funOrange"
                      size="sm"
                      onClick={incrementAttempt}
                      className="w-full"
                    >
                      <Target className="w-4 h-4 mr-1" />
                      Log Attempt
                    </Button>
                  </div>
                </div>

                {/* Mobile Stats */}
                <div className="sm:hidden grid grid-cols-2 gap-2 text-center text-sm">
                  <div className="bg-gray-100 rounded-lg p-2">
                    <span className="text-muted-foreground">Attempts: </span>
                    <span className="font-bold">{attemptCount}</span>
                  </div>
                  <div className="bg-gray-100 rounded-lg p-2">
                    <span className="text-muted-foreground">Time: </span>
                    <span className="font-bold">{formatTime(practiceTime)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Assessment Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            {/* Self-Assessment Checklist */}
            <Card className="border-2 border-fun-blue/20">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-fun-blue" />
                    Self Assessment
                  </span>
                  <span className="text-sm font-normal text-muted-foreground">
                    {completedChecks}/{assessmentItems.length}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Progress
                  value={assessmentProgress}
                  variant="fun"
                  size="lg"
                  sparkle
                />

                <div className="space-y-3">
                  {assessmentItems.map((item, index) => (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleCheckToggle(item.id)}
                      className={cn(
                        "w-full flex items-start gap-3 p-4 rounded-xl border-2 transition-all text-left",
                        item.checked
                          ? "bg-fun-blue/10 border-fun-blue"
                          : "bg-white border-gray-200 hover:border-fun-blue/50"
                      )}
                    >
                      <div
                        className={cn(
                          "w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-colors",
                          item.checked
                            ? "bg-fun-blue text-white"
                            : "border-2 border-gray-300"
                        )}
                      >
                        {item.checked && <CheckCircle2 className="w-4 h-4" />}
                      </div>
                      <div>
                        <p className={cn(
                          "font-medium",
                          item.checked ? "text-fun-blue" : "text-brand-black"
                        )}>
                          {item.label}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Mastery Test Section */}
            <AnimatePresence>
              {allChecksComplete && !isMastered && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                >
                  {!showMasteryTest ? (
                    <Card className="border-2 border-xp overflow-hidden">
                      <div className="bg-gradient-to-r from-xp/20 to-xp-light/20 p-6">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-xp to-xp-light flex items-center justify-center shadow-lg">
                            <Trophy className="w-8 h-8 text-brand-black" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-brand-black">
                              Ready for Mastery Test?
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              Land the trick 3 times in a row to earn{" "}
                              <span className="font-bold text-xp-dark">
                                +{trick.xpReward} XP
                              </span>
                            </p>
                          </div>
                        </div>

                        <MotionButton
                          variant="xp"
                          size="lg"
                          className="w-full mt-4"
                          onClick={() => setShowMasteryTest(true)}
                          bouncy
                        >
                          <Sparkles className="w-5 h-5 mr-2" />
                          Begin Mastery Test
                        </MotionButton>
                      </div>
                    </Card>
                  ) : (
                    <Card className="border-2 border-fun-purple overflow-hidden">
                      <CardHeader className="bg-gradient-to-r from-fun-purple/20 to-fun-pink/20">
                        <CardTitle className="flex items-center gap-2">
                          <Award className="w-6 h-6 text-fun-purple" />
                          Mastery Test
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-6 space-y-6">
                        <p className="text-brand-black text-center">
                          Land{" "}
                          <span className="font-bold text-fun-purple">
                            {trick.name}
                          </span>{" "}
                          3 times in a row!
                        </p>

                        {/* Attempt Indicators */}
                        <div className="flex items-center justify-center gap-4">
                          {masteryAttempts.map((result, index) => (
                            <motion.div
                              key={index}
                              className={cn(
                                "w-16 h-16 rounded-full flex items-center justify-center border-3 transition-all",
                                result === "success" && "bg-fun-blue border-fun-blue text-white",
                                result === "fail" && "bg-fun-red border-fun-red text-white",
                                result === null && index === currentMasteryAttempt && "border-fun-purple bg-fun-purple/10",
                                result === null && index !== currentMasteryAttempt && "border-gray-300 bg-gray-100"
                              )}
                              animate={
                                index === currentMasteryAttempt && result === null
                                  ? { scale: [1, 1.05, 1] }
                                  : {}
                              }
                              transition={{ duration: 1, repeat: Infinity }}
                            >
                              {result === "success" && <CheckCircle2 className="w-8 h-8" />}
                              {result === "fail" && <span className="text-2xl">X</span>}
                              {result === null && (
                                <span className="text-xl font-bold text-gray-400">
                                  {index + 1}
                                </span>
                              )}
                            </motion.div>
                          ))}
                        </div>

                        {/* Action Buttons */}
                        <div className="grid grid-cols-2 gap-4">
                          <MotionButton
                            variant="destructive"
                            size="lg"
                            onClick={() => handleMasteryAttempt(false)}
                            disabled={masteryAttempts[2] === "success"}
                          >
                            Missed It
                          </MotionButton>
                          <MotionButton
                            variant="success"
                            size="lg"
                            onClick={() => handleMasteryAttempt(true)}
                            disabled={masteryAttempts[2] === "success"}
                          >
                            <Star className="w-5 h-5 mr-2" />
                            Landed It!
                          </MotionButton>
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full"
                          onClick={() => {
                            setShowMasteryTest(false);
                            setMasteryAttempts([null, null, null]);
                            setCurrentMasteryAttempt(0);
                          }}
                        >
                          Cancel Test
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Already Mastered */}
            {isMastered && (
              <Card className="border-2 border-fun-blue bg-fun-blue/5">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-fun-blue/20 flex items-center justify-center mx-auto mb-4">
                    <Trophy className="w-8 h-8 text-fun-blue" />
                  </div>
                  <h3 className="text-xl font-bold text-fun-blue mb-2">
                    Trick Mastered!
                  </h3>
                  <p className="text-muted-foreground">
                    You&apos;ve already mastered this trick. Keep practicing to
                    maintain your skills!
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Tips Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-xp" />
                  Practice Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {trick.tips.slice(0, 3).map((tip, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3 text-sm text-brand-black"
                    >
                      <div className="w-6 h-6 rounded-full bg-xp/20 flex items-center justify-center flex-shrink-0">
                        <Star className="w-3.5 h-3.5 text-xp-dark" />
                      </div>
                      {tip}
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* XP Earned Toast */}
      <AnimatePresence>
        {xpEarned > 0 && showCelebration && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
          >
            <div className="bg-gradient-to-r from-xp to-xp-light text-brand-black px-8 py-4 rounded-2xl shadow-xl flex items-center gap-3">
              <Star className="w-8 h-8" />
              <div>
                <p className="text-sm font-medium">XP Earned</p>
                <p className="text-2xl font-bold">+{xpEarned}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
