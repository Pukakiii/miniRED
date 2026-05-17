import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Start from "./pages/Start";
import Subreddit from "./pages/SubReddit";
import Popular from "./pages/Popular";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="subreddit" element={<Subreddit />} />
        <Route path="subreddit/:name" element={<Subreddit />} />
        <Route path="subreddit/:name/:flair" element={<Subreddit />} />
        <Route path="popular" element={<Popular />} />
        <Route path="popular/new" element={<Popular />} />
        <Route path="popular/hot" element={<Popular />} />
        <Route path="popular/best" element={<Popular />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
