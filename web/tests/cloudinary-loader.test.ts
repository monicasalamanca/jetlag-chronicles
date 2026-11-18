import { describe, expect, it } from "vitest";
import cloudinaryLoader from "@/lib/cloudinary-loader";

describe("Cloudinary image loader", () => {
  it("adds resize + auto format/quality after /upload/", () => {
    expect(cloudinaryLoader({ src: "https://res.cloudinary.com/jetlagchronicles/image/upload/v1712/bangkok.jpg", width: 640 })).toBe(
      "https://res.cloudinary.com/jetlagchronicles/image/upload/f_auto,q_auto,w_640,c_limit/v1712/bangkok.jpg",
    );
  });

  it("uses an explicit quality when given", () => {
    expect(cloudinaryLoader({ src: "https://res.cloudinary.com/x/image/upload/a.jpg", width: 100, quality: 60 })).toContain("q_60,w_100");
  });

  it("leaves other URLs alone", () => {
    expect(cloudinaryLoader({ src: "/logo.svg", width: 100 })).toBe("/logo.svg");
    expect(cloudinaryLoader({ src: "https://example.com/image/upload/a.jpg", width: 100 })).toBe("https://example.com/image/upload/a.jpg");
  });
});
