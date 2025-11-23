"use client";

import * as React from "react";
import Link from "next/link";

// Icons
const CheckCircleIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const StarIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const TrophyIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

const HeartIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

const UsersIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

// Achievements data
const achievements = [
  { year: "2014", title: "World Yo-Yo Champion", description: "Won the prestigious World Yo-Yo Contest 1A Division" },
  { year: "2015", title: "US National Champion", description: "Claimed the national title with a groundbreaking freestyle" },
  { year: "2016", title: "Innovation Award", description: "Recognized for pushing the boundaries of modern yo-yo play" },
  { year: "2018", title: "Content Creator", description: "Launched educational content reaching millions of views" },
];

// Differentiators
const differentiators = [
  {
    icon: StarIcon,
    title: "World Champion Instruction",
    description: "Learn directly from Gentry Stein's competition-tested techniques and training methods.",
  },
  {
    icon: TrophyIcon,
    title: "Competition-Ready Curriculum",
    description: "Our structured paths are designed by competitors who understand what it takes to win.",
  },
  {
    icon: HeartIcon,
    title: "Passion-Driven Community",
    description: "Connect with fellow throwers who share your dedication to the art of yo-yoing.",
  },
  {
    icon: UsersIcon,
    title: "Personalized Learning",
    description: "AI-powered recommendations adapt to your skill level and learning pace.",
  },
];

// Team members
const teamMembers = [
  {
    name: "Gentry Stein",
    role: "Founder & Lead Instructor",
    bio: "World Champion yo-yo player with a passion for teaching the next generation of throwers.",
    initials: "GS",
  },
  {
    name: "Sarah Mitchell",
    role: "Head of Curriculum",
    bio: "Former competitive player turned educator, designing learning paths that actually work.",
    initials: "SM",
  },
  {
    name: "Marcus Chen",
    role: "Community Manager",
    bio: "Connecting throwers worldwide and fostering a supportive learning environment.",
    initials: "MC",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-32">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-[#9bedff]/10 blur-3xl" />
          <div className="absolute top-20 -left-40 w-80 h-80 rounded-full bg-[#91afa2]/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
              About <span className="text-[#9bedff]">YoYoChampion</span>
            </h1>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              We&apos;re on a mission to make world-class yo-yo instruction accessible to everyone.
              Learn from the best, progress at your own pace, and join a community of passionate throwers.
            </p>
          </div>
        </div>
      </section>

      {/* Gentry Bio Section */}
      <section className="py-20 sm:py-32 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image placeholder */}
            <div className="relative">
              <div className="aspect-[4/5] rounded-3xl bg-gradient-to-br from-[#9bedff]/20 to-[#91afa2]/20 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-32 h-32 mx-auto rounded-full bg-[#9bedff]/30 flex items-center justify-center mb-4">
                    <span className="text-4xl font-bold text-[#9bedff]">GS</span>
                  </div>
                  <p className="text-gray-500 text-sm">
                    Gentry Stein photo placeholder
                  </p>
                </div>
              </div>

              {/* Achievement badge */}
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-4 border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#9bedff]/20 flex items-center justify-center text-[#9bedff]">
                    <TrophyIcon />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">2014</p>
                    <p className="text-xs text-gray-500">World Champion</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bio content */}
            <div>
              <div className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium bg-[#9bedff]/10 text-[#0891b2] mb-6">
                Meet Your Instructor
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Gentry Stein
              </h2>

              <div className="prose prose-lg text-gray-600">
                <p>
                  Gentry Stein is a World Yo-Yo Champion who has been pushing the boundaries of yo-yo play for over a decade. His innovative style and technical precision have earned him numerous titles and the respect of the global yo-yo community.
                </p>
                <p>
                  But Gentry&apos;s true passion lies in teaching. He believes that everyone can learn to yo-yo at a high level with the right instruction and practice. That belief led him to create YoYoChampion - a platform designed to share his knowledge with throwers everywhere.
                </p>
                <p>
                  &quot;I remember what it was like to learn tricks from grainy videos and figure things out on my own. I wanted to create something better - a resource that I wish I had when I was starting out.&quot;
                </p>
              </div>

              {/* Achievement timeline */}
              <div className="mt-10 grid grid-cols-2 gap-4">
                {achievements.slice(0, 4).map((achievement, index) => (
                  <div key={index} className="bg-white rounded-xl p-4 border border-gray-100">
                    <p className="text-[#9bedff] font-bold">{achievement.year}</p>
                    <p className="text-gray-900 font-medium text-sm">{achievement.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              To democratize world-class yo-yo instruction and build a global community of passionate players who support each other&apos;s growth.
            </p>
          </div>

          {/* Values/Differentiators */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {differentiators.map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-[#91afa2]/10 flex items-center justify-center mx-auto mb-4 text-[#91afa2]">
                  <item.icon />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Makes Us Different Section */}
      <section className="py-20 sm:py-32 bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                What Makes This Platform Different
              </h2>
              <p className="text-lg text-gray-400 mb-8">
                We&apos;re not just another tutorial site. YoYoChampion was built from the ground up by competitive players who understand what it takes to truly master this art.
              </p>

              <ul className="space-y-4">
                {[
                  "Multi-angle, slow-motion video breakdowns of every trick",
                  "AI-powered learning paths that adapt to your progress",
                  "Gamification that keeps you motivated and consistent",
                  "Direct feedback channels with experienced instructors",
                  "Community challenges and competitions",
                  "Progress tracking with detailed analytics",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="text-[#9bedff] flex-shrink-0 mt-0.5">
                      <CheckCircleIcon />
                    </div>
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
                  <p className="text-3xl font-bold text-[#9bedff]">500+</p>
                  <p className="text-gray-400 text-sm">Tricks in library</p>
                </div>
                <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
                  <p className="text-3xl font-bold text-[#9bedff]">4K</p>
                  <p className="text-gray-400 text-sm">Video quality</p>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
                  <p className="text-3xl font-bold text-[#91afa2]">5</p>
                  <p className="text-gray-400 text-sm">Learning paths</p>
                </div>
                <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
                  <p className="text-3xl font-bold text-[#91afa2]">24/7</p>
                  <p className="text-gray-400 text-sm">Community support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              The Team
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A passionate group of yo-yo enthusiasts dedicated to helping you succeed
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#9bedff] to-[#91afa2] flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">{member.initials}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                <p className="text-[#9bedff] text-sm font-medium mb-2">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-32 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Join thousands of throwers who are leveling up their skills with YoYoChampion. Your first lesson is on us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center rounded-full bg-[#9bedff] px-8 py-4 text-base font-semibold text-gray-900 hover:bg-[#7dd9f0] transition-all duration-200 shadow-lg hover:shadow-xl hover:shadow-[#9bedff]/25"
              >
                Get Started Free
              </Link>
              <Link
                href="/curriculum"
                className="inline-flex items-center justify-center rounded-full border-2 border-gray-200 px-8 py-4 text-base font-semibold text-gray-700 hover:border-[#9bedff] hover:text-[#9bedff] transition-all duration-200"
              >
                Explore Curriculum
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
