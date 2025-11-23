"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Sparkles, Play, Zap, Target, Trophy } from "lucide-react";
import { MotionButton } from "@/components/ui/button";
import { Mascot, getRandomMessage, ConfettiBurst } from "@/components/fun";

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

// Fun bouncy animation for cards
const cardHoverVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.05, y: -4 },
  tap: { scale: 0.98 },
};

// Style icons with fun colors
const styleConfig = [
  { icon: "1A", label: "String Tricks", color: "bg-fun-primary", emoji: "🎯" },
  { icon: "2A", label: "Looping", color: "bg-fun-accent", emoji: "🔄" },
  { icon: "5A", label: "Counterweight", color: "bg-fun-blue", emoji: "⚖️" },
];

export default function WelcomePage() {
  const router = useRouter();
  const [showConfetti, setShowConfetti] = useState(false);
  const [encouragingMessage] = useState(() => getRandomMessage("greeting"));

  const handleNext = useCallback(() => {
    setShowConfetti(true);
    setTimeout(() => {
      router.push("/onboarding/skill-level");
    }, 500);
  }, [router]);

  return (
    <>
      <ConfettiBurst trigger={showConfetti} />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center max-w-lg mx-auto"
      >
        {/* Mascot - Fun and bouncy */}
        <motion.div
          variants={itemVariants}
          className="mb-6"
        >
          <Mascot size="xl" mood="celebrating" className="mx-auto" />
        </motion.div>

        {/* Title - Bold and exciting */}
        <motion.div variants={itemVariants} className="mb-2">
          <motion.h1
            className="text-4xl font-black text-gray-900"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Welcome to{" "}
            <span className="bg-gradient-to-r from-fun-primary to-fun-blue bg-clip-text text-transparent">
              YoYoChampion!
            </span>
          </motion.h1>
        </motion.div>

        {/* Subtitle with encouraging message */}
        <motion.p
          variants={itemVariants}
          className="text-lg text-gray-600 mb-8"
        >
          {encouragingMessage}
        </motion.p>

        {/* Gentry message card - Fun design */}
        <motion.div variants={itemVariants} className="mb-8">
          <motion.div
            className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-fun-primary/10 via-fun-blue/5 to-fun-purple/10 border-2 border-fun-primary/20 p-6"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            {/* Decorative sparkles */}
            <motion.div
              className="absolute top-4 right-4 text-fun-xp"
              animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="h-6 w-6" />
            </motion.div>

            <div className="flex items-start gap-4">
              {/* Avatar with glow */}
              <motion.div
                className="flex-shrink-0 w-14 h-14 rounded-full bg-gradient-to-br from-fun-primary to-fun-primary-dark flex items-center justify-center shadow-lg shadow-fun-primary/30"
                animate={{ boxShadow: ["0 0 20px rgba(88,204,2,0.3)", "0 0 30px rgba(88,204,2,0.5)", "0 0 20px rgba(88,204,2,0.3)"] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="text-white font-bold text-lg">GS</span>
              </motion.div>
              <div className="text-left">
                <p className="font-bold text-gray-900 mb-1 flex items-center gap-2">
                  From Gentry Stein
                  <span className="text-fun-xp">🏆</span>
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  &quot;Hey there! I&apos;m so excited to help you on your yo-yo
                  journey. Whether you&apos;re just starting out or looking to
                  level up, we&apos;ve got you covered. Let&apos;s do this!&quot;
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* What you'll learn - Colorful and bouncy cards */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-3 gap-3 mb-8"
        >
          {styleConfig.map((item, index) => (
            <motion.div
              key={item.label}
              variants={cardHoverVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              className="relative"
            >
              <motion.div
                className="flex flex-col items-center p-4 rounded-2xl bg-white border-2 border-gray-200 hover:border-fun-primary/30 transition-colors cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <motion.div
                  className={`w-12 h-12 rounded-full ${item.color} flex items-center justify-center mb-2 shadow-lg`}
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                >
                  <span className="text-white font-black text-sm">
                    {item.icon}
                  </span>
                </motion.div>
                <span className="text-xs font-bold text-gray-700">{item.label}</span>
                <span className="text-lg mt-1">{item.emoji}</span>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Features highlight */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-2 gap-3 mb-8"
        >
          <motion.div
            className="flex items-center gap-2 p-3 rounded-xl bg-fun-xp/10 border border-fun-xp/20"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-8 h-8 rounded-full bg-fun-xp/20 flex items-center justify-center">
              <Trophy className="w-4 h-4 text-fun-accent" />
            </div>
            <div className="text-left">
              <p className="text-xs font-bold text-gray-900">Earn XP</p>
              <p className="text-[10px] text-gray-500">Level up your skills</p>
            </div>
          </motion.div>

          <motion.div
            className="flex items-center gap-2 p-3 rounded-xl bg-fun-streak/10 border border-fun-streak/20"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-8 h-8 rounded-full bg-fun-streak/20 flex items-center justify-center">
              <Zap className="w-4 h-4 text-fun-streak" />
            </div>
            <div className="text-left">
              <p className="text-xs font-bold text-gray-900">Build Streaks</p>
              <p className="text-[10px] text-gray-500">Stay consistent</p>
            </div>
          </motion.div>

          <motion.div
            className="flex items-center gap-2 p-3 rounded-xl bg-fun-primary/10 border border-fun-primary/20"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-8 h-8 rounded-full bg-fun-primary/20 flex items-center justify-center">
              <Target className="w-4 h-4 text-fun-primary" />
            </div>
            <div className="text-left">
              <p className="text-xs font-bold text-gray-900">Track Progress</p>
              <p className="text-[10px] text-gray-500">See your growth</p>
            </div>
          </motion.div>

          <motion.div
            className="flex items-center gap-2 p-3 rounded-xl bg-fun-purple/10 border border-fun-purple/20"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-8 h-8 rounded-full bg-fun-purple/20 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-fun-purple" />
            </div>
            <div className="text-left">
              <p className="text-xs font-bold text-gray-900">Unlock Badges</p>
              <p className="text-[10px] text-gray-500">Show off achievements</p>
            </div>
          </motion.div>
        </motion.div>

        {/* CTA Button - Big and fun */}
        <motion.div variants={itemVariants}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <MotionButton
              variant="brand"
              size="xl"
              onClick={handleNext}
              className="w-full font-black text-lg bg-gradient-to-r from-fun-primary to-fun-primary-dark hover:from-fun-primary-dark hover:to-fun-primary shadow-lg shadow-fun-primary/30"
            >
              <Play className="mr-2 h-6 w-6" />
              Let&apos;s Get Started!
            </MotionButton>
          </motion.div>
          <motion.p
            className="mt-3 text-sm text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            Takes about 2 minutes to set up
          </motion.p>
        </motion.div>
      </motion.div>
    </>
  );
}
