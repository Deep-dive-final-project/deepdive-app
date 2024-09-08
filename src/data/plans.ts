// src/data/plans.ts
export interface Task {
    name: string;
    status: string;
  }
  
  export interface Plan {
    id: number;
    title: string;
    course: string;
    goal: string;
    tasks: Task[];
  }
  
  // 초기 학습 계획 데이터
  export const initialPlans: Plan[] = [
    {
      id: 1,
      title: 'HTML+CSS+JS',
      course: 'course1',
      goal: '기초 웹 개발 기술 학습',
      tasks: [
        { name: '섹션1', status: '시작전' },
        { name: '섹션2', status: '진행중' },
      ],
    },
    {
      id: 2,
      title: 'React 심화',
      course: 'course2',
      goal: 'React를 심화 학습',
      tasks: [
        { name: '섹션1', status: '완료' },
        { name: '섹션2', status: '진행중' },
      ],
    },
  ];
  