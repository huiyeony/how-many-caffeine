import { useEffect, useState } from "react";
import { data } from "../data/coffee.data";
const MAX_COFFEE = 400;
import "./Home.css";
export const Home = () => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [checked, setChecked] = useState(false);
  const onChange = () => {
    setChecked(!checked);
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
  return (
    <div className="container">
      <h2>💁‍♀️카페인 함량 비교☕️</h2>
      <span className="desc">
        2샷 Ice 아메리카노 카페인 함량입니다. (연하게x, 샷추가x, 그란데사이즈x)
      </span>
      <div />
      <span className="desc">
        모든 정보는 공식 홈페이지 영양 성분표를 참고했습니다! (2025년 5월 기준)
      </span>
      <div className="toggle-wrapper">
        <div className="toggle-label">
          보기 기준 : {checked ? "☕️ 샷 당 카페인(mg/shot)" : "총 카페인(mg)"}{" "}
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
    </div>
  );
};
