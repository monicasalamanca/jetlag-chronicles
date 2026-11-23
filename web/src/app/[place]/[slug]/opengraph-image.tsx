import { readFile } from "node:fs/promises";
import path from "node:path";
import { notFound } from "next/navigation";
import { ImageResponse } from "next/og";
import sharp from "sharp";
import { getStory, getStoryParams } from "@/lib/content";
import { SHARE_SAFE_AREA, SHARE_SIZE, shareColours, shareImage, shareLogo } from "@/lib/share-image";

// The social share image for a story (design-system.md §9). Next adds og:image (with size and type) to the
// story page; X falls back to it for its card. Built with the story pages and refreshed with them.
export const size = SHARE_SIZE;
// JPEG, not next/og's PNG: a photo as PNG is 1–1.5 MB, and WhatsApp and others skip previews that large.
export const contentType = "image/jpeg";

export async function generateStaticParams() {
  return getStoryParams();
}

// next/og needs .ttf: these are the same SemiBold subsets as the site's woff2 files (src/fonts/og/).
const font = (file: string) => readFile(path.join(process.cwd(), "src/fonts/og", file));

export default async function ShareImage({ params }: { params: Promise<{ place: string; slug: string }> }) {
  const { place, slug } = await params;
  const post = await getStory(place, slug);
  if (!post) notFound();
  const { photo, eyebrow, title, titleSize } = shareImage(post);
  const [serif, sans] = await Promise.all([font("SourceSerif4-SemiBold.ttf"), font("SourceSans3-SemiBold.ttf")]);

  const fill = { position: "absolute", top: 0, left: 0, width: SHARE_SIZE.width, height: SHARE_SIZE.height } as const;
  const png = new ImageResponse(
    <div style={{ ...fill, display: "flex", background: shareColours.background, color: shareColours.text }}>
      {photo && <img src={photo} alt="" width={SHARE_SIZE.width} height={SHARE_SIZE.height} style={{ ...fill, objectFit: "cover" }} />}
      <div style={{ ...fill, backgroundImage: shareColours.scrim }} />
      <div
        style={{
          position: "absolute",
          top: SHARE_SAFE_AREA,
          left: SHARE_SAFE_AREA,
          right: SHARE_SAFE_AREA,
          bottom: SHARE_SAFE_AREA,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <img src={shareLogo.src} alt="" width={shareLogo.width} height={shareLogo.height} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          {eyebrow && (
            <div
              style={{
                fontFamily: "Source Sans 3",
                fontWeight: 600,
                fontSize: 22,
                lineHeight: 1,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                marginBottom: 18,
              }}
            >
              {eyebrow}
            </div>
          )}
          <div
            style={{
              fontFamily: "Source Serif 4",
              fontWeight: 600,
              fontSize: titleSize,
              lineHeight: 1.08,
              letterSpacing: "-0.01em",
              maxWidth: 960,
              textWrap: "balance",
            }}
          >
            {title}
          </div>
        </div>
      </div>
    </div>,
    {
      ...SHARE_SIZE,
      fonts: [
        { name: "Source Serif 4", data: serif, weight: 600, style: "normal" },
        { name: "Source Sans 3", data: sans, weight: 600, style: "normal" },
      ],
    },
  );
  const jpeg = await sharp(Buffer.from(await png.arrayBuffer())).jpeg({ quality: 82, mozjpeg: true }).toBuffer();
  return new Response(new Uint8Array(jpeg), { headers: { "Content-Type": contentType } });
}
