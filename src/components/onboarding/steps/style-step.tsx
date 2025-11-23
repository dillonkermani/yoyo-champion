"use client";

import { motion } from "framer-motion";
import { MotionCard } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  useOnboardingStore,
  selectPreferredStyles,
  STYLE_METADATA,
  type PreferredStyle,
} from "@/stores";

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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
    },
  },
};

const ALL_STYLES: PreferredStyle[] = ["1A", "2A", "3A", "4A", "5A", "responsive"];

// Extended metadata with more details
const STYLE_DETAILS: Record<
  PreferredStyle,
  {
    popularity: string;
    difficulty: string;
    color: string;
  }
> = {
  "1A": {
    popularity: "Most Popular",
    difficulty: "All Levels",
    color: "from-blue-500 to-cyan-400",
  },
  "2A": {
    popularity: "Classic",
    difficulty: "Intermediate",
    color: "from-orange-500 to-yellow-400",
  },
  "3A": {
    popularity: "Technical",
    difficulty: "Advanced",
    color: "from-purple-500 to-pink-400",
  },
  "4A": {
    popularity: "Spectacular",
    difficulty: "Intermediate",
    color: "from-green-500 to-emerald-400",
  },
  "5A": {
    popularity: "Creative",
    difficulty: "Advanced",
    color: "from-red-500 to-rose-400",
  },
  responsive: {
    popularity: "Traditional",
    difficulty: "Beginner",
    color: "from-slate-500 to-slate-400",
  },
};

interface StyleOptionProps {
  style: PreferredStyle;
  isSelected: boolean;
  onToggle: () => void;
}

function StyleOption({ style, isSelected, onToggle }: StyleOptionProps) {
  const metadata = STYLE_METADATA[style];
  const details = STYLE_DETAILS[style];

  return (
    <MotionCard
      variants={cardVariants}
      onClick={onToggle}
      className={cn(
        "cursor-pointer transition-all duration-200 overflow-hidden min-h-[120px] touch-manipulation",
        isSelected
          ? "border-2 border-brand-blue shadow-elevated"
          : "border border-border active:border-brand-teal/50 active:shadow-card sm:hover:border-brand-teal/50 sm:hover:shadow-card"
      )}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Color bar */}
      <div
        className={cn(
          "h-1 sm:h-1.5 bg-gradient-to-r transition-opacity",
          details.color,
          isSelected ? "opacity-100" : "opacity-50"
        )}
      />

      <div className="p-3 sm:p-4">
        <div className="flex items-start justify-between mb-1.5 sm:mb-2">
          {/* Style name */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span
              className={cn(
                "text-xl sm:text-2xl font-bold transition-colors",
                isSelected ? "text-brand-black" : "text-muted-foreground"
              )}
            >
              {style}
            </span>
            {style === "1A" && (
              <span className="px-1.5 py-0.5 text-[10px] sm:text-xs font-medium bg-brand-blue/20 text-brand-black rounded-full">
                Recommended
              </span>
            )}
          </div>

          {/* Checkbox */}
          <div
            className={cn(
              "flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center transition-all",
              isSelected
                ? "border-brand-blue bg-brand-blue"
                : "border-gray-300 bg-white"
            )}
          >
            {isSelected && (
              <motion.svg
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-3 h-3 sm:w-4 sm:h-4 text-brand-black"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </motion.svg>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm font-medium text-brand-black mb-0.5 sm:mb-1">
          {metadata.label.split(" - ")[1] || metadata.label}
        </p>
        <p className="text-[10px] sm:text-xs text-muted-foreground mb-2 sm:mb-3 line-clamp-2">
          {metadata.description}
        </p>

        {/* Tags */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
          <span className="px-1.5 py-0.5 text-[10px] sm:text-xs bg-surface-secondary text-muted-foreground rounded">
            {details.popularity}
          </span>
          <span className="px-1.5 py-0.5 text-[10px] sm:text-xs bg-surface-secondary text-muted-foreground rounded">
            {details.difficulty}
          </span>
        </div>
      </div>
    </MotionCard>
  );
}

export function StyleStep() {
  const selectedStyles = useOnboardingStore(selectPreferredStyles);
  const togglePreferredStyle = useOnboardingStore(
    (state) => state.togglePreferredStyle
  );

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={cardVariants} className="text-center mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-brand-black mb-1 sm:mb-2">
          What Styles Interest You?
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground">
          Select the play styles you&apos;d like to explore
        </p>
      </motion.div>

      {/* Selected count */}
      <motion.div variants={cardVariants} className="text-center">
        <span
          className={cn(
            "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-colors",
            selectedStyles.length > 0
              ? "bg-brand-teal/20 text-brand-black"
              : "bg-gray-100 text-muted-foreground"
          )}
        >
          {selectedStyles.length} selected
        </span>
      </motion.div>

      {/* Style grid */}
      <div className="grid grid-cols-2 gap-2 sm:gap-4">
        {ALL_STYLES.map((style) => (
          <StyleOption
            key={style}
            style={style}
            isSelected={selectedStyles.includes(style)}
            onToggle={() => togglePreferredStyle(style)}
          />
        ))}
      </div>

      {/* Hint */}
      {selectedStyles.length === 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-sm text-muted-foreground"
        >
          Select at least one style to continue
        </motion.p>
      )}

      {/* Tip for beginners */}
      {selectedStyles.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center p-3 sm:p-4 bg-brand-green/30 rounded-lg"
        >
          <p className="text-xs sm:text-sm text-brand-black">
            <strong>Tip:</strong> If you&apos;re new, start with{" "}
            <span className="font-semibold text-brand-teal">1A (String Tricks)</span>{" "}
            - it&apos;s the most popular and has the most learning resources!
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
