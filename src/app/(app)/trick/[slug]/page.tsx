import { mockTricks } from "@/lib/data/mock-tricks";
import TrickDetailClient from "./TrickDetailClient";

export function generateStaticParams() {
  return mockTricks.map((trick) => ({
    slug: trick.slug,
  }));
}

export default function TrickDetailPage() {
  return <TrickDetailClient />;
}
