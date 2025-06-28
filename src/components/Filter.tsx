import "./Filter.css";
import { drinks } from "../data/drinks";
import { brands } from "../data/brands";
import { supabase } from "../supabase";
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
  const handleClick = async (name: string) => {
    await supabase.from("logs").insert({
      element: name,
      path: window.location.pathname, //uuid, created_at
    });
  };
  return (
    <>
      <div className="filter">
        <div className="filter__section">
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
        <div className="filter__section">
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
        <div className="filter__section">
          {brands.map((item) => (
            <button
              key={item}
              name={item}
              className={brandName == item ? "active" : ""}
              onClick={() => {
                handleBrandType(item);
                handleClick(item);
              }}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
