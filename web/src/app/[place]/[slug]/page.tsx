import type { Metadata } from "next";
import { PHASE_PRODUCTION_BUILD } from "next/constants";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/layout/JsonLd";
import { StoryPage } from "@/components/story/StoryPage";
import { storyCards } from "@/lib/cards";
import { absoluteUrl, getImageSizes, getMoreStories, getStory, getStoryParams } from "@/lib/content";
import { renderStory } from "@/lib/markdown";
import { storyEyebrow, storyParent, storyPath } from "@/lib/posts";
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
  const cards = await storyCards(moreStories);

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
