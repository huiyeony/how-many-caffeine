import "./Filter.css";
import { drinks } from "../data/drinks";
import { brands } from "../data/brands";
interface FilterProps {
  iceType: "ice" | "hot" | null;
  drinkName: string | null;
  brandName: string | null;
  handleIceType: (type: "ice" | "hot" | null) => void;
  handleDrinksType: (type: string) => void;
  handleBrandType: (type: string) => void;
}
export default function Filter({
  iceType,
  drinkName,
  brandName,
  handleIceType,
  handleDrinksType,
  handleBrandType,
}: FilterProps) {
  return (
    <>
      <div className="filterWrapper">
        <div className="section">
          <button
            className={iceType == "ice" ? "active" : ""}
            onClick={() => handleIceType("ice")}
          >
            ice
          </button>
          <button
            className={iceType == "hot" ? "active" : ""}
            onClick={() => handleIceType("hot")}
          >
            hot
          </button>
        </div>
        <div className="section">
          {drinks.map((item) => (
            <button
              key={item}
              onClick={() => handleDrinksType(item)}
              className={drinkName == item ? "active" : ""}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="section scrollable">
          {brands.map((item) => (
            <button
              key={item}
              className={brandName == item ? "active" : ""}
              onClick={() => handleBrandType(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
