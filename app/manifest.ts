import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ăn gì hôm nay",
    short_name: "Ăn gì",
    description:
      "300 công thức chọn lọc, thực đơn 7 ngày và danh sách đi chợ tự động.",
    start_url: "/",
    display: "standalone",
    background_color: "#f7f0e4",
    theme_color: "#173f35",
    lang: "vi",
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
