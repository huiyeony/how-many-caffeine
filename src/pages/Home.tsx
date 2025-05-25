import { useEffect, useRef, useState } from "react";
import { data } from "../data/coffee.data";
const MAX_COFFEE = 400;
import "./Home.css";
export const Home = () => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [checked, setChecked] = useState(false);
  //각 브랜드의 DOM 요소를 참조하기 위한 맵
  const itemRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
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
  //특정 브랜드 DOM 요소로 스크롤 하는 함수
  const scrollToBrand = (brandName: string) => {
    const foundItem = filteredData.find(
      (item) => item.name === brandName.toLowerCase()
    );
    if (foundItem && itemRefs.current[foundItem.name]) {
      itemRefs.current[foundItem.name]?.scrollIntoView({
        behavior: "smooth",
        block: "center", //요소를 화면 중앙으로 스크롤
      });
      //스크롤후 해당 아이템을 잠시 강조하는 시간
      itemRefs.current[foundItem.name]?.classList.add("highlight");
      setTimeout(() => {
        itemRefs.current[foundItem.name]?.classList.remove("highlight");
      }, 7000);
    }
  };
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
      <div className="brand-tags">
        <button
          className="tag-button mega"
          onClick={() => scrollToBrand("메가커피")}
        >
          메가커피
        </button>
        <button
          className="tag-button compose"
          onClick={() => {
            scrollToBrand("컴포즈");
          }}
        >
          컴포즈
        </button>
        <button
          className="tag-button starbucks"
          onClick={() => {
            scrollToBrand("스타벅스");
          }}
        >
          스타벅스
        </button>
        <button
          className="tag-button ediya"
          onClick={() => {
            scrollToBrand("이디야");
          }}
        >
          이디야
        </button>
        <button
          className="tag-button banapresso"
          onClick={() => {
            scrollToBrand("바나프레소");
          }}
        >
          바나프레소
        </button>
        <button
          className="tag-button bbaeck"
          onClick={() => {
            scrollToBrand("빽다방");
          }}
        >
          빽다방
        </button>
        <button
          className="tag-button bombom"
          onClick={() => {
            scrollToBrand("카페봄봄");
          }}
        >
          카페봄봄
        </button>
        <button
          className="tag-button paris"
          onClick={() => {
            scrollToBrand("파리바게트");
          }}
        >
          파리바게트
        </button>
        <button
          className="tag-button the_venti"
          onClick={() => {
            scrollToBrand("더벤티");
          }}
        >
          더벤티
        </button>
        <button
          className="tag-button twosome"
          onClick={() => {
            scrollToBrand("투썸플레이스");
          }}
        >
          투썸플레이스
        </button>
        <button
          className="tag-button paulbausset"
          onClick={() => {
            scrollToBrand("폴바셋");
          }}
        >
          폴바셋
        </button>
        <button
          className="tag-button baskin"
          onClick={() => {
            scrollToBrand("배스킨라빈스");
          }}
        >
          배스킨라빈스
        </button>
        <button
          className="tag-button gate"
          onClick={() => {
            scrollToBrand("카페게이트");
          }}
        >
          카페게이트
        </button>
        <button
          className="tag-button gongcha"
          onClick={() => {
            scrollToBrand("공차");
          }}
        >
          공차
        </button>
        <button
          className="tag-button tera"
          onClick={() => {
            scrollToBrand("테라커피");
          }}
        >
          테라커피
        </button>
        <button
          className="tag-button dalcom"
          onClick={() => {
            scrollToBrand("달콤커피");
          }}
        >
          달콤커피
        </button>
        <button
          className="tag-button hollys"
          onClick={() => {
            scrollToBrand("할리스");
          }}
        >
          할리스
        </button>
        <button
          className="tag-button mammoth"
          onClick={() => {
            scrollToBrand("매머드커피");
          }}
        >
          매머드커피
        </button>
        <button
          className="tag-button hasamdong"
          onClick={() => {
            scrollToBrand("하삼동커피");
          }}
        >
          하삼동커피
        </button>
      </div>
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
            <div
              className="bar-row"
              key={item.name}
              ref={(el) => {
                itemRefs.current[item.name] = el;
              }}
            >
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
