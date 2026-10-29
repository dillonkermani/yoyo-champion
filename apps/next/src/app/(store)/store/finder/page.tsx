import type { Metadata } from "next";
import { FinderClient } from "./finder-client";

export const metadata: Metadata = { title: "Find my yo-yo" };

export default function FinderPage() {
  return <FinderClient />;
}
