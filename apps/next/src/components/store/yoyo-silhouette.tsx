// A side-profile silhouette drawn to scale from the real diameter and width,
// so a 42 mm Shutter Mini visibly sits inside a 56 mm G Force. Same scale on
// every card and in compare, which is the whole point.

export const SILHOUETTE_SCALE = 2; // px per mm

interface Props {
  diameterMm: number;
  widthMm: number;
  scale?: number;
  className?: string;
  tone?: "aqua" | "ink" | "muted";
  title?: string;
}

const TONES = {
  aqua: { fill: "#DDF3FD", stroke: "#1CB0F6" },
  ink: { fill: "#E6EEF5", stroke: "#0B1F33" },
  muted: { fill: "#F1F5F8", stroke: "#9DB0C0" },
};

export function YoyoSilhouette({ diameterMm, widthMm, scale = SILHOUETTE_SCALE, className, tone = "aqua", title }: Props) {
  const h = diameterMm * scale;
  const gap = 1.5 * scale;
  const half = (widthMm * scale - gap) / 2;
  const rim = Math.max(3, half * 0.22);
  const c = Math.min(4, rim / 2);
  const t = TONES[tone];

  // Left half: rounded rim on the outside, face sweeping in toward the hub.
  const d = [
    `M 0 ${c}`,
    `Q 0 0 ${c} 0`,
    `L ${rim} 0`,
    `C ${rim + (half - rim) * 0.55} ${h * 0.07}, ${half - 1} ${h * 0.3}, ${half} ${h * 0.34}`,
    `L ${half} ${h * 0.66}`,
    `C ${half - 1} ${h * 0.7}, ${rim + (half - rim) * 0.55} ${h * 0.93}, ${rim} ${h}`,
    `L ${c} ${h}`,
    `Q 0 ${h} 0 ${h - c}`,
    "Z",
  ].join(" ");

  const w = half * 2 + gap;
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      width={w}
      height={h}
      className={className}
      role="img"
      aria-label={title ?? `${diameterMm} mm diameter, ${widthMm} mm wide`}
    >
      <path d={d} fill={t.fill} stroke={t.stroke} strokeWidth={1.25} strokeLinejoin="round" />
      <path
        d={d}
        fill={t.fill}
        stroke={t.stroke}
        strokeWidth={1.25}
        strokeLinejoin="round"
        transform={`translate(${w} 0) scale(-1 1)`}
      />
      <rect x={half} y={h * 0.47} width={gap} height={h * 0.06} fill={t.stroke} opacity={0.6} />
    </svg>
  );
}
