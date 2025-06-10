import { useEffect, useState } from "react";
import "./Progress.css";
export function Progress() {
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const percent = (scrolled / height) * 100;
      setScroll(percent);
    };
    addEventListener("scroll", handleScroll);
    return () => removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${scroll}%` }}></div>
      </div>
    </>
  );
}
