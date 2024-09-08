import styles from "./page.module.css";
import QuizContainer from "../_component/QuizContainer";
import HistoryList from "./_component/HistoryList";

export default function QuestPage() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <h1 className={`${styles.dailyQuest} ${styles.inactive}`}>
          일일 퀘스트
        </h1>
        <h1 className={styles.review}>복습하기</h1>
      </div>
      <div className={styles.quizCard}>
        <QuizContainer />
      </div>
      <h3>복습 내역</h3>
      <HistoryList />
    </div>
  );
}
