import { TRICK_LADDER } from "@yoyo/data";
import LearnPlayer from "../player";

// One static page per trick (plus /learn/done) so a refresh stays on the player's step.
export const dynamicParams = false;

export function generateStaticParams() {
  return [...TRICK_LADDER.map((r) => ({ step: r.slug })), { step: "done" }];
}

export default async function LearnStepPage({ params }: { params: Promise<{ step: string }> }) {
  const { step } = await params;
  return <LearnPlayer step={step} />;
}
