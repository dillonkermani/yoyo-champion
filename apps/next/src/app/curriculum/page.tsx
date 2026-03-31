"use client";

import * as React from "react";
import Link from "next/link";
import { getAllCategories, mockTricks, mockPaths } from "@yoyo/data";
import type { TrickCategory } from "@yoyo/data";

// =============================================================================
// ICONS
// =============================================================================

type IconProps = { className?: string };
const Icons = {
  Target: ({ className }: IconProps) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
    </svg>
  ),
  Sparkles: ({ className }: IconProps) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
    </svg>
  ),
  Zap: ({ className }: IconProps) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" />
    </svg>
  ),
  Cpu: ({ className }: IconProps) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" />
      <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" />
    </svg>
  ),
  Wind: ({ className }: IconProps) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.59 4.59A2 2 0 1111 8H2m10.59 11.41A2 2 0 1014 16H2m15.73-8.27A2.5 2.5 0 1119.5 12H2" />
    </svg>
  ),
  RotateCcw: ({ className }: IconProps) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M1 4v6h6M23 20v-6h-6" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.49 9A9 9 0 005.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 013.51 15" />
    </svg>
  ),
  Rocket: ({ className }: IconProps) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09zM12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z" />
    </svg>
  ),
  Hand: ({ className }: IconProps) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 11V6a2 2 0 00-2-2 2 2 0 00-2 2M14 10V4a2 2 0 00-2-2 2 2 0 00-2 2v6M10 10.5V6a2 2 0 00-2-2 2 2 0 00-2 2v8" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 8a2 2 0 012 2v7a6 6 0 01-6 6H9a6 6 0 01-6-6v-2c0-1.1.9-2 2-2h0" />
    </svg>
  ),
  ArrowRight: ({ className }: IconProps) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  ),
  Check: ({ className }: IconProps) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  ),
};

// =============================================================================
// COLOR CONFIG
// =============================================================================

const colorMap = {
  teal:   { bg: "bg-teal-500",   bgLight: "bg-teal-50",   text: "text-teal-600",   border: "border-teal-200" },
  blue:   { bg: "bg-[#1CB0F6]",  bgLight: "bg-[#1CB0F6]/10", text: "text-[#1CB0F6]", border: "border-[#1CB0F6]/30" },
  purple: { bg: "bg-[#CE82FF]",  bgLight: "bg-[#CE82FF]/10", text: "text-[#CE82FF]", border: "border-[#CE82FF]/30" },
  cyan:   { bg: "bg-cyan-500",   bgLight: "bg-cyan-50",   text: "text-cyan-600",   border: "border-cyan-200" },
  pink:   { bg: "bg-pink-500",   bgLight: "bg-pink-50",   text: "text-pink-600",   border: "border-pink-200" },
  yellow: { bg: "bg-amber-400",  bgLight: "bg-amber-50",  text: "text-amber-600",  border: "border-amber-200" },
  orange: { bg: "bg-[#FF9600]",  bgLight: "bg-[#FF9600]/10", text: "text-[#FF9600]", border: "border-[#FF9600]/30" },
  red:    { bg: "bg-red-500",    bgLight: "bg-red-50",    text: "text-red-600",    border: "border-red-200" },
};

// =============================================================================
// HELPERS
// =============================================================================

function getCategoryStats(cat: TrickCategory) {
  const tricks = mockTricks.filter((t) =>
    cat.genres.includes(t.genre as any)
  );
  const beginner = tricks.filter((t) => t.difficulty <= 2).length;
  const advanced = tricks.filter((t) => t.difficulty >= 3).length;
  return { total: tricks.length, beginner, advanced, sampleTricks: tricks.slice(0, 3) };
}

// =============================================================================
// COMPONENTS
// =============================================================================

function CategoryCard({ cat }: { cat: TrickCategory }) {
  const colors = colorMap[cat.color as keyof typeof colorMap] || colorMap.blue;
  const stats = getCategoryStats(cat);
  const IconComponent = Icons[cat.icon as keyof typeof Icons] || Icons.Target;

  return (
    <div
      className={`group relative bg-white rounded-2xl p-5 border-2 ${colors.border} hover:border-[#9bedff] transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}
    >
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 rounded-xl ${colors.bgLight} flex items-center justify-center flex-shrink-0`}>
          <IconComponent className={`w-6 h-6 ${colors.text}`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg font-bold text-gray-900">{cat.name}</h3>
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${colors.bgLight} ${colors.text}`}>
              {stats.total} tricks
            </span>
          </div>
          <p className="text-sm text-gray-500 leading-relaxed mb-3">{cat.description}</p>

          {/* Sample tricks */}
          <div className="space-y-1.5">
            {stats.sampleTricks.map((trick) => (
              <div key={trick.id} className="flex items-center gap-2 text-sm text-gray-600">
                <Icons.Check className="w-4 h-4 text-gray-300 flex-shrink-0" />
                <span>{trick.name}</span>
                <span className="text-xs text-gray-400 ml-auto">+{trick.xpReward} XP</span>
              </div>
            ))}
            {stats.total > 3 && (
              <p className="text-xs text-gray-400 pl-6">+{stats.total - 3} more tricks</p>
            )}
          </div>
        </div>
      </div>

      {/* Bonus XP badge */}
      <div className="absolute top-4 right-4">
        <span className="text-xs font-bold text-[#FFC800] bg-[#FFC800]/10 px-2 py-1 rounded-full">
          +{cat.bonusXP} XP bonus
        </span>
      </div>
    </div>
  );
}

function PathCard({ path }: { path: typeof mockPaths[0] }) {
  const difficultyLabel = ["", "Beginner", "Beginner", "Intermediate", "Advanced", "Expert"][path.difficulty] || "Beginner";
  const difficultyColor = path.difficulty <= 2 ? "text-teal-600 bg-teal-50" : path.difficulty <= 3 ? "text-[#1CB0F6] bg-[#1CB0F6]/10" : "text-[#CE82FF] bg-[#CE82FF]/10";

  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-200 hover:border-[#9bedff] transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#9bedff]/20 to-[#1CB0F6]/20 flex items-center justify-center flex-shrink-0">
          <span className="text-xl">{path.difficulty <= 2 ? "🌱" : path.difficulty <= 3 ? "🌿" : "🌳"}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-bold text-gray-900">{path.title}</h3>
            {path.isFeatured && (
              <span className="text-xs font-bold text-[#FFC800] bg-[#FFC800]/10 px-2 py-0.5 rounded-full">Featured</span>
            )}
          </div>
          <p className="text-sm text-gray-500 mb-2">{path.description}</p>
          <div className="flex items-center gap-3">
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${difficultyColor}`}>
              {difficultyLabel}
            </span>
            <span className="text-xs text-gray-400">{path.modules.length} modules</span>
            <span className="text-xs text-gray-400">~{path.estimatedDays}d</span>
          </div>
        </div>
        <Icons.ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-[#9bedff] transition-colors flex-shrink-0 mt-1" />
      </div>
    </div>
  );
}

// =============================================================================
// PAGE
// =============================================================================

export default function CurriculumPage() {
  const categories = getAllCategories();
  const paths = mockPaths;
  const totalTricks = mockTricks.length;

  return (
    <div className="bg-white min-h-screen">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <Link href="/" className="font-bold text-xl text-gray-900">
            YoYo<span className="text-[#9bedff]">Champion</span>
          </Link>
          <Link
            href="/onboarding?step=account_user"
            className="inline-flex items-center justify-center rounded-full bg-[#9bedff] px-5 py-2 text-sm font-semibold text-gray-900 hover:bg-[#7dd9f0] transition-all duration-200"
          >
            Start Learning
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden pt-16 pb-12 sm:pt-24 sm:pb-16">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-[#9bedff]/10 blur-3xl" />
          <div className="absolute top-20 -left-40 w-80 h-80 rounded-full bg-[#1CB0F6]/10 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
            From First Throw to{" "}
            <span className="text-[#9bedff]">World Class</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            A structured curriculum with {totalTricks}+ tricks across {categories.length} categories, designed by World Champion Gentry Stein.
          </p>

          {/* Stats */}
          <div className="mt-10 flex items-center justify-center gap-8 sm:gap-12">
            <div className="text-center">
              <p className="text-3xl font-bold text-[#9bedff]">{totalTricks}+</p>
              <p className="text-sm text-gray-500">Tricks</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-[#9bedff]">{categories.length}</p>
              <p className="text-sm text-gray-500">Categories</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-[#9bedff]">{paths.length}</p>
              <p className="text-sm text-gray-500">Learning Paths</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Trick Categories</h2>
            <p className="mt-2 text-gray-600">Master each category to unlock new skills and earn bonus XP</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {categories.map((cat) => (
              <CategoryCard key={cat.id} cat={cat} />
            ))}
          </div>
        </div>
      </section>

      {/* Learning Paths */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Learning Paths</h2>
            <p className="mt-2 text-gray-600">Guided journeys that take you from beginner to advanced, step by step</p>
          </div>
          <div className="space-y-4">
            {paths.map((path) => (
              <PathCard key={path.id} path={path} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#9bedff] to-[#1CB0F6] p-8 sm:p-16 text-center">
            <div className="absolute inset-0 opacity-10">
              <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                    <circle cx="10" cy="10" r="2" fill="currentColor" />
                  </pattern>
                </defs>
                <rect fill="url(#dots)" width="100%" height="100%" />
              </svg>
            </div>
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Ready to Start?</h2>
              <p className="mt-4 text-lg text-gray-700 max-w-xl mx-auto">
                Create your free account and get a personalized learning path based on your skill level.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/onboarding?step=account_user"
                  className="inline-flex items-center justify-center rounded-full bg-gray-900 px-8 py-4 text-base font-semibold text-white hover:bg-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Get Started Free
                </Link>
                <Link
                  href="/"
                  className="inline-flex items-center justify-center rounded-full bg-white/80 backdrop-blur px-8 py-4 text-base font-semibold text-gray-900 hover:bg-white transition-all duration-200"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
