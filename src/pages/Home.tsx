import { useEffect, useState } from "react";
const MAX_COFFEE = 400;
import "./Home.css";
import Footer from "../components/Footer";
import BarCharts from "../components/Barcharts";
import Header from "../components/Header";
import Toggle from "../components/Toggle";
import { Shelf } from "../components/Shelf";
import { supabase } from "../supabase";
import type { CoffeeItem } from "../types/CoffeeItem";
import PopularRanking from "../components/PopularRanking";

export const Home = () => {
  const [checked, setChecked] = useState(false);
  const onChange = () => {
    setChecked(!checked);
  };
  const [notes, setNotes] = useState<CoffeeItem[]>([]);
  //특정 브랜드 DOM 요소로 스크롤 하는 함수
  useEffect(() => {
    const fetchFilteredNotes = async () => {
      const { data } = await supabase
        .from("notes")
        .select("*")
        .eq("type", "ice")
        .ilike("prd", "%아메리카노")
        .gt("caf", 100)
        .lt("caf", 200)
        .order("caf", { ascending: true })
        .limit(10); //하위 10개 카페인
      return data as CoffeeItem[];
    };

    fetchFilteredNotes().then(setNotes);
  }, []);
  return (
    <>
      <Header />

      <div className="main">
        <div className="container">
          <Toggle checked={checked} onChange={onChange} />
          <div>
            <PopularRanking />
          </div>
          <div className="recommendation-shelves">
            <div className="shelf-1">
              <Shelf
                main="카페인에 민감한 사람"
                secondary="을 위한 선택"
                items={notes}
              />
            </div>
          </div>

          <div className="bar_charts">
            <BarCharts checked={checked} MAX_COFFEE={MAX_COFFEE} />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};
