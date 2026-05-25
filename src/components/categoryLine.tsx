import { useParams, useLocation, NavLink, Link } from "react-router-dom";
import { useMemo } from "react";
import { useAppSelector } from "../app/hooks";
import type { RootState } from "../app/store";
import type { PostRecord } from "../types";
import { anchorLabel, getAnchorIndices } from "../utils/anchorUtils";
import { useActivePostAnchor } from "../hooks/useActivePostAnchor";

function filterByFlair(posts: PostRecord[], flair?: string) {
  if (!flair) return posts;
  return posts.filter((postObj) => {
    const [, data] = Object.entries(postObj)[0];
    return data?.category === flair;
  });
}

export default function CategoryLine() {
  const location = useLocation();
  const params = useParams<{ name?: string; flair?: string }>();

  const linkFlairs = useAppSelector(
    (state: RootState) => state.subreddit.posts.linkFlairs ?? [],
  );

  const postsArr = useAppSelector((state: RootState) => {
    if (location.pathname.includes("popular"))
      return state.popular.posts.data ?? [];
    if (location.pathname.includes("subreddit"))
      return state.subreddit.posts.data ?? [];
    return [];
  });

  const displayedPosts = useMemo(
    () => filterByFlair(postsArr, params.flair),
    [postsArr, params.flair],
  );

  const anchorIndices = getAnchorIndices(displayedPosts.length);

  const anchorPostIds = useMemo(
    () =>
      anchorIndices
        .map((idx) => {
          const postObj = displayedPosts[idx];
          if (!postObj) return null;
          return Object.keys(postObj)[0];
        })
        .filter((id): id is string => Boolean(id)),
    [anchorIndices, displayedPosts],
  );

  const activePostId = useActivePostAnchor(anchorPostIds);

  function createCheckPoints() {
    return anchorIndices.map((idx) => {
      const postObj = displayedPosts[idx];
      if (!postObj) return null;
      const [id] = Object.keys(postObj);
      const isActive = activePostId === id;
      return (
        <a
          href={`#post-${id}`}
          key={id}
          className={isActive ? "points points-active" : "points"}
        >
          {anchorLabel(idx)}
        </a>
      );
    });
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
        <p className="filter-empty">no categories here</p>
      );
    }

    return null;
  }

  if (location.pathname === "/" || location.pathname.includes("/saved")) {
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
        <Link target="_blank" to={"https://github.com/Pukakiii/miniRED/blob/rapid/README.md"}>About</Link>
      </div>
    </section>
  );
}
