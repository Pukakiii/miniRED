import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Start from "./pages/Start.jsx";
import Main from "./pages/Main.jsx";
import Popular from "./pages/Popular.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="main" element={<Main />} />
        <Route path="popular" element={<Popular />} />
        <Route path="popular/new" element={<Popular />} />
        <Route path="popular/hot" element={<Popular />} />
        <Route path="popular/best" element={<Popular />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
