import styles from "./planItem.module.css";
import Link from "next/link";
import { Plan } from "@/types/plan";

interface PlanItemProps {
  plan: Plan;
  isOpen: boolean;
  togglePlan: () => void;
}

export default function PlanItem({
  plan,
  isOpen,
  togglePlan,
}: PlanItemProps) {
  return (
    <div className={styles.planItem}>
      <div
        className={`${styles.header} ${styles.noSelect}`}
        onClick={togglePlan}
      >
        <h3 className={styles.title}>{plan.plan_name}</h3>
        <div>
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              width="16"
              height="16"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 15l7-7 7 7"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              width="16"
              height="16"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          )}
        </div>
      </div>

      {isOpen && (
        <ul
          className={`${styles.tasks} ${isOpen ? styles.tasksOpen : ""}`}
        >
          {plan.tasks?.map((task, taskIndex) => {
            // api가 없어서 임시 방편으로...
            if (task.state === 'finish') {
              return (<li key={taskIndex} className={styles.taskItem}>
                <div className={`${styles.task}`}>
                  {task.title}
                  <Link href={`/posts/${task.taskId-1}`} className={styles.readButton}>
                    읽기
                  </Link>
                </div>
              </li>)
            }
          
            return (<li key={taskIndex} className={styles.taskItem}>
              <div className={`${styles.task}`}>
                {task.title}
                <Link href={`/posts/write?taskId=${task.taskId}&taskTitle=${task.title}`} 
                className={styles.writeButton}>
                  쓰기
                </Link>
              </div>
            </li>)
        
          })}
        </ul>
      )}
    </div>
  );
}
