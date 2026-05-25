import type { MouseEvent } from "react";
import coments from "../assets/comments.svg";
import vote from "../assets/vote.svg";
import savedIcon from "../assets/navbar/saved-menu.svg";
import type { PostData } from "../types";
import { numDownvotes } from "../utils/helpersComponents";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { toggleSaved } from "../features/savedPosts/savedPostsSlice";

interface PostStatsProps {
  data: PostData;
  variant?: "card" | "modal";
  onSaveClick?: (e: MouseEvent) => void;
}

/** Stats row for expanded post modal only (cards use inline markup). */
export default function PostStats({
  data,
  variant = "modal",
  onSaveClick,
}: PostStatsProps) {
  const dispatch = useAppDispatch();
  const isSaved = useAppSelector((s) => s.savedPosts.ids.includes(data.id));
  const { ups, downs } = numDownvotes(data.ups, data.ratio);

  if (variant === "card") return null;

  const handleSave = (e: MouseEvent) => {
    e.stopPropagation();
    onSaveClick?.(e);
    dispatch(toggleSaved(data));
  };

  return (
    <div className="big-post-stats">
      <div id="upvote">
        <img src={vote} style={{ transform: "rotate(180deg)" }} alt="Upvote" />
        <span>+{ups}</span>
      </div>
      <div id="downvote">
        <img src={vote} alt="Downvote" />
        <span>-{downs}</span>
      </div>
      <div id="comments">
        <img src={coments} alt="Comments" />
        <span>{data.numComments ?? 0}</span>
      </div>
      <div id="saved">
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
          onClick={handleSave}
        />
        <span />
      </div>
    </div>
  );
}
