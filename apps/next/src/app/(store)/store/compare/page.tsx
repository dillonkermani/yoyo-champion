import type { Metadata } from "next";
import { CompareClient } from "./compare-client";

export const metadata: Metadata = { title: "Compare yo-yos" };

export default function ComparePage() {
  return <CompareClient />;
}
