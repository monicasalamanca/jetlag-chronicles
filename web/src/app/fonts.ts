import localFont from "next/font/local";

// Self-hosted subsets (OFL, see src/fonts/OFL.md). Five files, about 90 KB in total; no request to Google.
export const serif = localFont({
  src: [
    { path: "../fonts/SourceSerif4-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "../fonts/SourceSerif4-Italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-source-serif",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});

export const sans = localFont({
  src: [
    { path: "../fonts/SourceSans3-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/SourceSans3-Italic.woff2", weight: "400", style: "italic" },
    { path: "../fonts/SourceSans3-SemiBold.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-source-sans",
  display: "swap",
  adjustFontFallback: "Arial",
});
