"use client";

import LectureList from "./LectureList";
import styles from "./postContainer.module.css";
import PostList from "./PostList";
import PostCard from "./PostCard";
import { useSearchParams } from "next/navigation";

export default function PostContainer() {
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
