import Link from "next/link";
import styles from "./postCard.module.css";
import PostContent from "./PostContent";

interface PostCardProps {
  postId: string;
}

export default function PostCard({ postId }: PostCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <Link href="/posts" className={styles.backArrow}>
          <svg
            fill="black"
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
        <Link href={`/posts/${postId}`} className={styles.detail}>
          자세히
        </Link>
      </div>
      <div className={styles.content}>
        <PostContent postId={postId} />
      </div>
    </div>
  );
}
