import { useRef } from "react";
import styles from "./Sidebar.module.css";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onChange: (brand: string) => void;
}

const BRANDS = [
  "메가커피",
  "컴포즈",
  "스타벅스",
  "이디야",
  "바나프레소",
  "빽다방",
  "카페봄봄",
  "파리바게트",
  "더벤티",
  "투썸플레이스",
  "폴바셋",
  "배스킨라빈스",
  "카페게이트",
  "공차",
  "테라커피",
  "달콤커피",
  "할리스",
  "매머드커피",
  "하삼동커피",
];
export default function Sidebar({ isOpen, onClose, onChange }: SidebarProps) {
  //   const menuItems: MenuItem[] = [
  //     {
  //       label: "⭐️BOOK MARKS",
  //       href: "/",
  //     },
  //   ];
  const sidebarRef = useRef<HTMLDivElement>(null);
  return (
    <>
      <div
        className={`${styles.overlay} ${isOpen ? styles.open : ""}`}
        onClick={onClose}
      />
      <div
        ref={sidebarRef}
        className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}
      >
        <div className={styles.header}>
          <button className={styles.closeButton} onClick={onClose}>
            &times;
          </button>
        </div>
        <div className={styles.brandTags}>
          {BRANDS.map((brand) => (
            <div
              key={brand}
              className={`${styles.tagButton} ${styles[brand]}`}
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
