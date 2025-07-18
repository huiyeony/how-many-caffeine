import { X } from "lucide-react";
import { Link } from "react-router-dom";
type SidebarProp = {
  handleSetOpen: (open: boolean) => void;
};
function Sidebar({ handleSetOpen }: SidebarProp) {
  const menuItems = [
    { emoji: "🏠", label: "홈", url: "/" },
    { emoji: "🍵", label: "음료 검색", url: "/search" },
    { emoji: "📍", label: "브랜드 검색", url: "/search" },
    { emoji: "🌀", label: "커뮤니티", url: "/community" },
    { emoji: "🤔", label: "카페인 MBTI", url: "" },
    { emoji: "🤝", label: "제휴 문의", url: "" },
    { emoji: "🌸", label: "얼마나카페인 앱 소개", url: "" },
    { emoji: "🧑‍💻", label: "얼마나카페인 개발자", url: "" },
  ];
  return (
    // <-- 전체 영역 -->
    <div className="bg-white flex flex-col w-full h-dvh">
      {/* <-- 헤더 영역 -->  */}
      <div className="bg-blue-400 w-[280px] h-[73px] flex flex-row justify-between items-center px-5">
        {/* <-- 로고 --> */}
        <div className="text-white">⚡️ 얼마나 카페인</div>
        {/* <-- x --> */}
        <button onClick={() => handleSetOpen(false)}>
          <X size={20} color="white" />
        </button>
      </div>
      {/* <-- 빅 로고 --> */}
      <div className="bg-blue-400 flex align-center justify-center h-[108px] w-full relative">
        <div className="absolute bottom-0 bg-white w-full h-12" />
        {/* <--로그 이미지--> */}
        <img
          src="/assets/bigLogo.webp"
          className="absolute bottom-0 w-32 object-contain"
        />
      </div>
      {/* <-- 메뉴 버튼 -->  */}
      <ul className="flex flex-col gap-8 px-6 mt-6">
        {menuItems.map((item, index) => {
          return (
            <Link key={index} to={item.url}>
              <li className="flex flex-row gap-4">
                <span>{item.emoji}</span>
                <span>{item.label}</span>
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}

export default Sidebar;
