"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Header } from "./header";
import { Sidebar } from "./sidebar";
import { MobileNav } from "./mobile-nav";
import { useUIStore, selectSidebarOpen, hydrateUIStore } from "@/stores/ui-store";

export interface AppLayoutProps {
  children: React.ReactNode;
  className?: string;
  showSidebar?: boolean;
  showMobileNav?: boolean;
  showHeader?: boolean;
  fullWidth?: boolean;
}

export function AppLayout({
  children,
  className,
  showSidebar = true,
  showMobileNav = true,
  showHeader = true,
  fullWidth = false,
}: AppLayoutProps) {
  const [isHydrated, setIsHydrated] = React.useState(false);
  const sidebarOpen = useUIStore(selectSidebarOpen);

  // Hydrate store on mount
  React.useEffect(() => {
    hydrateUIStore();
    setIsHydrated(true);
  }, []);

  // Use default sidebar state during SSR/hydration
  const effectiveSidebarOpen = isHydrated ? sidebarOpen : true;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - conditionally visible */}
      {showHeader && <Header />}

      <div className="flex">
        {/* Sidebar - desktop only */}
        {showSidebar && (
          <Sidebar className="fixed top-16 left-0 bottom-0 z-30" />
        )}

        {/* Main content area */}
        <main
          className={cn(
            "flex-1 min-h-[calc(100vh-4rem)]",
            "transition-all duration-300",
            showSidebar && "lg:ml-64",
            showSidebar && !effectiveSidebarOpen && "lg:ml-20",
            showMobileNav && "pb-20 lg:pb-0",
            className
          )}
        >
          {fullWidth ? (
            children
          ) : (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              {children}
            </div>
          )}
        </main>
      </div>

      {/* Mobile bottom navigation */}
      {showMobileNav && <MobileNav />}
    </div>
  );
}

export default AppLayout;
