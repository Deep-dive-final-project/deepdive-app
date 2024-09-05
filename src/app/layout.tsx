import type { Metadata } from "next";
import "./globals.css";
import styles from "./layout.module.css";

export const metadata: Metadata = {
  title: "DeepDive App",
  description: "let's make Goorm EXP better",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={styles.html}>
      <body className={styles.body}>
        <div className={styles.container}>
          <div style={{ color: "gray" }}>nav 메뉴</div>
          <div className={styles.content}>{children}</div>
        </div>
      </body>
    </html>
  );
}
