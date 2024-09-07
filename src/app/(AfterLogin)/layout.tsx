"use client";

import { useState } from "react";
import styles from "./layout.module.css";

export default function AfterLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMouseEnter = () => {
    if (!menuOpen) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (!menuOpen) setIsHovered(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    setIsHovered(false);
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
            <div className={styles.sectionBar}>
              <div className={styles.sectionContainer}>
                <div className={styles.sectionHeader}>
                  <p className={styles.sectionTitle}>
                    <svg
                      fill="currentColor"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M1.33496 2V14H14.668V4.666H8.00096V2H1.33496ZM5.33496 4.666H6.66896V3.333H5.33496V4.666ZM2.66896 4.666H4.00196V3.333H2.66896V4.666ZM8.00096 6H13.335V12.667H8.00096V11.333H9.33396V10H8.00096V8.666H9.33396V7.333H8.00096V6ZM5.33496 7.334H6.66896V6H5.33496V7.334ZM2.66896 7.334H4.00196V6H2.66896V7.334ZM5.33496 10H6.66896V8.666H5.33496V10ZM2.66896 10H4.00196V8.666H2.66896V10ZM5.33496 12.667H6.66896V11.333H5.33496V12.667ZM2.66896 12.667H4.00196V11.333H2.66896V12.667ZM10.669 8.666H12.002V7.333H10.669V8.666ZM10.669 11.333H12.002V10H10.669V11.333Z"
                      ></path>
                    </svg>
                    EDUCATION
                  </p>
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
                <ul className={styles.listMenu}>
                  <li className={styles.list}>
                    <svg
                      fill="currentColor"
                      width="20"
                      height="20"
                      viewBox="0 0 16 16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M13.5002 7.05182H8.67424L9.77624 1.49982L2.50024 8.94582H7.31524L6.22424 14.4998L13.5002 7.05182Z"
                      ></path>
                    </svg>
                    빠른 검색
                  </li>
                  <li className={styles.list}>
                    <svg
                      fill="currentColor"
                      width="20"
                      height="20"
                      viewBox="0 0 16 16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M12.5 8.68263V6.99963C12.5 4.85963 11.002 3.07663 9 2.62063V1.49963H7V2.62063C4.998 3.07663 3.5 4.85963 3.5 6.99963V8.68263L2 10.6156V11.9146H14V10.6156L12.5 8.68263ZM9.965 12.9146C9.799 13.8526 8.985 14.5656 8 14.5656C7.016 14.5656 6.201 13.8526 6.035 12.9146H9.965Z"
                      ></path>
                    </svg>
                    알림
                  </li>
                </ul>
                <ul className={styles.listMenu}>
                  <li className={styles.list}>
                    <svg
                      fill="currentColor"
                      width="20"
                      height="20"
                      viewBox="0 0 16 16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M1.04224 7.50043H3.04224V14.0004H6.54224V9.50043H9.54224V14.0004H13.0422V7.50043H15.0412L8.04224 1.50043L1.04224 7.50043Z"
                      ></path>
                    </svg>
                    타운홀
                  </li>
                  <li className={styles.list}>
                    <svg
                      fill="currentColor"
                      width="20"
                      height="20"
                      viewBox="0 0 16 16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M4.64051 12.501H14.4995V11.2H4.63951L4.64051 12.501ZM4.62951 3.5L4.63051 4.8H14.4995V3.5H4.62951ZM4.63551 8.65H14.4995V7.35H4.63451L4.63551 8.65ZM3.33851 11.2H1.49951V12.501H3.33951L3.33851 11.2ZM3.32851 3.5H1.49951V4.8H3.32951L3.32851 3.5ZM3.33451 8.65H1.49951V7.35H3.33351L3.33451 8.65Z"
                      ></path>
                    </svg>
                    학습 계획
                  </li>
                  <li className={styles.list}>
                    <svg
                      fill="currentColor"
                      width="20"
                      height="20"
                      viewBox="0 0 16 16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M8 0.666656L2 3.33332V7.33332C2 11.0333 4.56 14.4933 8 15.3333C11.44 14.4933 14 11.0333 14 7.33332V3.33332L8 0.666656ZM9.66667 8.39332L10.2667 10.98L8 9.61332L5.73333 10.98L6.33333 8.39999L4.33333 6.67332L6.97333 6.44666L8 4.01332L9.02667 6.43999L11.6667 6.66666L9.66667 8.39332Z"></path>
                    </svg>
                    퀘스트와 복습을 한 번에!
                  </li>
                  <li className={styles.list}>
                    <svg
                      fill="currentColor"
                      width="20"
                      height="20"
                      viewBox="0 0 16 16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M2 2V13.5H9.06134L9.07006 11.9299L12 7.27651V2H2ZM3.96 5.63H10.01V4.53H3.96V5.63ZM3.96 8.23H10.01V7.13H3.96V8.23ZM3.96 10.83H7.27V9.73H3.96V10.83Z"
                      ></path>
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M11.5 13.1701L10.01 14.0001L10 12.3001L13.01 7.56006L14.5 8.44006L11.5 13.1701Z"
                      ></path>
                    </svg>
                    강의 노트
                  </li>
                  <li className={styles.list}>
                    <svg
                      fill="currentColor"
                      width="20"
                      height="20"
                      viewBox="0 0 16 16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.37329 6.62665L7.99996 5.99998L9.37329 5.37331L9.99996 3.99998L10.6266 5.37331L12 5.99998L10.6266 6.62665L9.99996 7.99998L9.37329 6.62665ZM2.66663 9.33331L3.29329 7.95998L4.66663 7.33331L3.29329 6.70665L2.66663 5.33331L2.03996 6.70665L0.666626 7.33331L2.03996 7.95998L2.66663 9.33331ZM5.66663 5.99998L6.39329 4.39331L7.99996 3.66665L6.39329 2.93998L5.66663 1.33331L4.93996 2.93998L3.33329 3.66665L4.93996 4.39331L5.66663 5.99998ZM2.99996 13.6666L6.99996 9.65998L9.66663 12.3266L15.3333 5.95331L14.3933 5.01331L9.66663 10.3266L6.99996 7.65998L1.99996 12.6666L2.99996 13.6666Z"></path>
                    </svg>
                    랭킹
                  </li>
                  <li className={styles.list}>
                    <svg
                      fill="currentColor"
                      width="20"
                      height="20"
                      viewBox="0 0 16 16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M4 6.059H12V4.759H4V6.059ZM4 8.741H9.5V7.441H4V8.741ZM1.5 1.75V10.25V11.75V14.25L4 11.75H14.5V1.75H1.5Z"
                      ></path>
                    </svg>
                    피드백
                  </li>
                  <li className={styles.list}>
                    <svg
                      fill="currentColor"
                      width="20"
                      height="20"
                      viewBox="0 0 16 16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M5.229 7.09863V6.44263C5.229 6.08263 5.52 5.79163 5.879 5.79163C6.238 5.79163 6.529 6.08263 6.529 6.44263V7.09863C6.529 7.45763 6.238 7.74863 5.879 7.74863C5.52 7.74863 5.229 7.45763 5.229 7.09863ZM9.471 7.09863V6.44263C9.471 6.08263 9.762 5.79163 10.121 5.79163C10.48 5.79163 10.771 6.08263 10.771 6.44263V7.09863C10.771 7.45763 10.48 7.74863 10.121 7.74863C9.762 7.74863 9.471 7.45763 9.471 7.09863ZM11.048 9.87663C10.379 10.9266 9.24 11.5536 8 11.5536C6.76 11.5536 5.621 10.9266 4.952 9.87663C4.759 9.57463 4.848 9.17163 5.151 8.97963C5.453 8.78563 5.855 8.87463 6.048 9.17763C6.477 9.85163 7.207 10.2526 8 10.2526C8.793 10.2526 9.523 9.85163 9.952 9.17763C10.145 8.87463 10.548 8.78563 10.849 8.97963C11.152 9.17163 11.241 9.57463 11.048 9.87663ZM8 13.2006C5.133 13.2006 2.8 10.8676 2.8 7.99963C2.8 5.13263 5.133 2.79963 8 2.79963C10.867 2.79963 13.2 5.13263 13.2 7.99963C13.2 10.8676 10.867 13.2006 8 13.2006ZM8 1.49963C4.41 1.49963 1.5 4.41063 1.5 7.99963C1.5 11.5896 4.41 14.4996 8 14.4996C11.59 14.4996 14.5 11.5896 14.5 7.99963C14.5 4.41063 11.59 1.49963 8 1.49963Z"
                      ></path>
                    </svg>
                    커뮤니티
                  </li>
                </ul>
              </div>
              <div className={styles.profileContainer}>
                <div className={styles.statSection}>
                  <span className={styles.levelText}>
                    Lv. <b>19</b>
                  </span>
                  <div className={styles.cloudContainer}>
                    <img
                      alt="구름조각 아이콘"
                      loading="eager"
                      width="20"
                      height="20"
                      decoding="async"
                      data-nimg="1"
                      src="https://exp.goorm.io/_next/image?url=https%3A%2F%2Fstatics.goorm.io%2Fexp%2Fv1%2Fpngs%2Fgoormpiece.png&w=48&q=100"
                    />
                    <span className={styles.cloudCount}>
                      <b>262</b>개
                    </span>
                  </div>
                </div>
                <div className={styles.footerContainer}>
                  <div className={styles.profileIconWrapper}>
                    <div className={styles.profileIcon}>
                      <span className={styles.initial}>원</span>
                    </div>
                  </div>
                  <div className={styles.footer}>© goorm Inc.</div>
                </div>
              </div>
            </div>
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
