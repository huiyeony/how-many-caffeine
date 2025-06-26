import { useEffect, useState } from "react";
import { supabase } from "../supabase"; // 사전에 설정한 supabase client
import { motion, AnimatePresence } from "framer-motion";
import "./PopularRanking.css";
interface Brand {
  brand: string;
  count: number;
  rank: number;
}

export default function PopularRanking() {
  const [brands, setBrands] = useState<Brand[]>([]);

  // 실시간 데이터 fetch
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("popular_brands")
        .select("*")
        .order("rank");

      if (!error && data) {
        setBrands(data);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 10000); // 10초마다 새로고침
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="ranking-container">
      <h2 className="ranking-title">🔥 인기 브랜드 랭킹</h2>
      <ul className="ranking-list">
        <AnimatePresence>
          {brands.map((item) => (
            <motion.li
              key={item.brand}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4 }}
              className="ranking-item"
            >
              <span className="rank">#{item.rank}</span>
              <span className="brand">{item.brand}</span>
              <span className="count">{item.count}회 검색</span>
            </motion.li>
          ))}
        </AnimatePresence>
        <span style={{ color: "gray", marginTop: "5px", fontSize: "small" }}>
          순위는 매일 자정 12:00 에 자동 업데이트 됩니다
        </span>
      </ul>
    </div>
  );
}
