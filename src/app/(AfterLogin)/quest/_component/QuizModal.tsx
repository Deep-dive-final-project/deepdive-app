"use client";
import { useEffect, useState } from "react";
import styles from "./quizModal.module.css";
import type { Quiz } from "@/types/quiz";

export default function QuizModal({
  isModalOpen,
  handleCloseModal,
  quiz,
  handleQuizSolve,
}: {
  isModalOpen: boolean;
  handleCloseModal: () => void;
  quiz: Quiz;
  handleQuizSolve: (quizId: number, content: string, answer: string) => void;
}) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [answer, setAnswer] = useState("");
  const [submittedAnswer, setSubmittedAnswer] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedAnswer(answer);

    handleQuizSolve(quiz.id, quiz.content, answer);
    setIsSubmitted(true);
  };

  useEffect(() => {
    if (!!quiz.answer && !!quiz.feedback) {
      setIsSubmitted(true);
    }
  }, []);

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
            {isSubmitted ? (
              <div className={styles.review}>
                <h3 className={styles.name}>{quiz.name}</h3>
                <div className={styles.modalContainer}>
                  <p className={styles.question}>질문: {quiz.content}</p>
                  <p className={styles.answer}>제출한 답변: {quiz.answer}</p>
                  <p className={styles.explanation}>
                    정답 해설: {quiz.feedback}
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.form}>
                <h3 className={styles.name}>{quiz.name}</h3>
                <div className={styles.modalContainer}>
                  <p className={styles.question}>질문: {quiz.content}</p>
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
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
