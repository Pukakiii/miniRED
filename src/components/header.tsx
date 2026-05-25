import { Link, useLocation, useParams } from "react-router-dom";
import logo from "../assets/minired-logo.png";
import SubredditSearch from "./subredditSearch";

export default function Header() {
  const location = useLocation();
  const params = useParams<{ name?: string }>();

  const isPopularPage = location.pathname.includes("/popular");
  const isSubreddit = location.pathname.includes("/subreddit");
  const isSavedPage = location.pathname.includes("/saved");
  const isHome = location.pathname === "/";

  function pageHeaderTitle() {
    if (isHome) return "MINI red";
    if (isSubreddit) return `r/${params.name ?? ""}`;
    if (isPopularPage) return "r/Popular";
    if (isSavedPage) return "Saved";
    return "MINI red";
  }

  function pageHeaderFeature() {
    if (isSubreddit) return <SubredditSearch />;
    if (isHome) {
      return <span className="header-helper">Choose your page</span>;
    }
    if (isPopularPage) {
      return (
        <span className="shortcut">
          Press to find Ctrl + f / Cmd + f
        </span>
      );
    }
    return null;
  }

  return (
    <header>
      {pageHeaderFeature()}
      <h1 className={isHome ? "minired-header" : undefined}>
        {pageHeaderTitle()}
      </h1>
      <Link to="/" aria-label="Go to home">
        <img
          style={{ height: 35, borderRadius: 5, border: "2px solid #ccc" }}
          src={logo}
          alt="Minired logo"
        />
      </Link>
    </header>
  );
}
