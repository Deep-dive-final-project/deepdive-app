import Link from "next/link";
import LectureList from "../_component/LectureList";
import styles from "./page.module.css";
import PostItem from "./_component/PostItem";

export default function Posts() {
  return (
    <div className={styles.wrapper}>
      <h1>강의노트</h1>
      <div className={styles.layout}>
        <div style={{ flex: "1" }}>
          <LectureList />
        </div>
        <div className={styles.postList}>
          <PostItem />
          <PostItem />
          <PostItem />
        </div>
      </div>
    </div>
  );
}
