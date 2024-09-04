import type { Metadata } from "next";

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
    <html lang="ko">
      <body>
        <div style={{ color: "gray" }}>Layout 예시입니다</div>
        {children}
      </body>
    </html>
  );
}
