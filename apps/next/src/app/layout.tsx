import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "@/styles/globals.css";
import { Providers } from "@/components/providers";

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "YoYo Champion - Master the Art of Yo-Yo",
    template: "%s | YoYo Champion",
  },
  description:
    "Learn yo-yo tricks from beginner to expert with interactive video tutorials, progress tracking, and gamified learning paths.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  keywords: [
    "yo-yo",
    "yoyo",
    "tricks",
    "tutorials",
    "learn yo-yo",
    "string tricks",
    "1A",
    "2A",
    "5A",
  ],
  authors: [{ name: "YoYo Champion" }],
  creator: "YoYo Champion",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "YoYo Champion",
    title: "YoYo Champion - Master the Art of Yo-Yo",
    description:
      "Learn yo-yo tricks from beginner to expert with interactive video tutorials, progress tracking, and gamified learning paths.",
  },
  twitter: {
    card: "summary_large_image",
    title: "YoYo Champion - Master the Art of Yo-Yo",
    description:
      "Learn yo-yo tricks from beginner to expert with interactive video tutorials, progress tracking, and gamified learning paths.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${jost.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
