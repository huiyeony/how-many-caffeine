import { useEffect, useState } from "react";
// 사전에 설정한 supabase client
import { motion, AnimatePresence } from "framer-motion";
import "./PopularRanking.css";
import { supabase } from "@/supabase";
interface Brand {
  brand: string;
  count: number;
  rank: number;
}

export default function PopularRanking() {
  const [brands, setBrands] = useState<Brand[]>([]);
  // <-- 데이터베이스에서 순위 가져오는 함수 -->
  async function fetchData() {
    const { data, error } = await supabase
      .from("popular_brands")
      .select("*")
      .order("rank");

    if (!error && data) {
      setBrands(data);
    }
  }
  // <-- 데이터베이스에서 순위 가져온다 -->
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="ranking__container">
      <h2 className="ranking__title">🔥 인기 브랜드 랭킹</h2>

      <ul className="ranking__list">
        <AnimatePresence>
          {brands.map((item) => (
            <motion.li
              key={item.brand}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4 }}
              className="ranking__item"
            >
              <span className="rank">#{item.rank}</span>
              <span className="brand">{item.brand}</span>
              <span className="count">{item.count}회 검색</span>
            </motion.li>
          ))}
        </AnimatePresence>
        <span className="small__text">
          🔔 순위는 매일 자정 12:00 에 자동 업데이트 됩니다
        </span>
      </ul>
    </div>
  );
}
