"use client";

import { motion } from "framer-motion";
import { Sparkles, Play } from "lucide-react";
import { MotionButton } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useOnboardingStore } from "@/stores";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

// YoYo Logo component
function YoYoLogo() {
  return (
    <motion.div
      className="relative w-24 h-24 mx-auto mb-6"
      initial={{ scale: 0.8, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Outer ring */}
      <motion.div
        className="absolute inset-0 rounded-full border-4 border-brand-blue"
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {/* Decorative dots */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-brand-blue" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 rounded-full bg-brand-teal" />
      </motion.div>

      {/* Inner circle */}
      <div className="absolute inset-4 rounded-full bg-gradient-to-br from-brand-blue to-brand-teal flex items-center justify-center">
        <span className="text-white font-bold text-xl">YC</span>
      </div>

      {/* String */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 bottom-0 w-0.5 bg-gradient-to-b from-brand-teal to-transparent"
        initial={{ height: 0 }}
        animate={{ height: 40 }}
        transition={{ delay: 0.5, duration: 0.3 }}
      />
    </motion.div>
  );
}

export function WelcomeStep() {
  const nextStep = useOnboardingStore((state) => state.nextStep);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="text-center"
    >
      {/* Logo */}
      <motion.div variants={itemVariants}>
        <YoYoLogo />
      </motion.div>

      {/* Title */}
      <motion.h1
        variants={itemVariants}
        className="text-3xl font-bold text-brand-black mb-3"
      >
        Welcome to YoYoChampion!
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        variants={itemVariants}
        className="text-lg text-muted-foreground mb-8 max-w-md mx-auto"
      >
        Your personal journey to mastering yo-yo starts here. Learn at your own
        pace with expert instruction from world champions.
      </motion.p>

      {/* Gentry message card */}
      <motion.div variants={itemVariants} className="mb-8">
        <Card className="bg-brand-green/30 border-brand-teal/20">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              {/* Avatar placeholder */}
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-brand-teal/20 flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-brand-teal" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-brand-black mb-1">
                  From Gentry Stein
                </p>
                <p className="text-sm text-muted-foreground">
                  &quot;Hey there! I&apos;m so excited to help you on your yo-yo
                  journey. Whether you&apos;re just starting out or looking to
                  level up, we&apos;ve got you covered. Let&apos;s find the
                  perfect path for you!&quot;
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* What you'll learn */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-3 gap-4 mb-8"
      >
        {[
          { icon: "1A", label: "String Tricks" },
          { icon: "2A", label: "Looping" },
          { icon: "5A", label: "Counterweight" },
        ].map((item) => (
          <div
            key={item.label}
            className="flex flex-col items-center p-3 rounded-lg bg-white border border-border"
          >
            <span className="text-lg font-bold text-brand-blue mb-1">
              {item.icon}
            </span>
            <span className="text-xs text-muted-foreground">{item.label}</span>
          </div>
        ))}
      </motion.div>

      {/* CTA Button */}
      <motion.div variants={itemVariants}>
        <MotionButton
          variant="brand"
          size="xl"
          onClick={nextStep}
          className="w-full sm:w-auto min-w-[200px]"
        >
          <Play className="mr-2 h-5 w-5" />
          Let&apos;s Get Started
        </MotionButton>
      </motion.div>
    </motion.div>
  );
}
