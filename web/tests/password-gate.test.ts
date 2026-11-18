import { describe, expect, it, vi } from "vitest";
import { gateConfig, gateResponse, isAuthorized } from "@/lib/password-gate";

const basic = (credentials: string) => `Basic ${Buffer.from(credentials).toString("base64")}`;
const on = gateConfig({ SITE_USER: "preview", SITE_PASSWORD: "s3cret:é" });

describe("password gate", () => {
  it("is off unless both settings are present", () => {
    expect(gateConfig({})).toEqual({ kind: "off" });
    expect(gateConfig({ SITE_USER: "", SITE_PASSWORD: "" })).toEqual({ kind: "off" });
    expect(gateConfig({ SITE_PASSWORD: "x" })).toEqual({ kind: "misconfigured" });
    expect(gateConfig({ SITE_USER: "x" })).toEqual({ kind: "misconfigured" });
    expect(on).toEqual({ kind: "on", user: "preview", password: "s3cret:é" });
  });

  it("lets everything through when off", () => {
    expect(gateResponse({ kind: "off" }, null)).toBeNull();
  });

  it("asks for credentials when they are missing or wrong", () => {
    for (const header of [null, "", "Bearer abc", basic("preview:wrong"), basic("other:s3cret:é"), "Basic %%%", basic("nocolon")]) {
      const response = gateResponse(on, header);
      expect(response?.status).toBe(401);
      expect(response?.headers.get("WWW-Authenticate")).toMatch(/^Basic realm=/);
    }
  });

  it("lets the right credentials through (password may contain colons and accents)", () => {
    expect(gateResponse(on, basic("preview:s3cret:é"))).toBeNull();
    expect(isAuthorized(basic("preview:s3cret:é"), "preview", "s3cret:é")).toBe(true);
    expect(isAuthorized(basic("preview:s3cret"), "preview", "s3cret:é")).toBe(false);
  });

  it("fails closed when half-configured", () => {
    const error = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(gateResponse({ kind: "misconfigured" }, basic("a:b"))?.status).toBe(503);
    expect(error).toHaveBeenCalled();
    error.mockRestore();
  });
});
