import { http, HttpResponse, StrictResponse } from "msw";

const User = [{ email: "root@root", password: "1234" }];
let quests = [
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
    answer: "",
    feedback: "",
    createdDate: "2024-08-20",
  },
  {
    id: 3,
    name: "html",
    content: "html의 주요 역할은 무엇인가?",
    answer: "",
    feedback: "",
    createdDate: "2024-08-21",
  },
];

export const handlers = [
  http.post("/api/auth/login", () => {
    console.log("로그인");
    return HttpResponse.json(User[0], {
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
  http.get("/api/quest", () => {
    return HttpResponse.json(quests);
  }),
  http.post("/api/quest/:questId", ({ request, params }) => {
    const { questId } = params;

    const updatedQuest = quests.find((quest) => quest.id === Number(questId));

    if (updatedQuest) {
      updatedQuest.answer = "옳은 답변";
      updatedQuest.feedback = "아무튼 피드백";
    }

    console.log("Quest updated", updatedQuest);

    return HttpResponse.json({
      contents: {
        strength: "strength",
        weak: "weak",
        feedback: "feedback",
      },
    });
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
