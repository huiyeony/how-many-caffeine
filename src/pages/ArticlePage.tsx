import "./ArticlePage.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import type { Article } from "../types/Article";
import { ArticleItem } from "../components/ArticleItem";

export default function ArticlePage() {
  const [articles, setArticles] = useState<Article[] | null>(null);
  useEffect(() => {
    const fetchArticles = async () => {
      const { data, error } = await supabase.from("news").select("*");
      if (error) {
        console.error(error);
        return;
      }
      setArticles(data);
    };
    fetchArticles();
  }, []);
  return (
    <>
      <Header />
      <div className="articles-container">
        {articles?.map((item) => (
          <ArticleItem article={item} key={item.id} />
        ))}
      </div>
      <Footer />
    </>
  );
}
