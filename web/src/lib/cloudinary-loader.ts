/**
 * next/image loader: Cloudinary resizes and picks the format (plan §8). Vercel image optimization is off,
 * so this works on any host. Non-Cloudinary URLs are returned unchanged.
 */
const UPLOAD = "/image/upload/";

export default function cloudinaryLoader({ src, width, quality }: { src: string; width: number; quality?: number }): string {
  const at = src.indexOf(UPLOAD);
  if (!src.startsWith("https://res.cloudinary.com/") || at === -1) return src;
  const transform = `f_auto,q_${quality ?? "auto"},w_${width},c_limit`;
  const head = src.slice(0, at + UPLOAD.length);
  const tail = src.slice(at + UPLOAD.length);
  return `${head}${transform}/${tail}`;
}
