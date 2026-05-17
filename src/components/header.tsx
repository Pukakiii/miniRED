import logo from "../assets/minired-logo.png";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useState, type FormEvent } from "react";
import { useAppDispatch } from "../app/hooks";
import { fetchSubThunk } from "../features/subreddit/subredditPostSlice";

export default function Header() {
  const [showHint, setShowHint] = useState(true);
  const location = useLocation();
  const params = useParams<{ name?: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isPopularPage = location.pathname.includes("/popular");
  const isSubreddit = location.pathname.includes("/subreddit");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setShowHint(false);

    const form = e.currentTarget;
    const input = form.querySelector<HTMLInputElement>("input");
    const formData = new FormData(form);
    const rawValue = formData.get("sub");
    const value =
      typeof rawValue === "string" ? rawValue.replace(/\s+/g, "") : "";

    if (!input || !value) {
      return;
    }

    dispatch(fetchSubThunk(value));
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
