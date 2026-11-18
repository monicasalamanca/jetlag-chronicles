import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Photos are resized by Cloudinary, not Vercel image optimization (plan §8: Hobby limits + Cloudflare portability).
  images: {
    loader: "custom",
    loaderFile: "./src/lib/cloudinary-loader.ts",
  },
  trailingSlash: false,
  poweredByHeader: false,
};

export default nextConfig;
