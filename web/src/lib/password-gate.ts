/**
 * Pre-launch password gate (HTTP Basic auth), applied to every request by src/proxy.ts.
 * On when SITE_USER and SITE_PASSWORD are both set (in Vercel only); removed at launch (issue 18).
 * Unset means off, so local dev and tests are unaffected.
 */

export type GateConfig =
  | { kind: "off" }
  | { kind: "on"; user: string; password: string }
  /** Only one of the two is set: refuse every request rather than silently leave the site open. */
  | { kind: "misconfigured" };

export function gateConfig(env: { SITE_USER?: string; SITE_PASSWORD?: string }): GateConfig {
  const user = env.SITE_USER ?? "";
  const password = env.SITE_PASSWORD ?? "";
  if (!user && !password) return { kind: "off" };
  if (!user || !password) return { kind: "misconfigured" };
  return { kind: "on", user, password };
}

/** Constant-time string comparison, so response timing doesn't leak how much of a guess was right. */
function safeEqual(a: string, b: string): boolean {
  const left = new TextEncoder().encode(a);
  const right = new TextEncoder().encode(b);
  let diff = left.length ^ right.length;
  for (let i = 0; i < Math.max(left.length, right.length); i++) {
    diff |= (left[i] ?? 0) ^ (right[i] ?? 0);
  }
  return diff === 0;
}

/** True when the Authorization header carries the configured Basic credentials. */
export function isAuthorized(header: string | null, user: string, password: string): boolean {
  const match = header?.match(/^Basic\s+(\S+)$/i);
  if (!match) return false;
  let decoded: string;
  try {
    decoded = new TextDecoder().decode(Uint8Array.from(atob(match[1]), (c) => c.charCodeAt(0)));
  } catch {
    return false;
  }
  const colon = decoded.indexOf(":");
  if (colon === -1) return false;
  // Evaluate both so a wrong username takes as long as a wrong password.
  const userOk = safeEqual(decoded.slice(0, colon), user);
  const passwordOk = safeEqual(decoded.slice(colon + 1), password);
  return userOk && passwordOk;
}

/** The response for a request, or null to let it through. */
export function gateResponse(config: GateConfig, authorization: string | null): Response | null {
  if (config.kind === "off") return null;
  if (config.kind === "misconfigured") {
    console.error("Password gate: set both SITE_USER and SITE_PASSWORD, or neither.");
    return new Response("Site temporarily unavailable.", { status: 503 });
  }
  if (isAuthorized(authorization, config.user, config.password)) return null;
  return new Response("Authentication required.", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="The Jet Lag Chronicles (pre-launch)", charset="UTF-8"' },
  });
}
