import "./barchart-item.css";
import { MAX_COFFEE } from "./util/getMaxCaffein";

export default function BarchartItem({
  div,
  type,
  prd,
  caf,
}: {
  div: string;
  type: string;
  prd: string;
  caf: number;
}) {
  {
    const bar_width = (caf / MAX_COFFEE) * 100;

    return (
      // 아이템 영역
      <div className="bar flex flex-row justify-between" key={prd}>
        {/* 라벨 영역 */}
        <div className="bar_label whitespace-wrap">
          {/* 브랜드명 */}
          <span>{`[${div}]`}</span>
          {/* 제품명 */}
          <span>{prd}</span>
          {/* 이미지 영역 */}
          {type == "ice" ? (
            <img src={`/images/optimized/ice.webp`} width={30} alt="ice 글자" />
          ) : (
            <img src={"/images/optimized/hot.webp"} width={30} alt="hot 글자" />
          )}
        </div>
        {/* 막대 그래프 부분 */}
        <div className="bar_graph flex-1">
          <div
            className="bar_graph_content"
            style={{
              width: `${bar_width}%`,
              backgroundColor: "#8ec5ff",
              color: "#2e2e2e",
            }}
          >
            {caf}mg
          </div>
        </div>
      </div>
    );
  }
}
