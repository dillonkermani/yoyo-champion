"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThinkingMascot } from "@/components/fun";

const loadingMessages = [
  "Getting your tricks ready...",
  "Loading awesome content...",
  "Almost there...",
  "Spinning up the yo-yo...",
  "Preparing something cool...",
  "Gathering your progress...",
  "Setting up your session...",
  "Just a moment...",
];

export default function Loading() {
  const [messageIndex, setMessageIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-surface-secondary to-white flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        {/* Animated Mascot */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ThinkingMascot size="lg" showString={true} />
        </motion.div>

        {/* Loading Text */}
        <div className="text-center mt-2">
          <motion.h2
            className="text-lg font-semibold text-brand-black mb-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            YoYo Champion
          </motion.h2>

          {/* Animated message switcher */}
          <div className="h-6 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={messageIndex}
                className="text-sm text-muted-foreground"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {loadingMessages[messageIndex]}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        {/* Loading dots animation */}
        <div className="flex gap-1.5 mt-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-brand-blue"
              animate={{
                y: [0, -8, 0],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
