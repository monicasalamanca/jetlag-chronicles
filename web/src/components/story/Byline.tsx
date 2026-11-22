import { formatDate } from "@/lib/dates";

export type BylineProps = {
  author: string | null;
  publishedDate: string;
  /** Shown only when set (plan §7.2). */
  updatedDate: string | null;
  readingMinutes: number;
};

function Dot() {
  return <span aria-hidden="true">·</span>;
}

export function Byline({ author, publishedDate, updatedDate, readingMinutes }: BylineProps) {
  return (
    <p className="byline">
      {author && (
        <>
          <span>
            By <span className="byline__author">{author}</span>
          </span>
          <Dot />
        </>
      )}
      <span>
        Published <time dateTime={publishedDate}>{formatDate(publishedDate)}</time>
      </span>
      {updatedDate && (
        <>
          <Dot />
          <span>
            Updated <time dateTime={updatedDate}>{formatDate(updatedDate)}</time>
          </span>
        </>
      )}
      <Dot />
      <span>{readingMinutes} min read</span>
    </p>
  );
}
