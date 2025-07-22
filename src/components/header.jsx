import logo from "../assets/minired-logo.png";
import { useLocation } from "react-router-dom";
import { useState } from "react";
export default function Header() {
  const [showHint, setShowHint] = useState(true);
  const location = useLocation();
  
  const isPopularPage = location.pathname.includes("/popular");
  
  function pageHeaderTitle() {
    if (location.pathname === "/") {
      return "MINI red";
    } else if (location.pathname === "/subreddit") {
      return "r/";
    } else if (isPopularPage) {
      return "r/Popular";
    } else {
      return "Unknown Page";
    }
  }

  function pageHeaderFeature() {
    if (location.pathname !== "/" && !isPopularPage) {
      return (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setShowHint(false);
          }}
          className="search-form"
        >
          <input type="text" placeholder="Animals, playboi carti, AI" />
          <button type="submit">Search</button>
          {showHint && <span>⬅ find your sub</span>}{" "}
        </form>
      );
    } else if (location.pathname === "/") {
      return <span className="header-helper">Choose your page</span>;
    } else {
      return <span className="shortcut">Press to find Ctrl + f / Cmd + f</span>;
    }
  }

  return (
    <header>
      {pageHeaderFeature()}
      <h1 className={location.pathname === "/" ? "minired-header" : ""}>
        {pageHeaderTitle()}
      </h1>
      <img
        style={{ height: 35, borderRadius: 5, border: "2px solid #ccc" }}
        src={logo}
        alt="Logo"
      />
    </header>
  );
}


