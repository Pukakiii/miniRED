import logo from "../assets/minired-logo.png";
import { useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const isPopularPage = location.pathname.includes("/popular");
  console.log("Header location:", location.pathname);
  function pageHeaderTitle() {
    if (location.pathname === "/") {
      return "MINI red";
    } else if (location.pathname === "/main") {
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
        <form className="search-form">
          <input type="text" placeholder="r/Animals..." />
          <button type="submit">Search</button>
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

function pageHeaderFeature() {
  {
    location.pathname !== "/" && !isPopularPage ? (
      <form className="search-form">
        <input type="text" placeholder="r/Animals..." />
        <button type="submit">Search</button>
      </form>
    ) : (
      <span className="shortcut">Press to find Ctrl + f / Cmd + f</span>
    );
  }
}
