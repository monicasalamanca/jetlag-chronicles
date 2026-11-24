import type { StoryCardProps } from "@/components/cards/StoryCard";
import { renderStory } from "@/lib/markdown";
import { storyEyebrow, storyPath, type StoryCardPost } from "@/lib/posts";

/** Story card props for a post (reading time comes from its body), or null when it can't be placed. */
export async function storyCard(post: StoryCardPost): Promise<StoryCardProps | null> {
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

export async function storyCards(posts: StoryCardPost[]): Promise<StoryCardProps[]> {
  return (await Promise.all(posts.map(storyCard))).filter((c): c is StoryCardProps => c !== null);
}
