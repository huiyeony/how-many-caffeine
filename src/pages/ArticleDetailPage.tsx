import { useParams } from "react-router-dom";
import "./ArticleDetailPage.css";
import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import type { Article } from "../types/Article";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Progress } from "../components/Progress";
import { Tag } from "../components/Tag";
export default function ArticleDetailPage() {
  const { id } = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("news")
        .select("*")
        .eq("id", id)
        .single();
      if (error) {
        return <div>해당 데이터가 존재하지 않습니다.</div>;
      }
      setArticle(data);
    };
    fetchData();
  }, [id]);

  return (
    <div className="article-container">
      <Progress />
      <Header />
      <div className="article-body">
        <div className="article-body-content">
          <span className="article-title">{article?.title}</span>

          <div className="box-items-wrapper">
            <span> 🐹 관리자 | </span>

            <span>🕘 2분 | </span>

            <span>✨ 인기 | </span>
            <span>{article?.date}</span>
          </div>
          <div className="box-tags-wrapper">
            {article?.tags.map((item) => (
              <Tag item={item} />
            ))}
          </div>

          <img
            className="article-image"
            src={article?.imageUrl}
            alt={article?.title}
          />

          <p>{article?.content}</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
