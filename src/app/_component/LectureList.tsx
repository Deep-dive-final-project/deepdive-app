"use client";

import { useState } from "react";
import style from "./lectureList.module.css";
import Link from "next/link";

interface Section {
  title: string;
  isWritten: boolean; // 작성 여부
}

// Lecture 타입 정의
interface Lecture {
  title: string;
  sections: Section[];
}

// 강의 데이터
const lectures: Lecture[] = [
  {
    title: "파이썬 기초 강좌",
    sections: [
      { title: "1강 파", isWritten: true },
      { title: "2강 이", isWritten: false },
      { title: "3강 썬", isWritten: true },
    ],
  },
  {
    title: "파이썬 중급 강좌",
    sections: [
      { title: "1강 파", isWritten: true },
      { title: "2강 이", isWritten: false },
      { title: "3강 썬", isWritten: true },
    ],
  },
  {
    title: "파이썬 고급 강좌",
    sections: [
      { title: "1강 파", isWritten: true },
      { title: "2강 이", isWritten: false },
      { title: "3강 썬", isWritten: true },
    ],
  },
];

export default function LectureList() {
  const [openLecture, setOpenLecture] = useState<number | null>(null);

  const toggleLecture = (index: number) => {
    if (openLecture === index) {
      setOpenLecture(null);
    } else {
      setOpenLecture(index);
    }
  };

  return (
    <div className={style.container}>
      {lectures.map((lecture, index) => (
        <div key={index} className={style.lectureItem}>
          <div
            className={`${style.header} ${style.noSelect}`}
            onClick={() => toggleLecture(index)}
          >
            <h3 className={style.title}>{lecture.title}</h3>
            <div>
              {openLecture === index ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  width="16"
                  height="16"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 15l7-7 7 7"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  width="16"
                  height="16"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              )}
            </div>
          </div>

          <ul
            className={`${style.sections} ${
              openLecture === index ? style.sectionsOpen : ""
            }`}
          >
            {lecture.sections.map((section, sectionIndex) => (
              <li key={sectionIndex} className={style.sectionItem}>
                <div className={`${style.section} ${style.noSelect}`}>
                  {section.title}
                  {section.isWritten ? (
                    <Link
                      href={`/posts/${sectionIndex}`}
                      className={style.readButton}
                    >
                      읽기
                    </Link>
                  ) : (
                    <Link href={`/posts/write`} className={style.writeButton}>
                      쓰기
                      {/* <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M19.8201 14H15.6001C15.04 14 14.76 14 14.5461 14.109C14.3579 14.2049 14.2049 14.3578 14.1091 14.546C14.0001 14.7599 14.0001 15.0399 14.0001 15.6V19.82M20 12.7269V7.2C20 6.0799 20 5.51984 19.782 5.09202C19.5903 4.71569 19.2843 4.40973 18.908 4.21799C18.4802 4 17.9201 4 16.8 4H7.2C6.0799 4 5.51984 4 5.09202 4.21799C4.71569 4.40973 4.40973 4.71569 4.21799 5.09202C4 5.51984 4 6.0799 4 7.2V16.8C4 17.9201 4 18.4802 4.21799 18.908C4.40973 19.2843 4.71569 19.5903 5.09202 19.782C5.51984 20 6.0799 20 7.2 20H12.9496C13.4578 20 13.7118 20 13.9498 19.9407C14.1608 19.8882 14.3618 19.8016 14.5449 19.6844C14.7515 19.5522 14.926 19.3675 15.2751 18.9983L19.1254 14.9252C19.4486 14.5833 19.6101 14.4124 19.7255 14.2156C19.8278 14.041 19.903 13.8519 19.9486 13.6548C20 13.4325 20 13.1973 20 12.7269Z"
                        stroke="#000000"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg> */}
                    </Link>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
