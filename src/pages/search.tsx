import Layout from "@/components/layout";
import ResultItem from "@/components/result-item";
import { supabase } from "@/supabase";
import type { SearchItem } from "@/types/search-item";
import { useState } from "react";

function Search() {
  const [type, setType] = useState("food");
  const [search, setSearch] = useState("");
  const [data, setData] = useState<SearchItem[] | null>(null);
  // -- 🔔 테이블 조인 결과를 반환하자 --
  // -- 검색결과를 수파베이스에서 불러오자 --
  const handleSubmit = async () => {
    // 분기문
    // 공백/줄바꿈/탭을 무시하고 검색결과를 반환하도록 수정하자
    console.log("handlesubmit 호출 ,, ");
    console.log(search);
    console.log(search.replace(/\s/g, ""));
    if (type == "food") {
      const { data, error } = await supabase.rpc("get_joined_drink_data", {
        search: search.replace(/\s/g, ""),
      });
      // --로그 찍어보자
      if (error) {
        console.error(error);
      } else {
        console.log(data);
        // -- 데이터를 넣어보자
        setData(data);
      }
    } else {
      const { data, error } = await supabase.rpc("get_joined_brand_data", {
        search: search.replace(/\s/g, ""),
      });
      // --로그 찍어보자
      if (error) {
        console.error(error);
      } else {
        console.log(data);
        // -- 데이터를 넣어보자
        setData(data);
      }
    }
  };
  return (
    //전체 박스 영역 pt-13
    <Layout>
      {/* <-- 컨텐츠 박스 pt-[130] --> */}
      <div className="flex flex-col w-screen max-w-[475px] pt-[130px] relative">
        {/* <-- 음식/ 브랜드 검색 박스--> */}
        <div className="absolute top-0 w-full box-boarder flex flex-col gap-4 mt-2">
          <section className="flex w-full h-[54px] bg-[#fff]">
            {/* <-- 음료  */}
            <div
              className={`w-1/2 flex items-center justify-center bg-white text-sm text-[#BBBCC0]
            ${type == "food" ? "border-b-2 border-black !text-[#000]" : ""}`}
              onClick={() => {
                setType("food");
              }}
            >
              음식
            </div>
            {/* <--브랜드  */}
            <div
              onClick={() => {
                setType("brand");
              }}
              className={`w-1/2 flex items-center justify-center bg-white text-sm text-[#BBBCC0]
          ${type == "brand" ? "border-b-2 border-black !text-[#000]" : ""}`}
            >
              브랜드
            </div>
          </section>
          {/* <-- 검색 --> */}
          <section className="px-3 w-full">
            <div className="w-full bg-gray-100 rounded-xl flex flex-row gap-2 p-2 ">
              {/* <-- 돋보기 아이콘 -->  */}
              <div className="flex items-center" onClick={handleSubmit}>
                🔍
              </div>
              {/* <-- 입력창 --> */}
              <input
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                type="text"
                placeholder="브랜드 또는 음료를 검색하세요"
                className="w-full bg-transparent text-sm p-3 focus:outline-none"
                value={search}
              />
              {/* <-- 버튼 -->  */}
              <div className="flex items-center mr-5">{`>`}</div>
            </div>
          </section>
          {/*  --검색 결과를 여기서 보여줍니다 -- */}
          <section
            className="pt-5 min-h-[calc(100dvh-64px-60px-54px)] flex flex-col gap-3 px-6 py-0
          bg-[#faf3f4]"
          >
            {/* --수파베이스 검색결과를 여기서 보여줍니다 --  */}
            {data?.map((item, index) => (
              <ResultItem key={index} {...item} />
            ))}
            <div className="text-sm flex items-center justify-center py-10">
              {" "}
              🔔 더 이상 데이터가 없습니다{" "}
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}

export default Search;
