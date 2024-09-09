"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import styles from './campaign.module.css';

// Task의 타입 정의
interface Task {
  name: string;
  status: string; // '시작전', '진행중', '완료' 상태를 가짐
}

// Plan의 타입 정의
interface Plan {
  id: number;
  plan_name: string;
  course?: string;
  goal?: string;
  tasks: Task[];
  state: 'pending' | 'on_going' | 'finish'; // 상태를 문자열 리터럴 타입으로 지정
}

// PlanDetail의 타입 정의 (API 응답에 사용)
interface PlanDetail {
  plan_id: number;
  plan_name: string;
  course?: string;
  goal?: string;
  tasks: Task[];
  start_date: string;
  end_date: string;
  description: string;
  state: 'pending' | 'on_going' | 'finish';
}

// Lecture의 타입 정의 (강의 데이터)
interface Lecture {
  lecture_id: number;
  lecture_name: string;
}

// Section의 타입 정의 (섹션 데이터)
interface Section {
  section_name: string;
}

export default function Campaign() {
  const [showCreatePanel, setShowCreatePanel] = useState(false);
  const [planName, setPlanName] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [goal, setGoal] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [lectures, setLectures] = useState<Lecture[]>([]);
  const [editingPlanId, setEditingPlanId] = useState<number | null>(null);
  const [selectedPlanId, setSelectedPlanId] = useState<number | null>(null);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [description, setDescription] = useState<string>('');

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

  useEffect(() => {
    // 학습 계획 데이터 가져오기
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/plan`, {
        params: { memberId: 1 },
      })
      .then(response => {
        if (response.data.success) {
          setPlans(response.data.data.contents);
        }
      })
      .catch(error => {
        console.error('학습 계획을 가져오는 중 오류 발생:', error);
      });

    // 강의 목록 데이터 가져오기
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/lecture`, {
        params: { memberId: 1 },
      })
      .then(response => {
        console.log('Server response:', response.data); // 서버 응답 전체를 출력
        if (response.data.success) {
          setLectures(response.data.data.contents);
        } else {
          console.error("Failed to fetch lecture:", response.data.message || "Unknown error");
        }
      })
      .catch(error => {
        console.error('강의 목록을 가져오는 중 오류 발생:', error);
      });
  }, []);

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
    axios
      .get<{ success: boolean; data: PlanDetail; error: string | null }>(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/plan/${planId}`,
        {
          params: { memberId: 1 },
        }
      )
      .then(response => {
        if (response.data.success) {
          const plan = response.data.data;
          setEditingPlanId(planId);
          setPlanName(plan.plan_name);
          setSelectedCourse(plan.course || '');
          setGoal(plan.goal || '');
          setTasks(plan.tasks);
          setStartDate(plan.start_date);
          setEndDate(plan.end_date);
          setDescription(plan.description);
          setShowCreatePanel(true);
        }
      })
      .catch(error => {
        console.error('플랜을 가져오는 중 오류 발생:', error);
      });
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
    setTasks([]);
    setStartDate('');
    setEndDate('');
    setDescription('');
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
            ? { ...plan, plan_name: planName, course: selectedCourse, goal, tasks, start_date: startDate, end_date: endDate }
            : plan
        )
      );
    } else {
      const newPlan: Plan = {
        id: plans.length + 1,
        plan_name: planName,
        course: selectedCourse,
        goal,
        tasks,
        state: 'pending',
      };
      setPlans((prevPlans) => [...prevPlans, newPlan]);
      router.push('/campaign/complete');
    }

    handleClosePanel();
  };

  const handleCourseChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCourseId = Number(event.target.value);
    const selectedLecture = lectures.find(lecture => lecture.lecture_id === selectedCourseId);
    
    if (selectedLecture) {
      setSelectedCourse(selectedLecture.lecture_name);

      // 선택한 강의의 섹션 데이터를 가져와서 태스크로 설정
      axios
        .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/lecture/${selectedCourseId}/section`, {
          params: { memberId: 1 },
        })
        .then(response => {
          if (response.data.success) {
            const sections = response.data.data.contents;
            setTasks(sections.map((section: Section) => ({
              name: section.section_name,
              status: '시작전',
            })));
          }
        })
        .catch(error => {
          console.error('강의 섹션을 가져오는 중 오류 발생:', error);
        });
    }
  };

  const filteredPlans = {
    시작전: plans.filter((plan) => plan.state === "pending"),
    진행중: plans.filter((plan) => plan.state === "on_going"),
    완료: plans.filter((plan) => plan.state === "finish"),
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
                        {plan.plan_name}
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
                onChange={handleCourseChange}
                className={styles.select}
              >
                <option value="">강의 선택</option>
                {lectures.map(lecture => (
                  <option key={lecture.lecture_id} value={lecture.lecture_id}>
                    {lecture.lecture_name}
                  </option>
                ))}
              </select>
              {error.selectedCourse && <p className={styles.error}>{error.selectedCourse}</p>}
            </label>

            {/* 학습 목표 입력 */}
            <label className={styles.label}>
              학습 목표
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={styles.textarea}
                placeholder="이번 학습에서는 어떤 것을 달성하실 건가요?"
              />
            </label>

            {/* 시작 날짜 및 종료 날짜 선택 */}
            <label className={styles.label}>
              시작 날짜
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className={styles.input}
              />
            </label>

            <label className={styles.label}>
              종료 날짜
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className={styles.input}
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
