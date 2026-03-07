import { mockTricks } from "@yoyo/data";
import TrickDetailClient from "./TrickDetailClient";

export function generateStaticParams() {
  return mockTricks.map((trick) => ({
    slug: trick.slug,
  }));
}

export default function TrickDetailPage() {
  return <TrickDetailClient />;
}
