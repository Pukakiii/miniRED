import coments from "../assets/comments.svg";
import vote from "../assets/vote.svg";
import saved from "../assets/navbar/saved-menu.svg";
import Media from "./media";
import type { PostData } from "../types";
import { numDownvotes } from "./helpers";

interface BigPostProps {
  data: PostData;
  index: number;
  handleClick: () => void;
  big: boolean;
}

export default function BigPost({
  data,
  index,
  handleClick,
  big,
}: BigPostProps) {
  const { ups, downs } = numDownvotes(data.ups, data.ratio);

  return (
    <article
      id={`anchor-${index}`}
      className={big ? "big-post show" : "big-post"}
    >
      <div style={{ gridArea: "big-Info" }} className="big-post-info">
        <span className="big-post-author">u/{data.author}</span>
        <button onClick={handleClick} id="close">
          ✖
        </button>
        <span className="big-post-sub"> {data.subReddit}</span>
      </div>
      <div
        id="big-post-title-box"
        className="big-post-title"
        style={{ gridArea: "big-title" }}
      >
        <h3>{data.title}</h3>
      </div>
      <time id="time" style={{ gridArea: "time" }}>
        {data.timeAgo}
      </time>
      {data.selftext && (
        <span style={{ gridArea: "selftext" }} className="big-post-more">
          {data.selftext}
        </span>
      )}
      <section
        className="big-post-content"
        style={{
          gridArea: "big-content",
          width: "100%",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Media post={data} />
      </section>

      <div className="big-post-stats" style={{ gridArea: "stats" }}>
        <div id="upvote">
          <img
            src={vote}
            style={{ transform: "rotate(180deg)", gridArea: "upvote" }}
            alt="up Vote icon"
          />
          <span>+{ups}</span>
        </div>
        <div id="downvote">
          <img src={vote} alt="down Vote icon" />
          <span>-{downs}</span>
        </div>
        <div id="comments">
          <img src={coments} alt="Comments icon" />
          <span>{data.numComments}</span>
        </div>
        <div id="saved">
          <img id="saved-icon" src={saved} alt="Saved icon" />
          <span />
        </div>
      </div>
    </article>
  );
}
