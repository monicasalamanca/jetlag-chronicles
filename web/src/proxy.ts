import type { NextRequest } from "next/server";
import { gateConfig, gateResponse } from "@/lib/password-gate";

// No matcher: until launch the gate covers everything, including /_next assets and public/ files.
export function proxy(request: NextRequest) {
  const config = gateConfig({ SITE_USER: process.env.SITE_USER, SITE_PASSWORD: process.env.SITE_PASSWORD });
  return gateResponse(config, request.headers.get("authorization")) ?? undefined;
}
