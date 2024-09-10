"use client";

import Link from "next/link";
import styles from "./page.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import MarkdownToHTML from "@/app/_component/MarkdownToHTML";

export default function PostsWrite() {
  const router = useRouter();

  const [title, setTitle] = useState<string>("");
  const [post, setPost] = useState<string>("");
  const [isView, setIsView] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSummaryPost = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsView(true);
    }, 1000);
  };
  const handleSubmitPost = async () => {
    router.push("/posts");
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
            className={styles.uploadButton}
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
        <div>리액트 기본 강의 - 리액트의 개념과 기초</div>
        <textarea
          name="note"
          id=""
          className={styles.textArea}
          onChange={(e) => setPost(e.target.value)}
          placeholder="강의를 듣고 배운 내용을 적어보세요."
        ></textarea>
        {isLoading && <div>Loading...</div>}
        {isView && <MarkdownToHTML content={sampleMrkdwn} />}
      </div>
    </div>
  );
}

const sampleMrkdwn = `# 리액트 훅스 요약

- **리액트 훅스**는 함수형 컴포넌트에서 상태 관리와 생명주기를 다루기 위한 도구이다.
- \`useState\`: 상태 추가 및 업데이트.
- \`useEffect\`: 부수적인 작업 처리 (API 호출, DOM 업데이트 등).
- 클래스형 컴포넌트 없이 상태 관리를 할 수 있어 코드가 간결해진다.
- 복잡한 라이프사이클 메서드를 대체하여 가독성을 높임.

**배운 점:**
- \`useState\`, \`useEffect\`의 사용법을 익힘.
- 훅스를 통해 더 직관적인 코드를 작성할 수 있음.

`;
