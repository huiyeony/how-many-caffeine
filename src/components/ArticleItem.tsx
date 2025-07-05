import { Link } from "react-router-dom";
import "./ArticleItem.css";

import ReactMarkDown from "react-markdown";
import type { Article } from "@/types/Article";
interface Props {
  article: Article;
}
export const ArticleItem: React.FC<Props> = ({ article }) => {
  return (
    <>
      <Link
        to={`/articles/${article.id}`}
        key={article.id}
        className="article-card"
      >
        <div className="article-content">
          <h1>{article.title}</h1>
          <div className="p">
            <ReactMarkDown>{article.content}</ReactMarkDown>
          </div>
          <div className="article-date">{article.date}</div>
        </div>
      </Link>
    </>
  );
};
