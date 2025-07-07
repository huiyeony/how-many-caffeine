import type { CoffeeItem } from "@/types/CoffeeItem";
import "./Barcharts.css";
import BarchartItem from "@/components/BarchartItem";
type BarchartsProps = {
  datas: CoffeeItem[] | null;
};

export default function Barcharts({ datas }: BarchartsProps) {
  //메모이징

  return (
    //스크롤 박스 영역
    <div className="bg-transparent py-3 px-2">
      {/* 리스트 영역 */}
      <div>
        {datas?.map((item, index) => (
          <BarchartItem
            key={item.prd + index}
            div={item.div}
            type={item.type}
            prd={item.prd}
            caf={item.caf}
          />
        ))}
      </div>
    </div>
  );
}
