/**
 * Cache tags for Strapi data (issue 11). Every Strapi fetch carries ALL_TAG plus the tag of each content type
 * it reads; the publish webhook refreshes the tag for whatever changed.
 */
export const ALL_TAG = "strapi";

/** Tag for a Strapi content type (the webhook's `model`, e.g. "post" → "posts"). */
const MODEL_TAGS: Record<string, string> = {
  post: "posts",
  country: "countries",
  author: "authors",
};

export function modelTag(model: string): string {
  return MODEL_TAGS[model] ?? `strapi:${model}`;
}

type WebhookPayload = { event?: unknown; model?: unknown };

/**
 * Which tags to refresh for a Strapi webhook payload, or null when it isn't one we act on.
 * - entry.* on a known or unknown model → that model's tag (single types added later need no code change
 *   if their fetch uses modelTag(<model>)).
 * - media.* (e.g. a photo's alt text changed) → everything, since any page may show that photo.
 */
export function tagsForWebhook(payload: WebhookPayload): string[] | null {
  const event = typeof payload.event === "string" ? payload.event : "";
  if (event.startsWith("media.")) return [ALL_TAG];
  if (!event.startsWith("entry.")) return null;
  if (typeof payload.model !== "string" || !payload.model) return [ALL_TAG];
  return [modelTag(payload.model)];
}
