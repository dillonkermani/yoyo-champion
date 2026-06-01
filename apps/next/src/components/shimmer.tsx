import * as React from "react";

type ShimmerProps = React.HTMLAttributes<HTMLDivElement> & {
  rounded?: string;
};

// A shimmering skeleton block. Uses the project's `shimmer` keyframe
// (animates backgroundPosition) combined with a translucent gradient
// laid over a neutral base color.
export function Shimmer({ className = "", rounded = "rounded-xl", style, ...rest }: ShimmerProps) {
  return (
    <div
      aria-hidden
      className={`bg-gray-200/70 bg-shimmer-gradient bg-[length:200%_100%] animate-shimmer ${rounded} ${className}`}
      style={style}
      {...rest}
    />
  );
}

export function ShimmerCircle({ className = "", size = 40, style, ...rest }: ShimmerProps & { size?: number }) {
  return (
    <Shimmer
      rounded="rounded-full"
      className={className}
      style={{ width: size, height: size, ...style }}
      {...rest}
    />
  );
}

export function ShimmerLine({ className = "", width = "100%", height = 12 }: { className?: string; width?: string | number; height?: number }) {
  return (
    <Shimmer rounded="rounded-md" className={className} style={{ width, height }} />
  );
}
