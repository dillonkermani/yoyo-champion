import { categories } from "@/lib/data/categories";
import CategoryPageClient from "./CategoryPageClient";

export function generateStaticParams() {
  return categories.map((category) => ({
    category: category.slug,
  }));
}

export default function CategoryPage() {
  return <CategoryPageClient />;
}
