import { Link } from "react-router-dom";
import "./ArticleItem.css";
import type { Article } from "../types/Article";
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
        <img
          src={article.imageUrl}
          height={200}
          width={"auto"}
          className="article-image"
        />
        <div className="article-content">
          <h3>{article.title}</h3>
          <p>{article.content}</p>
          <div className="article-date">{article.date}</div>
        </div>
      </Link>
    </>
  );
};
