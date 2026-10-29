import type { Metadata } from "next";
import { StoreHeader, StoreFooter } from "@/components/store/store-header";

export const metadata: Metadata = {
  title: {
    default: "YoYoChampion Store",
    template: "%s | YoYoChampion",
  },
  description: "Gentry Stein's signature yo-yos, with real specs on every card and a finder that tells you why.",
};

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-ink">
      <StoreHeader />
      <main>{children}</main>
      <StoreFooter />
    </div>
  );
}
