import { mockPaths } from "@/lib/data";
import PathDetailClient from "./PathDetailClient";

export function generateStaticParams() {
  return mockPaths.map((path) => ({
    slug: path.slug,
  }));
}

export default function PathDetailPage() {
  return <PathDetailClient />;
}
