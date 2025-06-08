import { useNavigate } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const nav = useNavigate();
  return (
    <>
      <header className="header">
        <div className="left">
          <div className="logo">얼마나 카페인</div>
          <div className="nav">
            <a href="/magazine">Magazine</a>
            <div className={`subNavWrapper`}>
              <div className="subNav">
                <button onClick={() => nav("/magazine/challenges")}>
                  Challenges
                </button>
                <button onClick={() => nav("/magazine/categories")}>
                  카테고리
                </button>
                <button onClick={() => nav("/magazine/challenges/new")}>
                  내 챌린지 만들기
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="right">
          <button className="icon">🌙</button>
        </div>
      </header>
    </>
  );
}
