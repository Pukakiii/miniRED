import type { FetchSubPostsResponse } from "../types";
import timeAgo from "../utils/hepersAPI";

export async function fetchSubPosts(
  subName: string,
): Promise<FetchSubPostsResponse> {
  try {
    const response = await fetch(
      `https://corsproxy.io/?https://www.reddit.com/r/${subName}/new.json?limit=6`,
    );
    if (!response.ok) {
      const errorObj = new Error(`HTTP error! status: ${response.ok}`);
      (errorObj as any).status = response.status;
      throw errorObj;
    }
    const postsData: any = await response.json();
    console.log("Fetched subposts:", postsData);
    const linkFlairs: string[] = [];
    return {
      posts: postsData.data.children.map((child: any) => {
        if (
          child.data.link_flair_text &&
          !linkFlairs.includes(child.data.link_flair_text)
        ) {
          linkFlairs.push(child.data.link_flair_text);
        }
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
            video: child.data.is_video ? "Video" : false,
            id: child.data.id,
            category: child.data.link_flair_text ?? null,
          },
        };
      }),
      numPosts: postsData.data.dist,
      linkFlairs,
    };
  } catch (error) {
    throw error;
  }
}
