"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Library, Map, Trophy, User, Flame } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUserStore, selectIsAuthenticated } from "@/stores/user-store";
import { useProgressStore, selectCurrentStreak } from "@/stores/progress-store";
import { useGamificationStore, selectLevel } from "@/stores/gamification-store";

// Navigation items with color configuration
const navItems = [
  {
    href: "/",
    label: "Home",
    icon: Home,
    activeColor: "text-fun-blue",
    activeBg: "bg-fun-blue/10",
    glowClass: "shadow-fun-blue"
  },
  {
    href: "/library",
    label: "Library",
    icon: Library,
    activeColor: "text-fun-purple",
    activeBg: "bg-fun-purple/10",
    glowClass: "shadow-fun-purple"
  },
  {
    href: "/paths",
    label: "Paths",
    icon: Map,
    activeColor: "text-brand-teal",
    activeBg: "bg-brand-teal/10",
    glowClass: "shadow-fun-blue"
  },
  {
    href: "/dashboard",
    label: "Progress",
    icon: Trophy,
    activeColor: "text-xp",
    activeBg: "bg-xp/10",
    glowClass: "shadow-fun-yellow"
  },
  {
    href: "/profile",
    label: "Profile",
    icon: User,
    activeColor: "text-fun-pink",
    activeBg: "bg-fun-pink/10",
    glowClass: "shadow-fun-pink"
  },
];

// Animated Fire Icon Component
function AnimatedFire({ className }: { className?: string }) {
  return (
    <motion.div
      className={cn("relative", className)}
      animate={{
        scale: [1, 1.1, 1],
        rotate: [-2, 2, -2]
      }}
      transition={{
        duration: 0.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <Flame className="h-3.5 w-3.5 text-streak fill-streak" />
    </motion.div>
  );
}

// Level Badge Component
function LevelBadge({ level }: { level: number }) {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className={cn(
        "absolute -top-1 -right-1 z-10",
        "flex items-center justify-center",
        "w-4 h-4 rounded-full",
        "bg-gradient-to-br from-xp-light to-xp",
        "text-[8px] font-bold text-white",
        "border border-white shadow-sm"
      )}
    >
      {level}
    </motion.div>
  );
}

// Streak Badge Component - exported for use in other components
export function StreakBadge({ streak }: { streak: number }) {
  return (
    <motion.div
      initial={{ scale: 0, y: 10 }}
      animate={{ scale: 1, y: 0 }}
      className={cn(
        "absolute -top-2 left-1/2 -translate-x-1/2 z-20",
        "flex items-center gap-0.5 px-1.5 py-0.5",
        "bg-gradient-to-r from-streak to-streak-light",
        "rounded-full shadow-fun-red"
      )}
    >
      <AnimatedFire />
      <span className="text-[9px] font-bold text-white">{streak}</span>
    </motion.div>
  );
}

export interface MobileNavProps {
  className?: string;
}

export function MobileNav({ className }: MobileNavProps) {
  const pathname = usePathname();
  const isAuthenticated = useUserStore(selectIsAuthenticated);
  const currentStreak = useProgressStore(selectCurrentStreak);
  const level = useGamificationStore(selectLevel);
  const [tappedItem, setTappedItem] = React.useState<string | null>(null);

  // Don't show profile if not authenticated, redirect to login
  const displayItems = React.useMemo(() => {
    if (!isAuthenticated) {
      return navItems.map(item =>
        item.href === "/profile"
          ? { ...item, href: "/login", label: "Sign In" }
          : item
      );
    }
    return navItems;
  }, [isAuthenticated]);

  const handleTap = (href: string) => {
    setTappedItem(href);
    setTimeout(() => setTappedItem(null), 300);
  };

  return (
    <nav
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 lg:hidden",
        "bg-white/95 backdrop-blur-md",
        "rounded-t-3xl shadow-elevated",
        "border-t border-gray-100",
        "safe-area-inset-bottom",
        className
      )}
    >
      {/* Streak indicator floating above nav when streak is active */}
      <AnimatePresence>
        {isAuthenticated && currentStreak > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute -top-6 left-1/2 -translate-x-1/2"
          >
            <div className={cn(
              "flex items-center gap-1.5 px-3 py-1.5",
              "bg-gradient-to-r from-streak to-fun-orange",
              "rounded-full shadow-fun-red",
              "border-2 border-white"
            )}>
              <AnimatedFire className="scale-110" />
              <span className="text-xs font-bold text-white">{currentStreak} day streak!</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-around h-16 px-1 pb-safe-area-inset-bottom">
        {displayItems.map((item) => {
          const isActive = pathname === item.href ||
            (item.href !== "/" && pathname?.startsWith(item.href));
          const Icon = item.icon;
          const isTapped = tappedItem === item.href;
          const isProfile = item.href === "/profile" || item.href === "/login";

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => handleTap(item.href)}
              className={cn(
                "relative flex flex-col items-center justify-center flex-1 h-full min-w-[56px] min-h-[48px]",
                "transition-all duration-200 touch-manipulation",
                isActive ? item.activeColor : "text-gray-400"
              )}
            >
              {/* Active background pill */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    layoutId="mobile-nav-pill"
                    className={cn(
                      "absolute inset-x-2 inset-y-2 rounded-2xl",
                      item.activeBg
                    )}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ type: "spring", bounce: 0.3, duration: 0.4 }}
                  />
                )}
              </AnimatePresence>

              {/* Active top indicator */}
              {isActive && (
                <motion.div
                  layoutId="mobile-nav-indicator"
                  className={cn(
                    "absolute -top-0.5 left-1/2 -translate-x-1/2",
                    "w-8 h-1 rounded-full",
                    "bg-gradient-to-r",
                    item.href === "/" && "from-fun-blue to-fun-blue-light",
                    item.href === "/library" && "from-fun-purple to-fun-purple-light",
                    item.href === "/paths" && "from-brand-teal to-brand-teal/80",
                    item.href === "/dashboard" && "from-xp to-xp-light",
                    (item.href === "/profile" || item.href === "/login") && "from-fun-pink to-fun-pink-light"
                  )}
                  transition={{ type: "spring", bounce: 0.25, duration: 0.4 }}
                />
              )}

              {/* Icon container with level badge for profile */}
              <motion.div
                className="relative z-10 flex items-center justify-center w-10 h-10 sm:w-auto sm:h-auto"
                animate={{
                  scale: isTapped ? 0.85 : isActive ? 1.1 : 1,
                  y: isTapped ? 2 : 0
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 15
                }}
              >
                <Icon
                  className={cn(
                    "h-6 w-6 sm:h-5 sm:w-5 transition-all duration-200",
                    isActive && "drop-shadow-sm"
                  )}
                  strokeWidth={isActive ? 2.5 : 2}
                />

                {/* Level badge on profile icon */}
                {isProfile && isAuthenticated && level > 1 && (
                  <LevelBadge level={level} />
                )}
              </motion.div>

              {/* Label */}
              <motion.span
                className={cn(
                  "text-[9px] sm:text-[10px] mt-0.5 font-semibold z-10",
                  isActive ? item.activeColor : "text-gray-400"
                )}
                animate={{
                  scale: isActive ? 1.05 : 1,
                  opacity: isActive ? 1 : 0.8
                }}
              >
                {item.label}
              </motion.span>

              {/* Tap ripple effect */}
              <AnimatePresence>
                {isTapped && (
                  <motion.div
                    className={cn(
                      "absolute inset-2 rounded-2xl",
                      item.activeBg
                    )}
                    initial={{ scale: 0.5, opacity: 0.8 }}
                    animate={{ scale: 1.2, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </AnimatePresence>
            </Link>
          );
        })}
      </div>

      {/* Safe area padding for devices with home indicator */}
      <div className="h-safe-area-inset-bottom bg-white/95" />
    </nav>
  );
}

export default MobileNav;
