import Link from "next/link";
import style from "./page.module.css";

export default function Home() {
  return (
    <div>
      <h2>안녕하세요 여기는 홈(src/app/page.tsx) 입니다.</h2>

      <p>코드에 "use client"를 쓰는 상황은 크게 두 개입니다.</p>
      <div className={style.linkList}>
        <Link className={style.link} href="/page-example">
          page 안에서 쓰기
        </Link>
        <Link className={style.link} href="/component-example">
          컴포넌트 안에서 쓰기
        </Link>
      </div>
    </div>
  );
}
