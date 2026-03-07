import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Search, Frown } from "lucide-react";

export default function TrickNotFound() {
  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* Illustration */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-surface-secondary mb-4">
            <Frown className="w-12 h-12 text-muted-foreground" />
          </div>
        </div>

        {/* Content */}
        <h1 className="text-3xl font-bold text-brand-black mb-3">
          Trick Not Found
        </h1>
        <p className="text-muted-foreground mb-8">
          Oops! We couldn&apos;t find the trick you&apos;re looking for. It might have been
          removed or the URL might be incorrect.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/library">
            <Button variant="default" className="w-full sm:w-auto">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Library
            </Button>
          </Link>
          <Link href="/library">
            <Button variant="outline" className="w-full sm:w-auto">
              <Search className="w-4 h-4 mr-2" />
              Browse Tricks
            </Button>
          </Link>
        </div>

        {/* Helpful Tips */}
        <div className="mt-12 p-6 rounded-xl bg-surface-secondary text-left">
          <h3 className="font-semibold text-brand-black mb-3">
            Looking for something specific?
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-fun-blue">1.</span>
              Check the trick name spelling in the URL
            </li>
            <li className="flex items-start gap-2">
              <span className="text-fun-blue">2.</span>
              Use the search feature in the Trick Library
            </li>
            <li className="flex items-start gap-2">
              <span className="text-fun-blue">3.</span>
              Browse tricks by difficulty or style
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
