import type { CoffeeItem } from "../types/CoffeeItem";
import "./Shelf.css";
type Props = {
  items: CoffeeItem[];
};
export const Shelf: React.FC<Props> = ({ items }) => {
  return (
    <>
      <section className="section">
        <div className="section__header">
          <h2 className="section__header__main">
            ❄️ 카페인 적은 아메리카노 랭킹
          </h2>
        </div>
        <div className="section__scrollable">
          <ul className="section__scrollable__shelf">
            {items.map((item, index) => (
              <li key={index} className="info">
                <div className="ranking">#{index}</div>
                <div className="brand">{item.div}</div>
                <div className="caffeine">{item.caf}mg</div>
              </li>
            ))}
          </ul>
        </div>
        <span>🔔 아이스 아메리카노 2샷 기준 입니다</span>
      </section>
    </>
  );
};
