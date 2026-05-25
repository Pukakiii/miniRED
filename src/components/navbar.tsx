import { NavLink, useLocation } from "react-router-dom";
import popular from "../assets/navbar/popoular.svg";
import refresh from "../assets/navbar/refresh.svg";
import main from "../assets/navbar/main.svg";
import setting from "../assets/navbar/settings.svg";
import savedIcon from "../assets/navbar/saved-menu.svg";

export default function Navbar() {
  const location = useLocation();

  const refreshTarget =
    location.pathname.includes("popular")
      ? "/popular/best"
      : location.pathname.includes("subreddit")
        ? location.pathname
        : "/";

  return (
    <nav className="navbar" aria-label="Main navigation">
      <ul className="nav-list">
        <li>
          <NavLink to="/popular/best">
            <img src={popular} alt="popular" />
          </NavLink>
        </li>
        <li>
          <NavLink to="/">
            <img src={refresh} alt="refresh feed" />
          </NavLink>
        </li>
        <li>
          <NavLink to="/subreddit">
            <img src={main} alt="subreddit" />
          </NavLink>
        </li>
        <li>
          <NavLink to="/">
            <img src={setting} alt="home" />
          </NavLink>
        </li>
        <li>
          <NavLink to="/saved">
            <img src={savedIcon} alt="saved" />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
