import coments from "../assets/comments.svg";
import vote from "../assets/vote.svg";
import saved from "../assets/navbar/saved-menu.svg";
import Media from "./media.jsx";

export default function BigPost({ data, index, handleClick, big }) {
  const numDownvotes = (score, ratio) => {
    if (score === 0 || ratio === 0.5) {
      return { ups: 0, downs: 0 };
    }
    const ups = Math.round((score * ratio) / (2 * ratio - 1));
    const downs = ups - score;
    return { ups, downs };
  };
  const { ups, downs } = numDownvotes(data.ups, data.ratio);
  console.log(big);

  return (
    <article
      id={`anchor-${index}`}
      className={big ? "big-post show" : "big-post"}
      // style={{ display: big ? "grid" : "none" }}
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
          {" "}
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
          <span>{}</span>
        </div>
      </div>
    </article>
  );
}
