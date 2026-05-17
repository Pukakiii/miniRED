import React from "react";
import coments from "../assets/comments.svg";
import vote from "../assets/vote.svg";
import saved from "../assets/navbar/saved-menu.svg";
import BigPost from "./bigPostCard";
import Media from "./media";
import type { PostData } from "../types";

interface PostProps {
  data: PostData;
  index: number;
}

export default function Post({ data, index }: PostProps) {
  const [isBig, setIsBig] = React.useState(false);
  const handleClick = () => setIsBig((current) => !current);

  const isEveryFifthIndex = (i: number) => (i === 0 ? true : (i + 1) % 5 === 0);

  const numDownvotes = (score: number, ratio: number) => {
    if (score === 0 || ratio === 0.5) {
      return { ups: 0, downs: 0 };
    }
    const ups = Math.round((score * ratio) / (2 * ratio - 1));
    const downs = ups - score;
    return { ups, downs };
  };

  const { ups, downs } = numDownvotes(data.ups, data.ratio);

  return (
    <>
      <article onClick={handleClick} id={`anchor-${index}`} className="post">
        <div
          id="post-title-box"
          className="post-title popular-cell"
          style={{ gridArea: "title" }}
        >
          <h3
            id="post-title"
            className="popular-cell"
            style={{ gridArea: "title" }}
          >
            {data.title}
          </h3>
        </div>
        <time id="time" className="popular-cell" style={{ gridArea: "time" }}>
          {data.timeAgo}
        </time>
        <section
          className="post-content popular-cell"
          style={{
            gridArea: "content",
            height: 180,
            width: "100%",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Media post={data} />
          <div className="post-info">
            <span className="post-author">u/{data.author}</span>
            <span className="post-sub"> {data.subReddit}</span>
            {data.selftext && (
              <span className="post-more"> {data.selftext}</span>
            )}
          </div>
        </section>
        <div id="upvote" className="popular-cell">
          <img
            src={vote}
            style={{ transform: "rotate(180deg)", gridArea: "upvote" }}
            alt="up Vote icon"
          />
          <span>+{ups}</span>
        </div>
        <div id="downvote" className="popular-cell">
          <img
            style={{ gridArea: "downvote" }}
            src={vote}
            alt="down Vote icon"
          />
          <span>-{downs}</span>
        </div>
        <div id="comments" className="popular-cell">
          <img
            style={{ gridArea: "comments" }}
            src={coments}
            alt="Comments icon"
          />
          <span>{data.numComments}</span>
        </div>
        <div id="saved" className="popular-cell">
          <img
            id="saved-icon"
            style={{ gridArea: "saved" }}
            src={saved}
            alt="Saved icon"
          />
          <span />
        </div>
        {isEveryFifthIndex(index) && <div className="anchor">{index + 1}</div>}
      </article>
      {isBig && (
        <BigPost
          handleClick={handleClick}
          big={isBig}
          data={data}
          index={index}
        />
      )}
    </>
  );
}
