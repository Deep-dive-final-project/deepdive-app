"use client";

import ReactMarkdown from "react-markdown";

const sampleMrkdwn = `
# 리액트 훅스 요약

- **useState**: 상태 관리를 위한 훅.
- **useEffect**: 컴포넌트의 렌더링 및 업데이트 시 작업을 처리하는 훅.
- 클래스형 컴포넌트 없이 상태 관리 가능.
- API 호출 및 DOM 업데이트 같은 작업도 처리 가능.
- 훅 사용으로 코드가 더 간결해짐.

`;

export default function MarkdownToHTML({ content }: { content: string }) {
  return (
    <div style={{ color: "black" }}>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
