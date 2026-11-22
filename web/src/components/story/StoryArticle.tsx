/** A story page body on the design system's text column. The full layout (plan §7.2) comes in issue 04. */
export type StoryArticleProps = {
  title: string;
  /** Sanitized HTML from renderMarkdown. */
  bodyHtml: string;
  country: { name: string; slug: string } | null;
};

export function StoryArticle({ title, bodyHtml, country }: StoryArticleProps) {
  return (
    <article className="shell story-page">
      <header className="story-head section-intro">
        {country && <p className="eyebrow">{country.name}</p>}
        <h1 className="t-h1">{title}</h1>
      </header>
      <div className="story-grid" dangerouslySetInnerHTML={{ __html: bodyHtml }} />
    </article>
  );
}
