import Link from "next/link";
import styles from "./postItem.module.css";

export default function PostItem() {
  return (
    <Link href="/posts/2" className={styles.container}>
      <h3>제목</h3>
      <p>날짜</p>
    </Link>
  );
}
