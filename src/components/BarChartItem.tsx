import "./BarChartItem.css";
import { MAX_COFFEE } from "./util/getMaxCaffein";

export default function BarchartItem({
  div,
  type,
  prd,
  caf,
}: {
  div: string;
  type: string;
  prd: string;
  caf: number;
}) {
  {
    const bar_width = (caf / MAX_COFFEE) * 100;

    return (
      <div className="bar_row" key={prd}>
        <div className="bar_label">
          <span>{div}</span>
          <span>{prd}</span>
          <span>
            {type == "ice" ? (
              <img
                src={`/images/optimized/ice.webp`}
                width={50}
                alt="ice 글자"
              />
            ) : (
              <img
                src={"/images/optimized/hot.webp"}
                width={50}
                alt="hot 글자"
              />
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
            {caf}mg
          </div>
        </div>
      </div>
    );
  }
}
