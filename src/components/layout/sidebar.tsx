"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Library,
  Route,
  Trophy,
  BarChart3,
  User,
  Settings,
  ChevronLeft,
  ChevronRight,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useUserStore, selectUser, selectUserDisplayName, selectIsAuthenticated } from "@/stores/user-store";
import { useGamificationStore, selectLevel, selectLevelProgress } from "@/stores/gamification-store";
import { useUIStore, selectSidebarOpen } from "@/stores/ui-store";

// Navigation sections configuration
const navSections = [
  {
    title: "Learn",
    items: [
      { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
      { href: "/paths", label: "My Paths", icon: Route },
      { href: "/library", label: "Trick Library", icon: Library },
    ],
  },
  {
    title: "Progress",
    items: [
      { href: "/profile/achievements", label: "Achievements", icon: Trophy },
      { href: "/profile", label: "Streaks & Stats", icon: BarChart3 },
    ],
  },
  {
    title: "Account",
    items: [
      { href: "/profile", label: "Profile", icon: User },
      { href: "/profile/settings", label: "Settings", icon: Settings },
    ],
  },
];

export interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();

  // Store state
  const isAuthenticated = useUserStore(selectIsAuthenticated);
  const user = useUserStore(selectUser);
  const displayName = useUserStore(selectUserDisplayName);

  const level = useGamificationStore(selectLevel);
  const levelProgress = useGamificationStore(selectLevelProgress);

  const sidebarOpen = useUIStore(selectSidebarOpen);
  const toggleSidebar = useUIStore((state) => state.toggleSidebar);

  // Get user initials for avatar fallback
  const initials = React.useMemo(() => {
    if (!displayName || displayName === "Guest") return "?";
    return displayName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  }, [displayName]);

  // Calculate XP progress percentage
  const xpPercentage = React.useMemo(() => {
    if (levelProgress.isMaxLevel) return 100;
    return Math.round((levelProgress.current / levelProgress.required) * 100);
  }, [levelProgress]);

  return (
    <aside
      className={cn(
        "hidden lg:flex flex-col bg-white border-r border-gray-200 transition-all duration-300",
        sidebarOpen ? "w-64" : "w-20",
        className
      )}
    >
      {/* User Profile Summary */}
      {isAuthenticated && user && (
        <div className={cn(
          "p-4 border-b border-gray-200",
          !sidebarOpen && "flex flex-col items-center"
        )}>
          <div className={cn(
            "flex items-center",
            sidebarOpen ? "gap-3" : "justify-center"
          )}>
            <Avatar
              size={sidebarOpen ? "lg" : "default"}
              variant="brand"
            >
              <AvatarImage src={user.avatarUrl} alt={displayName} />
              <AvatarFallback className="bg-brand-teal text-white">
                {initials}
              </AvatarFallback>
            </Avatar>

            {sidebarOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex-1 min-w-0"
              >
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {displayName}
                </p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-xs font-medium text-brand-teal">
                    Level {level}
                  </span>
                  <Zap className="h-3 w-3 text-brand-teal" />
                </div>
              </motion.div>
            )}
          </div>

          {/* XP Progress Bar */}
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-3"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs text-gray-500">XP Progress</span>
                <span className="text-xs font-medium text-gray-700">
                  {levelProgress.current.toLocaleString()} / {levelProgress.required.toLocaleString()}
                </span>
              </div>
              <Progress
                value={xpPercentage}
                variant="fun"
                size="sm"
                className="bg-gray-100"
              />
            </motion.div>
          )}

          {!sidebarOpen && (
            <div className="mt-2 text-center">
              <span className="text-xs font-bold text-brand-teal">Lv.{level}</span>
            </div>
          )}
        </div>
      )}

      {/* Navigation */}
      <ScrollArea className="flex-1">
        <nav className="p-3">
          {navSections.map((section, sectionIndex) => (
            <div key={section.title} className={cn(sectionIndex > 0 && "mt-6")}>
              {sidebarOpen && (
                <h3 className="px-3 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  {section.title}
                </h3>
              )}

              {!sidebarOpen && sectionIndex > 0 && (
                <Separator className="my-3 bg-gray-200" />
              )}

              <ul className="space-y-1">
                {section.items.map((item) => {
                  const isActive = pathname === item.href ||
                    (item.href !== "/dashboard" && pathname?.startsWith(item.href));
                  const Icon = item.icon;

                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                          sidebarOpen ? "justify-start" : "justify-center",
                          isActive
                            ? "bg-brand-teal/10 text-brand-teal"
                            : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        )}
                        title={!sidebarOpen ? item.label : undefined}
                      >
                        <Icon
                          className={cn(
                            "flex-shrink-0 transition-colors",
                            sidebarOpen ? "h-5 w-5" : "h-6 w-6",
                            isActive ? "text-brand-teal" : "text-gray-600"
                          )}
                        />
                        {sidebarOpen && (
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1 }}
                          >
                            {item.label}
                          </motion.span>
                        )}
                        {isActive && sidebarOpen && (
                          <motion.div
                            layoutId="sidebar-active-indicator"
                            className="absolute left-0 w-1 h-6 bg-brand-teal rounded-r-full"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                          />
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </ScrollArea>

      {/* Collapse Toggle */}
      <div className="p-3 border-t border-gray-200">
        <button
          onClick={toggleSidebar}
          className={cn(
            "flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm font-medium",
            "text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors",
            !sidebarOpen && "justify-center"
          )}
          title={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          {sidebarOpen ? (
            <>
              <ChevronLeft className="h-5 w-5" />
              <span>Collapse</span>
            </>
          ) : (
            <ChevronRight className="h-5 w-5" />
          )}
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
