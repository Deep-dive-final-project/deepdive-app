import styles from "./lectureItem.module.css";
import Link from "next/link";
import { Lecture } from "@/types/lecture";

interface LectureItemProps {
  lecture: Lecture;
  isOpen: boolean;
  toggleLecture: () => void;
}

export default function LectureItem({
  lecture,
  isOpen,
  toggleLecture,
}: LectureItemProps) {
  return (
    <div className={styles.lectureItem}>
      <div
        className={`${styles.header} ${styles.noSelect}`}
        onClick={toggleLecture}
      >
        <h3 className={styles.title}>{lecture.title}</h3>
        <div>
          {isOpen ? (
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

      {isOpen && (
        <ul className={styles.sections}>
          {lecture?.sections?.map((section, sectionIndex) => (
            <li key={sectionIndex} className={styles.sectionItem}>
              <div className={`${styles.section} ${styles.noSelect}`}>
                {section.title}
                {section.isWritten ? (
                  <button className={styles.readButton}>읽기</button>
                ) : (
                  <Link href="/posts/write" className={styles.writeButton}>
                    쓰기
                  </Link>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
