

import { Task } from "@/types/task";
import styles from "./answerModal.module.css";
import { taskQnA } from "@/data/taskQnA";

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

  // 일단 더미로 구현
  const qna = taskQnA.find((item) => item.taskId === task.taskId);

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
              <h4 className={styles.name}>{task?.title}</h4>
              <div className={styles.modalContainer}>
              <p className={styles.question}>
                질문: {qna?.question || "질문을 찾을 수 없습니다."}
              </p>
              <p className={styles.answer}>
                제출한 답변: {qna?.submittedAnswer || "답변을 제출하지 않았습니다."}
              </p>
              <p className={styles.result}>
                정답여부: {qna?.isCorrect ? "정답" : "오답"}
              </p>
              <p className={styles.explanation}>
                정답 해설: {qna?.explanation || "해설이 없습니다."}
              </p></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
