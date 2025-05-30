import { useState } from "react";
const MAX_COFFEE = 400;
import "./Home.css";
import Footer from "../components/Footer";
import BarCharts from "../components/Barcharts";

export const Home = () => {
  const [checked, setChecked] = useState(false);
  const onChange = () => {
    setChecked(!checked);
  };
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

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
          }}
          onClick={toggleSidebar}
        >
          ≣
        </button>
        <div className="App-title">
          <img src="/aa.png" width={55} height={55} />
          <img src="title.png" width={70} />
        </div>
      </header>
      {/* <Sidebar
        isOpen={isOpen}
        onClose={toggleSidebar}
        onChange={(brand: string) => {
          setSearch(brand);
        }}
      /> */}
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

        <div className="bar_charts">
          <BarCharts checked={checked} MAX_COFFEE={MAX_COFFEE} />
        </div>
      </div>
      <Footer />
    </div>
  );
};
