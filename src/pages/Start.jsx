import { Link, NavLink, Outlet } from "react-router-dom";
import Header from "../components/header.jsx";
import Navbar from "../components/navbar.jsx";
import CategoryLine from "../components/categoryline.jsx";
import mainIcon from "../assets/navbar/main.svg";
import popIcon from "../assets/navbar/popoular.svg";

export default function Start() {
  return (
    <>
      <Header />
      <div className="start-nav">
        <Link to="/main">
          <img
            style={{ height: "100px", width: "100px" }}
            src={mainIcon}
            alt="main page"
          />
        </Link>
        <Link to="/popular">
          <img
            style={{ height: "100px", width: "100px" }}
            src={popIcon}
            alt="main page"
          />
        </Link>
      </div>
      <div id="flame-container"></div>
    </>
  );
}
