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
      <footer className="footerContainer">
        <div className="footerContent">
          <div className="topSection">
            <div className="logo">
              <img src="/title.png" width={130} alt="사이트제목" />
            </div>
            <div className="text">
              모든 커피는 하루 권장 카페인 섭취량은 400mg 기준의 비율로
              표시하였습니다.
            </div>
          </div>
          <div className="middleSection">
            <p className="text">ⓒ얼마나 카페인. ALL RIGHTS RESERVED </p>
            <div className="links">
              <a
                className="link"
                href={generateMailtoLink(
                  "howcaff@gmail.com",
                  "[버그 | 불편사항 제보]"
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="text">버그 및 불편사항 제보</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
