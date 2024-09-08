"use client";
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
    <div className={`${styles.card} ${styles.quizCard}`}>
      <div className={styles.cardTitle}>퀴즈</div>
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
              ></div>
            ))}
          </div>
        </div>
        {/* 퀴즈 문제 리스트 */}
        <div className={styles.quizList}>
          {quizProgress.map((solved, index) => (
            <div key={index} className={styles.quizItem}>
              <div
                className={`${styles.quizCircle} ${
                  solved ? styles.solved : ""
                }`}
              ></div>
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
    </div>
  );
}
