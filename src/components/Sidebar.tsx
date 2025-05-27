import { useRef } from "react";
import styles from "./Sidebar.module.css";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}
interface MenuItem {
  label: string;
  href?: string;
}
export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const menuItems: MenuItem[] = [
    {
      label: "⭐️BOOK MARKS",
      href: "/",
    },
  ];
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
        <nav>
          {menuItems.map((item) => (
            <a key={item.label} href={item.href} className={styles.menuItem}>
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
