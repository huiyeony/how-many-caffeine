import { useState } from "react";
import "./SunflowerRain.css";

type Seed = {
  id: number;
  left: number; // px
  duration: number; // s
};

export default function SunflowerRain() {
  const [seeds, setSeeds] = useState<Seed[]>([]);

  const launchSeeds = () => {
    const newSeeds: Seed[] = Array.from({ length: 7 }, (_, i) => ({
      id: Date.now() + i,
      left: Math.random() * window.innerWidth,
      duration: 2 + Math.random() * 2,
    }));

    setSeeds(newSeeds);

    setTimeout(() => setSeeds([]), 4000); // 제거
  };

  return (
    <div>
      <button onClick={launchSeeds}>🌻 씨앗 날리기</button>

      {seeds.map((seed) => (
        <img
          key={seed.id}
          src="/images/optimized/sunflower.webp"
          className="falling-seed"
          style={{
            left: seed.left,
            animationDuration: `${seed.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
