import { useState } from "react";
import { data } from "../data/coffee.data";
const MAX_COFFEE = 400;
import "./Home.css";
export const Home = () => {
  const graphData = data.map((item) => ({ name: item.Name, caffeine: item.R }));
  const [search, setSearch] = useState("");
  const filteredData = graphData.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="container">
      <h2>💁‍♀️카페인 함량 비교☕️</h2>
      <input
        type="text"
        placeholder="브랜드 이름을 입력하세요 (예: 스타벅스)"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
      />

      <div className="bar_charts">
        {filteredData.map((item, index) => {
          const bar_width = (item.caffeine / MAX_COFFEE) * 100;
          return (
            <div className="bar-row" key={index}>
              <div className="bar-label">{item.name} (R)</div>
              <div className="bar-wrapper">
                <div
                  className="bar"
                  style={{
                    width: `${bar_width}%`,
                    backgroundColor:
                      item.caffeine >= 200 ? "#fb2c36" : "#51a2ff",
                  }}
                >
                  {item.caffeine}mg
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
