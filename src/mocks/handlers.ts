import { http, HttpResponse, StrictResponse } from "msw";

const User = [{ email: "root@root", password: "1234" }];
const Posts = [];

export const handlers = [
  http.post("/api/auth/login", () => {
    console.log("로그인");
    return HttpResponse.json(User[1], {
      headers: {
        "Set-Cookie": "SESSION=msw-cookie;HttpOnly;Path=/",
      },
    });
  }),
  http.post("/api/auth/logout", () => {
    console.log("로그아웃");
    return new HttpResponse(null, {
      headers: {
        "Set-Cookie": "SESSION=;HttpOnly;Path=/;Max-Age=0",
      },
    });
  }),
  http.get("/api/quest", ({ request }) => {
    return HttpResponse.json([
      {
        id: 1,
        name: "java",
        content: "java는 무슨 언어인가?",
        answer: "java는 객체지향 언어다.",
        feedback: "정답입니다.",
        createdDate: "2024-08-19",
      },
      {
        id: 2,
        name: "python",
        content: "python의 주요 특징은 무엇인가?",
        answer: "python은 문법이 간결하고, 다양한 라이브러리를 제공한다.",
        feedback: "정확합니다. Python은 초보자에게 인기 있는 언어입니다.",
        createdDate: "2024-08-20",
      },
      {
        id: 3,
        name: "html",
        content: "html의 주요 역할은 무엇인가?",
        answer: "html은 웹 페이지의 구조를 정의하는 마크업 언어다.",
        feedback: "맞습니다. HTML은 웹 개발의 기초를 형성합니다.",
        createdDate: "2024-08-21",
      },
      {
        id: 4,
        name: "sql",
        content: "sql은 무엇을 하는 언어인가?",
        answer: "sql은 데이터베이스에서 데이터를 쿼리하고 조작하는 언어다.",
        feedback:
          "정확합니다. SQL은 데이터베이스 관리에서 필수적인 도구입니다.",
        createdDate: "2024-08-22",
      },
      {
        id: 5,
        name: "c++",
        content: "c++의 주요 특징은 무엇인가?",
        answer: "c++은 객체지향과 절차적 프로그래밍을 지원하는 언어다.",
        feedback:
          "맞습니다. C++은 복잡한 시스템과 애플리케이션 개발에 적합합니다.",
        createdDate: "2024-08-23",
      },
    ]);
  }),
  http.get("/api/note", ({ request }) => {
    return HttpResponse.json([
      {
        postId: 1,
        User: User[0],
        content: `${1} Stop following me. I'm too famous.`,
        createdAt: new Date(),
      },
      {
        postId: 2,
        User: User[0],
        content: `${2} Stop following me. I'm too famous.`,
        createdAt: new Date(),
      },
      {
        postId: 3,
        User: User[0],
        content: `${3} Stop following me. I'm too famous.`,
        createdAt: new Date(),
      },
      {
        postId: 4,
        User: User[0],
        content: `${4} Stop following me. I'm too famous.`,
        createdAt: new Date(),
      },
      {
        postId: 5,
        User: User[0],
        content: `${5} Stop following me. I'm too famous.`,
        createdAt: new Date(),
      },
    ]);
  }),
  http.get("/api/note/:noteId", ({ request, params }) => {
    const { noteId } = params;
    return HttpResponse.json([{}]);
  }),
];
