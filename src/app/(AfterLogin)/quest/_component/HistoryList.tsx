"use client";

import { useState } from "react";
import styles from "./historyList.module.css";
import AnswerModal from "./AnswerModal";

// Lecture and Section types
interface Section {
  title: string;
}

interface Lecture {
  title: string;
  sections: Section[];
}

// Sample lecture data
const lectures: Lecture[] = [
  {
    title: "파이썬 기초 강좌",
    sections: [{ title: "1강 파" }, { title: "2강 이" }, { title: "3강 썬" }],
  },
  {
    title: "파이썬 중급 강좌",
    sections: [{ title: "1강 파" }, { title: "2강 이" }, { title: "3강 썬" }],
  },
  {
    title: "파이썬 고급 강좌",
    sections: [{ title: "1강 파" }, { title: "2강 이" }, { title: "3강 썬" }],
  },
];

// Modal component to show quiz details
function QuizModal({
  isOpen,
  onClose,
  section,
}: {
  isOpen: boolean;
  onClose: () => void;
  section: Section | null;
}) {
  if (!isOpen || !section) return null;

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          X
        </button>
        <h2 className={styles.modalTitle}>{section.title}</h2>
        <p>문제: ...</p>
        <p>답변: ...</p>
        <p>해설: ...</p>
      </div>
    </div>
  );
}

export default function HistoryList() {
  const [openLecture, setOpenLecture] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);

  // Toggle which lecture is open
  const toggleLecture = (index: number) => {
    if (openLecture === index) {
      setOpenLecture(null);
    } else {
      setOpenLecture(index);
    }
  };

  // Open the modal and set the selected section
  const handleViewClick = (section: Section) => {
    setSelectedSection(section);
    setIsModalOpen(true);
  };

  // Close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSection(null);
  };

  return (
    <div className={styles.container}>
      {lectures.map((lecture, index) => (
        <div key={index} className={styles.lectureItem}>
          <div
            className={`${styles.header} ${styles.noSelect}`}
            onClick={() => toggleLecture(index)}
          >
            <h3 className={styles.title}>{lecture.title}</h3>
            <div>
              {openLecture === index ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  width="16"
                  height="16"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 15l7-7 7 7"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  width="16"
                  height="16"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              )}
            </div>
          </div>

          <ul
            className={`${styles.sections} ${
              openLecture === index ? styles.sectionsOpen : ""
            }`}
          >
            {lecture.sections.map((section, sectionIndex) => (
              <li key={sectionIndex} className={styles.sectionItem}>
                <div className={`${styles.section} ${styles.noSelect}`}>
                  {section.title}
                  <button
                    onClick={() => handleViewClick(section)}
                    className={styles.viewButton}
                  >
                    보기
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}

      {/* QuizModal: Only opens when a section is selected */}
      {selectedSection && (
        <AnswerModal
          isModalOpen={isModalOpen}
          handleCloseModal={handleCloseModal}
          quizIndex={null}
          handleQuizSolve={() => {}}
        />
      )}
    </div>
  );
}
