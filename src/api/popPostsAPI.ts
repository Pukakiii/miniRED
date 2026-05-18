import type { FetchPostsResponse } from "../types";
import timeAgo from "./hepers";

export async function fetchPopPosts(
  category = "best",
): Promise<FetchPostsResponse> {
  try {
    const response = await fetch(
      `https://corsproxy.io/?https://www.reddit.com/r/popular/${category}.json?limit=6`,
    );
    const data: any = await response.json();

    return {
      posts: data.data.children.map((child: any) => {
        return {
          [child.data.id]: {
            subReddit: child.data.subreddit_name_prefixed,
            title: child.data.title,
            author: child.data.author,
            created: child.data.created,
            ups: child.data.ups,
            ratio: child.data.upvote_ratio,
            numComments: child.data.num_comments,
            thumbnail: child.data.thumbnail,
            url: child.data.url,
            post_hint: child.data.post_hint,
            url_overridden_by_dest: child.data.url_overridden_by_dest,
            is_video: child.data.is_video,
            fallback_url: child.data.media?.reddit_video?.fallback_url,
            media: child.data.media,
            domain: child.data.domain,
            media_metadata: child.data.media_metadata,
            is_gallery: child.data.is_gallery,
            gallery_data: child.data.gallery_data,
            timeAgo: timeAgo(child.data.created),
            selftext: child.data.selftext,
            id: child.data.id,
          },
        };
      }),
      numPosts: data.data.dist,
    };
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return { posts: [], numPosts: 0 };
  }
}

