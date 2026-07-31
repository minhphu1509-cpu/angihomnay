import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: "Ăn gì hôm nay — 1.050 công thức Việt Nam & thế giới",
  description:
    "Khám phá 1.050 công thức Việt Nam và thế giới, 50 món cơm quán, thực đơn gia đình theo tuần và bộ công cụ khởi nghiệp quán cơm.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${geistSans.variable} antialiased`}>{children}</body>
    </html>
  );
}
