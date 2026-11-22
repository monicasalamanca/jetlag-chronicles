import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next/cache", () => ({ revalidateTag: vi.fn() }));

import { revalidateTag } from "next/cache";
import { POST } from "@/app/api/revalidate/route";
import { hasBearer } from "@/lib/secret";
import { tagsForWebhook } from "@/lib/strapi/tags";

const SECRET = "test-secret-123";

function webhook(body: unknown, auth: string | null = `Bearer ${SECRET}`) {
  return new Request("http://localhost/api/revalidate", {
    method: "POST",
    headers: { "content-type": "application/json", ...(auth ? { authorization: auth } : {}) },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

describe("which pages a Strapi change refreshes", () => {
  it("refreshes stories when a post is published, unpublished, updated or deleted", () => {
    for (const event of ["entry.publish", "entry.unpublish", "entry.update", "entry.delete"]) {
      expect(tagsForWebhook({ event, model: "post" })).toEqual(["posts"]);
    }
  });

  it("refreshes country data when a country changes", () => {
    expect(tagsForWebhook({ event: "entry.publish", model: "country" })).toEqual(["countries"]);
  });

  it("gives future content types their own tag with no code change", () => {
    expect(tagsForWebhook({ event: "entry.publish", model: "about" })).toEqual(["strapi:about"]);
  });

  it("refreshes everything when a photo changes, or the model is missing", () => {
    expect(tagsForWebhook({ event: "media.update" })).toEqual(["strapi"]);
    expect(tagsForWebhook({ event: "entry.update" })).toEqual(["strapi"]);
  });

  it("ignores events it doesn't act on", () => {
    expect(tagsForWebhook({ event: "review-workflows.updateEntryStage", model: "post" })).toBeNull();
    expect(tagsForWebhook({})).toBeNull();
  });
});

describe("bearer secret", () => {
  it("accepts only the exact secret", () => {
    expect(hasBearer(`Bearer ${SECRET}`, SECRET)).toBe(true);
    expect(hasBearer(`bearer ${SECRET}`, SECRET)).toBe(true);
    expect(hasBearer(`Bearer ${SECRET}x`, SECRET)).toBe(false);
    expect(hasBearer(SECRET, SECRET)).toBe(false);
    expect(hasBearer(null, SECRET)).toBe(false);
  });

  it("refuses everything when no secret is configured", () => {
    expect(hasBearer("Bearer ", undefined)).toBe(false);
    expect(hasBearer("Bearer anything", "")).toBe(false);
  });
});

describe("POST /api/revalidate", () => {
  beforeEach(() => {
    vi.mocked(revalidateTag).mockClear();
    process.env.REVALIDATE_SECRET = SECRET;
  });

  it("refreshes the tag, keeping the old page until the new one is built", async () => {
    const response = await POST(webhook({ event: "entry.publish", model: "post", entry: { slug: "x" } }));
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ revalidated: ["posts"] });
    expect(revalidateTag).toHaveBeenCalledWith("posts", "max");
  });

  it("rejects a wrong or missing secret without refreshing anything", async () => {
    expect((await POST(webhook({ event: "entry.publish", model: "post" }, "Bearer nope"))).status).toBe(401);
    expect((await POST(webhook({ event: "entry.publish", model: "post" }, null))).status).toBe(401);
    expect(revalidateTag).not.toHaveBeenCalled();
  });

  it("rejects everything when the secret isn't configured", async () => {
    delete process.env.REVALIDATE_SECRET;
    expect((await POST(webhook({ event: "entry.publish", model: "post" }, "Bearer "))).status).toBe(401);
  });

  it("answers 400 to a body that isn't JSON", async () => {
    expect((await POST(webhook("not json"))).status).toBe(400);
  });

  it("accepts but ignores events it doesn't act on", async () => {
    const response = await POST(webhook({ event: "something.else" }));
    expect(await response.json()).toEqual({ revalidated: [] });
    expect(revalidateTag).not.toHaveBeenCalled();
  });
});
