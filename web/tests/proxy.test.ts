import { NextRequest } from "next/server";
import { afterEach, describe, expect, it } from "vitest";
import { proxy } from "@/proxy";

describe("pre-launch gate in the proxy", () => {
  afterEach(() => {
    delete process.env.SITE_USER;
    delete process.env.SITE_PASSWORD;
  });

  it("locks pages but lets the Strapi webhook through (it has its own secret)", () => {
    process.env.SITE_USER = "preview";
    process.env.SITE_PASSWORD = "secret";
    expect(proxy(new NextRequest("http://localhost/thailand/30-thailand-scams"))?.status).toBe(401);
    expect(proxy(new NextRequest("http://localhost/api/revalidate", { method: "POST" }))).toBeUndefined();
    expect(proxy(new NextRequest("http://localhost/api/revalidate/extra"))?.status).toBe(401);
  });
});
