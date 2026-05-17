import { Link } from "react-router-dom";
import Header from "../components/header";
import mainIcon from "../assets/navbar/main.svg";
import popIcon from "../assets/navbar/popoular.svg";

export default function Start() {
  return (
    <>
      <Header />
      <div className="start-nav">
        <Link to="/subreddit">
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
