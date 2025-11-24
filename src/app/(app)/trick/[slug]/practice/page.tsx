import { mockTricks } from "@/lib/data/mock-tricks";
import PracticeModeClient from "./PracticeModeClient";

export function generateStaticParams() {
  return mockTricks.map((trick) => ({
    slug: trick.slug,
  }));
}

export default function PracticeModePage() {
  return <PracticeModeClient />;
}
