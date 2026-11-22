import type { MetadataRoute } from "next";
import { siteName } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteName,
    short_name: "Jet Lag Chronicles",
    start_url: "/",
    display: "browser",
    background_color: "#FBFAF7",
    theme_color: "#FBFAF7",
    icons: [
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/favicon.svg", sizes: "any", type: "image/svg+xml" },
    ],
  };
}
