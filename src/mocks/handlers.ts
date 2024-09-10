import { http, HttpResponse, StrictResponse } from "msw";
import jwt, { JwtPayload } from "jsonwebtoken";

const SECRET_KEY = "your-secret-key";
const REFRESH_SECRET_KEY = "your-refresh-secret-key";
const ACCESS_TOKEN_EXPIRES_IN = "15m";
const REFRESH_TOKEN_EXPIRES_IN = "7d";

const User = [
  { email: "root@root", password: "1234" },
  { email: "rnxogud136@gmail.com", password: "1234" },
];
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
type LoginRequestBody = {
  email: string;
  password: string;
};
type RefreshRequestBody = {
  refresh_token: string;
};

export const handlers = [
  http.post<{}, LoginRequestBody>("/api/auth/login", async ({ request }) => {
    const { email, password } = await request.json();

    console.log("로그인", email, password);

    const user = User.find(
      (user) => user.email === email && user.password === password
    );

    if (!user) {
      console.log("유효하지 않은 로그인");
      return HttpResponse.json(
        { success: false, data: null, error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const accessToken = jwt.sign({ email: user.email }, SECRET_KEY, {
      expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    });

    const refreshToken = jwt.sign({ email: user.email }, REFRESH_SECRET_KEY, {
      expiresIn: REFRESH_TOKEN_EXPIRES_IN,
    });

    return HttpResponse.json({
      success: true,
      data: {
        access_token: accessToken,
        refresh_token: refreshToken,
      },
      error: null,
    });
  }),

  http.post<{}, RefreshRequestBody>(
    "/api/auth/refresh-token",
    async ({ request }) => {
      const { refresh_token } = await request.json();

      try {
        const decoded = jwt.verify(refresh_token, REFRESH_SECRET_KEY) as JwtPayload;

        const newAccessToken = jwt.sign({ email: decoded.email }, SECRET_KEY, {
          expiresIn: ACCESS_TOKEN_EXPIRES_IN,
        });

        return HttpResponse.json({
          success: true,
          data: {
            access_token: newAccessToken,
          },
          error: null,
        });
      } catch (error) {
        return HttpResponse.json(
          { success: false, data: null, error: "Invalid refresh token" },
          { status: 403 }
        );
      }
    }
  ),

  http.get("/api/protected-resource", ({ request }) => {
    const authHeader = request.headers.get("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return HttpResponse.json(
        {
          success: false,
          data: null,
          error: "Unauthorized, Bearer token missing",
        },
        { status: 401 }
      );
    }
    const token = authHeader.split(" ")[1];

    try {
      // 토큰 검증
      const decoded = jwt.verify(token, SECRET_KEY);

      return HttpResponse.json(
        {
          success: true,
          data: [{ id: 1 }, { id: 2 }],
          error: null,
        },
        {}
      );
    } catch (error) {
      return HttpResponse.json(
        {
          success: false,
          data: null,
          error: "Unauthorized, invalid token",
        },
        { status: 401 }
      );
    }
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
