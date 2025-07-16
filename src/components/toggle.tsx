import type { ChangeEvent } from "react";
import "./Toggle.css";
interface ToggleProps {
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
export default function Toggle({ checked, onChange }: ToggleProps) {
  return (
    <>
      <div className="toggle-wrapper">
        <div className="toggle-label">
          보기 기준 : {checked ? "☕️ 샷 당 카페인(mg/shot)" : "총 카페인(mg)"}{" "}
        </div>
        <label className="switch">
          <input type="checkbox" checked={checked} onChange={onChange} />
          <span className="slider"></span>
        </label>
      </div>
    </>
  );
}
