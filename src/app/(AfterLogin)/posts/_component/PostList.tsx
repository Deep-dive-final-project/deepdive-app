import Link from "next/link";
import styles from "./postItem.module.css";
import PostItem from "./PostItem";

export default function PostList() {
  return (
    <div className={styles.postList}>
      <PostItem />
      <PostItem />
      <PostItem />
    </div>
  );
}
