import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Start from "./pages/Start.jsx";
import Subreddit from "./pages/SubReddit.jsx";
import Popular from "./pages/Popular.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="subreddit" element={<Subreddit />} />
        <Route path="popular" element={<Popular />} />
        <Route path="popular/new" element={<Popular />} />
        <Route path="popular/hot" element={<Popular />} />
        <Route path="popular/best" element={<Popular />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
