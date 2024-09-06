"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();

    // 간단한 유효성 검사 예시
    if (!email || !password) {
      setErrorMessage("Please enter both email and password.");
      return;
    }

    // 로그인 요청을 보내는 예시
    console.log("Logging in with", { email, password });
    setErrorMessage(null); // 에러 메시지 초기화
  };

  return (
    <div style={{ backgroundColor: "#f5f5f5" }}>
      <div className={styles.wrapper}>
        <Image
          src="/images/ICT_Channel_logo.png"
          alt="ICT Channel"
          width={340}
          height={55}
        />
        <div className={styles.socialLogin}>
          <p>다른 서비스로 로그인</p>
          <div className={styles.icons}>
            <Link
              href="#"
              className={`${styles.socialIcon} ${styles.google}`}
            ></Link>
            <Link
              href="#"
              className={`${styles.socialIcon} ${styles.kakao}`}
            ></Link>
            <Link
              href="#"
              className={`${styles.socialIcon} ${styles.naver}`}
            ></Link>
            <Link
              href="#"
              className={`${styles.socialIcon} ${styles.github}`}
            ></Link>
            <Link
              href="#"
              className={`${styles.socialIcon} ${styles.bitbucket}`}
            ></Link>
            <Link
              href="#"
              className={`${styles.socialIcon} ${styles.payco}`}
            ></Link>
          </div>
        </div>
        <div className={styles.dividerContainer}>
          <hr className={styles.divider} />
          <span>또는</span>
          <hr className={styles.divider} />
        </div>
        <div className={styles.loginContainer}>
          <form>
            <input
              type="text"
              placeholder="이메일 또는 아이디"
              className={styles.inputField}
            />
            <input
              type="password"
              placeholder="비밀번호"
              className={styles.inputField}
            />
            <button type="submit" className={styles.loginButton}>
              로그인
            </button>
            <div className={styles.loginOptions}>
              <label>
                <input type="checkbox" /> 로그인 상태 유지
              </label>
              <a href="#">비밀번호 재설정</a>
            </div>
          </form>
        </div>
        <div className={styles.languageOptions}>
          <a href="#">한국어</a> | <a href="#">English</a> |{" "}
          <a href="#">日本語</a>
        </div>

        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: "100%", padding: "0.5rem" }}
            />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: "100%", padding: "0.5rem" }}
            />
          </div>
          <button type="submit" style={{ padding: "0.5rem 1rem" }}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
