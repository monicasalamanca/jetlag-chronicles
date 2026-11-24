/**
 * Which menu item is current. The page itself gets aria-current="page"; a page inside a section
 * (/lifestyle/<slug>, /stories/2) marks its section with aria-current="true". Both show the underline.
 * Country pages and their stories (/<country>, /<country>/<slug>) sit under Places.
 */
export function navCurrent(href: string, currentPath: string): "page" | "true" | undefined {
  const path = currentPath.replace(/\/+$/, "") || "/";
  if (path === href) return "page";
  if (path.startsWith(`${href}/`)) return "true";
  if (href === "/places" && isCountryPath(path)) return "true";
  return undefined;
}

/** Top-level paths that are not countries (everything else at /<x> is a country page or one of its stories). */
const NOT_COUNTRIES = new Set(["lifestyle", "stories", "about", "privacy", "toolkit", "reader-stories", "places", "api"]);

function isCountryPath(path: string): boolean {
  const first = path.split("/")[1] ?? "";
  return first !== "" && !first.includes(".") && !NOT_COUNTRIES.has(first);
}
