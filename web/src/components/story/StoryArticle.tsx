/** A story page body. Unstyled walking skeleton: the full layout (plan §7.2) comes in issue 04. */
export type StoryArticleProps = {
  title: string;
  /** Sanitized HTML from renderMarkdown. */
  bodyHtml: string;
  country: { name: string; slug: string } | null;
};

export function StoryArticle({ title, bodyHtml, country }: StoryArticleProps) {
  return (
    <article>
      <header>
        {country && <p>{country.name}</p>}
        <h1>{title}</h1>
      </header>
      <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />
    </article>
  );
}
