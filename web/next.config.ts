import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Photos are resized by Cloudinary, not Vercel image optimization (plan §8: Hobby limits + Cloudflare portability).
  images: {
    loader: "custom",
    loaderFile: "./src/lib/cloudinary-loader.ts",
  },
  // The share images read these fonts at runtime too (when a story is refreshed), so ship them with that route.
  outputFileTracingIncludes: {
    "/[place]/[slug]/opengraph-image": ["./src/fonts/og/*.ttf"],
  },
  trailingSlash: false,
  poweredByHeader: false,
};

export default nextConfig;
