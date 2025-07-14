import { use } from "react";
import { useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  function pageHeader() {
    if (location.pathname === "/") {
      return "Start Page";
    } else if (location.pathname === "/main") {
      return "r/";
    } else if (location.pathname === "/pop") {
      return "r/Popular";
    } else {
      return "Unknown Page";
    }
  }
  return (
    <header>
      <form>
        <input type="text" placeholder="Search..." />
        <button type="submit">Search</button>
      </form>
      <h1>{pageHeader()}</h1>
      <img
        style={{ height: 35 }}
        src="src/assets/minired-logo.png"
        alt="Logo"
      />
    </header>
  );
}
