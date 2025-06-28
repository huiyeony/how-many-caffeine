import { Link } from "react-router-dom";
import "./Header.css";
export default function Header() {
  return (
    <>
      {/* 헤더 */}
      <header className="header">
        {/* 헤더 로고 */}
        <div className="header__logo">
          <Link to={"/"}>얼마나 카페인</Link>
        </div>
        {/* 헤더 메뉴*/}
        <div className="header__menu">
          <a className="header__menu__item" href="/articles">
            {" "}
            햄 아티클{" "}
          </a>
          <a className="header__menu__item" href="challenges">
            {" "}
            햄 챌린지
          </a>
        </div>
      </header>
    </>
  );
}
