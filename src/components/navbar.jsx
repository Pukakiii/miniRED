import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar">
        <ul className="nav-list">
          <li>
            <NavLink to="/main">Main</NavLink>
          </li>
          <li>
            <NavLink to="/main">Main</NavLink>
          </li>
          <li>
            <NavLink to="/main">Main</NavLink>
          </li>
          <li>
            <NavLink to="/main">Main</NavLink>
          </li>
          <li>
            <NavLink to="/main">Main</NavLink>
          </li>
        </ul>
      </nav>
  )
}