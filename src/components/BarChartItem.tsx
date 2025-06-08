import "./BarChartItem.css";

export default function BarChartItem({
  div,
  type,
  prd,
  caf,
  checked,
  MAX_COFFEE,
}: {
  div: string;
  type: string;
  prd: string;
  caf: number;
  checked: boolean;
  MAX_COFFEE: number;
}) {
  {
    const bar_width = checked
      ? (caf / 2 / MAX_COFFEE) * 100
      : (caf / MAX_COFFEE) * 100;

    return (
      <div className="bar_row" key={prd}>
        <div className="bar_label">
          <span>{div}</span>
          <span>{prd}</span>
          <span>
            {type == "ice" ? (
              <img src={`/icecube.png`} width={50} alt="ice 글자" />
            ) : (
              <img src={"/hot.png"} width={50} alt="hot 글자" />
            )}
          </span>
        </div>
        <div className="bar_wrapper">
          <div
            className="bar"
            style={{
              width: `${bar_width}%`,
              backgroundColor: "#8ec5ff",
              opacity: 1,
              color: "#1c1917",
            }}
          >
            {checked ? caf / 2 : caf}mg
          </div>
        </div>
      </div>
    );
  }
}
