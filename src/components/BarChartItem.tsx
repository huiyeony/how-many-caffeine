import styles from "./BarChartItem.module.css";

export default function BarChartItem({
  name,
  caffeine,
  isDecaf,
  checked,
  MAX_COFFEE,
}: {
  name: string;
  caffeine: number;
  isDecaf: boolean;
  checked: boolean;
  MAX_COFFEE: number;
}) {
  {
    const bar_width = checked
      ? (caffeine / 2 / MAX_COFFEE) * 100
      : (caffeine / MAX_COFFEE) * 100;

    return (
      <div className={styles.bar_row} key={name}>
        <div
          className={`${styles.bar_label} ${
            isDecaf ? styles["decaf_label"] : ""
          }`}
        >
          {name} {isDecaf && <span>🍃</span>}
        </div>
        <div className={styles.bar_wrapper}>
          <div
            className={`${styles.bar}`}
            style={{
              width: `${bar_width}%`,
              backgroundColor: isDecaf ? "#8BC34A" : "#8ec5ff",
              opacity: isDecaf ? 0.7 : 1,
              color: isDecaf ? "#333" : "#1c1917",
            }}
          >
            {checked ? caffeine / 2 : caffeine}mg
          </div>
        </div>
      </div>
    );
  }
}
