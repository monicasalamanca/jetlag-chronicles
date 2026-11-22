import type { NextRequest } from "next/server";
import { gateConfig, gateResponse } from "@/lib/password-gate";

/** Paths with their own protection that Strapi must reach before launch (the publish webhook). */
export const GATE_EXEMPT = new Set(["/api/revalidate"]);

// No matcher: until launch the gate covers everything, including /_next assets and public/ files.
export function proxy(request: NextRequest) {
  if (GATE_EXEMPT.has(request.nextUrl.pathname)) return undefined;
  const config = gateConfig({ SITE_USER: process.env.SITE_USER, SITE_PASSWORD: process.env.SITE_PASSWORD });
  return gateResponse(config, request.headers.get("authorization")) ?? undefined;
}
