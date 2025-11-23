"use client";

import * as React from "react";
import Link from "next/link";

// Icons as components
const PlayIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
  </svg>
);

const PathIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
  </svg>
);

const ChartIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const TrophyIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const StarIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

// Feature data
const features = [
  {
    icon: PlayIcon,
    title: "Premium Video Tutorials",
    description: "Multi-angle, slow-motion breakdowns of every trick. See exactly what the pros do from every perspective.",
    color: "#9bedff",
  },
  {
    icon: PathIcon,
    title: "Personalized Learning Paths",
    description: "AI-guided progression that adapts to your skill level. Learn the right tricks in the right order.",
    color: "#91afa2",
  },
  {
    icon: ChartIcon,
    title: "Track Your Progress",
    description: "Earn XP, maintain streaks, and unlock achievements as you master new skills and complete challenges.",
    color: "#9bedff",
  },
  {
    icon: TrophyIcon,
    title: "World Champion Secrets",
    description: "Exclusive tips and insights from Gentry Stein himself. Learn the techniques that won world titles.",
    color: "#91afa2",
  },
];

// Skill level data
const skillLevels = [
  {
    level: "Beginner",
    description: "Start your journey",
    difficulty: 1,
    color: "#91afa2",
    tricks: ["Sleeper", "Gravity Pull", "Forward Pass"],
  },
  {
    level: "Intermediate",
    description: "Build your foundation",
    difficulty: 2,
    color: "#9bedff",
    tricks: ["Trapeze", "Brain Twister", "Double or Nothing"],
  },
  {
    level: "Advanced",
    description: "Master complex tricks",
    difficulty: 3,
    color: "#91afa2",
    tricks: ["Spirit Bomb", "Kamikaze", "Black Hops"],
  },
  {
    level: "Master",
    description: "Compete at the highest level",
    difficulty: 4,
    color: "#9bedff",
    tricks: ["Rancid Milk", "Yuuki Slack", "Original Combos"],
  },
];

// Stats data
const stats = [
  { value: "500+", label: "Tricks" },
  { value: "5", label: "Learning Paths" },
  { value: "World Champion", label: "Instructor" },
];

// Testimonials
const testimonials = [
  {
    name: "Alex Chen",
    role: "Competitive Player",
    quote: "YoYoChampion took me from landing my first trapeze to competing at nationals in just 8 months.",
    avatar: "AC",
  },
  {
    name: "Jordan Williams",
    role: "Hobbyist",
    quote: "The multi-angle videos are game-changing. I finally understand what I was doing wrong after years of trying.",
    avatar: "JW",
  },
  {
    name: "Sam Rodriguez",
    role: "Parent",
    quote: "My kids are obsessed with the achievements. They practice every day to keep their streaks going!",
    avatar: "SR",
  },
];

export default function LandingPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-32">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-[#9bedff]/10 blur-3xl" />
          <div className="absolute top-20 -left-40 w-80 h-80 rounded-full bg-[#91afa2]/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Hero Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight">
                Become the Yo-Yo Player You Were{" "}
                <span className="text-[#9bedff]">Meant to Be</span>
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Learn from World Champion Gentry Stein with premium tutorials, personalized learning paths, and a community of passionate throwers.
              </p>

              {/* CTA Buttons */}
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/onboarding"
                  className="inline-flex items-center justify-center rounded-full bg-[#9bedff] px-8 py-4 text-base font-semibold text-gray-900 hover:bg-[#7dd9f0] transition-all duration-200 shadow-lg hover:shadow-xl hover:shadow-[#9bedff]/25"
                >
                  Start Learning Free
                </Link>
                <Link
                  href="/curriculum"
                  className="inline-flex items-center justify-center rounded-full border-2 border-gray-200 px-8 py-4 text-base font-semibold text-gray-700 hover:border-[#9bedff] hover:text-[#9bedff] transition-all duration-200"
                >
                  View Curriculum
                </Link>
              </div>

              {/* Social proof mini */}
              <div className="mt-10 flex items-center justify-center lg:justify-start gap-4">
                <div className="flex -space-x-2">
                  {["JD", "MK", "AR", "ST"].map((initials, i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-medium text-gray-600"
                    >
                      {initials}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-500">
                  <span className="font-semibold text-gray-900">1,000+</span> throwers learning
                </p>
              </div>
            </div>

            {/* Hero Image Placeholder */}
            <div className="relative">
              <div className="aspect-square max-w-lg mx-auto rounded-3xl bg-gradient-to-br from-[#9bedff]/20 to-[#91afa2]/20 p-8 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto rounded-full bg-[#9bedff]/30 flex items-center justify-center mb-6">
                    <PlayIcon />
                    <svg className="w-16 h-16 text-[#9bedff]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-gray-500 text-sm">
                    Hero video/image placeholder
                    <br />
                    <span className="text-xs">(Yo-yo action shot)</span>
                  </p>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4 border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#9bedff]/20 flex items-center justify-center">
                    <TrophyIcon />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Instructor</p>
                    <p className="font-semibold text-gray-900">Gentry Stein</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 sm:py-32 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              What You&apos;ll Learn
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to go from complete beginner to competition-ready player
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-[#9bedff]/30"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${feature.color}20` }}
                >
                  <div style={{ color: feature.color }}>
                    <feature.icon />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum Preview Section */}
      <section className="py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              From Beginner to World-Class
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              A structured curriculum designed to take you from your first throw to competing on the world stage
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {skillLevels.map((skill, index) => (
              <div
                key={index}
                className="relative group"
              >
                {/* Connector line */}
                {index < skillLevels.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 left-full w-6 h-0.5 bg-gray-200 -translate-y-1/2 z-0" />
                )}

                <div className="relative bg-white rounded-2xl p-6 border border-gray-200 hover:border-[#9bedff] transition-all duration-300 h-full">
                  {/* Level badge */}
                  <div
                    className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium mb-4"
                    style={{
                      backgroundColor: `${skill.color}20`,
                      color: skill.color === "#9bedff" ? "#0891b2" : "#4d7c63"
                    }}
                  >
                    Level {index + 1}
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {skill.level}
                  </h3>
                  <p className="text-gray-500 text-sm mb-4">
                    {skill.description}
                  </p>

                  {/* Sample tricks */}
                  <div className="space-y-2">
                    {skill.tricks.map((trick, trickIndex) => (
                      <div
                        key={trickIndex}
                        className="flex items-center gap-2 text-sm text-gray-600"
                      >
                        <CheckIcon />
                        <span>{trick}</span>
                      </div>
                    ))}
                  </div>

                  {/* View more link */}
                  <Link
                    href={`/curriculum?level=${index + 1}`}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[#9bedff] hover:text-[#7dd9f0] transition-colors"
                  >
                    View tricks
                    <ArrowRightIcon />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 sm:py-32 bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Trusted by Throwers Worldwide
            </h2>
            <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
              Join thousands of players who have transformed their skills with YoYoChampion
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mb-16 max-w-3xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-3xl sm:text-4xl font-bold text-[#9bedff]">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Testimonials */}
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-2xl p-6 border border-gray-700"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} />
                  ))}
                </div>

                <p className="text-gray-300 leading-relaxed mb-6">
                  &quot;{testimonial.quote}&quot;
                </p>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#9bedff]/20 flex items-center justify-center text-[#9bedff] font-medium text-sm">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-medium text-white">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#9bedff] to-[#91afa2] p-8 sm:p-16">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  <pattern id="circles" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                    <circle cx="10" cy="10" r="2" fill="currentColor" />
                  </pattern>
                </defs>
                <rect fill="url(#circles)" width="100%" height="100%" />
              </svg>
            </div>

            <div className="relative text-center">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
                Ready to Start Your Journey?
              </h2>
              <p className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto">
                Join YoYoChampion today and learn from the best. Your first lesson is free.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/onboarding"
                  className="inline-flex items-center justify-center rounded-full bg-gray-900 px-8 py-4 text-base font-semibold text-white hover:bg-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Get Started Free
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-white/80 backdrop-blur px-8 py-4 text-base font-semibold text-gray-900 hover:bg-white transition-all duration-200"
                >
                  Contact Us
                </Link>
              </div>

              {/* Email signup alternative */}
              <div className="mt-8 max-w-md mx-auto">
                <p className="text-sm text-gray-700 mb-3">
                  Or get updates straight to your inbox
                </p>
                <form className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 rounded-full px-5 py-3 text-sm text-gray-900 placeholder-gray-500 bg-white/90 backdrop-blur border border-white/50 focus:outline-none focus:ring-2 focus:ring-gray-900/20"
                  />
                  <button
                    type="submit"
                    className="rounded-full bg-gray-900 px-6 py-3 text-sm font-semibold text-white hover:bg-gray-800 transition-colors"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
