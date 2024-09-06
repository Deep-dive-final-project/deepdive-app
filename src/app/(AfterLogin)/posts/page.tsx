"use client";

import LectureList from "@/app/_component/LectureList";
import styles from "./page.module.css";
import PostList from "./_component/PostList";
import PostCard from "./_component/PostCard";
import { useSearchParams } from "next/navigation";

export default function Posts() {
  const searchParams = useSearchParams();
  const postId = searchParams.get("postId");

  return (
    <div className={styles.wrapper}>
      <h2>강의노트</h2>
      <div className={styles.layout}>
        <div style={{ flex: "1" }}>
          <LectureList />
        </div>
        {postId ? <PostCard postId={postId} /> : <PostList />}
      </div>
    </div>
  );
}
