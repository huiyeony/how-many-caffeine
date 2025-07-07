import "./Footer.css";
export default function Footer() {
  const generateMailtoLink = (email: string, subject: string) => {
    let href = `mailto:${email}`;
    const params = [];
    //제목 파라미터 입력
    params.push(`subject=${encodeURIComponent(subject)}`);

    if (params.length > 0) {
      href += `?${params.join("&")}`;
    }
    return href;
  };
  return (
    <>
      {/* 전체 바탕 */}
      <footer className="w-full h-[150px] flex flex-col text-sm p-5">
        {/* 로고 부분 */}
        <div className="mb-4">⭐️얼마나 카페인</div>
        {/* 안내 사항 */}
        <div className="text-xs text-gray-800">
          모든 커피는 하루 권장 카페인 섭취량 (400mg) 기준 비율로
          표시하였습니다.
        </div>

        <div className="text-xs text-gray-800">
          ⓒ얼마나 카페인. ALL RIGHTS RESERVED{" "}
        </div>
      </footer>
    </>
  );
}
