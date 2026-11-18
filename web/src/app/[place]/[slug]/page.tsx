import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StoryArticle } from "@/components/story/StoryArticle";
import { getStory, getStoryParams } from "@/lib/content";
import { renderMarkdown } from "@/lib/markdown";
import { storyPath } from "@/lib/posts";

type Props = { params: Promise<{ place: string; slug: string }> };

// Static pages; new stories render on first request and are then cached. The publish webhook (issue 11) refreshes them.
export const dynamicParams = true;

export async function generateStaticParams() {
  return getStoryParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { place, slug } = await params;
  const post = await getStory(place, slug);
  if (!post) return {};
  return { title: post.title, alternates: { canonical: storyPath(post) ?? undefined } };
}

export default async function StoryPage({ params }: Props) {
  const { place, slug } = await params;
  const post = await getStory(place, slug);
  if (!post) notFound();
  return <StoryArticle title={post.title} bodyHtml={await renderMarkdown(post.body)} country={post.country} />;
}
