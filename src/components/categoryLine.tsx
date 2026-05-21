import { useParams, useLocation, NavLink } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import type { RootState } from "../app/store";
import type { ReactElement } from "react";

export default function CategoryLine() {
  const location = useLocation();
  const params = useParams<{ name?: string }>();

  const numPosts = useAppSelector((state: RootState) => {
    if (location.pathname.includes("popular")) {
      return state.popular.posts.numPosts;
    }
    if (location.pathname.includes("subreddit")) {
      return state.subreddit.posts.numPosts;
    }
    return 0;
  });

  const linkFlairs = useAppSelector(
    (state: RootState) => state.subreddit.posts.linkFlairs ?? [],
  );

  const checkPoints = Math.max(0, Math.floor(numPosts / 5));

  function createCheckPoints() {
    const checkPointsArray: ReactElement[] = [];
    for (let i = 0; i <= checkPoints; i++) {
      checkPointsArray.push(
        <a href={`#anchor-${i * 5}`} key={i} className="points">
          {i * 5}
        </a>,
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
    }

    if (location.pathname.includes("subreddit")) {
      return linkFlairs.length > 0 ? (
        <>
          <NavLink to={`/subreddit/${params.name ?? ""}`}>All</NavLink>
          {linkFlairs.map((flair, i) => (
            <NavLink
              key={i}
              to={`/subreddit/${params.name ?? ""}/${flair}`}
              className={({ isActive }) => (isActive ? "activated" : undefined)}
            >
              {flair}
            </NavLink>
          ))}
        </>
      ) : (
        <p style={{ color: "rgba(0, 0, 0, 0.5)" }}>no categories here</p>
      );
    }

    return null;
  }

  return (
    <section className="line">
      <div className="filter">{createCategoryLinks()}</div>
      <div className="feed-marker">
        <span>Jump to:</span>
        <div id="checkpoints">{createCheckPoints()}</div>
      </div>
      <div id="about">
        <a>About</a>
      </div>
    </section>
  );
}
