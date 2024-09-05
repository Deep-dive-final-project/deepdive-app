// app/page.jsx
import ClientComponent from "../_component/ClientComponent";
import ServerComponent from "../_component/ServerComponent";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <div>
      <h1>Component에서 use client를 사용하는 경우</h1>
      <p>
        use client를 <span className={styles.use}>쓰는 컴포넌트</span>와{" "}
        <span className={styles.notUse}>안쓰는 컴포넌트</span>를 같은 페이지에
        배치할 수 있어요
      </p>
      <hr />
      <p>
        아래는 useState를 사용하기 때문에 코드 상단에 "use client"를 씁니다.
      </p>
      <div className={styles.useComponent}>
        <ClientComponent />
      </div>
      <hr />
      <p>
        아래는 useState같은 훅을 사용하지 않았어요. 그래서 "use client" 없이
        코드가 잘 돌아갑니다.
      </p>
      <div className={styles.notUseComponent}>
        <ServerComponent />
      </div>
    </div>
  );
}
