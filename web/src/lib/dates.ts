const format = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

/** "2025-04-12" → "12 April 2025" (the design's date style). Dates are calendar days, so read as UTC. */
export function formatDate(isoDate: string): string {
  return format.format(new Date(`${isoDate.slice(0, 10)}T00:00:00Z`));
}
