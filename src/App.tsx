import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home";
import ArticlePage from "./pages/ArticlePage";
import ArticleDetailPage from "./pages/ArticleDetailPage";
import EditorPage from "./pages/EditorPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles" element={<ArticlePage />} />
        <Route path="articles/:id" element={<ArticleDetailPage />} />
        <Route path="articles/new" element={<EditorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
