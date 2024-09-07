export interface LearningPlan {
    courseName: string;
    sectionNumber: string;
    sectionTitle: string;
    status: '시작전' | '진행중' | '완료';
  }
  
  export const learningPlans: LearningPlan[] = [
    { courseName: '프롬프트 엔지니어링', sectionNumber: '섹션1', sectionTitle: '강의소개', status: '시작전' },
    { courseName: '프롬프트 엔지니어링', sectionNumber: '섹션2', sectionTitle: '이론', status: '시작전' },
    { courseName: '프롬프트 엔지니어링', sectionNumber: '섹션3', sectionTitle: '프롬프트 엔지니어링 기법', status: '시작전' },
    { courseName: '프롬프트 엔지니어링', sectionNumber: '섹션4', sectionTitle: '이론', status: '시작전' },
    { courseName: '프롬프트 엔지니어링', sectionNumber: '섹션5', sectionTitle: '프롬프트 엔지니어링 기법', status: '시작전' },
  ];
  