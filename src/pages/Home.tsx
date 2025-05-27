import { useEffect, useState } from "react";
import { data } from "../data/coffee.data";
const MAX_COFFEE = 400;
import "./Home.css";
import Sidebar from "../components/Sidebar";
export const Home = () => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [checked, setChecked] = useState(false);

  const onChange = () => {
    setChecked(!checked);
  };

  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 800);
    return () => clearTimeout(timer);
  }, [search]);
  const filteredData = data.filter((item) =>
    item.name?.toLowerCase().includes(debouncedSearch.toLowerCase())
  );
  //특정 브랜드 DOM 요소로 스크롤 하는 함수

  return (
    <>
      <header className="App-header">
        <button
          style={{
            fontSize: "2rem",
            background: "none",
            border: "none",
            cursor: "pointer",
            margin: "0px 8px",
          }}
          onClick={toggleSidebar}
        >
          ≣
        </button>
        <div className="App-title">
          <h2>💁‍♀️카페인 함량 비교☕️</h2>
        </div>
      </header>
      <Sidebar
        isOpen={isOpen}
        onClose={toggleSidebar}
        onChange={(brand: string) => {
          setSearch(brand);
        }}
      />
      <div className="container">
        <div className="toggle-wrapper">
          <div className="toggle-label">
            보기 기준 :{" "}
            {checked ? "☕️ 샷 당 카페인(mg/shot)" : "총 카페인(mg)"}{" "}
          </div>
          <label className="switch">
            <input type="checkbox" checked={checked} onChange={onChange} />
            <span className="slider"></span>
          </label>
        </div>
        <input
          type="text"
          placeholder="브랜드 이름을 입력하세요 (예: 스타벅스)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-bar"
        />

        <div className="bar_charts">
          {filteredData.map((item) => {
            const bar_width = checked
              ? (item.caffeine / 2 / MAX_COFFEE) * 100
              : (item.caffeine / MAX_COFFEE) * 100;
            console.log(item.name);
            return (
              <div className="bar-row" key={item.name}>
                <div className="bar-label">{item.name} </div>
                <div className="bar-wrapper">
                  <div
                    className="bar"
                    style={{
                      width: `${bar_width}%`,
                      backgroundColor:
                        item.caffeine >= 200 ? "#fb2c36" : "#51a2ff",
                    }}
                  >
                    {checked ? item.caffeine / 2 : item.caffeine}mg
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <footer>
          <div className="desc">
            2샷 Ice 아메리카노 카페인 함량입니다.(2025/05월 기준)
          </div>
        </footer>
      </div>
    </>
  );
};
