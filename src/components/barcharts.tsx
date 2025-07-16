import type { CoffeeItem } from "@/types/coffee-item";
import BarchartItem from "./barchart-item";
type BarchartsProps = {
  datas: CoffeeItem[] | null;
};

export default function Barcharts({ datas }: BarchartsProps) {
  return (
    // <-- 전체 영역 -->
    <div className="w-full">
      {/* <-- 리스트 영역 -->*/}
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
