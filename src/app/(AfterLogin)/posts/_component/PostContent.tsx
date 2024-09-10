import MarkdownToHTML from "@/app/_component/MarkdownToHTML";

interface PostContentProps {
  postId: string;
}

export default function PostContent({ postId }: PostContentProps) {
  return (
    <div>
      <h3>글 id {postId}</h3>
      <p>요약</p>
      {/* <MarkdownToHTML /> */}
    </div>
  );
}
