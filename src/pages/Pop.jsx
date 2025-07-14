import { NavLink } from "react-router-dom";
import Header from "../components/header.jsx";
import Navbar from "../components/navbar.jsx";
import CategoryLine from "../components/categoryline.jsx";
import Posts from "../components/posts.jsx";
export default function Popular() {
  return (
    <>
      <Header />
      <CategoryLine />
      <Posts />
      <Navbar />
    </>
  );
}
