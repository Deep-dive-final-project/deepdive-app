import Link from "next/link";
import styles from "./postItem.module.css";
import { Post } from "@/types/post";

type PostItemProps = {
  post: Post;
}

export default function PostItem({ post }: PostItemProps) {
  return (
    <Link className={styles.container} href={`/posts/${post.noteId}`}>
      <h3>{post.title}</h3>
    </Link>
  );
}
