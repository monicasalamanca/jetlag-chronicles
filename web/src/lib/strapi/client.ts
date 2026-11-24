import "server-only";

/** Thrown when the CMS can't be reached or answers with an error. */
export class StrapiError extends Error {
  /** The HTTP status Strapi answered with (undefined when it could not be reached or is not configured). */
  readonly status: number | undefined;
  constructor(message: string, status?: number) {
    super(message);
    this.status = status;
  }
}

export function strapiConfigured(): boolean {
  return Boolean(process.env.STRAPI_URL);
}

/**
 * GET a Strapi REST endpoint. Responses are cached as static data and tagged, so the publish webhook
 * (issue 11) can refresh exactly what changed. If Strapi is down, already-built pages keep being served.
 */
export async function strapiGet<T>(path: string, query: URLSearchParams, tags: string[]): Promise<T> {
  const base = process.env.STRAPI_URL;
  if (!base) throw new StrapiError("STRAPI_URL is not set (see web/.env.example).");
  const url = `${base.replace(/\/$/, "")}/api/${path}?${query.toString()}`;
  const token = process.env.STRAPI_API_TOKEN;
  const response = await fetch(url, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    cache: "force-cache",
    next: { tags },
  });
  if (!response.ok) throw new StrapiError(`Strapi ${response.status} for /api/${path}`, response.status);
  return (await response.json()) as T;
}
