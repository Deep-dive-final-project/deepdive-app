import styles from "./page.module.css";
import QuizContainer from "../_component/QuizContainer";
import HistoryList from "./_component/HistoryList";

export default function QuestPage() {
  return (
    <div className={styles.wrapper}>
      <h1>복습하기</h1>
      <div className={styles.quizCard}>
        <QuizContainer />
      </div>
      <h3>복습 내역</h3>
      <HistoryList />
    </div>
  );
}
