import styles from "./page.module.css";
import Link from "next/link";
import MarkdownToHTML from "@/app/_component/MarkdownToHTML";

type Props = {
  params: { postId: string };
};
export default async function Profile({ params }: Props) {
  const { postId } = params;
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
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M8 1.5L1.5 8L8 14.5L9.149 13.349L4.612 8.812H14.5V7.187H4.612L9.149 2.649L8 1.5Z"
              ></path>
            </svg>
          </Link>
          <h3 className={styles.headerTitle}>나의 강의노트</h3>
        </div>
        <div className={styles.headerRight}>
          <button className={styles.updateButton}>
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
                d="M9.32124 4.32518L2.00024 11.6462V14.2552H4.60924L11.9292 6.93318L9.32124 4.32518ZM10.0562 3.59018L11.9012 1.74518L14.5092 4.35318L12.6652 6.19818L10.0562 3.59018Z"
              ></path>
            </svg>
            수정하기
          </button>
          <button className={styles.deleteButton}>
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
                d="M13.5 2.5V3.8H2.5V2.5H5.5L6.5 1.5H9.5L10.5 2.5H13.5ZM9.95 12.65H11.25V6.65H9.95V12.65ZM7.349 12.65H8.65V6.65H7.349V12.65ZM4.75 12.65H6.05V6.65H4.75V12.65ZM3 14.5H13V4.8H3V14.5Z"
              ></path>
            </svg>
            삭제하기
          </button>
        </div>
      </div>
      <div className={styles.card}>
        <div>
          <div className={styles.cardTitle}>강의노트 제목</div>
          <div className={styles.cardDetail}>3시간 전</div>
        </div>
        <div className={styles.summary}>
          <MarkdownToHTML />
        </div>
        <div className={styles.rawText}>
          <h5>원본 글</h5>
        </div>
      </div>
    </div>
  );
}
