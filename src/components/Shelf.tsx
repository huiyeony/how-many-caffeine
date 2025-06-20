import type { CoffeeItem } from "../types/CoffeeItem";
import "./Shelf.css";
type Props = {
  main: string;
  secondary: string;
  items: CoffeeItem[];
};
export const Shelf: React.FC<Props> = ({ main, secondary, items }) => {
  return (
    <>
      <section className="section_container">
        <div className="card_shelf_header">
          <span className="cards_shelf_main_header">
            <strong> {main} </strong>
          </span>
          <span className="cards_shelf_secondary_header">{secondary}</span>
        </div>
        <div className="cards_scrollable_container">
          <div className="cards_shelf">
            {items.map((item, index) => (
              <div key={index} className="cards_info">
                <div className="cards_image">
                  <img
                    src="/public/images/optimized/ice.webp"
                    alt="아메리카노"
                  />
                </div>
                <div className="cards_txt ice_type">{item.type}</div>
                <div className="cards_txt brand_type">{item.div}</div>
                <div className="cards_txt product_name">{item.prd}</div>
                <div className="cards_txt caf">{item.caf}mg</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
