"use client";

import styles from "./page.module.css";
import Link from "next/link";
import MarkdownToHTML from "@/app/_component/MarkdownToHTML";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/app/context/AuthProvider";
import { Post, PostContent } from "@/types/post";
import { useRouter } from "next/navigation";
import { useState } from "react";
import PostEditor from "../_component/PostEditor";

type PostPageProps = {
  params: { postId: string };
};
export default function PostPage({ params }: PostPageProps) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { postId } = params;

  const { fetchWithAuth } = useAuth();

  const [isUpdate, setIsUpdate] = useState<boolean>(false);


  const fetchPost = async () => {
    try {
      const response = await fetchWithAuth("/api/note/"+postId);
      const { data } = response;
      console.log("Post Id:",postId, data);

      return data;
    } catch (error) {
      console.error("Error fetching post ",postId, error);
    }
    return;
  }

  const deletePost = async () => {
    return await fetchWithAuth(`/api/posts/${postId}`, {
      method: "DELETE",
    });
  };

  const { data: post, isLoading: isFetchPostLoading } = useQuery<PostContent, Error>({
    queryKey: ["post"],
    queryFn: fetchPost,
  });

  const { mutate: deletePostMutate, isError: isDeletePostError, error: deleteError, isPending: isDeletePostPending } = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });


  if (isFetchPostLoading || isDeletePostPending) {
    return <div>잠시만 기다려주세요...</div>;
  }
  if (isDeletePostError) {
    console.error("ERR Delete Post",deleteError)
    alert("강의노트 삭제 중 에러 발생.")
  }
  if (!post) {
    return <div style={{ padding: "3rem" }}>포스트가 없습니다.</div>;
  }

  const handleUpdatePost = () => {
    setIsUpdate(true);
  }
  const handleDeletePost = () => {
    if (confirm("정말 삭제하시겠습니까?")) {
      deletePostMutate();
    }
    return;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <Link href="/posts/" className={styles.backArrow}>
            <svg
              fill="currentColor"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8 1.5L1.5 8L8 14.5L9.149 13.349L4.612 8.812H14.5V7.187H4.612L9.149 2.649L8 1.5Z"
              ></path>
            </svg>
          </Link>
          <h3 className={styles.headerTitle}>나의 강의노트</h3>
        </div>
        <div className={styles.headerRight}>
          <button className={styles.updateButton} onClick={handleUpdatePost}>
            <svg
              fill="currentColor"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.32124 4.32518L2.00024 11.6462V14.2552H4.60924L11.9292 6.93318L9.32124 4.32518ZM10.0562 3.59018L11.9012 1.74518L14.5092 4.35318L12.6652 6.19818L10.0562 3.59018Z"
              ></path>
            </svg>
            수정하기
          </button>
          <button className={styles.deleteButton} onClick={handleDeletePost}>
            <svg
              fill="currentColor"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13.5 2.5V3.8H2.5V2.5H5.5L6.5 1.5H9.5L10.5 2.5H13.5ZM9.95 12.65H11.25V6.65H9.95V12.65ZM7.349 12.65H8.65V6.65H7.349V12.65ZM4.75 12.65H6.05V6.65H4.75V12.65ZM3 14.5H13V4.8H3V14.5Z"
              ></path>
            </svg>
            삭제하기
          </button>
        </div>
      </div>
      <div className={styles.card}>
        <div>
          <div className={styles.cardTitle}>{post.title}</div>
          <div className={styles.cardDetail}>3시간 전</div>
        </div>
        <div className={styles.summary}>
          <MarkdownToHTML content={post.summary} />
        </div>
        <div className={styles.rawText}>
          <h4>원본 글</h4>
          <p>{post.content}</p>
        </div>
      </div>
      {isUpdate && <PostEditor beforePost={post} />}
    </div>
  );
}
