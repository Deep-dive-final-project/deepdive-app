export type ActivityStatus = {
  title: string;
  value: number;
  unit: string;
};

export const activityStatuses: ActivityStatus[] = [
  { title: "퀘스트 완료 횟수", value: 209, unit: "p" },
  { title: "자신이 보낸 응원, 감사, 인정하기의 총 횟수", value: 164, unit: "p" },
  { title: "오늘 할 일 작성 제출 횟수", value: 156, unit: "p" },
];

export const overallPercentage = 37;
export const expPoints = 1041;
