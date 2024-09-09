export interface Quiz {
  id: number;
  name: string;
  content: string;
  answer?: string;
  feedback?: string;
  createdDate: string;
}

export interface QuizFeedback {
  strength: string;
  weak: string;
  feedback: string;
}
