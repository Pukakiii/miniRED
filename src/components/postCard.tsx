import { useCallback, useState, type KeyboardEvent } from "react";
import coments from "../assets/comments.svg";
import vote from "../assets/vote.svg";
import savedIcon from "../assets/navbar/saved-menu.svg";
import BigPost from "./bigPostCard";
import Media from "./media";
import type { PostData } from "../types";
import { numDownvotes } from "../utils/helpersComponents";
import { isAnchorIndex, anchorLabel } from "../utils/anchorUtils";
import { formatAuthor, truncateText } from "../utils/postPresentation";
import { hasRenderableMedia } from "../utils/postMedia";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { toggleSaved } from "../features/savedPosts/savedPostsSlice";

interface PostProps {
  data: PostData;
  index: number;
}

export default function Post({ data, index }: PostProps) {
  const [isBig, setIsBig] = useState(false);
  const dispatch = useAppDispatch();
  const isSaved = useAppSelector((s) => s.savedPosts.ids.includes(data.id));
  const { ups, downs } = numDownvotes(data.ups, data.ratio);

  const openModal = useCallback(() => setIsBig(true), []);
  const closeModal = useCallback(() => setIsBig(false), []);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openModal();
    }
  };

  const titleClass =
    data.title.length > 72 ? "post post--long-title" : "post";
  const contentClass = hasRenderableMedia(data)
    ? "post-content popular-cell"
    : "post-content popular-cell post-content--text";

  return (
    <>
      <article
        onClick={openModal}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        id={`post-${data.id}`}
        className={titleClass}
      >
        <div id="post-title-box" className="post-title popular-cell">
          <h3 id="post-title" className="popular-cell" title={data.title}>
            {data.title}
          </h3>
        </div>
        <time id="time" className="popular-cell">
          {data.timeAgo}
        </time>
        <section className={contentClass}>
          <Media post={data} variant="card" />
          <div className="post-info">
            <span className="post-author">u/{formatAuthor(data.author)}</span>
            <span className="post-sub">{data.subReddit}</span>
            {data.selftext?.trim() && (
              <span className="post-more" title={data.selftext}>
                {truncateText(data.selftext, hasRenderableMedia(data) ? 80 : 160)}
              </span>
            )}
          </div>
        </section>
        <div id="upvote" className="popular-cell">
          <img
            src={vote}
            style={{ transform: "rotate(180deg)" }}
            alt="Upvote"
          />
          <span>+{ups}</span>
        </div>
        <div id="downvote" className="popular-cell">
          <img src={vote} alt="Downvote" />
          <span>-{downs}</span>
        </div>
        <div id="comments" className="popular-cell">
          <img src={coments} alt="Comments" />
          <span>{data.numComments ?? 0}</span>
        </div>
        <div id="saved" className="popular-cell">
          <img
            id="saved-icon"
            src={savedIcon}
            alt="Saved"
            style={{
              cursor: "pointer",
              filter: isSaved
                ? "drop-shadow(0 0 6px rgba(255,200,0,0.9))"
                : "none",
            }}
            onClick={(e) => {
              e.stopPropagation();
              dispatch(toggleSaved(data));
            }}
          />
          <span />
        </div>
        {isAnchorIndex(index) && (
          <span className="anchor" aria-label={`Post ${anchorLabel(index)}`}>
            {anchorLabel(index)}
          </span>
        )}
      </article>
      {isBig && <BigPost data={data} onClose={closeModal} />}
    </>
  );
}
