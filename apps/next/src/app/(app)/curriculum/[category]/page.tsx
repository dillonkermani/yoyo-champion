import { categories } from "@yoyo/data";
import CategoryPageClient from "./CategoryPageClient";

export function generateStaticParams() {
  return categories.map((category) => ({
    category: category.slug,
  }));
}

export default function CategoryPage() {
  return <CategoryPageClient />;
}
