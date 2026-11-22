import Image from "next/image";
import { Breadcrumb, type Crumb } from "@/components/layout/Breadcrumb";
import { type RenderedStory, TOC_MIN_SECTIONS } from "@/lib/markdown";
import type { Post } from "@/lib/posts";
import { AuthorBox } from "./AuthorBox";
import { Byline } from "./Byline";
import { MoreStories, type MoreStoriesProps } from "./MoreStories";
import { TableOfContents } from "./TableOfContents";
import { WriteToUs } from "./WriteToUs";

export type StoryPageProps = {
  post: Post;
  story: RenderedStory;
  eyebrow: string;
  breadcrumb: Crumb[];
  more: MoreStoriesProps | null;
};

/** The story page (plan §7.2): breadcrumb, cover, title, summary, byline, TOC, body, author, write to us, more. */
export function StoryPage({ post, story, eyebrow, breadcrumb, more }: StoryPageProps) {
  const cover = post.coverPhoto;
  return (
    <div className="shell">
      <div className="story-page__crumbs">
        <Breadcrumb items={breadcrumb} />
      </div>
      <article>
        <div className="story-page__cover">
          <header className="cover">
            {cover && (
              <div className="cover__media">
                <Image
                  src={cover.url}
                  alt={post.coverAlt}
                  width={cover.width ?? 1600}
                  height={cover.height ?? 1200}
                  sizes="(min-width: 72rem) 72rem, 100vw"
                  preload
                />
              </div>
            )}
            {(post.coverCaption || post.coverCredit) && (
              <p className="figcap cover__caption">
                {post.coverCaption}
                {post.coverCredit && <span className="credit">Photo: {post.coverCredit}</span>}
              </p>
            )}
            <div className="cover__body">
              {eyebrow && <p className="eyebrow">{eyebrow}</p>}
              <h1 className="t-h1">{post.title}</h1>
              <p className="t-lead">{post.summary}</p>
              <Byline
                author={post.author?.name ?? null}
                publishedDate={post.publishedDate}
                updatedDate={post.updatedDate}
                readingMinutes={story.readingMinutes}
              />
            </div>
          </header>
        </div>
        {story.headings.length >= TOC_MIN_SECTIONS && (
          <div className="story-page__toc">
            <TableOfContents headings={story.headings} />
          </div>
        )}
        <div className="story-page__body story-grid" dangerouslySetInnerHTML={{ __html: story.html }} />
        <div className="story-tail">
          {post.author && <AuthorBox author={post.author} />}
          <WriteToUs />
        </div>
      </article>
      {more && <MoreStories {...more} />}
    </div>
  );
}
