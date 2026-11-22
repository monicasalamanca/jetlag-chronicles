import { logoSvg } from "./logo-svg";

export type LogoProps = {
  /** "full" is the two-line wordmark with the pin ring; "ring" is the mark alone (footer, avatars). */
  variant?: "full" | "ring";
  className?: string;
};

/**
 * The logo as inline SVG, recoloured by --logo-ink / --logo-accent (light and dark in tokens.css).
 * Always decorative: the link or text around it carries the name.
 */
export function Logo({ variant = "full", className }: LogoProps) {
  const { viewBox, inner } = logoSvg[variant];
  const [, , width, height] = viewBox.split(" ");
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      width={width}
      height={height}
      className={className}
      aria-hidden="true"
      focusable="false"
      dangerouslySetInnerHTML={{ __html: inner }}
    />
  );
}
