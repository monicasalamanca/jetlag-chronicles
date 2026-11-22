import type { Metadata } from "next";
import { PHASE_PRODUCTION_BUILD } from "next/constants";
import { notFound } from "next/navigation";
import type { StoryCardProps } from "@/components/cards/StoryCard";
import { JsonLd } from "@/components/layout/JsonLd";
import { StoryPage } from "@/components/story/StoryPage";
import { absoluteUrl, getImageSizes, getMoreStories, getStory, getStoryParams } from "@/lib/content";
import { renderStory } from "@/lib/markdown";
import { storyEyebrow, storyParent, storyPath, type StoryCardPost } from "@/lib/posts";
import { storyJsonLd, storyMetadata } from "@/lib/seo";

type Props = { params: Promise<{ place: string; slug: string }> };

// Static pages; new stories render on first request and are then cached. The publish webhook (issue 11) refreshes them.
export const dynamicParams = true;

export async function generateStaticParams() {
  return getStoryParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { place, slug } = await params;
  const post = await getStory(place, slug);
  return post ? storyMetadata(post) : {};
}

async function toCard(post: StoryCardPost): Promise<StoryCardProps | null> {
  const href = storyPath(post);
  if (!href) return null;
  const { readingMinutes } = await renderStory(post.body);
  return {
    href,
    title: post.title,
    eyebrow: storyEyebrow(post),
    summary: post.summary,
    image: post.coverPhoto,
    publishedDate: post.publishedDate,
    readingMinutes,
  };
}

export default async function StoryRoute({ params }: Props) {
  const { place, slug } = await params;
  const post = await getStory(place, slug);
  if (!post) notFound();

  const [imageSizes, moreStories] = await Promise.all([getImageSizes(post.body), getMoreStories(post)]);
  const story = await renderStory(post.body, {
    authorType: post.author?.type,
    imageSizes,
    resolveUrl: absoluteUrl,
  });

  // Alt text is required (plan §10). Strapi refuses to publish without it; this catches anything that slipped in.
  if (story.imagesWithoutAlt > 0) {
    const message = `${storyPath(post)}: ${story.imagesWithoutAlt} body photo(s) without alt text.`;
    if (process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD) throw new Error(message);
    console.error(message);
  }

  const parent = storyParent(post);
  const cards = (await Promise.all(moreStories.map(toCard))).filter((c): c is StoryCardProps => c !== null);

  return (
    <>
      <JsonLd data={storyJsonLd(post)} />
      <StoryPage
        post={post}
        story={story}
        eyebrow={storyEyebrow(post)}
        breadcrumb={[{ label: "Home", href: "/" }, ...(parent ? [parent] : []), { label: post.title }]}
        more={parent ? { label: parent.label, href: parent.href, stories: cards } : null}
      />
    </>
  );
}
