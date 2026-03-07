"use client";

import * as React from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  React.useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* Error Icon */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 mb-4">
            <AlertTriangle className="w-10 h-10 text-red-600" />
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-brand-navy mb-2">
            Something Went Wrong
          </h1>
          <p className="text-muted-foreground mb-4">
            We hit a snag while loading this page. Don&apos;t worry, even the best
            yo-yo players drop the string sometimes.
          </p>
          {error.digest && (
            <p className="text-xs text-muted-foreground font-mono bg-gray-100 px-3 py-1 rounded inline-block">
              Error ID: {error.digest}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-brand-blue text-white font-medium hover:bg-brand-blue/90 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-gray-200 bg-white text-brand-navy font-medium hover:bg-gray-50 transition-colors"
          >
            <Home className="w-4 h-4" />
            Return Home
          </Link>
        </div>

        {/* Help Text */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-muted-foreground">
            If this problem persists, please{" "}
            <a
              href="mailto:support@yoyochampion.com"
              className="text-brand-blue hover:underline"
            >
              contact support
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
