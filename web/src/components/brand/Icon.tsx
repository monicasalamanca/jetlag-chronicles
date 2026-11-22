/** Inline SVG icons (no icon font). Decorative: always paired with visible text. */
const paths = {
  menu: { viewBox: "0 0 20 20", d: "M3 6h14M3 10h14M3 14h14", width: 1.8 },
  close: { viewBox: "0 0 20 20", d: "M5 5l10 10M15 5L5 15", width: 1.8 },
  "chevron-right": { viewBox: "0 0 12 12", d: "M4 2l4 4-4 4", width: 1.6 },
} as const;

export type IconName = keyof typeof paths;

export function Icon({ name, className = "icon" }: { name: IconName; className?: string }) {
  const p = paths[name];
  return (
    <svg className={className} viewBox={p.viewBox} aria-hidden="true" focusable="false">
      <path d={p.d} fill="none" stroke="currentColor" strokeWidth={p.width} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
