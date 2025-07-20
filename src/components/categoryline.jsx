import { useLocation, Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export default function CategoryLine() {
  const numPosts = useSelector((state) => state.posts.posts.numPosts);
  let checkPoints = Math.floor(numPosts / 5);

  function createCheckPoints() {
    const checkPointsArray = [];
    for (let i = 0; i <= checkPoints; i++) {
      checkPointsArray.push(<Link key={i} className="points">{i*5}</Link>);
    }
    return checkPointsArray;
  }
  return (
    <>
      <section className="line">
        <div className="filter">
          <NavLink
            className={({ isActive }) => (isActive ? "activated" : undefined)}
            to="/popular/new"
          >
            New
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "activated" : undefined)}
            to="/popular/hot"
          >
            Hot
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "activated" : undefined)}
            to="/popular/best"
          >
            Best
          </NavLink>
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
