// 카페인 함량이 낮은 커피를 최대 10개 반환합니다.

import { supabase } from "../../supabase";
import type { CoffeeItem } from "../../types/CoffeeItem";

export const getLowCaffeineAmericano = async () => {
  const { data } = await supabase
    .from("notes")
    .select("*")
    .eq("type", "ice") // 아이스
    .ilike("prd", "%아메리카노") //아메리카노 | 아이스아메리카노 | 꿀아메리카노
    .gt("caf", 100)
    .lt("caf", 200)
    .order("caf", { ascending: true })
    .limit(10);
  return data as CoffeeItem[];
};
