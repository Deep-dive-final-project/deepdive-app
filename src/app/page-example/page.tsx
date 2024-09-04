"use client";

import { useState } from "react";

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
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "2rem" }}>
      <p>
        이 페이지에서는 useState, useEffect 같은 훅을 활용하기 때문에 use
        client를 사용합니다.
      </p>
      <p>
        event가 일어났을 때 반응하는 코드면 상단에 "use client"를 쓰면 되겠구나
        생각해주시면 돼요
      </p>
      <hr />
      <h1>Login</h1>
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
  );
}
