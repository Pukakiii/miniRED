import { useRef, useState, type ReactElement } from "react";
import type { PostData } from "../types";
import { getMediaKind, isValidThumbnail } from "../utils/postMedia";

interface PostMediaProps {
  post: PostData;
  variant?: "card" | "modal";
}

interface GallerySwipeProps {
  items: string[];
}

function MediaPlaceholder({ title }: { title: string }) {
  return (
    <div className="post-media-placeholder" aria-hidden>
      <span className="post-media-placeholder-text">
        {title ? "Text post" : "No preview"}
      </span>
    </div>
  );
}

function GallerySwipe({ items }: GallerySwipeProps): ReactElement {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToIndex = (index: number) => {
    const container = containerRef.current;
    if (!container) return;

    const child = container.children[index] as HTMLElement | undefined;
    if (child) {
      child.scrollIntoView({ behavior: "smooth", inline: "center" });
      setActiveIndex(index);
    }
  };

  return (
    <div className="gallery-container">
      <div className="gallery" ref={containerRef}>
        {items.map((src, i) => (
          <img
            loading="lazy"
            className="post-media"
            key={i}
            src={src}
            alt={`Gallery image ${i + 1}`}
          />
        ))}
      </div>
      <button
        type="button"
        className="gallery-nav gallery-nav--prev"
        onClick={(e) => {
          e.stopPropagation();
          if (activeIndex > 0) scrollToIndex(activeIndex - 1);
        }}
        disabled={activeIndex === 0}
        aria-label="Previous image"
      >
        ‹
      </button>
      <button
        type="button"
        className="gallery-nav gallery-nav--next"
        onClick={(e) => {
          e.stopPropagation();
          if (activeIndex < items.length - 1) scrollToIndex(activeIndex + 1);
        }}
        disabled={activeIndex === items.length - 1}
        aria-label="Next image"
      >
        ›
      </button>
      <div className="gallery-counter">
        {activeIndex + 1} / {items.length}
      </div>
    </div>
  );
}

export default function PostMedia({
  post,
  variant = "card",
}: PostMediaProps): ReactElement {
  const mediaClass =
    variant === "modal" ? "post-media post-media--modal" : "post-media";
  const mediaId = variant === "card" ? "post-media" : undefined;
  const kind = getMediaKind(post);

  if (kind === "image" && post.url_overridden_by_dest) {
    return (
      <img
        loading="lazy"
        id={mediaId}
        className={mediaClass}
        src={post.url_overridden_by_dest}
        alt={post.title}
      />
    );
  }

  if (kind === "video" && post.media?.reddit_video?.fallback_url) {
    return (
      <video
        className={mediaClass}
        controls
        src={post.media.reddit_video.fallback_url}
        onClick={(e) => e.stopPropagation()}
      />
    );
  }

  if (kind === "gif" && post.url_overridden_by_dest) {
    return (
      <video
        className={mediaClass}
        autoPlay
        loop
        muted
        playsInline
        src={post.url_overridden_by_dest.replace(".gifv", ".mp4")}
        onClick={(e) => e.stopPropagation()}
      />
    );
  }

  if (kind === "gallery" && post.media_metadata && post.gallery_data) {
    const mediaMetadata = post.media_metadata;
    const items = post.gallery_data.items
      .map((it) => {
        const meta = mediaMetadata[it.media_id] as
          | { s?: { u?: string } }
          | undefined;
        return meta?.s?.u?.replace(/&amp;/g, "&");
      })
      .filter((src): src is string => typeof src === "string");

    if (items.length > 0) {
      return <GallerySwipe items={items} />;
    }
  }

  if (kind === "youtube" && post.url) {
    return (
      <iframe
        className={`${mediaClass} post-media--embed`}
        src={post.url.replace("watch?v=", "embed/")}
        title={post.title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        onClick={(e) => e.stopPropagation()}
      />
    );
  }

  if (kind === "link" && post.url) {
    return (
      <a
        className={`${mediaClass} post-media--link`}
        href={post.url}
        target="_blank"
        rel="noreferrer"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="post-media-link-domain">{post.domain ?? "Link"}</span>
        <span className="post-media-link-url">{post.url}</span>
      </a>
    );
  }

  if (kind === "thumbnail" && isValidThumbnail(post.thumbnail)) {
    return (
      <img
        loading="lazy"
        className={mediaClass}
        src={post.thumbnail}
        alt={post.title}
      />
    );
  }

  return <MediaPlaceholder title={post.title} />;
}
