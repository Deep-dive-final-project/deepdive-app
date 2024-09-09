"use client";
import Image from "next/image";
import styles from "./quizList.module.css";
import { Quiz } from "@/types/quiz";

export default function QuizList({
  handleOpenModal,
  quizzes,
}: {
  handleOpenModal: (index: number) => void;
  quizzes: Quiz[];
}) {
  const totalSolved = quizzes.filter(
    (quiz) => quiz.answer && quiz.feedback
  ).length;
  const progressPercentage = (totalSolved / quizzes.length) * 100;

  return (
    <div className={styles.quizSet}>
      {/* 퀴즈 진척도 바와 원 */}
      <div className={styles.progressBarContainer}>
        <div
          className={styles.progressBar}
          style={{ width: `${progressPercentage}%` }}
        ></div>
        <div className={styles.quizProgress}>
          {quizzes.map((quiz, index) => (
            <div
              key={quiz.id}
              className={`${styles.progressCircle} ${
                quiz.answer && quiz.feedback ? styles.solved : ""
              }`}
              style={{
                left: `calc(${((index + 1) / quizzes.length) * 100}% - 15px)`,
              }}
            >
              <svg
                fill="currentColor"
                width="20"
                height="20"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8 0.666656L2 3.33332V7.33332C2 11.0333 4.56 14.4933 8 15.3333C11.44 14.4933 14 11.0333 14 7.33332V3.33332L8 0.666656ZM9.66667 8.39332L10.2667 10.98L8 9.61332L5.73333 10.98L6.33333 8.39999L4.33333 6.67332L6.97333 6.44666L8 4.01332L9.02667 6.43999L11.6667 6.66666L9.66667 8.39332Z"></path>
              </svg>
            </div>
          ))}
        </div>
      </div>
      {/* 퀴즈 문제 리스트 */}
      <div className={styles.quizList}>
        {quizzes.map((quiz, index) => (
          <div key={quiz.id} className={styles.quizItem}>
            {!quiz.answer && !quiz.feedback && (
              <Image
                width={50}
                height={50}
                alt="unsolved"
                src="https://statics.goorm.io/exp/v1/svgs/badge_default.svg"
              />
            )}
            {quiz.answer && quiz.feedback && (
              <Image
                width={50}
                height={50}
                alt="solved"
                src="https://statics.goorm.io/exp/v1/svgs/badge_success.svg"
              />
            )}
            <div>{quiz.name}</div>
            <button
              className={styles.solveButton}
              onClick={() => handleOpenModal(index)}
            >
              보기
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
