import { Plan } from "@/types/plan";

export const plansWithTasks: Plan[] = [
  {
    plan_id: 1,
    plan_name: "React로 NodeBird SNS 만들기",
    state: "진행중",
    tasks: [
      {
        taskId: 1,
        title: "전역 스타일 및 상태 관리 설정하기",
        state: "완료",
        completeDate: "2024-09-01",
      },
      {
        taskId: 2,
        title: "로그인 폼 만들기 및 유효성 검사 구현",
        state: "진행중",
        completeDate: "",
      },
      {
        taskId: 3,
        title: "styled-components로 반응형 레이아웃 구현",
        state: "대기중",
        completeDate: "",
      },
      {
        taskId: 4,
        title: "더미 데이터를 사용한 로그인 기능 구현",
        state: "대기중",
        completeDate: "",
      },
      {
        taskId: 5,
        title: "프로필 페이지 제작 및 사용자 정보 관리",
        state: "대기중",
        completeDate: "",
      },
    ],
  },
  {
    plan_id: 2,
    plan_name: "Next.js로 서버사이드 렌더링 구현하기",
    state: "대기중",
    tasks: [
      {
        taskId: 6,
        title: "Next.js 프로젝트 초기 설정 및 페이지 구성",
        state: "대기중",
        completeDate: "",
      },
      {
        taskId: 7,
        title: "데이터 패칭 구현",
        state: "대기중",
        completeDate: "",
      },
      {
        taskId: 8,
        title: "SEO 최적화를 위한 Head 컴포넌트 설정",
        state: "대기중",
        completeDate: "",
      },
      {
        taskId: 9,
        title: "API Routes를 이용한 서버사이드 API 구성",
        state: "대기중",
        completeDate: "",
      },
      {
        taskId: 10,
        title: "React Query를 활용한 비동기 데이터 관리",
        state: "대기중",
        completeDate: "",
      },
    ],
  },
  {
    plan_id: 3,
    plan_name: "Redux와 Redux-saga로 상태 관리하기",
    state: "대기중",
    tasks: [
      {
        taskId: 11,
        title: "Redux를 사용한 전역 상태 관리 설정하기",
        state: "대기중",
        completeDate: "",
      },
      {
        taskId: 12,
        title: "Redux-saga를 활용한 비동기 액션 처리",
        state: "대기중",
        completeDate: "",
      },
      {
        taskId: 13,
        title: "로그인 및 회원가입 상태 관리 구현",
        state: "대기중",
        completeDate: "",
      },
      {
        taskId: 14,
        title: "Redux DevTools를 사용한 상태 디버깅",
        state: "대기중",
        completeDate: "",
      },
      {
        taskId: 15,
        title: "서버와 연동한 상태 관리 및 오류 처리",
        state: "대기중",
        completeDate: "",
      },
    ],
  },
];
