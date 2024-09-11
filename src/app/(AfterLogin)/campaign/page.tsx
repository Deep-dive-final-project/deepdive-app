"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/app/context/AuthProvider";
import { useRouter } from "next/navigation";
import styles from "./campaign.module.css";

// Task의 타입 정의
interface Task {
  section_name: string;
  status: string;
}

// Plan의 타입 정의
interface Plan {
  id: number;
  plan_name: string;
  course?: string;
  goal?: string;
  tasks: Task[];
  state: "pending" | "on_going" | "finish";
}

// PlanDetail의 타입 정의 (Plan을 확장)
interface PlanDetail extends Plan {
  plan_id: number;
  start_date: string;
  end_date: string;
  description: string;
}

// Lecture의 타입 정의 (강의 데이터)
interface Lecture {
  id: number;
  title: string;
}

// Section의 타입 정의 (섹션 데이터)
interface Section {
  section_name: string;
}

interface TaskDetail {
  taskId: number;
  title: string;
  state: string;
  completeDate: string;
}

export default function Campaign() {
  const [showCreatePanel, setShowCreatePanel] = useState(false);
  const [planName, setPlanName] = useState("");
  const [selectedCourse, setSelectedCourse] = useState<number | "">("");
  const [goal, setGoal] = useState("");
  const [createPanelTasks, setCreatePanelTasks] = useState<Task[]>([]);
  const [detailPanelTaskDetails, setDetailPanelTaskDetails] = useState<TaskDetail[]>([]);
  const [plans, setPlans] = useState<PlanDetail[]>([]);
  const [lectures, setLectures] = useState<Lecture[]>([]);
  const [selectedPlanId, setSelectedPlanId] = useState<number | null>(null);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [sections, setSections] = useState<Section[]>([]);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [selectedPlanDetails, setSelectedPlanDetails] = useState<PlanDetail | null>(null);

  const [collapsedSections, setCollapsedSections] = useState<{
    [key: string]: boolean;
  }>({
    시작전: true,
    진행중: true,
    완료: true,
  });

  const [error, setError] = useState<{
    planName: string;
    selectedCourse: string;
  }>({
    planName: "",
    selectedCourse: "",
  });

  const { fetchWithAuth } = useAuth();
  const router = useRouter();

  // 초기 데이터 로드: 모든 상태의 계획 가져오기
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // 모든 상태의 학습 계획 데이터 가져오기
        const states = ["pending", "on_going", "finish"];
        const allPlans = await Promise.all(states.map((state) => fetchPlansByState(state)));
        
        // 모든 계획을 하나의 배열로 합치기
        const mergedPlans = allPlans.flat();
        setPlans(mergedPlans);

        // 강의 목록 데이터 가져오기
        const lectureResponse = await fetchWithAuth("/api/lecture");
        console.log("lectureResponse:", lectureResponse);
        if (lectureResponse) {
          setLectures(lectureResponse.contents);
        } else {
          console.error("Failed to fetch lecture:", lectureResponse.message || "Unknown error");
        }
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    };

    fetchInitialData();
  }, []);

  const fetchPlansByState = async (state: string) => {
    try {
      const response = await fetchWithAuth(`/api/plan?state=${state}`);
      console.log(`Plans fetched for state ${state}:`, response);
  
      // API 응답이 성공적이고 필요한 데이터가 존재하는지 확인
      if (response && response.getPlanForPlanPageResponseDtoList) {
        const planList = response.getPlanForPlanPageResponseDtoList;
  
        // planList가 배열인지 확인하고 데이터를 처리합니다.
        if (Array.isArray(planList)) {
          const fetchedPlans = planList.map((plan: any) => ({
            id: plan.plan_id,
            plan_id: plan.plan_id,
            plan_name: plan.plan_name,
            start_date: "",
            end_date: "",
            description: "",
            state: plan.state,
            tasks: [],
          }));
          return fetchedPlans;
        } else {
          console.error(`Expected an array but received:`, planList);
          return [];
        }
      } else {
        console.error(`Failed to fetch plans for state ${state}:`, response);
        return [];
      }
    } catch (error) {
      console.error(`Error fetching plans for state ${state}:`, error);
      return [];
    }
  };  

  const handleCreateButtonClick = () => {
    resetForm();
    setShowCreatePanel(true);
  };

  const handleClosePanel = () => {
    setShowCreatePanel(false);
    resetForm();
  };

  const handlePlanClick = async (planId: number) => {
    if (selectedPlanId === planId) {
      setSelectedPlanId(null);
      setDetailPanelTaskDetails([]);
      setSelectedPlanDetails(null);
      setShowDetailPanel(false);
      return;
    }

    try {
      const plan = plans.find((p) => p.id === planId);
      if (plan) {
        setSelectedPlanId(planId);
        setSelectedPlanDetails(plan);
        setShowDetailPanel(true);

        // Task 정보 가져오기
        const taskResponse = await fetchWithAuth(`/api/task/${planId}`);
        console.log("Task Response:", taskResponse);

        if (Array.isArray(taskResponse)) {
          setDetailPanelTaskDetails(taskResponse);
          console.log("Updated Detail Panel Task Details:", taskResponse);
        } else {
          console.error("Failed to fetch task details: Unexpected response format", taskResponse);
        }
      }
    } catch (error) {
      console.error("태스크 정보를 가져오는 중 오류 발생:", error);
    }
  };

  const handleTaskStatusChange = (index: number, newStatus: string) => {
    setCreatePanelTasks((prevTasks) => {
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
    setPlanName("");
    setSelectedCourse("");
    setGoal("");
    setCreatePanelTasks([]);
    setStartDate("");
    setEndDate("");
    setDescription("");
    setError({ planName: "", selectedCourse: "" });
  };

  const handleSubmitPlan = () => {
    let isValid = true;
    const newError = { planName: "", selectedCourse: "" };

    if (!planName) {
      newError.planName = "제목을 입력해주세요.";
      isValid = false;
    }

    if (!selectedCourse) {
      newError.selectedCourse = "강의를 선택해주세요.";
      isValid = false;
    }

    setError(newError);

    if (!isValid) return;

    fetchWithAuth("/api/plan", {
      method: "POST",
      data: {
        title: planName,
        start_date: startDate,
        end_date: endDate,
        description: description,
        lecture_id: selectedCourse,
      },
    })
      .then((response) => {
        console.log("Response from create /api/plan:", response);
        if (response.isSuccess) {
          router.push(`/campaign/complete?title=${encodeURIComponent(planName)}`);
        } else {
          console.error("Failed to create learning plan:", response.message || "Unknown error");
        }
      })
      .catch((error) => {
        console.error("새 학습 계획 생성 중 오류 발생:", error);
      });

    handleClosePanel();
  };

  const handleCourseChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCourseId = Number(event.target.value);
    setSelectedCourse(selectedCourseId);

    if (selectedCourseId) {
      try {
        const response = await fetchWithAuth(`/api/lecture/${selectedCourseId}/section`);
        console.log("Task:", response);
        if (response && response.success) {
          const fetchedSections = response.data.contents.map((section: any) => ({
            section_name: section.subSectionName,
            status: "시작전",
          }));

          setCreatePanelTasks(fetchedSections);
        } else {
          console.error("섹션을 가져오는 중 오류 발생:", response.message || "Unknown error");
        }
      } catch (error) {
        console.error("섹션을 가져오는 중 오류 발생:", error);
      }
    } else {
      setCreatePanelTasks([]);
    }
  };

  const filteredPlans = {
    시작전: plans.filter((plan) => plan.state === "pending"),
    진행중: plans.filter((plan) => plan.state === "on_going"),
    완료: plans.filter((plan) => plan.state === "finish"),
  };

  const getStatusLabel = (state: string) => {
    switch (state) {
      case 'pending':
        return '대기 중';
      case 'on_going':
        return '진행 중';
      case 'finish':
        return '완료';
      default:
        return '알 수 없음';
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>Deep Dive Fullstack + GenAI Course</div>
      <button className={styles.createButton} onClick={handleCreateButtonClick}>
        + 학습 계획 만들기
      </button>

      <div className={styles.campaignContainer}>
        <div className={styles.leftPanel}>
          {Object.entries(filteredPlans).map(([status, plans]) => (
            <div key={status}>
              <h3
                onClick={() => toggleSection(status)}
                className={`${styles.panelTitle} ${
                  collapsedSections[status] ? styles.collapsed : ""
                }`}
              >
                <span className={`${styles.statusBox} ${styles[status]}`}>
                  {status}
                </span>{" "}
                {plans.length}
              </h3>
              {!collapsedSections[status] && (
                <div className={styles.planList}>
                  {plans.map((plan) => (
                    <div key={plan.id} className={`${styles.planItem} ${selectedPlanId === plan.id ? 'active' : ''}`}>
                      <div
                        className={styles.planTitle}
                        onClick={() => handlePlanClick(plan.id)}
                      >
                        {plan.plan_name}
                      </div>
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
              {error.planName && (
                <p className={styles.error}>{error.planName}</p>
              )}
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
                {lectures.map((lecture) => (
                  <option key={lecture.id} value={lecture.id}>
                    {lecture.title}
                  </option>
                ))}
              </select>
              {error.selectedCourse && (
                <p className={styles.error}>{error.selectedCourse}</p>
              )}
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
              {createPanelTasks.map((task, index) => (
                <div key={index} className={styles.taskItem}>
                  <span>{task.section_name}</span>
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
              <button
                className={styles.submitButton}
                onClick={handleSubmitPlan}
              >
                학습 계획 시작하기
              </button>
            </div>
          </div>
        </div>

        {/* 학습 계획 세부 정보 패널 */}
        {showDetailPanel && (
          <div className={`${styles.rightPanel2} ${showDetailPanel ? styles.slideIn : styles.slideOut}`}>
            <button className={styles.closeButton} onClick={() => setShowDetailPanel(false)}>
              X
            </button>
            <div className={styles.detailFormContainer}>
              <h2 className={styles.detailFormTitle}>학습 계획 세부 정보</h2>

              <div>
                <label className={styles.detailLabel}>학습 계획 제목</label>
                <p>{selectedPlanDetails?.plan_name}</p>
              </div>

              <div>
                <label className={styles.detailLabel}>학습 목표</label>
                <p>{selectedPlanDetails?.description}</p>
              </div>

              <div>
                <label className={styles.detailLabel}>시작 날짜</label>
                <p>{selectedPlanDetails?.start_date ? new Date(selectedPlanDetails.start_date).toLocaleDateString() : ''}</p>
              </div>

              <div>
                <label className={styles.detailLabel}>종료 날짜</label>
                <p>{selectedPlanDetails?.end_date ? new Date(selectedPlanDetails.end_date).toLocaleDateString() : ''}</p>
              </div>

              {/* 학습 계획 세부 정보 패널 태스크 목록 */}
              <div className={styles.taskSection}>
                <h3 className={styles.taskTitle}>태스크 목록</h3>
                {detailPanelTaskDetails && detailPanelTaskDetails.length > 0 ? (
                  detailPanelTaskDetails.map((task) => (
                    <div key={task.taskId} className={styles.taskItem}>
                      <span
                        className={`
                          ${task.state === 'pending' ? styles.statusPending : ''} 
                          ${task.state === 'on_going' ? styles.statusOngoing : ''} 
                          ${task.state === 'finish' ? styles.statusFinish : ''}
                        `}
                      >
                        {task.title} - {getStatusLabel(task.state)}
                      </span>
                    </div>
                  ))
                ) : (
                  <p>태스크 불러오는 중...</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
