import { drinks } from "../data/drinks";
import { brands } from "../data/brands";
import { supabase } from "../supabase";
import Button from "./button";

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
  const clickBrand = async (name: string) => {
    await supabase.from("logs").insert({
      element: name,
      path: window.location.pathname, //uuid, created_at
    });
  };
  return (
    <div className="filter ml-2 pl-2 text-sm flex flex-col top-[130px] bg-white max-w-[487px]">
      <div className="flex flex-row items-center gap-x-1 overflow-x-auto py-2">
        <span className="whitespace-nowrap flex items-center">🔔 브랜드</span>
        {brands.map((item) => (
          <Button
            isActive={item == brandName}
            key={item}
            onClick={() => {
              handleBrandType(item);
              clickBrand(item);
            }}
          >
            {item}
          </Button>
        ))}
      </div>
      <div className="flex flex-row gap-x-1 overflow-x-auto py-2">
        <span className="flex items-center"> 🔥 / ❄️</span>

        <Button
          onClick={() => handleIceType("ice")}
          isActive={iceType == "ice"}
        >
          ice
        </Button>

        <Button
          onClick={() => handleIceType("hot")}
          isActive={iceType == "hot"}
        >
          hot
        </Button>
      </div>
      <div className="flex flex-row gap-x-1 overflow-x-auto py-2">
        <span className="flex items-center">🥤 </span>
        {drinks.map((item) => (
          <Button
            key={item}
            onClick={() => handleDrinksType(item)}
            isActive={item == drinkName}
          >
            {item}
          </Button>
        ))}
      </div>
    </div>
  );
}
