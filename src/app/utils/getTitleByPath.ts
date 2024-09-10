export const getTitleByPath = (pathname: string): string => {
  if (pathname.startsWith("/dashboard")) {
    return "타운홀";
  } else if (pathname.startsWith("/campaign")) {
    return "학습 계획";
  } else if (pathname.startsWith("/quest")) {
    return "퀘스트";
  } else if (pathname.startsWith("/posts")) {
    return "강의 노트";
  } else {
    return "Goorm Pro";
  }
};
