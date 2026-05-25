import type { PostData } from "../types";

const INVALID_THUMBNAILS = new Set([
  "self",
  "default",
  "image",
  "nsfw",
  "spoiler",
  "video",
  "",
]);

export function isValidThumbnail(url?: string): boolean {
  if (!url) return false;
  if (INVALID_THUMBNAILS.has(url)) return false;
  return url.startsWith("http");
}

export type MediaKind =
  | "image"
  | "video"
  | "gif"
  | "gallery"
  | "youtube"
  | "link"
  | "thumbnail"
  | "none";

export function getMediaKind(post: PostData): MediaKind {
  if (post.post_hint === "image" && post.url_overridden_by_dest) return "image";
  if (post.is_video && post.media?.reddit_video?.fallback_url) return "video";
  if (
    post.url_overridden_by_dest &&
    (post.url_overridden_by_dest.endsWith(".gif") ||
      post.url_overridden_by_dest.endsWith(".gifv"))
  ) {
    return "gif";
  }
  if (post.is_gallery && post.media_metadata && post.gallery_data) return "gallery";
  if (post.post_hint === "link" && post.domain?.includes("youtube")) {
    return "youtube";
  }
  if (post.post_hint === "link" && post.url) return "link";
  if (isValidThumbnail(post.thumbnail)) return "thumbnail";
  return "none";
}

export function hasRenderableMedia(post: PostData): boolean {
  return getMediaKind(post) !== "none";
}
