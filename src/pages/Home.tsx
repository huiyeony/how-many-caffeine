import { useCallback, useEffect, useRef, useState } from "react";
import Barcharts from "../components/Barcharts";
import Filter from "../components/Filter";
import Footer from "../components/Footer";
import "./Home.css";
import { AlignJustify, Search, ChevronRight } from "lucide-react";
import type { CoffeeItem } from "../types/CoffeeItem";
import { PAGE_SIZE } from "../components/util/getPageSize";
import { supabase } from "../supabase";
const DATABASE_NAME = "notes";

export const Home = () => {
  const [iceType, setIceType] = useState<string | null>(null);
  const [drinkName, setDrinkName] = useState<string | null>(null);
  const [brandName, setBrandName] = useState<string | null>(null);

  const loadingRef = useRef(0);
  const hasMoreRef = useRef(1);
  const htmlDomRef = useRef<HTMLDivElement | null>(null);
  const pageRef = useRef(0);
  const [datas, setDatas] = useState<CoffeeItem[] | null>(null);
  const getFilteredData = useCallback(async () => {
    if (loadingRef.current || !hasMoreRef.current) return;

    loadingRef.current = 1;
    const from = pageRef.current * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    let query = supabase.from(DATABASE_NAME).select("*");
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
    //더 불러올 정보가 없음
    if (data.length < PAGE_SIZE) {
      hasMoreRef.current = 0;
    } else {
      hasMoreRef.current = 1;
    } //불러올 페이지가 남았는지
    setDatas((prev) =>
      pageRef.current == 0 ? [...data] : [...(prev || []), ...data]
    );
    pageRef.current += 1; //다음에 불러올 페이지
    loadingRef.current = 0;
  }, [brandName, drinkName, iceType]); //⭐️ 왜 의존성 배열이 필요한가 ? 클로저 함수는 값을 캡쳐해서 기억하기 때문에!
  function onChange() {
    hasMoreRef.current = 1; //페이지 불러 올수 있도록 초기화
    pageRef.current = 0; //페이지 번호 초기화
    setDatas([]); //데이터 초기화
  }
  function handleIceType(type: string) {
    setIceType((prev) => (prev == type ? null : type));
    onChange();
  }
  function handleDrinksType(type: string) {
    setDrinkName((prev) => (prev == type ? null : type));
    onChange();
  }
  function handleBrandType(type: string) {
    setBrandName((prev) => (prev == type ? null : type));
    onChange();
  }

  //
  useEffect(() => {
    //무한스크롤링 트리거 설정
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0] && !loadingRef.current && hasMoreRef.current) {
          getFilteredData();
        }
      },
      { threshold: 1 }
    );
    // 리액트 ref 객체를 를 관찰하도록 해
    const ref = htmlDomRef.current;
    if (ref) observer.observe(ref);

    loadingRef.current = 0;
    return () => {
      if (ref) observer.unobserve(ref);
    };
  }, [getFilteredData]);

  useEffect(() => {
    // ice type / drink name / brand name
    // 달라질 때마다 호출함

    getFilteredData();
  }, [iceType, drinkName, brandName, getFilteredData]);
  return (
    // 파랑 바탕 0
    <div className="page flex justify-center overflow-y-hidden">
      {/* 잔디밭 1 */}
      <img
        src="/assets/mainBackground.webp"
        alt="@background"
        className="fixed bottom-0 z-100"
      />
      {/* 흰색 영역 2*/}
      <div className="fixed top-0 bg-white w-[495px] h-full flex flex-col gap-5 z-200">
        {/* 헤더 영역 */}
        <header className="fixed top-0 flex-col w-full max-w-[495px] bg-white">
          {/* 로고 영역 */}
          <section className="flex flex-row w-full justify-between">
            <span className="bold text-sm m-4">⚡️얼마나 카페인</span>
            {/* 창 아이콘 */}
            <div className="icon flex items-center m-4">
              <AlignJustify size={16} />
            </div>
          </section>

          {/* 검색창 */}
          <section className="p-3 w-full">
            <div className="bg-gray-100 rounded-full flex flex-row gap-2 p-2 w-full">
              <div className="flex items-center pl-3">
                <Search className="w-5 text-orange-300" />
              </div>

              {/* input 태그 */}
              <input
                type="text"
                placeholder="브랜드 또는 음료를 검색하세요"
                className="w-full bg-transparent text-sm p-3 focus:outline-none"
              ></input>
              <div className="flex items-center mr-5">
                <ChevronRight className="w-5" />
              </div>
            </div>
          </section>
        </header>
        {/* 필터링 UI */}

        <Filter
          iceType={iceType}
          drinkName={drinkName}
          brandName={brandName}
          handleBrandType={handleBrandType}
          handleDrinksType={handleDrinksType}
          handleIceType={handleIceType}
        />

        {/* 데이터 영역 */}
        <div className="mt-[310px] ml-2 overflow-y-auto">
          {/* 실제 차트 */}
          <Barcharts datas={datas} />
          {/*  영역*/}
          <div
            ref={htmlDomRef}
            className="text-sm text-gray-800 text-center p-4"
          >
            {!hasMoreRef.current ? "⚠️ 더이상 데이터가 없습니다" : ""}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};
