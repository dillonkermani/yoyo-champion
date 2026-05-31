"use client";
import * as React from "react";

interface TabDef {
  path: string;
  label: string;
  emoji: string;
  activeColor: string;
  bgColor: string;
}

const TABS: TabDef[] = [
  { path: "/dashboard", label: "Home", emoji: "🏠", activeColor: "#9bedff", bgColor: "rgba(155,237,255,0.15)" },
  { path: "/library", label: "Learn", emoji: "📖", activeColor: "#CE82FF", bgColor: "rgba(206,130,255,0.10)" },
  { path: "/shop", label: "Shop", emoji: "🛍️", activeColor: "#9bedff", bgColor: "rgba(155,237,255,0.15)" },
  { path: "/profile", label: "Profile", emoji: "👤", activeColor: "#FF86D0", bgColor: "rgba(255,134,208,0.10)" },
  { path: "/for-you", label: "For You", emoji: "▶️", activeColor: "#FFC800", bgColor: "rgba(255,200,0,0.10)" },
];

function isActiveTab(tabPath: string, pathname: string | null): boolean {
  if (!pathname) return false;
  if (tabPath === "/dashboard") {
    return pathname === "/" || pathname === "/dashboard" || pathname.startsWith("/dashboard");
  }
  return pathname.startsWith(tabPath);
}

export interface WebTabBarProps {
  pathname: string | null;
  onNavigate: (path: string) => void;
}

export function WebTabBar({ pathname, onNavigate }: WebTabBarProps) {
  return (
    <nav
      aria-label="Primary"
      className="relative w-full bg-white/95 backdrop-blur-md border-t border-black/5 rounded-t-3xl shadow-[0_-2px_8px_rgba(0,0,0,0.06)]"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 8px)" }}
    >
      <ul className="flex flex-row items-stretch h-[60px] px-1">
        {TABS.map((tab) => {
          const active = isActiveTab(tab.path, pathname);
          return (
            <li key={tab.path} className="flex-1 min-w-[56px] relative">
              <button
                type="button"
                onClick={() => onNavigate(tab.path)}
                className="group flex flex-col items-center justify-center h-full w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-fun-blue rounded-2xl"
              >
                {active && (
                  <>
                    <span
                      aria-hidden
                      className="absolute top-0 left-1/2 -translate-x-1/2 h-1 w-8 rounded-b-md transition-colors"
                      style={{ backgroundColor: tab.activeColor }}
                    />
                    <span
                      aria-hidden
                      className="absolute inset-y-2 inset-x-2 rounded-2xl -z-0"
                      style={{ backgroundColor: tab.bgColor }}
                    />
                  </>
                )}
                <span
                  className={`relative z-10 text-[20px] leading-none transition-transform ${active ? "scale-110" : "scale-100"}`}
                  aria-hidden
                >
                  {tab.emoji}
                </span>
                <span
                  className={`relative z-10 mt-1 text-[10px] leading-none tracking-wide ${active ? "font-bold text-black" : "font-semibold text-[#8899A6]"}`}
                >
                  {tab.label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
