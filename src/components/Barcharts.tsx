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

interface BarChartsProps {
  checked: boolean;
  MAX_COFFEE: number;
}
const PAGE_SIZE = 50;
export default function BarCharts(props: BarChartsProps) {
  const [search, setSearch] = useState<string>("");
  const loadingRef = useRef(0);
  const hasMoreRef = useRef(1);
  const htmlDomRef = useRef<HTMLDivElement | null>(null);
  const pageRef = useRef(0);
  const [datas, setDatas] = useState<CoffeeItem[] | null>(null);
  //supabase 데이터 로드 함수
  const loadAsync = useCallback(async () => {
    if (loadingRef.current || !hasMoreRef.current) return;
    loadingRef.current = 1;
    const from = pageRef.current * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    let query = supabase
      .from("notes")
      .select("*")
      .order("caf", { ascending: false })
      .range(from, to);

    if (search) {
      query = query.ilike("div", `%${search}%`);
    }

    const { data, error } = await query;
    console.log(`불러온 데이터 : ${from}-${to}`);
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
  }, [search]);
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
    <>
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
            cat={item.cat}
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
    </>
  );
}
