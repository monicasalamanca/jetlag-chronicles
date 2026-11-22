/**
 * Checks a post must pass before it can be published (plan §6.1, §10). Strapi can't mark relations as
 * required or look inside Markdown, so these run in a document middleware (src/index.ts).
 */
export type PostDraft = {
  section?: string | null;
  body?: string | null;
  country?: unknown;
  author?: unknown;
};

/** Markdown images with empty alt text: ![](url) or ![  ](url). */
const IMAGE_WITHOUT_ALT = /!\[\s*\]\(/g;

export function publishProblems(post: PostDraft): string[] {
  const problems: string[] = [];
  if (!post.author) problems.push('Pick an author.');
  if (post.section === 'place' && !post.country) problems.push('A place story needs a country.');
  const missingAlt = (post.body ?? '').match(IMAGE_WITHOUT_ALT)?.length ?? 0;
  if (missingAlt > 0) {
    problems.push(
      `${missingAlt} photo(s) in the body have no alt text. Write it between the brackets: ![What the photo shows](url).`,
    );
  }
  return problems;
}
