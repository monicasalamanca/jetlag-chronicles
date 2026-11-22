/**
 * Which menu item is current. The page itself gets aria-current="page"; a page inside a section
 * (/lifestyle/<slug>, /stories/2) marks its section with aria-current="true". Both show the underline.
 */
export function navCurrent(href: string, currentPath: string): "page" | "true" | undefined {
  const path = currentPath.replace(/\/+$/, "") || "/";
  if (path === href) return "page";
  if (path.startsWith(`${href}/`)) return "true";
  return undefined;
}
