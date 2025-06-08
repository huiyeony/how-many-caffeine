import { useState } from "react";
const MAX_COFFEE = 400;
import "./Home.css";
import Footer from "../components/Footer";
import BarCharts from "../components/Barcharts";
import Header from "../components/Header";
import Toggle from "../components/Toggle";

export const Home = () => {
  const [checked, setChecked] = useState(false);
  const onChange = () => {
    setChecked(!checked);
  };

  //특정 브랜드 DOM 요소로 스크롤 하는 함수

  return (
    <>
      <Header />
      <div className="main">
        <div className="container">
          <Toggle checked={checked} onChange={onChange} />
          <div className="bar_charts">
            <BarCharts checked={checked} MAX_COFFEE={MAX_COFFEE} />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};
