import { mockPaths } from "@/lib/data";
import ModuleDetailClient from "./ModuleDetailClient";

export function generateStaticParams() {
  const params: { slug: string; moduleId: string }[] = [];
  mockPaths.forEach((path) => {
    path.modules.forEach((mod) => {
      params.push({ slug: path.slug, moduleId: mod.id });
    });
  });
  return params;
}

export default function ModuleDetailPage() {
  return <ModuleDetailClient />;
}
