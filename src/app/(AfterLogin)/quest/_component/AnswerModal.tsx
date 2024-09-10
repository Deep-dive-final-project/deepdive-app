

import { Task } from "@/types/task";
import styles from "./answerModal.module.css";

export default function AnswerModal({
  isModalOpen,
  handleCloseModal,
  task,
}: {
  isModalOpen: boolean;
  handleCloseModal: () => void;
  task: Task;
}) {
// taskId 기반으로 질문 불러오기


  return (
    <>
      {isModalOpen && (
        <div className={styles.modalBackdrop} onClick={handleCloseModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={handleCloseModal} className={styles.closeButton}>
              ×
            </button>

            <div className={styles.review}>
              <h4 style={{margin: "0"}}>{task?.title}</h4>
              <p className={styles.question}>
                질문: 번 문제
              </p>
              <p className={styles.answer}>제출한 답변: ...</p>
              <p className={styles.result}>정답여부: ...</p>
              <p className={styles.explanation}>정답 해설: ...</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
