import Link from "next/link";
import style from "./postItem.module.css";

export default function PostItem() {
  return (
    <Link href="/posts/2" className={style.container}>
      <h3>제목</h3>
      <p>테스트</p>
    </Link>
  );
}
