import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: "Ăn gì hôm nay — 300 công thức chọn lọc",
  description:
    "Khám phá 300 công thức không trùng lặp, ưu tiên 210 món Việt Nam, 50 món cơm quán, thực đơn tuần và bộ công cụ khởi nghiệp.",
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
