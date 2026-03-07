import { MarketingLayout } from "@/components/layout";

export default function MarketingRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MarketingLayout transparentHeader={false} footerVariant="default">
      {children}
    </MarketingLayout>
  );
}
