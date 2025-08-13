import logo from "../assets/minired-logo.png";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchSubThunk } from "../features/subreddit/subredditPostSlice";

export default function Header() {
  const [showHint, setShowHint] = useState(true);
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isPopularPage = location.pathname.includes("/popular");
  const isSubreddit = location.pathname.includes("/subreddit");
  console.log(params);

  function handleSubmit(e) {
    e.preventDefault();
    setShowHint(false);

    const input = e.target.querySelector("input");
    const formData = new FormData(e.target);
    const value = formData.get("sub");

    dispatch(fetchSubThunk(value))
    
    console.log(formData);
    console.log(value);
    console.log(location);
    console.log(e);
    
    input.value = "";
    navigate(`/subreddit/${value}`);
  }

  function pageHeaderTitle() {
    if (location.pathname === "/") {
      return "MINI red";
    } else if (isSubreddit) {
      return `r/${params.name ? params.name : ""}`;
    } else if (isPopularPage) {
      return "r/Popular";
    } else {
      return "Unknown Page";
    }
  }

  function pageHeaderFeature() {
    if (location.pathname !== "/" && !isPopularPage) {
      return (
        <form onSubmit={handleSubmit} className="search-form">
          <input
            name="sub"
            type="text"
            placeholder="Animals, playboi carti, AI"
          />
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
