import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: "Ăn gì hôm nay — 300 công thức chọn lọc",
  description:
    "Khám phá 300 công thức chọn lọc, lập thực đơn 7 ngày, tự động tạo danh sách đi chợ và sử dụng bộ công cụ khởi nghiệp quán cơm.",
  applicationName: "Ăn gì hôm nay",
  manifest: "/manifest.webmanifest",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#173f35",
  colorScheme: "light",
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
