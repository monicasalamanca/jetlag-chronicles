import type { MetadataRoute } from "next";
import { siteLive, siteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  if (!siteLive) return { rules: { userAgent: "*", disallow: "/" } };
  return { rules: { userAgent: "*", allow: "/" }, sitemap: `${siteUrl}/sitemap.xml` };
}
