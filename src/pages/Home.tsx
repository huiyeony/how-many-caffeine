import { useEffect, useState } from "react";
import { data } from "../data/coffee.data";
const MAX_COFFEE = 400;
import "./Home.css";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import BarChartItem from "../components/BarChartItem";
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
    <div className="main">
      <header className="App-header">
        <button
          style={{
            fontSize: "2rem",
            background: "none",
            border: "none",
            cursor: "pointer",
            margin: "0px 28px",
          }}
          onClick={toggleSidebar}
        >
          ≣
        </button>
        <div className="App-title">
          <h2 onClick={() => setSearch("")}>💁‍♀️카페인 함량 비교☕️</h2>
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
          {filteredData.map((item) => (
            <BarChartItem
              name={item.name}
              caffeine={item.caffeine}
              checked={checked}
              MAX_COFFEE={MAX_COFFEE}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};
