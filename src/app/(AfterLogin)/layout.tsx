"use client";

import { useState } from "react";
import styles from "./layout.module.css";

export default function AfterLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isHovered, setIsHovered] = useState(false); // hover 상태 관리
  const [menuOpen, setMenuOpen] = useState(false); // click 상태 관리

  const handleMouseEnter = () => {
    if (!menuOpen) setIsHovered(true); // 클릭 상태가 아니면 hover 시 열림
  };

  const handleMouseLeave = () => {
    if (!menuOpen) setIsHovered(false); // 클릭 상태가 아니면 hover 끝나면 닫힘
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // 클릭하면 고정/해제
    setIsHovered(false); // 클릭 시 hover 상태 해제
  };

  return (
    <div className={styles.container}>
      <div className={styles.sidebarContainer}>
        <div className={styles.header}>
          {!menuOpen && (
            <button
              className={styles.hamburgerIcon}
              onClick={toggleMenu}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {isHovered ? (
                <svg
                  fill="currentColor"
                  width="24"
                  height="24"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M4.69097 12.7021L9.39397 8.0001L4.69097 3.2981L3.77197 4.2171L7.55497 8.0001L3.77197 11.7821L4.69097 12.7021ZM7.60697 11.7821L11.389 8.0001L7.60697 4.2171L8.52497 3.2981L13.228 8.0001L8.52497 12.7021L7.60697 11.7821Z"
                  ></path>
                </svg>
              ) : (
                <svg
                  fill="currentColor"
                  width="24"
                  height="24"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M1.5 12.5H14.5V11.199H1.5V12.5ZM1.5 8.65H14.5V7.35H1.5V8.65ZM1.5 4.8H14.5V3.5H1.5V4.8Z"
                  ></path>
                </svg>
              )}
            </button>
          )}
          <span
            className={`${styles.currentLocation} ${
              menuOpen ? styles.currentLocationOpen : ""
            }`}
          >
            타운홀
          </span>
        </div>

        <div
          className={`${styles.sidebar} ${
            isHovered || menuOpen
              ? menuOpen
                ? styles.sidebarOpen
                : styles.sidebarHover
              : ""
          }`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {(isHovered || menuOpen) && (
            <>
              <div className={styles.sectionHeader}>
                <p className={styles.sectionTitle}>EDUCATION</p>
                {menuOpen && (
                  <button
                    className={styles.closeMenuButton}
                    onClick={toggleMenu}
                  >
                    <svg
                      fill="currentColor"
                      width="24"
                      height="24"
                      viewBox="0 0 16 16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M12.228 11.7822L8.44497 8.00022L12.228 4.21722L11.309 3.29822L6.60597 8.00022L11.309 12.7022L12.228 11.7822ZM7.47497 12.7022L2.77197 8.00022L7.47497 3.29822L8.39397 4.21722L4.61097 8.00022L8.39397 11.7822L7.47497 12.7022Z"
                      ></path>
                    </svg>
                  </button>
                )}
              </div>
              <ul>
                <li>빠른 검색</li>
                <li>알림</li>
                <li>타운홀</li>
                <li>배움일기</li>
                <li>퀘스트</li>
                <li>상점</li>
                <li>랭킹</li>
                <li>피드백</li>
                <li>커뮤니티</li>
              </ul>
            </>
          )}
        </div>
      </div>

      <article
        className={`${styles.content} ${menuOpen ? styles.contentShift : ""}`}
      >
        {children}
      </article>
    </div>
  );
}
