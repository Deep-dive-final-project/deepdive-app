"use client";

import ReactMarkdown from "react-markdown";

const sampleMrkdwn = `
# 마크다운 변환

This is a **Markdown** text.

- Item 1
- Item 2
`;

export default function MarkdownToHTML() {
  return (
    <div>
      <ReactMarkdown>{sampleMrkdwn}</ReactMarkdown>
    </div>
  );
}
