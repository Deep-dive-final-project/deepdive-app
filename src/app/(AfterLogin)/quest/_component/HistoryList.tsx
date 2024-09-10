"use client";

import { useState } from "react";
import styles from "./historyList.module.css";
import AnswerModal from "./AnswerModal";
import { plansWithTasks } from "@/data/plansWithTasks";
import { Task } from "@/types/task";


export default function HistoryList() {
  const [openPlan, setOpenPlan] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const togglePlan = (index: number) => {
    if (openPlan === index) {
      setOpenPlan(null);
    } else {
      setOpenPlan(index);
    }
  };

  const handleViewClick = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  return (
    <div className={styles.container}>
      {plansWithTasks.map((plan, index) => (
        <div key={index} className={styles.planItem}>
          <div
            className={`${styles.header} ${styles.noSelect}`}
            onClick={() => togglePlan(index)}
          >
            <h3 className={styles.title}>{plan.plan_name}</h3>
            <div>
              {openPlan === index ? (
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

          <ul
            className={`${styles.tasks} ${
              openPlan === index ? styles.tasksOpen : ""
            }`}
          >
            {plan.tasks.map((task, taskIndex) => (
              <li key={taskIndex} className={styles.taskItem}>
                <div className={`${styles.task} ${styles.noSelect}`}>
                  {task.title}
                  <button
                    onClick={() => handleViewClick(task)}
                    className={styles.viewButton}
                  >
                    보기
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}

      {selectedTask && (
        <AnswerModal
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        task={selectedTask}
        />
      )}
    </div>
  );
}
