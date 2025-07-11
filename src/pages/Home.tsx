import { useCallback, useEffect, useRef, useState } from "react";
import Barcharts from "../components/Barcharts";
import Filter from "../components/Filter";
import Footer from "../components/Footer";
import type { CoffeeItem } from "../types/CoffeeItem";
import { PAGE_SIZE } from "../components/util/getPageSize";
import { supabase } from "../supabase";
import Sidebar from "@/components/Sidebar";
import { AlignJustify } from "lucide-react";
const DATABASE_NAME = "notes";

export const Home = () => {
  const [open, setOpen] = useState<boolean>(false);
  function handleSetOpen(open: boolean) {
    setOpen(open);
  }
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
    //< -- 전체 영역 -->
    //< -- 헤더 부분 -->
    //< -- 로고 --> <-- 메뉴 아이콘 -->
    //< -- 검색바 -->
    //< -- 필터 -->
    // <-- 리스트 -->
    // <-- 푸터 -->

    //< -- 전체 영역 -->
    <div className="page flex flex-col w-screen bg-sky-200 min-h-screen">
      {/*  <-- 모바일 부분 -->  */}
      <div className="bg-white flex flex-col max-w-[495px] m-auto min-h-screen overflow-y-auto relative">
        {/* < -- 헤더 영역 --> */}
        <header
          className={`transition-transform duration-300 w-full flex flex-col max-w-[495px] bg-white`}
        >
          {/* <-- 헤더 로고 + 메뉴 아이콘 --> */}
          <section className="h-[64px] flex w-full justify-between relative ">
            <div className="w-full flex gap-2 items-center pl-4">
              <img src="/assets/bigLogo.webp" className="w-7 object-contain " />
              <span className="bold text-sm mr-4"> 얼마나 카페인</span>
            </div>

            {/* 창 아이콘 */}
            <div
              className="flex items-center justify-center px-4 cursor-pointer"
              onClick={() => setOpen(true)}
            >
              <AlignJustify size={20} />
            </div>
          </section>

          {/* <-- 검색 --> */}
          <section className="px-3 w-full">
            <div className="w-full bg-gray-100 rounded-xl flex flex-row gap-2 p-2 ">
              {/* <-- 돋보기 아이콘 -->  */}
              <div className="flex items-center">🔍</div>
              {/* <-- 입력창 --> */}
              <input
                type="text"
                placeholder="브랜드 또는 음료를 검색하세요"
                className="w-full bg-transparent text-sm p-3 focus:outline-none"
              />
              {/* <-- 버튼 -->  */}
              <div className="flex items-center mr-5">{`>`}</div>
            </div>
          </section>

          {/* <-- 필터 -->  */}
          <Filter
            iceType={iceType}
            drinkName={drinkName}
            brandName={brandName}
            handleBrandType={handleBrandType}
            handleDrinksType={handleDrinksType}
            handleIceType={handleIceType}
          />
        </header>

        {/* 데이터 영역 */}
        <div className="w-full max-w-[495px]">
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

        {/* <-- 불투명 배경  --> */}
        {open && (
          <div>
            <div
              className="absolute inset-0 bg-black/30 z-1 w-full h-full"
              // 창 닫기
              onClick={() => setOpen(false)}
            />
            <div className="absolute top-0 right-0 w-[280px] ">
              {/* <-- 슬라이더--> */}
              <Sidebar handleSetOpen={handleSetOpen} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
