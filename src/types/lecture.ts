export interface Section {
  sectionName: string;
}

export interface Lecture {
  id: number;
  title: string;
  sections?: Section[];
}
