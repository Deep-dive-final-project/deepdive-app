"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './campaign.module.css';
import { initialPlans, Plan, Task } from '@/data/plans'; // 학습계획 예시 데이터 임포트

export default function Campaign() {
  const [showCreatePanel, setShowCreatePanel] = useState(false);
  const [planName, setPlanName] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [goal, setGoal] = useState('');
  const [tasks, setTasks] = useState([
    { name: '섹션1', status: '시작전' },
    { name: '섹션2', status: '시작전' },
    { name: '섹션3', status: '시작전' },
  ]);
  const [plans, setPlans] = useState<Plan[]>(initialPlans);
  const [editingPlanId, setEditingPlanId] = useState<number | null>(null);
  const [selectedPlanId, setSelectedPlanId] = useState<number | null>(null);

  const [collapsedSections, setCollapsedSections] = useState<{ [key: string]: boolean }>({
    시작전: false,
    진행중: false,
    완료: false,
  });

  const [error, setError] = useState<{ planName: string; selectedCourse: string }>({
    planName: '',
    selectedCourse: '',
  });

  const router = useRouter();

  const handleCreateButtonClick = () => {
    setEditingPlanId(null);
    resetForm();
    setShowCreatePanel(true);
  };

  const handleClosePanel = () => {
    setShowCreatePanel(false);
    resetForm();
  };

  const handleEditButtonClick = (planId: number) => {
    const planToEdit = plans.find((plan) => plan.id === planId);
    if (planToEdit) {
      setEditingPlanId(planId);
      setPlanName(planToEdit.title);
      setSelectedCourse(planToEdit.course);
      setGoal(planToEdit.goal);
      setTasks(planToEdit.tasks);
    }
    setShowCreatePanel(true);
  };

  const handlePlanClick = (planId: number) => {
    setSelectedPlanId(planId === selectedPlanId ? null : planId);
  };

  const handleTaskStatusChange = (index: number, newStatus: string) => {
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks];
      updatedTasks[index].status = newStatus;
      return updatedTasks;
    });
  };

  const toggleSection = (status: string) => {
    setCollapsedSections((prevState) => ({
      ...prevState,
      [status]: !prevState[status],
    }));
  };

  const resetForm = () => {
    setPlanName('');
    setSelectedCourse('');
    setGoal('');
    setTasks([
      { name: '섹션1', status: '시작전' },
      { name: '섹션2', status: '시작전' },
      { name: '섹션3', status: '시작전' },
    ]);
    setError({ planName: '', selectedCourse: '' });
  };

  const handleSubmitPlan = () => {
    let isValid = true;
    const newError = { planName: '', selectedCourse: '' };

    if (!planName) {
      newError.planName = '제목을 입력해주세요.';
      isValid = false;
    }

    if (!selectedCourse) {
      newError.selectedCourse = '강의를 선택해주세요.';
      isValid = false;
    }

    setError(newError);

    if (!isValid) return;

    if (editingPlanId !== null) {
      setPlans((prevPlans) =>
        prevPlans.map((plan) =>
          plan.id === editingPlanId
            ? { ...plan, title: planName, course: selectedCourse, goal, tasks }
            : plan
        )
      );
    } else {
      const newPlan: Plan = {
        id: plans.length + 1,
        title: planName,
        course: selectedCourse,
        goal,
        tasks,
      };
      setPlans((prevPlans) => [...prevPlans, newPlan]);
      router.push('/campaign/complete');
    }

    handleClosePanel();
  };

  const filteredPlans = {
    시작전: plans.filter((plan) => plan.tasks.every(task => task.status === "시작전")),
    진행중: plans.filter((plan) => plan.tasks.some(task => task.status === "진행중")),
    완료: plans.filter((plan) => plan.tasks.every(task => task.status === "완료")),
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>Deep Dive Fullstack + GenAI Course</div>
      <button className={styles.createButton} onClick={handleCreateButtonClick}>+ 학습 계획 만들기</button>
      
      <div className={styles.campaignContainer}>
        <div className={styles.leftPanel}>
          {Object.entries(filteredPlans).map(([status, plans]) => (
            <div key={status}>
              <h3 
                onClick={() => toggleSection(status)} 
                className={`${styles.panelTitle} ${collapsedSections[status] ? styles.collapsed : ''}`}
              >
                <span className={`${styles.statusBox} ${styles[status]}`}>{status}</span> {plans.length}
              </h3>
              {!collapsedSections[status] && (
                <div className={styles.planList}>
                  {plans.map((plan) => (
                    <div key={plan.id} className={styles.planItem}>
                      <div className={styles.planTitle} onClick={() => handlePlanClick(plan.id)}>
                        {plan.title}
                      </div>
                      <button
                        className={styles.editButton}
                        onClick={() => handleEditButtonClick(plan.id)}
                      >
                        ✏️
                      </button>
                      {selectedPlanId === plan.id && (
                        <div className={styles.planDetails}>
                          {plan.tasks.map((task, index) => (
                            <div key={index} className={styles.taskItem}>
                              <span>{task.name} - {task.status}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 학습 계획 생성 화면 */}
        <div
            className={`${styles.rightPanel} ${
                showCreatePanel ? styles.slideIn : styles.slideOut
            }`}
        >
          <button className={styles.closeButton} onClick={handleClosePanel}>X</button>
          <div className={styles.formContainer}>
            <h2 className={styles.formTitle}>{editingPlanId ? '학습 계획 수정하기' : '학습 계획 만들기'}</h2>

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
              {error.planName && <p className={styles.error}>{error.planName}</p>}
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
              {error.selectedCourse && <p className={styles.error}>{error.selectedCourse}</p>}
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
                    onChange={(e) => handleTaskStatusChange(index, e.target.value)}
                    className={`${styles.statusSelect} ${styles[task.status]}`}
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
              <button className={styles.submitButton} onClick={handleSubmitPlan}>
                {editingPlanId ? '학습 계획 수정하기' : '학습 계획 시작하기'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
