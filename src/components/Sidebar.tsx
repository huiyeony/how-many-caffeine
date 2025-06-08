import { useRef } from "react";
import "./Sidebar.css";
import { brands } from "../data/brands";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onChange: (brand: string) => void;
}

export default function Sidebar({ isOpen, onClose, onChange }: SidebarProps) {
  const sidebarRef = useRef<HTMLDivElement>(null);
  return (
    <>
      <div className={`overlay ${isOpen ? "open" : ""}`} onClick={onClose} />
      <div ref={sidebarRef} className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="header">
          <button className="closeButton" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="brandTags">
          {brands.map((brand) => (
            <div
              key={brand}
              className={`tagButton ${brand}`}
              onClick={() => onChange(brand)}
            >
              {brand}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
