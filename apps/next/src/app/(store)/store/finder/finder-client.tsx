"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { recommend, storeProducts, PLAYER_LEVELS, hasDimensions } from "@yoyo/data";
import type { FinderAnswers, PlayFocus, Budget, SizeFeel } from "@yoyo/data";
import { Price } from "@/components/store/price";
import { YoyoSilhouette } from "@/components/store/yoyo-silhouette";
import { shopifyImage } from "@yoyo/data";

type Step = "level" | "focus" | "budget" | "size";
const STEPS: Step[] = ["level", "focus", "budget", "size"];

const FOCUS_OPTIONS: { id: PlayFocus; label: string; blurb: string }[] = [
  { id: "basics", label: "The basics", blurb: "Throw, sleeper, around the world." },
  { id: "dna", label: "The DNA", blurb: "Fingerspins and the viral trick." },
  { id: "string-tricks", label: "String tricks", blurb: "Trapeze, mounts, combos." },
  { id: "speed", label: "Speed combos", blurb: "Fast, Godspeed-style play." },
  { id: "horizontal", label: "Horizontal", blurb: "Sideways, contest-style." },
  { id: "training", label: "Sharper accuracy", blurb: "A tool that makes you better." },
];

const BUDGET_OPTIONS: { id: Budget; label: string }[] = [
  { id: "under-30", label: "Under $30" },
  { id: "under-70", label: "Under $70" },
  { id: "under-130", label: "Under $130" },
  { id: "any", label: "No limit" },
];

const SIZE_OPTIONS: { id: SizeFeel; label: string; blurb: string }[] = [
  { id: "compact", label: "Compact", blurb: "Under 46 mm wide. Quick and precise." },
  { id: "standard", label: "Standard", blurb: "46 to 52 mm. The classic feel." },
  { id: "wide", label: "Wide", blurb: "Over 52 mm. Easier string hits." },
  { id: "no-preference", label: "No preference", blurb: "Let the other answers decide." },
];

const QUESTION: Record<Step, string> = {
  level: "How much have you thrown?",
  focus: "What do you want to land next?",
  budget: "What do you want to spend?",
  size: "How should it feel in the hand?",
};

export function FinderClient() {
  const [answers, setAnswers] = React.useState<Partial<FinderAnswers>>({});
  const stepIndex = STEPS.findIndex((s) => answers[s] === undefined);
  const done = stepIndex === -1;
  const step = done ? null : STEPS[stepIndex]!;

  const results = done ? recommend(answers as FinderAnswers, storeProducts) : [];

  const set = <K extends keyof FinderAnswers>(key: K, value: FinderAnswers[K]) => setAnswers((a) => ({ ...a, [key]: value }));
  const back = () => {
    const last = done ? STEPS[STEPS.length - 1]! : STEPS[stepIndex - 1];
    if (!last) return;
    setAnswers((a) => {
      const next = { ...a };
      delete next[last];
      return next;
    });
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-16">
      <p className="text-sm font-medium text-aqua-deep">Find my yo-yo</p>
      {!done ? (
        <>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-ink sm:text-5xl">{QUESTION[step!]}</h1>
          <p className="mt-2 text-slate">
            Question {stepIndex + 1} of {STEPS.length}. Every answer only uses what each yo-yo&apos;s own page says.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {step === "level" &&
              PLAYER_LEVELS.map((o) => <Option key={o.id} label={o.label} blurb={o.blurb} onClick={() => set("level", o.id)} />)}
            {step === "focus" &&
              FOCUS_OPTIONS.map((o) => <Option key={o.id} label={o.label} blurb={o.blurb} onClick={() => set("focus", o.id)} />)}
            {step === "budget" && BUDGET_OPTIONS.map((o) => <Option key={o.id} label={o.label} onClick={() => set("budget", o.id)} />)}
            {step === "size" &&
              SIZE_OPTIONS.map((o) => <Option key={o.id} label={o.label} blurb={o.blurb} onClick={() => set("size", o.id)} />)}
          </div>
          {stepIndex > 0 && (
            <button type="button" onClick={back} className="mt-6 text-sm font-semibold text-slate hover:text-ink">
              Back
            </button>
          )}
        </>
      ) : (
        <>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            {results.length > 0 ? "Your match." : "Nothing fits those answers yet."}
          </h1>
          <p className="mt-2 text-slate">
            {results.length > 0
              ? "Ranked by how well each one fits what you told us, with the reasons spelled out."
              : "Try a bigger budget or a different feel. We only recommend what is in stock."}
          </p>

          <ol className="mt-8 space-y-4">
            {results.map((r, i) => (
              <li key={r.product.handle} className={`rounded-3xl border p-5 ${i === 0 ? "border-aqua bg-sky/50" : "border-line"}`}>
                <div className="flex gap-5">
                  <Link href={`/store/products/${r.product.handle}`} className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl bg-white">
                    {r.product.images[0] && <Image src={shopifyImage(r.product.images[0], 224)} alt="" fill sizes="112px" className="object-contain p-2" />}
                  </Link>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h2 className="text-xl font-bold text-ink">
                        {i === 0 && <span className="mr-2 rounded-full bg-aqua px-2 py-0.5 text-xs font-semibold text-white align-middle">Best fit</span>}
                        {r.product.title}
                      </h2>
                      <Price price={r.product.priceFrom} compareAt={r.product.compareAtFrom} />
                    </div>
                    <ul className="mt-2 space-y-1 text-sm text-slate">
                      {r.reasons.map((reason) => (
                        <li key={reason} className="flex gap-2">
                          <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-aqua" aria-hidden />
                          {reason}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-3 flex flex-wrap items-center gap-4">
                      <Link href={`/store/products/${r.product.handle}`} className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white hover:bg-aqua-deep">
                        See the {r.product.title.replace(/ Yoyo$/i, "")}
                      </Link>
                      {hasDimensions(r.product.specs) && (
                        <YoyoSilhouette diameterMm={r.product.specs.diameterMm} widthMm={r.product.specs.widthMm} scale={0.8} />
                      )}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-8 flex gap-4 text-sm font-semibold">
            <button type="button" onClick={back} className="text-slate hover:text-ink">Change last answer</button>
            <button type="button" onClick={() => setAnswers({})} className="text-aqua-deep hover:underline">Start over</button>
          </div>
        </>
      )}
    </div>
  );
}

function Option({ label, blurb, onClick }: { label: string; blurb?: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-2xl border border-line px-5 py-4 text-left transition-colors hover:border-aqua hover:bg-sky focus:outline-none focus-visible:ring-2 focus-visible:ring-aqua"
    >
      <span className="block text-lg font-semibold text-ink">{label}</span>
      {blurb && <span className="mt-0.5 block text-sm text-slate">{blurb}</span>}
    </button>
  );
}
