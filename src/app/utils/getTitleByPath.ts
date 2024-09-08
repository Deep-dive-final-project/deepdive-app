export const getTitleByPath = (pathname: string): string => {
  switch (pathname) {
    case "/dashboard":
      return "타운홀";
    case "/campaign":
      return "학습 계획";
    case "/quest":
      return "퀘스트";
    case "/posts":
      return "강의 노트";
    default:
      return "Goorm Pro";
  }
};
