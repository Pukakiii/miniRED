import coments from "../assets/comments.svg";
import vote from "../assets/vote.svg";
import saved from "../assets/navbar/saved-menu.svg";

export default function PopReddPost({ data }) {
  console.log("obj keys:", Object.keys(data), data.url);
  return (
    <article className="post">
      <div
        id="pop-post-title-box"
        className="pop-post-title pop-cell"
        style={{ gridArea: "title" }}
      >
        <h3
          id="pop-post-title"
          className="pop-cell"
          style={{ gridArea: "title" }}
        >
          {data.title}
        </h3>
      </div>
      <time
        id="time"
        className="pop-cell"
        datetime=""
        style={{ gridArea: "time" }}
      >
        {data.timeAgo}
      </time>
      <section
        className="pop-post-content pop-cell"
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
          <span className="post-title"> {data.author}</span>
          <span className="post-sub"> {data.subReddit}</span>
          {data.selftext && (
            <span className="post-more"> {data.selftext}</span>
          )}{" "}
        </div>
      </section>

      <div id="upvote" className="pop-cell">
        <img
          src={vote}
          style={{ transform: "rotate(180deg)", gridArea: "upvote" }}
          alt="up Vote icon"
        />
        <span>{data.ups}</span>
      </div>
      <div id="downvote" className="pop-cell">
        <img style={{ gridArea: "downvote" }} src={vote} alt="down Vote icon" />
        <span>{data.ups}</span>
      </div>
      <div id="comments" className="pop-cell">
        <img
          style={{ gridArea: "comments" }}
          src={coments}
          alt="Comments icon"
        />
        <span>{data.ups}</span>
      </div>
      <div id="saved" className="pop-cell">
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
