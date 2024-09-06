"use client";

import ReactMarkdown from "react-markdown";

const sampleMrkdwn = `
## AI가 이렇게 요약해줄거예요

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
