import { Link } from "react-router-dom";
import "./ArticleItem.css";
import type { Article } from "../types/Article";
import ReactMarkDown from "react-markdown";
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
