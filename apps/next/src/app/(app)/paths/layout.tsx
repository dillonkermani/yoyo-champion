import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Learning Paths | YoYoChampion",
  description: "Structured learning paths to master yo-yo tricks from beginner to world champion level",
};

export default function PathsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
