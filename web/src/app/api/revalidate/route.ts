import { revalidateTag } from "next/cache";
import { hasBearer } from "@/lib/secret";
import { tagsForWebhook } from "@/lib/strapi/tags";

/**
 * Strapi webhook target (issue 11): publish/unpublish/update/delete in the CMS → refresh the affected pages.
 * Strapi sends `Authorization: Bearer <REVALIDATE_SECRET>`. Not behind the preview password gate (src/proxy.ts),
 * because the secret protects it.
 */
export async function POST(request: Request): Promise<Response> {
  if (!hasBearer(request.headers.get("authorization"), process.env.REVALIDATE_SECRET)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Expected a JSON body" }, { status: 400 });
  }
  const tags = tagsForWebhook((payload ?? {}) as Record<string, unknown>);
  if (!tags) return Response.json({ revalidated: [] });
  // "max" = stale-while-revalidate: the next visit gets the previous page while the fresh one builds (a second
  // or two), then everyone gets the new one. The previous page is never thrown away first, so if Strapi is down
  // the site keeps serving it (plan §8). Don't switch to { expire: 0 }: that turns a Strapi outage into 500s.
  for (const tag of tags) revalidateTag(tag, "max");
  return Response.json({ revalidated: tags });
}
