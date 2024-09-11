"use client";

import Link from "next/link";
import styles from "../page.module.css";
import { useState, useEffect, Suspense  } from "react";
import { useRouter, useSearchParams  } from "next/navigation";
import MarkdownToHTML from "@/app/_component/MarkdownToHTML";
import { useAuth } from "@/app/context/AuthProvider";


export default function PostWriter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const taskId = searchParams.get("taskId");
  const taskTitle = searchParams.get("taskTitle");

  useEffect(() => {
    if (!taskId) {
      router.push("/posts");
    }
  }, [taskId, router]);

  const { fetchWithAuth } = useAuth();

  const [title, setTitle] = useState<string>("");
  const [post, setPost] = useState<string>("");
  const [isView, setIsView] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [summaryMrkdwn, setSummaryMrkdwn] = useState<string>("");

  const handleSummaryPost = async () => {
    setIsLoading(true);
    // try {
    //   const summaryRes = await axios.post(
    //     `${process.env.NEXT_PUBLIC_AI_URL}/ai/note/summary`, {
    //       content: post,
    //     }
    //   );
    //   // const res = await fetchWithAuth("/ai/note/summary",{
    //   //   method: "post",
    //   //   data: {
    //   //     content: post,
    //   //   }
    //   // });
    //   console.log("AI 요약 결과", summaryRes);

    // } catch (error) {
    //   console.error(error);
    // }

    // api 작동을 안해서
    setTimeout(() => {
      setIsView(true);
      setIsLoading(false);
    }, 1000)
  };
  const handleSubmitPost = async () => {
    try {
      const { isSuccess } = await fetchWithAuth("/api/note", {
        method: 'post',
        data: {
          task_id: taskId,
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
    
    alert("업로드 중 문제가 발생했습니다.");
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
            업로드
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
        <div>{taskTitle}</div>
        <textarea
          name="note"
          id=""
          className={styles.textArea}
          onChange={(e) => setPost(e.target.value)}
          placeholder="강의를 듣고 배운 내용을 적어보세요."
        ></textarea>
        {isLoading && <div>Loading...</div>}
        {isView && <MarkdownToHTML content={summaryMrkdwn} />}
      </div>
    </div>
  );
}

