import { getStoreYoyos } from "@yoyo/data";
import type { YoyoSpecs } from "@yoyo/data";

type Key = "diameterMm" | "widthMm" | "weightG";

const ROWS: { key: Key; label: string; unit: string; low: string; high: string }[] = [
  { key: "diameterMm", label: "Diameter", unit: "mm", low: "small", high: "large" },
  { key: "widthMm", label: "Width", unit: "mm", low: "narrow", high: "wide" },
  { key: "weightG", label: "Weight", unit: "g", low: "light", high: "heavy" },
];

// Where this yo-yo sits against every other yo-yo in the store, per spec.
// The range comes from the live catalog, so it moves when the lineup does.
export function catalogRange(key: Key): { min: number; max: number } {
  const values = getStoreYoyos()
    .map((y) => y.specs[key])
    .filter((v): v is number => typeof v === "number");
  return { min: Math.min(...values), max: Math.max(...values) };
}

export function SpecRange({ specs, compact }: { specs: YoyoSpecs; compact?: boolean }) {
  const rows = ROWS.filter((r) => typeof specs[r.key] === "number");
  if (rows.length === 0) return null;
  return (
    <ul className={compact ? "space-y-3" : "space-y-5"}>
      {rows.map((r) => {
        const { min, max } = catalogRange(r.key);
        const v = specs[r.key] as number;
        const pct = max === min ? 50 : ((v - min) / (max - min)) * 100;
        return (
          <li key={r.key}>
            <div className="flex items-baseline justify-between text-sm">
              <span className="font-medium text-ink">{r.label}</span>
              <span className="font-semibold text-ink">
                {v} <span className="font-normal text-slate">{r.unit}</span>
              </span>
            </div>
            <div className="relative mt-2 h-2 rounded-full bg-sky">
              <span
                className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-aqua shadow-sm"
                style={{ left: `${pct}%` }}
                aria-hidden
              />
            </div>
            {!compact && (
              <div className="mt-1 flex justify-between text-[11px] text-slate">
                <span>{r.low}, {min} {r.unit}</span>
                <span>{r.high}, {max} {r.unit}</span>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
