"use client";
import { useState } from "react";
import styles from "./answerModal.module.css";

export default function AnswerModal({
  isModalOpen,
  handleCloseModal,
  quizIndex,
  handleQuizSolve,
}: {
  isModalOpen: boolean;
  handleCloseModal: () => void;
  quizIndex: number | null;
  handleQuizSolve: (index: number) => void;
}) {
  const [answer, setAnswer] = useState("");
  const [submittedAnswer, setSubmittedAnswer] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedAnswer(answer);
    if (quizIndex !== null) {
      handleQuizSolve(quizIndex); // Solve the quiz after submitting the answer
    }
  };

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
              <p className={styles.question}>
                질문: {quizIndex ?? "0" + 1}번 문제
              </p>
              <p className={styles.answer}>제출한 답변: {submittedAnswer}</p>
              <p className={styles.result}>정답여부: ...</p>
              <p className={styles.explanation}>정답 해설: ...</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
