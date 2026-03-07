import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trick Library | YoYoChampion",
  description: "Browse and learn hundreds of yo-yo tricks from beginner to master level",
};

export default function LibraryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
