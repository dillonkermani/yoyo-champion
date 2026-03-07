import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* Logo/Brand */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-brand-blue/10 mb-4">
            <svg
              className="w-12 h-12 text-brand-blue"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="4" />
              <line x1="12" y1="2" x2="12" y2="6" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-brand-navy">YoYo Champion</h1>
        </div>

        {/* 404 Message */}
        <div className="mb-8">
          <p className="text-8xl font-bold text-brand-blue mb-4">404</p>
          <h2 className="text-2xl font-semibold text-brand-navy mb-2">
            Page Not Found
          </h2>
          <p className="text-muted-foreground">
            Oops! The trick you&apos;re looking for seems to have slipped off the
            string. Let&apos;s get you back on track.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-brand-blue text-white font-medium hover:bg-brand-blue/90 transition-colors"
          >
            Return Home
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-gray-200 bg-white text-brand-navy font-medium hover:bg-gray-50 transition-colors"
          >
            Go to Dashboard
          </Link>
        </div>

        {/* Helpful Links */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-muted-foreground mb-4">
            Looking for something specific?
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link
              href="/library"
              className="text-brand-blue hover:underline"
            >
              Trick Library
            </Link>
            <Link
              href="/paths"
              className="text-brand-blue hover:underline"
            >
              Learning Paths
            </Link>
            <Link
              href="/about"
              className="text-brand-blue hover:underline"
            >
              About Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
