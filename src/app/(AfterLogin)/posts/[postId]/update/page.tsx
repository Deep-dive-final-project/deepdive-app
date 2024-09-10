"use client";

import Link from "next/link";
import styles from "./page.module.css";
import { useState } from "react";
import { useRouter, useParams  } from "next/navigation";
import MarkdownToHTML from "@/app/_component/MarkdownToHTML";
import { useAuth } from "@/app/context/AuthProvider";
import axios from "axios";

type PostsUpdateProps = {
  beforeTitle: string;
  beforeContent: string;
  beforeSummary: string;
}

export default function PostsUpdate({ beforeTitle, beforeContent, beforeSummary }:PostsUpdateProps) {
  const router = useRouter();
  const { postId } = useParams ();

  const { fetchWithAuth } = useAuth();

  const [title, setTitle] = useState<string>(beforeTitle);
  const [post, setPost] = useState<string>(beforeContent);
  const [isView, setIsView] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [summaryMrkdwn, setSummaryMrkdwn] = useState<string>(beforeSummary);

  const handleSummaryPost = async () => {
    setIsLoading(true);
    try {
      const summaryRes = await axios.post(
        `${process.env.NEXT_PUBLIC_AI_URL}/ai/note/summary`, {
          content: post,
        }
      );
      // const res = await fetchWithAuth("/ai/note/summary",{
      //   method: "post",
      //   data: {
      //     content: post,
      //   }
      // });
      console.log("AI 요약 결과", summaryRes);

    } catch (error) {
      console.error(error);
    }
    
    setIsLoading(false);
  };
  const handleSubmitPost = async () => {
    try {
      const { isSuccess } = await fetchWithAuth(`/api/note/${postId}`, {
        method: 'patch',
        data: {
          title,
          content: post,
          summary: summaryMrkdwn
        }
      })

      if (isSuccess) {
        router.push("/posts");
        return;
      }
    } catch (error) {
      console.error(error)
    }
    
    alert("수정 도중 문제가 발생했습니다.");
    return;
  };

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
          <h3 className={styles.headerTitle}>강의노트 작성</h3>
        </div>
        <div className={styles.buttons}>
          <button
            className={styles.summaryButton}
            disabled={!post.trim() || isLoading}
            onClick={handleSummaryPost}
          >
            AI 요약
          </button>
          <button
            className={styles.uploadButton}
            disabled={!post.trim() || isLoading}
            onClick={handleSubmitPost}
          >
            수정
          </button>
        </div>
      </div>
      <div className={styles.content}>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력하세요."
        />
        <div>{title}</div>
        <textarea
          name="note"
          id=""
          className={styles.textArea}
          onChange={(e) => setPost(e.target.value)}
          placeholder="강의를 듣고 배운 내용을 적어보세요."
        >{post}</textarea>
        {isLoading && <div>Loading...</div>}
        {!!summaryMrkdwn.trim() && <MarkdownToHTML content={summaryMrkdwn} />}
      </div>
    </div>
  );
}

