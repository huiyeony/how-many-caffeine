import styles from "./BarCharts.module.css";
import BarChartItem from "./BarChartItem";
import type { CoffeeItem } from "../types/CoffeeItem";
import { supabase } from "../supabase";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
} from "react";
const drinks = ["아메리카노", "녹차", "초코", "밀크티"];
const brands = [
  "공차",
  "달콤커피",
  "더벤티",
  "뚜레주르",
  "매머드커피",
  "메가커피",
  "바나다커피",
  "바나프레소",
  "배스킨라빈스",
  "빽다방",
  "스타벅스",
  "이디야",
  "카페게이트",
  "카페봄봄",
  "컴포즈",
  "컴포즈커피",
  "테라커피",
  "투썸플레이스",
  "파리바게트",
  "파스쿠찌",
  "폴바셋",
  "하삼동커피",
  "할리스",
];
interface BarChartsProps {
  checked: boolean;
  MAX_COFFEE: number;
}
const PAGE_SIZE = 50;
export default function BarCharts(props: BarChartsProps) {
  const [search, setSearch] = useState<string>("");
  const [iceType, setIceType] = useState<"ice" | "hot" | null>("ice");
  const [drinkName, setDrinkName] = useState<string | null>("아메리카노");
  const [brandName, setBrandName] = useState<string | null>("");
  const loadingRef = useRef(0);
  const hasMoreRef = useRef(1);
  const htmlDomRef = useRef<HTMLDivElement | null>(null);
  const pageRef = useRef(0);
  const [datas, setDatas] = useState<CoffeeItem[] | null>(null);
  const handleIceType = (type: "ice" | "hot") => {
    setIceType((prev) => (prev == type ? null : type));
  };
  const handleDrinksType = (type: string) => {
    setDrinkName((prev) => (prev == type ? null : type));
  };
  const handleBrandType = (type: string) => {
    setBrandName((prev) => (prev == type ? null : type));
  };
  //supabase 데이터 로드 함수
  const loadAsync = useCallback(async () => {
    if (loadingRef.current || !hasMoreRef.current) return;
    loadingRef.current = 1;
    const from = pageRef.current * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    let query = supabase
      .from("notes")
      .select("*")
      .eq("type", iceType)
      .ilike("prd", `${drinkName}`);

    if (search) {
      query = query.ilike("div", `%${search}%`);
    }
    query = query
      .order("caf", { ascending: false }) //내림차순
      .range(from, to);

    const { data, error } = await query;
    if (error) {
      console.log(`데이터를 불러오는데 실패했습니다 : ${error.message}`);
      return;
    }
    pageRef.current += 1; //다음에 불러올 페이지
    if (data.length < PAGE_SIZE) {
      hasMoreRef.current = 0;
    } else {
      hasMoreRef.current = 1;
    } //불러올 페이지가 남았는지
    setDatas((prev) =>
      pageRef.current == 0 ? [...data] : [...(prev || []), ...data]
    ); //react 변수에 저장
    loadingRef.current = 0;
  }, [iceType, drinkName, search]);
  useEffect(() => {
    //무한스크롤링 트리거 설정
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0] && !loadingRef.current && hasMoreRef.current) {
          loadAsync();
        }
      },
      { threshold: 1 }
    );
    const ref = htmlDomRef.current;
    if (ref) observer.observe(ref);

    loadingRef.current = 0;
    return () => {
      if (ref) observer.unobserve(ref);
    };
  }, [loadAsync]);
  //검색어 입력시 loadAsync

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setSearch(e.target.value);
    hasMoreRef.current = 1;
    pageRef.current = 0;
    setDatas([]);
  };
  useEffect(() => {
    loadAsync();
  }, [search]);
  return (
    <div className={styles.barchartsContainer}>
      <div className={styles.filterWrapper}>
        <div className={styles.section}>
          <button
            className={iceType == "ice" ? styles.active : ""}
            onClick={() => handleIceType("ice")}
          >
            ice
          </button>
          <button
            className={iceType == "hot" ? styles.active : ""}
            onClick={() => handleIceType("hot")}
          >
            hot
          </button>
        </div>
        <div className={styles.section}>
          {drinks.map((item) => (
            <button
              key={item}
              onClick={() => handleDrinksType(item)}
              className={drinkName == item ? styles.active : ""}
            >
              {item}
            </button>
          ))}
        </div>
        <div className={`${styles.section} ${styles.scrollable}`}>
          {brands.map((item) => (
            <button
              key={item}
              className={brandName == item ? styles.active : ""}
              onClick={() => setBrandName(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <input
        type="text"
        placeholder="브랜드 이름을 입력하세요 (예: 스타벅스)"
        value={search}
        onChange={handleSearch}
        className="search-bar"
      />
      <div className={styles.barcharts}>
        {datas?.map((item, index) => (
          <BarChartItem
            key={item.prd + index}
            div={item.div}
            type={item.type}
            prd={item.prd}
            caf={item.caf}
            checked={props.checked}
            MAX_COFFEE={props.MAX_COFFEE}
          />
        ))}
        <div ref={htmlDomRef} className={styles.hasMoreRef}>
          {!hasMoreRef.current ? "더이상 데이터가 없습니다" : ""}
        </div>
      </div>
    </div>
  );
}
