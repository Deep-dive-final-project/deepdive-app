import type { Metadata } from "next";
import "./globals.css";
import style from "./layout.module.css";

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
    <html lang="ko" className={style.html}>
      <body className={style.body}>
        <div className={style.container}>
          <div style={{ color: "gray" }}>nav 메뉴</div>
          <div className={style.content}>{children}</div>
        </div>
      </body>
    </html>
  );
}
