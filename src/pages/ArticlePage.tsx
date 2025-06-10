import "./ArticlePage.css";
import { Card } from "../components/Card";
import Header from "../components/Header";
import Footer from "../components/Footer";

import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import type { Article } from "../types/Article";

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
          <Card article={item} key={item.id} />
        ))}
      </div>
      <Footer />
    </>
  );
}
