export interface PostData {
  subReddit: string;
  title: string;
  author: string;
  created: number;
  ups: number;
  ratio: number;
  numComments: number;
  thumbnail: string;
  url: string;
  post_hint?: string;
  url_overridden_by_dest?: string;
  is_video?: boolean;
  fallback_url?: string;
  media?: Record<string, any>;
  domain?: string;
  media_metadata?: Record<string, any>;
  is_gallery?: boolean;
  gallery_data?: { items: Array<{ media_id: string }> };
  timeAgo: string;
  selftext?: string;
  id: string;
  category?: string | null;
  video?: string | false;
}

export type PostRecord = Record<string, PostData>;

export interface FetchPostsResponse {
  posts: PostRecord[];
  numPosts: number;
}

export interface FetchSubPostsResponse extends FetchPostsResponse {
  linkFlairs: string[];
}
