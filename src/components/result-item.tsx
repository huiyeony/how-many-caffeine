import type { SearchItem } from "@/types/search-item";
import Badge from "./badge";

function ResultItem({ div, prd, caf, ml, oz, size }: SearchItem) {
  return (
    // 박스
    <div className="rounded-lg bg-white border-1 border-black p-5 text-sm ">
      <div className="flex justify-between items-center">
        {/* -- 왼쪽 -- */}
        <section className="flex flex-col gap-1">
          {/* <-- 배찌 브랜드 이름 --> */}
          <Badge>{div}</Badge>
          {/* <-- 이름 --> */}
          <div>{prd}</div>
          {/* <-- 사이즈 및 컵용량 --> */}
          <div className="flex flex-row gap-1 text-gray-400">
            {size ? <span>{size} </span> : ""}
            {ml ? <span> / {ml} </span> : ""}
            {oz ? <span>/ {oz}</span> : ""}
          </div>
        </section>
        {/* --오른쪽 -- */}
        <section>
          {/* <-- 카페인 함량 -->  */}
          <div>{caf}</div>
        </section>
      </div>
    </div>
  );
}

export default ResultItem;
