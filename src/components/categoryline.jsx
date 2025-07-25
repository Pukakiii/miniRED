import { useLocation, Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export default function CategoryLine() {
  const numPosts = useSelector((state) => state.posts.posts.numPosts);
  const location = useLocation();
  
  let checkPoints = Math.floor(numPosts / 5);

  function createCheckPoints() {
    const checkPointsArray = [];
    for (let i = 0; i <= checkPoints; i++) {
      checkPointsArray.push(
        <a href={`#anchor-${i * 5}`} key={i} className="points">
          {i * 5}
        </a>
      );
    }
    return checkPointsArray;
  }

  function createCategoryLinks() {
    if (location.pathname.includes("popular")) {
      const categories = ["new", "hot", "best"];
      return categories.map((category) => (
        <NavLink
          key={category}
          className={({ isActive }) => (isActive ? "activated" : undefined)}
          to={`/popular/${category}`}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </NavLink>
      ));
    } else if (location.pathname.includes("subreddit")) {

    }
  }

  return (
    <>
      <section className="line">
        <div className="filter">
          {createCategoryLinks()}
        </div>
        <div className="feed-marker">
          <span>Jump to:</span>
          <div id="checkpoints">{createCheckPoints()}</div>
        </div>
        <div id="about">
          <a>About</a>
        </div>
      </section>
    </>
  );
}
