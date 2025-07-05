import "./Filter.css";
import { drinks } from "../data/drinks";
import { brands } from "../data/brands";
import { supabase } from "../supabase";

interface FilterProps {
  iceType: string | null;
  drinkName: string | null;
  brandName: string | null;
  handleIceType: (type: string) => void;
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
    <div className="filter">
      <div className="flex flex-row gap-x-1 overflow-x-auto">
        <button> 타입 ❄️</button>

        <button
          className={`${iceType == "ice" ? "active" : ""}`}
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
      <div className="flex flex-row gap-x-1 overflow-x-auto">
        <button> 종류🧩 </button>
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
      <div className="flex flex-row gap-x-1 overflow-x-auto">
        <button>브랜드 🎀</button>
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
  );
}
