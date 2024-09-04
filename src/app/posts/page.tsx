import Link from "next/link";
import LectureList from "../_component/LectureList";
import style from "./page.module.css";
import PostItem from "./_component/PostItem";

export default function Posts() {
  return (
    <div className={style.wrapper}>
      <h1>강의노트</h1>
      <div className={style.layout}>
        <div style={{ flex: "1" }}>
          <LectureList />
        </div>
        <div className={style.postList}>
          <PostItem />
          <PostItem />
          <PostItem />
        </div>
      </div>
    </div>
  );
}
