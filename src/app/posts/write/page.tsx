"use client";

import Link from "next/link";
import style from "./page.module.css";
import { useState } from "react";

export default function PostsWrite() {
  const [post, setPost] = useState<string>("");

  const handleSubmitPost = async () => {
    // 여기서 Post를 공개할지 비공개할지 정하고 업로드
  };

  return (
    <div className={style.wrapper}>
      <div className={style.header}>
        <div className={style.headerLeft}>
          <Link href="/posts/" className={style.backArrow}>
            <svg
              fill="currentColor"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M8 1.5L1.5 8L8 14.5L9.149 13.349L4.612 8.812H14.5V7.187H4.612L9.149 2.649L8 1.5Z"
              ></path>
            </svg>
          </Link>
          <h3 className={style.headerTitle}>강의노트 작성</h3>
        </div>
        <div>
          <button className={style.uploadButton} disabled={!post.trim()}>
            업로드
          </button>
        </div>
      </div>
      <div className={style.content}>
        <div>(더미) 파이썬 기초 강좌</div>
        <div>(더미) 1강 사칙연산</div>
        <textarea
          name=""
          id=""
          className={style.textArea}
          onChange={(e) => setPost(e.target.value)}
          placeholder="강의를 듣고 배운 내용을 적어보세요."
          onClick={handleSubmitPost}
        ></textarea>
      </div>
    </div>
  );
}
