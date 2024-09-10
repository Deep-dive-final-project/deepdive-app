import type { Metadata } from "next";
import "./globals.css";
import styles from "./layout.module.css";
import { AuthProvider } from "./context/AuthProvider";

export const metadata: Metadata = {
  title: "DeepDive App",
  description: "let's make Goorm EXP better",
  icons: {
    icon: "/faviconV2.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <AuthProvider>
        <div className={styles.container}>
          {/* <div style={{ color: "gray" }}>전체 레이아웃</div> */}
          <div className={styles.content}>{children}</div>
        </div>
        </AuthProvider>
      </body>
    </html>
  );
}
