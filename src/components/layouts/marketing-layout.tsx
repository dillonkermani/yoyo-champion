"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface MarketingLayoutProps {
  children: React.ReactNode;
  className?: string;
  transparentHeader?: boolean;
}

// Simple marketing header
function MarketingHeader({ transparent }: { transparent?: boolean }) {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        transparent && !scrolled
          ? "bg-transparent"
          : "bg-white/95 backdrop-blur-sm border-b border-gray-200"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-brand-blue flex items-center justify-center">
              <svg
                className="w-5 h-5 text-brand-black"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="4" />
              </svg>
            </div>
            <span className="font-bold text-xl text-brand-black">
              YoYo Champion
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/about"
              className="text-sm font-medium text-gray-600 hover:text-brand-black transition-colors"
            >
              About
            </Link>
            <Link
              href="/library"
              className="text-sm font-medium text-gray-600 hover:text-brand-black transition-colors"
            >
              Tricks
            </Link>
            <Link
              href="/paths"
              className="text-sm font-medium text-gray-600 hover:text-brand-black transition-colors"
            >
              Learning Paths
            </Link>
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="text-sm font-medium text-gray-600 hover:text-brand-black transition-colors hidden sm:block"
            >
              Log In
            </Link>
            <Link
              href="/onboarding"
              className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-brand-blue text-brand-black text-sm font-medium hover:bg-brand-blue/90 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

// Simple marketing footer
function MarketingFooter() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-brand-blue flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-brand-black"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="4" />
                </svg>
              </div>
              <span className="font-bold text-brand-black">YoYo Champion</span>
            </Link>
            <p className="text-sm text-gray-600">
              Master the art of yo-yo with guided video tutorials.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-brand-black mb-3">Learn</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/library"
                  className="text-sm text-gray-600 hover:text-brand-black"
                >
                  Trick Library
                </Link>
              </li>
              <li>
                <Link
                  href="/paths"
                  className="text-sm text-gray-600 hover:text-brand-black"
                >
                  Learning Paths
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-brand-black mb-3">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-gray-600 hover:text-brand-black"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-gray-600 hover:text-brand-black"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-brand-black mb-3">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-gray-600 hover:text-brand-black"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-gray-600 hover:text-brand-black"
                >
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-600">
          &copy; {new Date().getFullYear()} YoYo Champion. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export function MarketingLayout({
  children,
  className,
  transparentHeader = false,
}: MarketingLayoutProps) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <MarketingHeader transparent={transparentHeader} />
      <main className={cn("flex-1 pt-16", className)}>{children}</main>
      <MarketingFooter />
    </div>
  );
}

export default MarketingLayout;
