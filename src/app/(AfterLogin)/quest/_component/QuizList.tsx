"use client";
import Image from "next/image";
import styles from "./quizList.module.css";

export default function QuizList({
  handleOpenModal,
  quizProgress,
}: {
  handleOpenModal: (index: number) => void;
  quizProgress: boolean[];
}) {
  const totalSolved = quizProgress.filter(Boolean).length;

  const progressPercentage = (totalSolved / quizProgress.length) * 100;

  return (
    <div className={styles.quizSet}>
      {/* 퀴즈 진척도 바와 원 */}
      <div className={styles.progressBarContainer}>
        <div
          className={styles.progressBar}
          style={{ width: `${progressPercentage}%` }}
        ></div>
        <div className={styles.quizProgress}>
          {quizProgress.map((_, index) => (
            <div
              key={index}
              className={`${styles.progressCircle} ${
                index < totalSolved ? styles.solved : ""
              }`}
              style={{
                left: `calc(${
                  ((index + 1) / quizProgress.length) * 100
                }% - 15px)`,
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
        {quizProgress.map((solved, index) => (
          <div key={index} className={styles.quizItem}>
            {!solved && (
              <Image
                width={50}
                height={50}
                alt="unsolved"
                src="https://statics.goorm.io/exp/v1/svgs/badge_default.svg"
              />
              // <div
              //   className={`${styles.quizCircle} ${
              //     solved ? styles.solved : ""
              //   }`}
              // ></div>
            )}
            {solved && (
              <Image
                width={50}
                height={50}
                alt="solved"
                src="https://statics.goorm.io/exp/v1/svgs/badge_success.svg"
              />
            )}
            <div>{index + 1}번 문제</div>
            <button
              className={styles.solveButton}
              onClick={() => handleOpenModal(index)}
              disabled={solved} // 이미 푼 문제는 버튼 비활성화
            >
              풀기
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
