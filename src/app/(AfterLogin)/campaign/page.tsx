// src/app/campaign/page.tsx
"use client";

import React, { useState } from 'react';
import styles from './campaign.module.css';

export default function Campaign() {
  const [showCreatePanel, setShowCreatePanel] = useState(false); // 상태로 화면 전환 관리
  const [planName, setPlanName] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [goal, setGoal] = useState('');
  const [tasks, setTasks] = useState([
    { name: '섹션1', status: '시작전' },
    { name: '섹션2', status: '시작전' },
    { name: '섹션3', status: '시작전' },
  ]);

  // 학습 계획 만들기 버튼 클릭 핸들러
  const handleCreateButtonClick = () => {
      setShowCreatePanel(true);
  };

  const handleClosePanel = () => {
      setShowCreatePanel(false);
  };

  // 태스크 상태 변경 핸들러
  const handleTaskStatusChange = (index: number, newStatus: string) => {
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks];
      updatedTasks[index].status = newStatus;
      return updatedTasks;
    });
  };


  return (
    <div className={styles.container}>
      <div className={styles.header}>학습 계획</div>

      {/* 학습 계획 만들기 버튼 */}
      <button className={styles.createButton} onClick={handleCreateButtonClick}>+ 학습 계획 만들기</button>
      
      <div className={styles.campaignContainer}>
        {/* 학습 계획 리스트 화면 */}
        <div className={styles.leftPanel}>
          <h2 className={styles.panelTitle}>학습 계획 리스트</h2>
          {/* 리스트 콘텐츠 */}
          <div className={styles.planList}>
            <div className={styles.planItem}>
              <span>HTML+CSS+JS</span>
              <button className={styles.editButton}>✏️</button>
            </div>
            <div className={styles.planItem}>
              <span>React 심화</span>
              <button className={styles.editButton}>✏️</button>
            </div>
          </div>
        </div>

        {/* 학습 계획 생성 화면 */}
        <div
            className={`${styles.rightPanel} ${
                showCreatePanel ? styles.slideIn : styles.slideOut
            }`}
        >
          <button className={styles.closeButton} onClick={handleClosePanel}>
              X
          </button>
          <div className={styles.formContainer}>
            <h2 className={styles.formTitle}>학습 계획 만들기</h2>

            {/* 학습 계획 제목 입력 */}
            <label className={styles.label}>
              학습 계획 제목
              <input
                type="text"
                value={planName}
                onChange={(e) => setPlanName(e.target.value)}
                className={styles.input}
                placeholder="(예) 프론트엔드 심화 학습"
              />
            </label>

            {/* 강의 선택 드롭다운 */}
            <label className={styles.label}>
              강의 선택하기
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className={styles.select}
              >
                <option value="">강의 선택</option>
                <option value="course1">HTML+CSS+JS</option>
                <option value="course2">React 심화</option>
              </select>
            </label>

            {/* 목표 입력 */}
            <label className={styles.label}>
              학습 목표
              <textarea
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className={styles.textarea}
                placeholder="이번 학습에서는 어떤 것을 달성하실 건가요?"
              />
            </label>

            {/* 태스크 목록 */}
            <div className={styles.taskSection}>
              <h3 className={styles.taskTitle}>태스크 목록</h3>
              {tasks.map((task, index) => (
                <div key={index} className={styles.taskItem}>
                  <span>{task.name}</span>
                  <select
                    value={task.status}
                    onChange={(e) =>
                      handleTaskStatusChange(index, e.target.value)
                    }
                    className={styles.statusSelect}
                  >
                    <option value="시작전">시작전</option>
                    <option value="진행중">진행중</option>
                    <option value="완료">완료</option>
                  </select>
                </div>
              ))}
            </div>

            {/* 버튼 섹션 */}
            <div className={styles.buttonSection}>
              <button className={styles.submitButton}>
                학습 계획 시작하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
