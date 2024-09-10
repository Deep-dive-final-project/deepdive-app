"use client";

import LectureList from "./LectureList";
import styles from "./postContainer.module.css";
import PostList from "./PostList";
import PostCard from "./PostCard";
import { useSearchParams } from "next/navigation";
import PlanList from './PlanList'
import DummyPlanList from "./DummyPlanList";

export default function PostContainer() {
  const searchParams = useSearchParams();
  const postId = searchParams.get("postId");

  return (
    <div className={styles.wrapper}>
      <h2>강의노트</h2>
      <div className={styles.layout}>
        <div style={{ flex: "1" }}>
      <h3 style={{paddingLeft: "0.5rem"}}>학습 계획 리스트</h3>
          <DummyPlanList />
        </div>
        {postId ? <PostCard postId={postId} /> : <PostList />}
      </div>
    </div>
  );
}
