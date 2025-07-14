import { NavLink } from "react-router-dom";
import Header from "../components/header.jsx";
import Navbar from "../components/navbar.jsx";
import CategoryLine from "../components/categoryline.jsx";
export default function Main() {
  return (
    <>
      <Header />
      <CategoryLine />
      <div className="main">
        <h3>↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑
<br />Select category</h3>
      </div>
      <Navbar />
    </>
  );
}
