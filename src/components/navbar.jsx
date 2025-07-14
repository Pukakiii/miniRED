import { NavLink } from 'react-router-dom';
import popular from '../assets/popoular.svg';
import refresh from '../assets/refresh.svg';
import main from '../assets/main.svg';
import setting from '../assets/settings.svg';
import saved from '../assets/saved-menu.jpg';
export default function Navbar() {
  return (
    <nav className="navbar">
        <ul className="nav-list">
          <li>
            <NavLink to="/pop"><img src={popular} alt="popular" /></NavLink>
          </li>
          <li>
            <NavLink to="/main"><img src={refresh}alt="refresh" /></NavLink>
          </li>
          <li>
            <NavLink to="/main"><img src={main} alt="main" /></NavLink>
          </li>
          <li>
            <NavLink to="/main"><img src={setting} alt="setting" /></NavLink>
          </li>
          <li>
            <NavLink to="/main"><img src={saved} alt="saved" /></NavLink>
          </li>
        </ul>
      </nav>
  )
}