import { NavLink } from "react-router-dom";
import popular from "../assets/navbar/popoular.svg";
import refresh from "../assets/navbar/refresh.svg";
import main from "../assets/navbar/main.svg";
import setting from "../assets/navbar/settings.svg";
import saved from "../assets/navbar/saved-menu.svg";

export default function Navbar() {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li>
          <NavLink to="/popular">
            <img src={popular} alt="popular" />
          </NavLink>
        </li>
        <li>
          <NavLink to="/main">
            <img src={refresh} alt="refresh" />
          </NavLink>
        </li>
        <li>
          <NavLink to="/subreddit">
            <img src={main} alt="main" />
          </NavLink>
        </li>
        <li>
          <NavLink to="/main">
            <img src={setting} alt="setting" />
          </NavLink>
        </li>
        <li>
          <NavLink to="/main">
            <img src={saved} alt="saved" />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
