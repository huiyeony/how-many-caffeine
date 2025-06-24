import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  return (
    <>
      <header className="header">
        <div className="left">
          <Link to={"/"}>
            <div className="logo">
              <img src="title.png" width={"auto"} height={100} />
            </div>
          </Link>

          <div className="nav">
            <a href="/articles">Articles</a>
            <div className={`subNavWrapper`}>
              <div className="subNav">
                <Link to={"/articles"}>Articles</Link>
                <Link to={"/articles/categories"}>카테고리</Link>
                <Link to={"/articles/new"}>아티클 만들기</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="right">
          <button className="icon"></button>
        </div>
      </header>
    </>
  );
}
