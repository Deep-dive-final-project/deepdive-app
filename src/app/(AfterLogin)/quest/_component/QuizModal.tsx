"use client";
import { useState } from "react";
import styles from "./quizModal.module.css";

export default function QuizModal({
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
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [answer, setAnswer] = useState("");
  const [submittedAnswer, setSubmittedAnswer] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedAnswer(answer);
    setIsSubmitted(true);
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
              X
            </button>
            {isSubmitted ? (
              <div className={styles.review}>
                <p className={styles.question}>
                  질문: {quizIndex ?? "0" + 1}번 문제
                </p>
                <p className={styles.answer}>제출한 답변: {submittedAnswer}</p>
                <p className={styles.result}>정답여부: ...</p>
                <p className={styles.explanation}>정답 해설: ...</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.form}>
                <p className={styles.question}>
                  질문: {quizIndex ?? "0" + 1}번 문제
                </p>
                <input
                  type="text"
                  className={styles.input}
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="답변을 입력하세요"
                />
                <button type="submit" className={styles.submitButton}>
                  제출
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
