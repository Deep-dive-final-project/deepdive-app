"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './campaign.module.css';
import { initialPlans, Plan, Task } from '@/data/plans'; // 학습계획 예시 데이터 임포트

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
  const [plans, setPlans] = useState<Plan[]>(initialPlans); // 초기 계획 데이터 사용

  const [editingPlanId, setEditingPlanId] = useState<number | null>(null); // 현재 편집 중인 계획 ID
  const [selectedPlanId, setSelectedPlanId] = useState<number | null>(null); // 현재 선택된 계획 ID

  const [error, setError] = useState<{ planName: string; selectedCourse: string }>({
    planName: '',
    selectedCourse: '',
  });

  const router = useRouter();

  // 학습 계획 만들기 버튼 클릭 핸들러
  const handleCreateButtonClick = () => {
      setEditingPlanId(null); // 새로운 계획을 만드는 경우
      resetForm(); // 폼 초기화
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

  // 학습 계획 클릭 핸들러
  const handlePlanClick = (planId: number) => {
    setSelectedPlanId(planId === selectedPlanId ? null : planId); // 클릭한 학습 계획 선택/해제
  };

  // 태스크 상태 변경 핸들러
  const handleTaskStatusChange = (index: number, newStatus: string) => {
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks];
      updatedTasks[index].status = newStatus;
      return updatedTasks;
    });
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
    setError({ planName: '', selectedCourse: '' }); // 오류 메시지 리셋
  };

  // 학습 계획 수정/생성 핸들러
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

    if (!isValid) return; // 유효성 검사를 통과하지 못한 경우

    if (editingPlanId !== null) {
      // 수정 중인 경우
      setPlans((prevPlans) =>
        prevPlans.map((plan) =>
          plan.id === editingPlanId
            ? { ...plan, title: planName, course: selectedCourse, goal, tasks }
            : plan
        )
      );
    } else {
      // 새로운 계획 추가
      const newPlan: Plan = {
        id: plans.length + 1, // 임시 ID 생성, 실제로는 서버에서 관리
        title: planName,
        course: selectedCourse,
        goal,
        tasks,
      };
      setPlans((prevPlans) => [...prevPlans, newPlan]);
       // '/campaign/complete' 페이지로 이동
      router.push('/campaign/complete');
    }

    // 패널 닫기
    handleClosePanel();
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>Deep Dive Fullstack + GenAI Course</div>

      {/* 학습 계획 만들기 버튼 */}
      <button className={styles.createButton} onClick={handleCreateButtonClick}>+ 학습 계획 만들기</button>
      
      <div className={styles.campaignContainer}>
        {/* 학습 계획 리스트 화면 */}
        <div className={styles.leftPanel}>
          <h2 className={styles.panelTitle}>학습 계획 <i>{plans.length}</i></h2>
          {/* 리스트 콘텐츠 */}
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
                {/* 선택된 학습 계획 상세 정보 표시 */}
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
                    onChange={(e) =>
                      handleTaskStatusChange(index, e.target.value)
                    }
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
