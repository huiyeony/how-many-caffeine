import React, { useState } from "react";
import Header from "./header";
import Sidebar from "./sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState<boolean>(false);
  function handleOpen() {
    setOpen((prev) => !prev);
  }
  return (
    //< -- 전체 영역 -->
    <>
      <div className="page flex flex-col items-center w-screen bg-sky-100 min-h-screen">
        {/*  <-- 모바일 부분 -->  */}
        <div className="bg-white flex flex-col max-w-[495px] m-auto min-h-screen overflow-y-auto relative">
          <Header handleOpen={handleOpen} />
          {children}

          {/* <-- 불투명 배경  --> */}
          {open && (
            <div className="">
              <div
                className="absolute inset-0 bg-black/30 z-1 w-full h-full"
                // 창 닫기
                onClick={() => setOpen(false)}
              />
              <div className="absolute top-0 right-0 w-[280px] h-dvh">
                {/* <-- 슬라이더--> */}
                <Sidebar handleSetOpen={handleOpen} />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
