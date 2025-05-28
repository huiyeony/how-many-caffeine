import styles from "./BarChartItem.module.css";

export default function BarChartItem({
  name,
  caffeine,
  checked,
  MAX_COFFEE,
}: {
  name: string;
  caffeine: number;
  checked: boolean;
  MAX_COFFEE: number;
}) {
  {
    const bar_width = checked
      ? (caffeine / 2 / MAX_COFFEE) * 100
      : (caffeine / MAX_COFFEE) * 100;

    return (
      <div className={styles.bar_row} key={name}>
        <div className={styles.bar_label}>{name} </div>
        <div className={styles.bar_wrapper}>
          <div
            className={styles.bar}
            style={{
              width: `${bar_width}%`,
              backgroundColor: caffeine >= 200 ? "#fb2c36" : "#51a2ff",
            }}
          >
            {checked ? caffeine / 2 : caffeine}mg
          </div>
        </div>
      </div>
    );
  }
}
