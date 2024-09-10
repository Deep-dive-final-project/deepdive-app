import { Task } from "./task";

export interface Plan {
  plan_id: number;
  plan_name: string;
  state: string;
  tasks: Task[];
}