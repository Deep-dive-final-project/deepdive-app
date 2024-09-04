import Link from "next/link";

export default function Posts() {
  return (
    <div>
      <h1>강의노트</h1>
      <Link href="/posts/write">강의노트 작성</Link>
    </div>
  );
}
