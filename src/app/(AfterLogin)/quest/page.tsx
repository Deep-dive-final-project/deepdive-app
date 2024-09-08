import styles from "./page.module.css";
import QuizContainer from "../_component/QuizContainer";

export default function QuestPage() {
  return (
    <div className={styles.wrapper}>
      <QuizContainer />
    </div>
  );
}
