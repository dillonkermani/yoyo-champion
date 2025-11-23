"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Header } from "./header";
import { Footer } from "./footer";

export interface MarketingLayoutProps {
  children: React.ReactNode;
  className?: string;
  transparentHeader?: boolean;
  footerVariant?: "default" | "minimal";
}

export function MarketingLayout({
  children,
  className,
  transparentHeader = false,
  footerVariant = "default",
}: MarketingLayoutProps) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header with optional transparent mode */}
      <Header transparent={transparentHeader} />

      {/* Main content area */}
      <main className={cn("flex-1", className)}>
        {children}
      </main>

      {/* Footer */}
      <Footer variant={footerVariant} />
    </div>
  );
}

export default MarketingLayout;
