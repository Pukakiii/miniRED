import { useRef, useState } from "react";

export default function PostMedia({ post }) {
  // 1. Image
  if (post.post_hint === "image" && post.url_overridden_by_dest) {
    return (
      <img id="post-media" src={post.url_overridden_by_dest} alt={post.title} />
    );
  }

  // 2. Video (Reddit-hosted)
  if (post.is_video && post.media?.reddit_video?.fallback_url) {
    return (
      <video
        id="post-media"
        controls
        src={post.media.reddit_video.fallback_url}
      />
    );
  }

  // 3. GIFs
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

  // 4. Gallery / Album
  if (post.is_gallery && post.media_metadata && post.gallery_data) {
    const items = post.gallery_data.items.map((it) => {
      const meta = post.media_metadata[it.media_id];
      const src = meta?.s?.u.replace(/&amp;/g, "&"); // decode URL
      return src;
    });

    function GallerySwipe(items) {
      const containerRef = useRef(null);
      const [activeIndex, setActiveIndex] = useState(0);

      const scrollToIndex = (index) => {
        if (containerRef.current) {
          const child = containerRef.current.children[index];
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
              <img id="post-media" key={i} src={src} alt={`gallery-${i}`} />
            ))}
          </div>

          {/* Controls */}
          <button onClick={handlePrev} disabled={activeIndex === 0}>
            ‹
          </button>
          <button
            onClick={handleNext}
            disabled={activeIndex === items.length - 1}
          >
            ›
          </button>

          {/* Counter */}
          <div className="counter">
            {activeIndex + 1} / {items.length}
          </div>
        </div>
      );
    }
    return GallerySwipe(items);
  }

  // 5. YouTube
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

  // 6. External link fallback
  if (post.post_hint === "link") {
    return (
      <a id="post-media" href={post.url} target="_blank" rel="noreferrer">
        {post.url}
      </a>
    );
  }

  return null;
}
