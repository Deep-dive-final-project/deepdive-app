"use client";
import { useState } from "react";
import styles from "./quizModal.module.css";
import type { Quiz } from "@/types/quiz";
import axiosInstance from "@/lib/axios";

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
                <p className={styles.question}>질문: {quiz.content}</p>
                <p className={styles.answer}>제출한 답변: {submittedAnswer}</p>
                <p className={styles.result}>정답여부: ...</p>
                <p className={styles.explanation}>정답 해설: ...</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.form}>
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
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
