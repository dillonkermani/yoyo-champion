import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: {
    default: "Trick Ladder · Sac Yoyo Club",
    template: "%s | YoYoChampion",
  },
  description: "Land 5 tricks in front of a club admin and keep the yo-yo.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function LearnLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[100dvh] bg-white text-ink">
      <main className="mx-auto flex min-h-[100dvh] max-w-md flex-col px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-[max(1rem,env(safe-area-inset-top))]">
        {children}
      </main>
    </div>
  );
}
