import { useRef, useState, type ReactElement } from "react";
import type { PostData } from "../types";

interface PostMediaProps {
  post: PostData;
}

interface GallerySwipeProps {
  items: string[];
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

  const handleNext = () => {
    if (activeIndex < items.length - 1) scrollToIndex(activeIndex + 1);
  };

  const handlePrev = () => {
    if (activeIndex > 0) scrollToIndex(activeIndex - 1);
  };

  return (
    <div className="gallery-container">
      <div className="gallery" ref={containerRef}>
        {items.map((src, i) => (
          <img
            loading="lazy"
            id="post-media"
            key={i}
            src={src}
            alt={`gallery-${i}`}
          />
        ))}
      </div>

      <button onClick={handlePrev} disabled={activeIndex === 0}>
        ‹
      </button>
      <button onClick={handleNext} disabled={activeIndex === items.length - 1}>
        ›
      </button>

      <div className="counter">
        {activeIndex + 1} / {items.length}
      </div>
    </div>
  );
}

export default function PostMedia({
  post,
}: PostMediaProps): ReactElement | null {
  if (post.post_hint === "image" && post.url_overridden_by_dest) {
    return (
      <img
        loading="lazy"
        id="post-media"
        src={post.url_overridden_by_dest}
        alt={post.title}
      />
    );
  }

  if (post.is_video && post.media?.reddit_video?.fallback_url) {
    return (
      <video
        id="post-media"
        controls
        src={post.media.reddit_video.fallback_url}
      />
    );
  }

  if (
    post.url_overridden_by_dest &&
    (post.url_overridden_by_dest.endsWith(".gif") ||
      post.url_overridden_by_dest.endsWith(".gifv"))
  ) {
    return (
      <video
        id="post-media"
        autoPlay
        loop
        muted
        playsInline
        src={post.url_overridden_by_dest.replace(".gifv", ".mp4")}
      />
    );
  }

  if (post.is_gallery && post.media_metadata && post.gallery_data) {
    const mediaMetadata = post.media_metadata;
    const items = post.gallery_data.items
      .map((it) => {
        const meta = mediaMetadata[it.media_id] as
          | { s?: { u?: string } }
          | undefined;
        return meta?.s?.u?.replace(/&amp;/g, "&");
      })
      .filter((src): src is string => typeof src === "string");

    if (items.length === 0) {
      return null;
    }

    return <GallerySwipe items={items} />;
  }

  if (post.post_hint === "link" && post.domain?.includes("youtube")) {
    return (
      <iframe
        id="post-media"
        src={post.url.replace("watch?v=", "embed/")}
        title={post.title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }

  if (post.post_hint === "link") {
    return (
      <a id="post-media" href={post.url} target="_blank" rel="noreferrer">
        {post.url}
      </a>
    );
  }

  return null;
}
