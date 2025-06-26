import { useEffect, useState } from "react";
import SunflowerRain from "../components/SunflowerRain";

const ChallengePage = () => {
  const [days, setDays] = useState<boolean[]>([false, false, false]);
  const [showGif, setShowGif] = useState(true);

  useEffect(() => {
    const saved = [0, 1, 2].map(
      (i) => localStorage.getItem(`challenge-day-${i}`) === "true"
    );
    setDays(saved);
  }, []);

  const handleClick = (index: number) => {
    if (days[index]) return;

    const updated = [...days];
    updated[index] = true;
    setDays(updated);
    localStorage.setItem(`challenge-day-${index}`, "true");

    if (updated.every((d) => d)) {
      setShowGif(true);
      setTimeout(() => setShowGif(false), 4000);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: 20 }}>
      <h2>🥜 카페인 챌린지</h2>
      <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
        {days.map((done, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            disabled={done}
            style={{
              width: 60,
              height: 60,
              borderRadius: "50%",
              backgroundColor: done ? "#4caf50" : "#eee",
              fontSize: 16,
              cursor: done ? "default" : "pointer",
            }}
          >
            {done ? "v" : `Day ${i + 1}`}
          </button>
        ))}
      </div>

      {showGif && (
        <div style={{ marginTop: 30 }}>
          <img
            src="/images/optimized/hamster.webp"
            alt="Hamster eating"
            width={150}
          />
          <p>햄찌가 해바라기씨를 냠냠!</p>
        </div>
      )}
      <SunflowerRain />
    </div>
  );
};

export default ChallengePage;
