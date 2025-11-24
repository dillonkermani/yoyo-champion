"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
    color: "from-fun-blue to-cyan-400",
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

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      onToggle();
    },
    [onToggle]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onToggle();
      }
    },
    [onToggle]
  );

  return (
    <motion.div variants={cardVariants}>
      <Card
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="checkbox"
        aria-checked={isSelected}
        className={cn(
          "cursor-pointer transition-all duration-200 overflow-hidden select-none",
          isSelected
            ? "border-2 border-brand-blue shadow-elevated"
            : "border border-border hover:border-fun-blue/50 hover:shadow-card"
        )}
      >
        {/* Color bar */}
        <div
          className={cn(
            "h-1.5 bg-gradient-to-r transition-opacity",
            details.color,
            isSelected ? "opacity-100" : "opacity-50"
          )}
        />

        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            {/* Style name */}
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "text-2xl font-bold transition-colors",
                  isSelected ? "text-brand-black" : "text-muted-foreground"
                )}
              >
                {style}
              </span>
              {style === "1A" && (
                <span className="px-2 py-0.5 text-xs font-medium bg-brand-blue/20 text-brand-black rounded-full">
                  Recommended
                </span>
              )}
            </div>

            {/* Checkbox */}
            <div
              className={cn(
                "flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
                isSelected
                  ? "border-brand-blue bg-brand-blue"
                  : "border-gray-300 bg-white"
              )}
            >
              {isSelected && (
                <motion.svg
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-4 h-4 text-brand-black"
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
          <p className="text-sm font-medium text-brand-black mb-1">
            {metadata.label.split(" - ")[1] || metadata.label}
          </p>
          <p className="text-xs text-muted-foreground mb-3">
            {metadata.description}
          </p>

          {/* Tags */}
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 text-xs bg-surface-secondary text-muted-foreground rounded">
              {details.popularity}
            </span>
            <span className="px-2 py-0.5 text-xs bg-surface-secondary text-muted-foreground rounded">
              {details.difficulty}
            </span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

export default function StylesPage() {
  const router = useRouter();
  const selectedStyles = useOnboardingStore(selectPreferredStyles);
  const togglePreferredStyle = useOnboardingStore(
    (state) => state.togglePreferredStyle
  );

  const handleToggleStyle = useCallback(
    (style: PreferredStyle) => {
      togglePreferredStyle(style);
    },
    [togglePreferredStyle]
  );

  const handleBack = useCallback(() => {
    router.push("/onboarding/goals");
  }, [router]);

  const handleNext = useCallback(() => {
    if (selectedStyles.length > 0) {
      router.push("/onboarding/recommendation");
    }
  }, [selectedStyles.length, router]);

  const canProceed = selectedStyles.length > 0;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={cardVariants} className="text-center mb-6">
        <h2 className="text-2xl font-bold text-brand-black mb-2">
          What Styles Interest You?
        </h2>
        <p className="text-muted-foreground">
          Select the play styles you&apos;d like to explore
        </p>
      </motion.div>

      {/* Selected count */}
      <motion.div variants={cardVariants} className="text-center">
        <span
          className={cn(
            "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-colors",
            selectedStyles.length > 0
              ? "bg-fun-blue/20 text-brand-black"
              : "bg-gray-100 text-muted-foreground"
          )}
        >
          {selectedStyles.length} selected
        </span>
      </motion.div>

      {/* Style grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {ALL_STYLES.map((style) => (
          <StyleOption
            key={style}
            style={style}
            isSelected={selectedStyles.includes(style)}
            onToggle={() => handleToggleStyle(style)}
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
          className="text-center p-4 bg-fun-blue/30 rounded-lg"
        >
          <p className="text-sm text-brand-black">
            <strong>Tip:</strong> If you&apos;re new, start with{" "}
            <span className="font-semibold text-fun-blue">1A (String Tricks)</span>{" "}
            - it&apos;s the most popular and has the most learning resources!
          </p>
        </motion.div>
      )}

      {/* Navigation buttons */}
      <motion.div
        variants={cardVariants}
        className="flex items-center justify-between mt-8 pt-4"
      >
        <Button variant="ghost" onClick={handleBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <Button
          variant="brand"
          onClick={handleNext}
          disabled={!canProceed}
          size="lg"
        >
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </motion.div>
    </motion.div>
  );
}
