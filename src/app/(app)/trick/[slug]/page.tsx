"use client";

import * as React from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { getTrickBySlug, getTrickById, mockTricks } from "@/lib/data/mock-tricks";
import { useProgressStore, TrickStatus } from "@/stores/progress-store";
import { TrickPlayer } from "@/components/video";
import { Badge, DifficultyBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import type { Trick, TrickDifficulty } from "@/lib/data/types";
import {
  ArrowLeft,
  Clock,
  Star,
  CheckCircle2,
  Eye,
  Play,
  XCircle,
  Lightbulb,
  Target,
  BookOpen,
  ListOrdered,
  MessageSquare,
  Trash2,
  Plus,
  ChevronRight,
  Award,
  Lock,
  Sparkles,
} from "lucide-react";
import { ProductRecommendation } from "@/components/products";

// Map difficulty number to badge level
const difficultyMap: Record<TrickDifficulty, "beginner" | "intermediate" | "advanced" | "master" | "legendary"> = {
  1: "beginner",
  2: "intermediate",
  3: "advanced",
  4: "master",
  5: "legendary",
};

// Map genre to display label
const genreLabels: Record<string, string> = {
  basics: "Basics",
  string: "String Tricks",
  slack: "Slack",
  tech: "Technical",
  flow: "Flow",
  horizontal: "Horizontal",
  speed: "Speed",
  grinds: "Grinds",
  regens: "Regens",
  hops: "Hops",
};

export default function TrickDetailPage() {
  const params = useParams();
  const slug = params["slug"] as string;

  // Get trick data
  const trick = getTrickBySlug(slug);

  // Progress store
  const {
    getTrickProgress,
    markTrickWatched,
    markTrickMastered,
    addNote,
    removeNote,
  } = useProgressStore();

  const [newNote, setNewNote] = React.useState("");
  const [showMasteryForm, setShowMasteryForm] = React.useState(false);
  const [masteryChecks, setMasteryChecks] = React.useState({
    watchedFully: false,
    canPerform: false,
    consistent: false,
  });
  const [activeTab, setActiveTab] = React.useState("overview");
  const [isMobileSheetOpen, setIsMobileSheetOpen] = React.useState(false);

  // Hydrate store on mount
  React.useEffect(() => {
    useProgressStore.persist.rehydrate();
  }, []);

  // If trick not found, show 404
  if (!trick) {
    notFound();
  }

  const progress = getTrickProgress(trick.id);
  const status: TrickStatus = progress?.status || "not_started";
  const notes = progress?.notes || [];

  // Get prerequisite tricks
  const prerequisites = trick.prerequisites
    .map((id) => getTrickById(id))
    .filter(Boolean) as Trick[];

  // Get related tricks (same genre or difficulty)
  const relatedTricks = mockTricks
    .filter(
      (t) =>
        t.id !== trick.id &&
        (t.genre === trick.genre || t.difficulty === trick.difficulty)
    )
    .slice(0, 4);

  // Status badge
  const getStatusBadge = () => {
    switch (status) {
      case "mastered":
        return (
          <Badge variant="success" className="gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Mastered
          </Badge>
        );
      case "watching":
      case "practicing":
        return (
          <Badge variant="info" className="gap-1.5">
            <Play className="w-3.5 h-3.5" />
            In Progress
          </Badge>
        );
      default:
        return (
          <Badge variant="secondary" className="gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Available
          </Badge>
        );
    }
  };

  // Handle watch completion
  const handleMarkWatched = () => {
    const result = markTrickWatched(trick.id);
    if (result.xpGained > 0) {
      // Could trigger a toast notification here
      console.log(`+${result.xpGained} XP`);
    }
  };

  // Handle mastery
  const handleMarkMastered = () => {
    const allChecked = Object.values(masteryChecks).every(Boolean);
    if (allChecked) {
      const result = markTrickMastered(trick.id);
      if (result.xpGained > 0) {
        console.log(`+${result.xpGained} XP - Trick Mastered!`);
      }
      setShowMasteryForm(false);
    }
  };

  // Handle adding note
  const handleAddNote = () => {
    if (newNote.trim()) {
      addNote(trick.id, newNote.trim());
      setNewNote("");
    }
  };

  // Handle removing note
  const handleRemoveNote = (index: number) => {
    removeNote(trick.id, index);
  };

  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <div className="border-b border-border bg-white sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/library">
              <Button variant="ghost" size="icon" className="shrink-0">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>

            <div className="flex-1 min-w-0">
              <motion.h1
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl md:text-3xl font-bold text-brand-black truncate"
              >
                {trick.name}
              </motion.h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="flex flex-wrap items-center gap-2 mt-2"
              >
                <DifficultyBadge level={difficultyMap[trick.difficulty]} />
                <Badge variant="teal">{trick.style}</Badge>
                <Badge variant="secondary">{genreLabels[trick.genre] || trick.genre}</Badge>
              </motion.div>
            </div>

            <div className="hidden sm:flex flex-col items-end gap-1.5">
              {getStatusBadge()}
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-brand-blue" />
                  <span className="font-medium text-brand-black">{trick.xpReward} XP</span>
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {trick.estimatedMinutes} min
                </span>
              </div>
            </div>
          </div>

          {/* Mobile status/xp row */}
          <div className="sm:hidden flex items-center justify-between mt-3 pt-3 border-t border-border">
            {getStatusBadge()}
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4 text-brand-blue" />
                <span className="font-medium text-brand-black">{trick.xpReward} XP</span>
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {trick.estimatedMinutes} min
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 lg:py-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Main Column */}
          <div className="flex-1 min-w-0 space-y-6">
            {/* Video Player Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <TrickPlayer
                trick={trick}
                onComplete={() => {
                  if (status === "not_started") {
                    handleMarkWatched();
                  }
                }}
              />
            </motion.section>

            {/* Trick Info Tabs */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="w-full justify-start bg-surface-secondary rounded-lg p-1 mb-4 overflow-x-auto">
                  <TabsTrigger value="overview" className="gap-1.5 rounded-md">
                    <BookOpen className="w-4 h-4" />
                    <span className="hidden sm:inline">Overview</span>
                  </TabsTrigger>
                  <TabsTrigger value="steps" className="gap-1.5 rounded-md">
                    <ListOrdered className="w-4 h-4" />
                    <span className="hidden sm:inline">Steps</span>
                  </TabsTrigger>
                  <TabsTrigger value="tips" className="gap-1.5 rounded-md">
                    <Lightbulb className="w-4 h-4" />
                    <span className="hidden sm:inline">Tips</span>
                  </TabsTrigger>
                </TabsList>

                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-6">
                  <Card>
                    <CardContent className="pt-6">
                      <p className="text-brand-black leading-relaxed">
                        {trick.description}
                      </p>
                    </CardContent>
                  </Card>

                  {/* Prerequisites */}
                  {prerequisites.length > 0 && (
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Lock className="w-5 h-5 text-muted-foreground" />
                          Prerequisites
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {prerequisites.map((prereq) => {
                            const prereqProgress = getTrickProgress(prereq.id);
                            const isMastered = prereqProgress?.status === "mastered";

                            return (
                              <Link
                                key={prereq.id}
                                href={`/trick/${prereq.slug}`}
                                className="flex items-center justify-between p-3 rounded-lg bg-surface-secondary hover:bg-surface-tertiary transition-colors group"
                              >
                                <div className="flex items-center gap-3">
                                  {isMastered ? (
                                    <CheckCircle2 className="w-5 h-5 text-brand-green" />
                                  ) : (
                                    <div className="w-5 h-5 rounded-full border-2 border-muted-foreground" />
                                  )}
                                  <span className="font-medium text-brand-black">
                                    {prereq.name}
                                  </span>
                                </div>
                                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-brand-black transition-colors" />
                              </Link>
                            );
                          })}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* What You'll Learn */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Target className="w-5 h-5 text-brand-teal" />
                        What You&apos;ll Learn
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {trick.steps.map((step) => (
                          <li
                            key={step.id}
                            className="flex items-start gap-3 text-brand-black"
                          >
                            <CheckCircle2 className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
                            <span>{step.title}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Steps Tab */}
                <TabsContent value="steps" className="space-y-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        {trick.steps.map((step, index) => (
                          <motion.div
                            key={step.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex gap-4 p-4 rounded-xl bg-surface-secondary hover:bg-surface-tertiary transition-colors cursor-pointer group"
                          >
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-teal flex items-center justify-center text-white font-bold">
                              {step.order}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-2">
                                <h4 className="font-semibold text-brand-black">
                                  {step.title}
                                </h4>
                                <span className="text-xs text-muted-foreground shrink-0">
                                  {Math.floor(step.timestamp / 60)}:{String(step.timestamp % 60).padStart(2, "0")}
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">
                                {step.description}
                              </p>
                              {step.tipText && (
                                <div className="mt-2 p-2.5 rounded-lg bg-brand-blue/10 border border-brand-blue/20">
                                  <p className="text-sm text-brand-black flex items-start gap-2">
                                    <Lightbulb className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />
                                    {step.tipText}
                                  </p>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Tips Tab */}
                <TabsContent value="tips" className="space-y-6">
                  {/* Common Mistakes */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center gap-2 text-red-600">
                        <XCircle className="w-5 h-5" />
                        Common Mistakes
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {trick.commonMistakes.map((mistake, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-3 text-brand-black"
                          >
                            <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                            <span>{mistake}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Pro Tips */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center gap-2 text-brand-blue">
                        <Lightbulb className="w-5 h-5" />
                        Pro Tips from Gentry
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {trick.tips.map((tip, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-3 text-brand-black"
                          >
                            <Lightbulb className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Practice Drills */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center gap-2 text-brand-green">
                        <Target className="w-5 h-5" />
                        Practice Drills
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3 text-brand-black">
                          <Target className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
                          <span>Practice each step 10 times before moving to the next</span>
                        </li>
                        <li className="flex items-start gap-3 text-brand-black">
                          <Target className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
                          <span>Try performing the complete trick 5 times in a row without mistakes</span>
                        </li>
                        <li className="flex items-start gap-3 text-brand-black">
                          <Target className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
                          <span>Record yourself and compare with the tutorial video</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </motion.section>

            {/* Mastery Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className={cn(
                "border-2",
                status === "mastered" ? "border-brand-green bg-brand-green/5" : "border-brand-teal"
              )}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className={cn(
                      "w-6 h-6",
                      status === "mastered" ? "text-brand-green" : "text-brand-teal"
                    )} />
                    {status === "mastered"
                      ? "Trick Mastered!"
                      : "Ready to Master This Trick?"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {status === "mastered" ? (
                    <div className="text-center py-4">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-green/20 mb-4">
                        <CheckCircle2 className="w-8 h-8 text-brand-green" />
                      </div>
                      <p className="text-brand-black font-medium">
                        Congratulations! You&apos;ve mastered {trick.name}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Keep practicing to maintain your skills
                      </p>
                    </div>
                  ) : showMasteryForm ? (
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Confirm you can perform this trick consistently:
                      </p>

                      <div className="space-y-3">
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={masteryChecks.watchedFully}
                            onChange={(e) =>
                              setMasteryChecks((prev) => ({
                                ...prev,
                                watchedFully: e.target.checked,
                              }))
                            }
                            className="w-5 h-5 rounded border-border text-brand-teal focus:ring-brand-teal"
                          />
                          <span className="text-brand-black">
                            I&apos;ve watched the full tutorial
                          </span>
                        </label>

                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={masteryChecks.canPerform}
                            onChange={(e) =>
                              setMasteryChecks((prev) => ({
                                ...prev,
                                canPerform: e.target.checked,
                              }))
                            }
                            className="w-5 h-5 rounded border-border text-brand-teal focus:ring-brand-teal"
                          />
                          <span className="text-brand-black">
                            I can perform this trick
                          </span>
                        </label>

                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={masteryChecks.consistent}
                            onChange={(e) =>
                              setMasteryChecks((prev) => ({
                                ...prev,
                                consistent: e.target.checked,
                              }))
                            }
                            className="w-5 h-5 rounded border-border text-brand-teal focus:ring-brand-teal"
                          />
                          <span className="text-brand-black">
                            I can land it 3 out of 5 attempts consistently
                          </span>
                        </label>
                      </div>

                      <div className="flex gap-3 pt-2">
                        <Button
                          variant="outline"
                          onClick={() => setShowMasteryForm(false)}
                          className="flex-1"
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="teal"
                          onClick={handleMarkMastered}
                          disabled={!Object.values(masteryChecks).every(Boolean)}
                          className="flex-1"
                        >
                          <CheckCircle2 className="w-4 h-4 mr-2" />
                          Submit Mastery
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Once you can perform this trick consistently, mark it as
                        mastered to earn {trick.xpReward} XP and track your progress.
                      </p>
                      <Button
                        variant="teal"
                        onClick={() => setShowMasteryForm(true)}
                        className="w-full"
                      >
                        <Award className="w-4 h-4 mr-2" />
                        Begin Mastery Assessment
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.section>
          </div>

          {/* Sidebar (Desktop) */}
          <motion.aside
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="hidden lg:block w-80 shrink-0 space-y-6"
          >
            {/* Progress Tracker */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Status</span>
                  {getStatusBadge()}
                </div>

                {progress?.watchTime && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Watch Time</span>
                    <span className="text-sm font-medium text-brand-black">
                      {Math.floor(progress.watchTime / 60)}m {progress.watchTime % 60}s
                    </span>
                  </div>
                )}

                {progress?.lastWatched && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Last Watched</span>
                    <span className="text-sm font-medium text-brand-black">
                      {new Date(progress.lastWatched).toLocaleDateString()}
                    </span>
                  </div>
                )}

                <Separator />

                <div className="space-y-2">
                  <Button
                    variant={status !== "not_started" ? "secondary" : "brand"}
                    onClick={handleMarkWatched}
                    disabled={status !== "not_started"}
                    className="w-full"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    {status !== "not_started" ? "Watched" : "Mark as Watched"}
                  </Button>

                  <Button
                    variant={status === "mastered" ? "secondary" : "teal"}
                    onClick={() => setShowMasteryForm(true)}
                    disabled={status === "mastered"}
                    className="w-full"
                  >
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    {status === "mastered" ? "Mastered" : "Mark as Mastered"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Notes Section */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  My Notes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a note..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleAddNote();
                    }}
                    className="flex-1"
                  />
                  <Button
                    variant="brand"
                    size="icon"
                    onClick={handleAddNote}
                    disabled={!newNote.trim()}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                {notes.length > 0 ? (
                  <ScrollArea className="h-[200px]">
                    <div className="space-y-2">
                      {notes.map((note, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-2 p-3 rounded-lg bg-surface-secondary group"
                        >
                          <p className="flex-1 text-sm text-brand-black">{note}</p>
                          <button
                            onClick={() => handleRemoveNote(index)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-red-500"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No notes yet. Add notes to remember key points!
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Related Tricks */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Related Tricks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {relatedTricks.map((relatedTrick) => {
                    const relatedProgress = getTrickProgress(relatedTrick.id);

                    return (
                      <Link
                        key={relatedTrick.id}
                        href={`/trick/${relatedTrick.slug}`}
                        className="flex items-center gap-3 p-3 rounded-lg bg-surface-secondary hover:bg-surface-tertiary transition-colors group"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-brand-black truncate">
                            {relatedTrick.name}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <DifficultyBadge
                              level={difficultyMap[relatedTrick.difficulty]}
                              showIcon={false}
                              className="text-xs py-0.5 px-2"
                            />
                            {relatedProgress?.status === "mastered" && (
                              <CheckCircle2 className="w-4 h-4 text-brand-green" />
                            )}
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-brand-black transition-colors" />
                      </Link>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Recommended Gear for This Trick */}
            <ProductRecommendation
              context="trick"
              trickDifficulty={trick.difficulty}
              trickName={trick.name}
              maxProducts={2}
              variant="sidebar"
            />
          </motion.aside>

          {/* Mobile Bottom Sheet Trigger */}
          <div className="lg:hidden fixed bottom-4 right-4 z-50">
            <Button
              variant="teal"
              size="lg"
              className="rounded-full shadow-lg"
              onClick={() => setIsMobileSheetOpen(!isMobileSheetOpen)}
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              Notes & Progress
            </Button>
          </div>

          {/* Mobile Bottom Sheet */}
          <AnimatePresence>
            {isMobileSheetOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsMobileSheetOpen(false)}
                  className="lg:hidden fixed inset-0 bg-black z-40"
                />
                <motion.div
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "100%" }}
                  transition={{ type: "spring", damping: 25 }}
                  className="lg:hidden fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-2xl border-t border-border max-h-[80vh] overflow-hidden"
                >
                  <div className="p-4 border-b border-border">
                    <div className="w-12 h-1 rounded-full bg-border mx-auto mb-4" />
                    <h3 className="font-semibold text-brand-black text-center">
                      Notes & Progress
                    </h3>
                  </div>

                  <ScrollArea className="h-[calc(80vh-80px)]">
                    <div className="p-4 space-y-6">
                      {/* Progress Section */}
                      <div className="space-y-4">
                        <h4 className="font-medium text-brand-black">Progress</h4>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Status</span>
                          {getStatusBadge()}
                        </div>

                        <div className="flex gap-2">
                          <Button
                            variant={status !== "not_started" ? "secondary" : "brand"}
                            onClick={handleMarkWatched}
                            disabled={status !== "not_started"}
                            className="flex-1"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            {status !== "not_started" ? "Watched" : "Mark Watched"}
                          </Button>

                          <Button
                            variant={status === "mastered" ? "secondary" : "teal"}
                            onClick={() => {
                              setShowMasteryForm(true);
                              setIsMobileSheetOpen(false);
                            }}
                            disabled={status === "mastered"}
                            className="flex-1"
                          >
                            <CheckCircle2 className="w-4 h-4 mr-2" />
                            {status === "mastered" ? "Mastered" : "Master It"}
                          </Button>
                        </div>
                      </div>

                      <Separator />

                      {/* Notes Section */}
                      <div className="space-y-4">
                        <h4 className="font-medium text-brand-black">My Notes</h4>
                        <div className="flex gap-2">
                          <Input
                            placeholder="Add a note..."
                            value={newNote}
                            onChange={(e) => setNewNote(e.target.value)}
                            className="flex-1"
                          />
                          <Button
                            variant="brand"
                            size="icon"
                            onClick={handleAddNote}
                            disabled={!newNote.trim()}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>

                        {notes.length > 0 ? (
                          <div className="space-y-2">
                            {notes.map((note, index) => (
                              <div
                                key={index}
                                className="flex items-start gap-2 p-3 rounded-lg bg-surface-secondary"
                              >
                                <p className="flex-1 text-sm text-brand-black">{note}</p>
                                <button
                                  onClick={() => handleRemoveNote(index)}
                                  className="text-muted-foreground hover:text-red-500"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-muted-foreground text-center py-4">
                            No notes yet
                          </p>
                        )}
                      </div>

                      <Separator />

                      {/* Related Tricks */}
                      <div className="space-y-4">
                        <h4 className="font-medium text-brand-black">Related Tricks</h4>
                        <div className="space-y-2">
                          {relatedTricks.slice(0, 3).map((relatedTrick) => (
                            <Link
                              key={relatedTrick.id}
                              href={`/trick/${relatedTrick.slug}`}
                              onClick={() => setIsMobileSheetOpen(false)}
                              className="flex items-center gap-3 p-3 rounded-lg bg-surface-secondary"
                            >
                              <div className="flex-1">
                                <p className="font-medium text-brand-black">
                                  {relatedTrick.name}
                                </p>
                                <DifficultyBadge
                                  level={difficultyMap[relatedTrick.difficulty]}
                                  showIcon={false}
                                  className="text-xs py-0.5 px-2 mt-1"
                                />
                              </div>
                              <ChevronRight className="w-5 h-5 text-muted-foreground" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </ScrollArea>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
