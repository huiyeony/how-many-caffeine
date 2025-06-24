import { useParams } from "react-router-dom";
import "./ArticleDetailPage.css";
import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import type { Article } from "../types/Article";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Progress } from "../components/Progress";
import { Tag } from "../components/Tag";
import ReactMarkDown from "react-markdown";
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
          <br />
          <div className="box-tags-wrapper">
            {article?.tags.map((item, index) => (
              <Tag key={index} item={item} />
            ))}
          </div>
          <br />
          <div className="image-wrapper">{/** 이미지 */}</div>

          <div>
            <ReactMarkDown>{article?.content}</ReactMarkDown>
          </div>
          <div className="profile-box">
            {/** 작성자 프로필  */}
            <img
              src="/images/optimized/햄찌.webp"
              width={100}
              height={100}
              style={{
                objectFit: "cover",
                borderRadius: "50%",
                margin: "0px",
                padding: "0px",
                border: "2px solid gray",
              }}
            />
            <div>
              <span> 관리자 </span> <br />
              <span> @쥑쥑 </span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
