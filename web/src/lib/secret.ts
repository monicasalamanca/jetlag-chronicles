/** Constant-time string comparison, so response timing doesn't leak how much of a guess was right. */
export function safeEqual(a: string, b: string): boolean {
  const left = new TextEncoder().encode(a);
  const right = new TextEncoder().encode(b);
  let diff = left.length ^ right.length;
  for (let i = 0; i < Math.max(left.length, right.length); i++) {
    diff |= (left[i] ?? 0) ^ (right[i] ?? 0);
  }
  return diff === 0;
}

/** True when the request carries `Authorization: Bearer <secret>` and a secret is configured. */
export function hasBearer(header: string | null, secret: string | undefined): boolean {
  if (!secret) return false;
  const match = header?.match(/^Bearer\s+(\S+)$/i);
  return Boolean(match && safeEqual(match[1], secret));
}
