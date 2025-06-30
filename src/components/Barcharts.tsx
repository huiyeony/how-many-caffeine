import "./BarCharts.css";
import BarChartItem from "./BarChartItem";
import type { CoffeeItem } from "../types/CoffeeItem";
import { supabase } from "../supabase";
import { useCallback, useEffect, useRef, useState } from "react";
import Filter from "./Filter";
interface BarChartsProps {
  checked: boolean;
  MAX_COFFEE: number;
}
const PAGE_SIZE = 50;
export default function BarCharts(props: BarChartsProps) {
  const [iceType, setIceType] = useState<"ice" | "hot" | null>(null);
  const [drinkName, setDrinkName] = useState<string | null>(null);
  const [brandName, setBrandName] = useState<string | null>(null);
  const loadingRef = useRef(0);
  const hasMoreRef = useRef(1);
  const htmlDomRef = useRef<HTMLDivElement | null>(null);
  const pageRef = useRef(0);
  const [datas, setDatas] = useState<CoffeeItem[] | null>(null);
  const handleIceType = (type: "ice" | "hot" | null) => {
    setIceType((prev) => (prev == type ? null : type));
    hasMoreRef.current = 1;
    pageRef.current = 0;
    setDatas([]);
  };
  const handleDrinksType = (type: string) => {
    setDrinkName((prev) => (prev == type ? null : type));
    hasMoreRef.current = 1;
    pageRef.current = 0;
    setDatas([]);
  };
  const handleBrandType = (type: string) => {
    setBrandName((prev) => (prev == type ? null : type));
    hasMoreRef.current = 1;
    pageRef.current = 0;
    setDatas([]);
  };
  //메모이징
  const fetchCoffeeList = useCallback(async () => {
    if (loadingRef.current || !hasMoreRef.current) return;

    loadingRef.current = 1;
    const from = pageRef.current * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    let query = supabase.from("notes").select("*");
    //ice or hot
    if (iceType) {
      query = query.eq("type", iceType);
    }
    //음료 이름
    if (drinkName) {
      query = query.ilike("prd", `%${drinkName}%`);
    }

    //브랜드를 클릭 하면
    if (brandName) {
      query = query.eq("div", brandName);
    }
    query = query
      .order("caf", { ascending: false }) //내림차순
      .range(from, to);

    const { data, error } = await query;
    if (error) {
      console.log(`데이터를 불러오는데 실패했습니다 : ${error.message}`);
      return;
    }

    if (data.length < PAGE_SIZE) {
      hasMoreRef.current = 0;
    } else {
      hasMoreRef.current = 1;
    } //불러올 페이지가 남았는지
    setDatas((prev) =>
      pageRef.current == 0 ? [...data] : [...(prev || []), ...data]
    ); //react 변수에 저장
    pageRef.current += 1; //다음에 불러올 페이지
    loadingRef.current = 0;
  }, [brandName, drinkName, iceType]);
  //
  useEffect(() => {
    //무한스크롤링 트리거 설정
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0] && !loadingRef.current && hasMoreRef.current) {
          fetchCoffeeList();
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
  }, [fetchCoffeeList]);

  useEffect(() => {
    fetchCoffeeList();
  }, [iceType, fetchCoffeeList, brandName, drinkName]);
  return (
    // 컨테이너
    <div className="barcharts__container">
      {/* 필터 영역*/}

      <Filter
        iceType={iceType}
        drinkName={drinkName}
        brandName={brandName}
        handleBrandType={handleBrandType}
        handleDrinksType={handleDrinksType}
        handleIceType={handleIceType}
      />
      {/* 실제 차트 영역 */}
      <div className="barcharts">
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
        {/* 전달 사항  */}
        <div ref={htmlDomRef} className="no__more__data">
          {!hasMoreRef.current ? "🔔 더이상 데이터가 없습니다" : ""}
        </div>
      </div>
    </div>
  );
}
