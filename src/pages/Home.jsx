import { NavLink } from "react-router-dom";
import Header from "../components/header.jsx";
import Navbar from "../components/navbar.jsx";
export default function Home() {
  return (
    <>
      <Header />
      <div className="home">
        <h3>Select the page here</h3>
      </div>
      <Navbar />
    </>
  );
}
