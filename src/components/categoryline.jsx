import { useLocation, Link, NavLink } from "react-router-dom";

export default function CategoryLine() {
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
        <div id="about">
          <a>About</a>
        </div>
      </section>
    </>
  );
}
