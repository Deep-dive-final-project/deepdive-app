"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import axiosInstance from "@/lib/axios";
import axios from "axios";
import { useAuth } from "@/app/context/AuthProvider";


export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      setErrorMessage("이메일과 비밀번호를 입력하세요.");
      return;
    }

    const isSuccess = await login({ email, password });

    if (!isSuccess) {
      alert("로그인 실패! 아이디를 확인해주세요");
      return;
    }
    router.push("/dashboard");

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
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            <button
              type="submit"
              className={styles.loginButton}
              disabled={!!errorMessage}
            >
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
