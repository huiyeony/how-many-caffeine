import styles from "./Footer.module.css";
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
      <footer className={styles.footerContainer}>
        <div className={styles.footerContent}>
          <div className={styles.topSection}>
            <div className={styles.logo}>💁‍♀️얼마나-카페인☕️</div>
          </div>
          <div className={styles.middleSection}>
            <p className={styles.copyright}>
              ⓒ얼마나 카페인. ALL RIGHTS RESERVED{" "}
            </p>
            <div className={styles.links}>
              <a
                className={styles.link}
                href={generateMailtoLink(
                  "howcaff@gmail.com",
                  "[버그 | 불편사항 제보]"
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>🐞 버그 및 불편사항 제보</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
