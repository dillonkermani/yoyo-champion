export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        {/* Animated Logo */}
        <div className="relative">
          {/* Outer spinning ring */}
          <div className="w-20 h-20 rounded-full border-4 border-gray-200 border-t-brand-blue animate-spin" />

          {/* Inner yo-yo icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-brand-blue flex items-center justify-center animate-pulse">
              <div className="w-4 h-4 rounded-full bg-white" />
            </div>
          </div>

          {/* String effect */}
          <div className="absolute -bottom-8 left-1/2 w-0.5 h-8 bg-gradient-to-b from-brand-blue/50 to-transparent transform -translate-x-1/2" />
        </div>

        {/* Loading Text */}
        <div className="text-center mt-4">
          <h2 className="text-lg font-semibold text-brand-navy mb-1">
            YoYo Champion
          </h2>
          <p className="text-sm text-muted-foreground animate-pulse">
            Loading...
          </p>
        </div>

        {/* Loading dots animation */}
        <div className="flex gap-1.5">
          <div
            className="w-2 h-2 rounded-full bg-brand-blue animate-bounce"
            style={{ animationDelay: "0ms" }}
          />
          <div
            className="w-2 h-2 rounded-full bg-brand-blue animate-bounce"
            style={{ animationDelay: "150ms" }}
          />
          <div
            className="w-2 h-2 rounded-full bg-brand-blue animate-bounce"
            style={{ animationDelay: "300ms" }}
          />
        </div>
      </div>
    </div>
  );
}
