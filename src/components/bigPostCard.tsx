import { useEffect } from "react";
import Media from "./media";
import PostMeta from "./postMeta";
import PostStats from "./postStats";
import type { PostData } from "../types";
import { truncateText } from "../utils/postPresentation";

interface BigPostProps {
  data: PostData;
  onClose: () => void;
}

export default function BigPost({ data, onClose }: BigPostProps) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const bodyText = data.selftext?.trim();

  return (
    <div className="big-post-layer" role="presentation">
      <button
        type="button"
        className="big-post-backdrop"
        aria-label="Close post"
        onClick={onClose}
      />
      <article
        className="big-post"
        role="dialog"
        aria-modal="true"
        aria-labelledby={`big-post-title-${data.id}`}
      >
        <div className="big-post-header">
          <PostMeta data={data} showExcerpt={false} />
          <button
            type="button"
            className="big-post-close"
            id="close"
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <h3 id={`big-post-title-${data.id}`} className="big-post-title">
          {data.title}
        </h3>

        <time className="big-post-time" dateTime={String(data.created)}>
          {data.timeAgo}
        </time>

        {bodyText && (
          <p className="big-post-more">{truncateText(bodyText, 1200)}</p>
        )}

        <section className="big-post-content">
          <Media post={data} variant="modal" />
        </section>

        <PostStats data={data} variant="modal" />
      </article>
    </div>
  );
}
