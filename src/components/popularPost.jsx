import coments from "../assets/comments.svg";
import vote from "../assets/vote.svg";
import saved from "../assets/navbar/saved-menu.svg";

export default function PopPost({ data, index }) {
  const numDownvotes = (score, ratio) => {
    const ups = Math.round((score * ratio) / (2 * ratio - 1));
    const downs = ups - score;
    return { ups, downs };
  };
  const { ups, downs } = numDownvotes(data.ups, data.ratio);
  console.log("data:", data, "index:", index);
  // console.log("obj urls:", data.url);

  return (
    <article id={`anchor-${index}`} className="post">
      <div
        id="popular-post-title-box"
        className="popular-post-title popular-cell"
        style={{ gridArea: "title" }}
      >
        <h3
          id="popular-post-title"
          className="popular-cell"
          style={{ gridArea: "title" }}
        >
          {data.title}
        </h3>
      </div>
      <time
        id="time"
        className="popular-cell"
        style={{ gridArea: "time" }}
      >
        {data.timeAgo}
      </time>
      <section
        className="popular-post-content popular-cell"
        style={{
          gridArea: "content",
          height: 180,
          width: "100%",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <img src={data.url} id="content-img" />
        <div className="post-info">
          <span className="post-author">u/{data.author}</span>
          <span className="post-sub"> {data.subReddit}</span>
          {data.selftext && (
            <span className="post-more"> {data.selftext}</span>
          )}{" "}
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
        <img style={{ gridArea: "downvote" }} src={vote} alt="down Vote icon" />
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
        <span>{}</span>
      </div>
    </article>
  );
}
