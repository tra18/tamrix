import type { Metadata, Viewport } from "next";
import "./globals.css";
import { siteIcons } from "@/lib/site-icons";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.APP_URL?.trim() || "https://www.tmrix.com"),
  applicationName: "Tamrix",
  icons: siteIcons,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050A0F",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
