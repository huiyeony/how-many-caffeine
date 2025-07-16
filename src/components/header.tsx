import { AlignJustify } from "lucide-react";
function Header({ handleOpen }: { handleOpen: () => void }) {
  return (
    <header
      className={`transition-transform duration-300 w-full flex flex-col max-w-[495px] bg-white`}
    >
      {/* <-- 헤더 로고 + 메뉴 아이콘 --> */}
      <section className="h-[64px] flex w-full justify-between relative ">
        <div className="w-full flex gap-2 items-center pl-4">
          <img src="/assets/bigLogo.webp" className="w-7 object-contain " />
          <span className="bold text-sm mr-4"> 얼마나 카페인</span>
        </div>

        {/* 창 아이콘 */}
        <div
          className="flex items-center justify-center px-4 cursor-pointer"
          onClick={() => handleOpen()}
        >
          <AlignJustify size={20} />
        </div>
      </section>
    </header>
  );
}

export default Header;
