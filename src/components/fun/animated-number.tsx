"use client";

import * as React from "react";
import { motion, useSpring, useTransform, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";
import { SparkleParticles } from "./particles";

export interface AnimatedNumberProps {
  /** The target value to animate to */
  value: number;
  /** Duration of the animation in seconds (not used with spring, kept for API compatibility) */
  duration?: number;
  /** Format function for the number */
  format?: (value: number) => string;
  /** Whether to show sparkle effect */
  showSparkles?: boolean;
  /** Sparkle duration in ms */
  sparkleDuration?: number;
  /** Container className */
  className?: string;
  /** Text className */
  textClassName?: string;
  /** Prefix text (e.g., "+", "$") */
  prefix?: string;
  /** Suffix text (e.g., "XP", "%") */
  suffix?: string;
  /** Callback when animation completes */
  onComplete?: () => void;
  /** Spring configuration */
  springConfig?: {
    stiffness?: number;
    damping?: number;
  };
}

function defaultFormat(value: number): string {
  return Math.round(value).toLocaleString();
}

export function AnimatedNumber({
  value,
  format = defaultFormat,
  showSparkles = false,
  sparkleDuration = 1000,
  className,
  textClassName,
  prefix,
  suffix,
  onComplete,
  springConfig = { stiffness: 100, damping: 30 },
}: AnimatedNumberProps) {
  const [sparkleActive, setSparkleActive] = React.useState(false);
  const previousValue = React.useRef(0);

  const motionValue = useMotionValue(previousValue.current);
  const springValue = useSpring(motionValue, {
    stiffness: springConfig.stiffness ?? 100,
    damping: springConfig.damping ?? 30,
  });

  const displayValue = useTransform(springValue, (latest) => format(latest));

  React.useEffect(() => {
    const valueChanged = previousValue.current !== value;
    previousValue.current = value;

    motionValue.set(value);

    if (valueChanged && showSparkles) {
      setSparkleActive(true);
      const timer = setTimeout(() => {
        setSparkleActive(false);
      }, sparkleDuration);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [value, motionValue, showSparkles, sparkleDuration]);

  React.useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (Math.abs(latest - value) < 0.5) {
        onComplete?.();
      }
    });
    return unsubscribe;
  }, [springValue, value, onComplete]);

  return (
    <div className={cn("relative inline-flex items-center", className)}>
      {showSparkles && (
        <div className="absolute inset-0 -m-4 pointer-events-none">
          <SparkleParticles active={sparkleActive} intensity="low" />
        </div>
      )}
      <motion.span
        className={cn("tabular-nums", textClassName)}
        initial={{ scale: 1 }}
        animate={sparkleActive ? { scale: [1, 1.1, 1] } : { scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {prefix}
        <motion.span>{displayValue}</motion.span>
        {suffix}
      </motion.span>
    </div>
  );
}

// Preset animated number variants
export function AnimatedXP({
  value,
  showSparkles = true,
  className,
}: {
  value: number;
  showSparkles?: boolean;
  className?: string;
}) {
  return (
    <AnimatedNumber
      value={value}
      prefix="+"
      suffix=" XP"
      showSparkles={showSparkles}
      {...(className ? { className } : {})}
      textClassName="font-bold text-fun-blue"
      springConfig={{ stiffness: 200, damping: 25 }}
    />
  );
}

export function AnimatedScore({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  return (
    <AnimatedNumber
      value={value}
      {...(className ? { className } : {})}
      textClassName="font-bold"
      format={(v) => Math.round(v).toLocaleString()}
    />
  );
}

export function AnimatedPercentage({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  return (
    <AnimatedNumber
      value={value}
      suffix="%"
      {...(className ? { className } : {})}
      format={(v) => Math.round(v).toString()}
    />
  );
}

export function AnimatedLevel({
  value,
  showSparkles = true,
  className,
}: {
  value: number;
  showSparkles?: boolean;
  className?: string;
}) {
  return (
    <AnimatedNumber
      value={value}
      prefix="Lvl "
      showSparkles={showSparkles}
      {...(className ? { className } : {})}
      textClassName="font-bold text-brand-blue"
      format={(v) => Math.floor(v).toString()}
    />
  );
}

export function AnimatedStreak({
  value,
  showSparkles = true,
  className,
}: {
  value: number;
  showSparkles?: boolean;
  className?: string;
}) {
  return (
    <AnimatedNumber
      value={value}
      suffix=" days"
      showSparkles={showSparkles}
      {...(className ? { className } : {})}
      textClassName="font-bold text-orange-500"
      format={(v) => Math.floor(v).toString()}
    />
  );
}

// Counter that counts up from 0
export function CountUp({
  to,
  duration = 2,
  className,
  format,
  prefix,
  suffix,
}: {
  to: number;
  duration?: number;
  className?: string;
  format?: (value: number) => string;
  prefix?: string;
  suffix?: string;
}) {
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    setValue(to);
  }, [to]);

  return (
    <AnimatedNumber
      value={value}
      duration={duration}
      format={format ?? defaultFormat}
      {...(prefix ? { prefix } : {})}
      {...(suffix ? { suffix } : {})}
      {...(className ? { className } : {})}
      springConfig={{ stiffness: 50, damping: 20 }}
    />
  );
}

export default AnimatedNumber;
