"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home, Library, Route, BarChart3, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUserStore, selectIsAuthenticated } from "@/stores/user-store";

// Navigation items for mobile bottom nav
const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/library", label: "Library", icon: Library },
  { href: "/paths", label: "Paths", icon: Route },
  { href: "/dashboard", label: "Progress", icon: BarChart3 },
  { href: "/profile", label: "Profile", icon: User },
];

export interface MobileNavProps {
  className?: string;
}

export function MobileNav({ className }: MobileNavProps) {
  const pathname = usePathname();
  const isAuthenticated = useUserStore(selectIsAuthenticated);

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

  return (
    <nav
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 lg:hidden",
        "bg-white border-t border-gray-200 shadow-lg",
        "safe-area-inset-bottom",
        className
      )}
    >
      <div className="flex items-center justify-around h-16 px-2">
        {displayItems.map((item) => {
          const isActive = pathname === item.href ||
            (item.href !== "/" && pathname?.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex flex-col items-center justify-center flex-1 h-full",
                "transition-colors",
                isActive ? "text-brand-teal" : "text-gray-500"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="mobile-nav-indicator"
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-brand-teal rounded-b-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                />
              )}
              <Icon
                className={cn(
                  "h-5 w-5 transition-transform",
                  isActive && "scale-110"
                )}
              />
              <span
                className={cn(
                  "text-[10px] mt-1 font-medium",
                  isActive ? "text-brand-teal" : "text-gray-500"
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>

      {/* Safe area padding for devices with home indicator */}
      <div className="h-safe-area-inset-bottom bg-white" />
    </nav>
  );
}

export default MobileNav;
