"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function LoginPage() {
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();

    if (!id.trim() || !password.trim()) {
      setErrorMessage("Please enter both email and password.");
      return;
    }

    console.log("Logging in with", { id, password });
    setErrorMessage(null);
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
          <form onSubmit={handleLogin}>
            <input
              type="text"
              name="id"
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="이메일 또는 아이디"
              className={styles.inputField}
            />
            <input
              type="password"
              name="password"
              value={password}
              placeholder="비밀번호"
              onChange={(e) => setPassword(e.target.value)}
              className={styles.inputField}
            />
            <button type="submit" className={styles.loginButton}>
              로그인
            </button>
            <div className={styles.loginOptions}>
              <label>
                <input type="checkbox" /> 로그인 상태 유지
              </label>
              <Link href="#">비밀번호 재설정</Link>
            </div>
          </form>
        </div>
        <div className={styles.languageOptions}>
          <Link href="#">한국어</Link> | <Link href="#">English</Link> |
          <Link href="#">日本語</Link>
        </div>
      </div>
    </div>
  );
}
