"use client";

import styles from "./postItem.module.css";
import PostItem from "./PostItem";
import { useAuth } from "@/app/context/AuthProvider";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Post } from "@/types/post";
import { Suspense } from "react";

export default async function PostList() {
  const { fetchWithAuth } = useAuth();

  const fetchPosts = async () => {
    const { data } = await fetchWithAuth("/api/note");

    return data
  }
  const { data: posts , error, isLoading } = useSuspenseQuery<Post[], Error>({
    queryKey: ["posts"], 
    queryFn: fetchPosts,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading posts: {error instanceof Error ? error.message : "Unknown error"}</div>;


  return (
    <Suspense fallback={<div>Loading posts...</div>}>
    <div className={styles.postList}>
      <h3 style={{paddingLeft: "0.5rem"}}>전체 강의 노트</h3>
      <ul className={styles.postItemList}>
      {posts && posts.map((post: Post, index) => (
        <PostItem key={index} post={post} />
      ))}
      </ul>
    </div>
    </Suspense>
  );
}
