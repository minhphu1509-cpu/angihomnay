import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CMS công thức — Ăn gì hôm nay",
  description:
    "Studio biên tập 300 công thức, trạng thái kiểm chứng và thư viện ảnh món ăn.",
};

export default function EditorialLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
