"use client"; // 클라이언트 컴포넌트로 설정

import React, { useState, useEffect } from "react";
import { useAuth } from "@/app/context/AuthProvider";
import styles from "./dashboard.module.css"; // CSS 모듈 임포트

import {
  activityStatuses,
  overallPercentage,
  expPoints,
} from "@/data/activityStatus"; // 활동 현황 데이터 파일 임포트
import QuizContainer from "../_component/QuizContainer";

// 학습 계획의 타입 정의
interface LearningPlan {
  plan_id: number;
  plan_name: string;
  start_date: string;
  state?: "pending" | "on_going" | "finish"; // 추가된 상태 필드
}

// 추천 강의의 타입 정의
interface RecommendedLecture {
  title: string;
  instructor: string;
  price: number;
  lecture_url: string;
  image_url: string;
}

// 강의 노트의 타입 정의
interface Note {
  note_id: number;
  title: string;
  complete_date: string;
}

export default function Dashboard() {
  const [plans, setPlans] = useState<LearningPlan[]>([]); // 학습 계획 상태 관리
  const [recommendedLectures, setRecommendedLectures] = useState<RecommendedLecture[]>([]); // 추천 강의 상태 관리
  const [notes, setNotes] = useState<Note[]>([]); // 노트 상태 관리
  const [quizProgress, setQuizProgress] = useState<boolean[]>([
    false,
    false,
    false,
  ]); // 퀴즈 진행 상태 관리
  const [currentSlide, setCurrentSlide] = useState(0); // 슬라이더 상태 관리

  const { accessToken, fetchWithAuth } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 학습 계획 가져오기
        const planResponse = await fetchWithAuth("/api/plan/overview");
        console.log("Plan Response:", planResponse);

        if (planResponse && planResponse.getPlanForMainPageResponseDtos) {
          const fetchedPlans = planResponse.getPlanForMainPageResponseDtos.map(
            (plan: any) => ({
              plan_id: plan.planId,
              plan_name: plan.planTitle,
              start_date: new Date(plan.startDate).toISOString().split("T")[0], // 날짜 형식을 ISO 형식으로 변환
              state: "pending", // 기본 상태값 설정
            })
          );

          // 각 학습 계획의 세부 정보 가져오기
          const plansWithDetails = await Promise.all(
            fetchedPlans.map(async (plan: LearningPlan) => {
              const detailResponse = await fetchWithAuth(`/api/plan/${plan.plan_id}`);
              if (detailResponse.success && detailResponse.data) {
                return { ...plan, state: detailResponse.data.state };
              }
              return plan;
            })
          );

          setPlans(plansWithDetails);
        } else {
          console.error("Failed to fetch learning plans:", planResponse);
        }

        // 추천 강의 데이터 가져오기
        const lectureResponse = await fetchWithAuth("/api/lecture/recommend");
        if (lectureResponse.data.success) {
          setRecommendedLectures(lectureResponse.data.data.contents); // 추천 강의 데이터를 상태에 설정
        } else {
          console.error(
            "Failed to fetch recommended lectures:",
            lectureResponse.data.message
          );
        }

        // 최신 강의 노트 데이터 가져오기
        const noteResponse = await fetchWithAuth("/api/note/latest");
        if (noteResponse.success && noteResponse.data && noteResponse.data.contents) {
          setNotes(noteResponse.data.contents); // 노트 데이터를 상태에 설정
        } else {
          console.error("Failed to fetch latest notes:", noteResponse);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [accessToken]);

  // 상태 변경 핸들러
  const handleStatusChange = (plan_id: number, newState: "pending" | "on_going" | "finish") => {
    setPlans((prevPlans) =>
      prevPlans.map((plan) =>
        plan.plan_id === plan_id ? { ...plan, state: newState } : plan
      )
    );
  };

  // 퀴즈 진행도 퍼센트 계산
  const progressPercentage =
    (quizProgress.filter(Boolean).length / quizProgress.length) * 100;

  // 슬라이더 핸들러
  const handleNextSlide = () => {
    if (currentSlide < recommendedLectures.length - 3) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handlePrevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      {/* 사용자 인사말 */}
      <div className={styles.header}>
        딥구름 님 <br /> <i>오늘도 힘찬 하루 되세요! 👏</i>
      </div>

      {/* 메인 콘텐츠 컨테이너 */}
      <div className={styles.content}>
        {/* 왼쪽 섹션 */}
        <div className={styles.leftContainer}>
          {/* 진행 중인 학습 계획 */}
          <div className={`${styles.card} ${styles.learningPlanCard}`}>
            <div className={styles.cardTitle}>진행 중인 학습 계획</div>
            {/* 학습 계획 내용 */}
            <ul className={styles.planItemList}>
              {plans && plans.length > 0 ? (
                plans.map((plan) => (
                  <li key={plan.plan_id} className={styles.planItem}>
                    <div className={styles.planName}>{plan.plan_name}</div>
                    <select
                      className={`${styles.statusSelect} ${styles[plan.state || 'pending']}`}
                      value={plan.state || "pending"}
                      onChange={(e) => handleStatusChange(plan.plan_id, e.target.value as "pending" | "on_going" | "finish")}
                    >
                      <option value="pending">시작전</option>
                      <option value="on_going">진행중</option>
                      <option value="finish">완료</option>
                    </select>
                  </li>
                ))
              ) : (
                <li>데이터를 불러오는 중...</li>
              )}
            </ul>
          </div>

          {/* 퀴즈 섹션 */}
          <div className={`${styles.card} ${styles.quizCard}`}>
            <div className={styles.cardTitle}>퀴즈</div>
            <QuizContainer />
          </div>

          {/* 강의 추천 섹션 */}
          <div className={`${styles.card} ${styles.recommendedLecturesCard}`}>
            <div className={styles.cardTitle}>강의 추천</div>
            {/* 강의 추천 내용 */}
            <div className={styles.sliderContainer}>
              <button className={styles.sliderButton} onClick={handlePrevSlide}>
                &lt;
              </button>
              <div className={styles.slider}>
                {recommendedLectures
                  .slice(currentSlide, currentSlide + 3)
                  .map((lecture, index) => (
                    <div key={index} className={styles.courseCard}>
                      <img
                        src={lecture.image_url}
                        alt={lecture.title}
                        className={styles.courseImage}
                      />
                      <div className={styles.overlay}>보러 가기</div>
                      <div className={styles.courseDetails}>
                        <h3 className={styles.courseTitle}>{lecture.title}</h3>
                        <p className={styles.courseDescription}>
                          {lecture.instructor}
                        </p>
                        <div className={styles.coursePrice}>
                          <span className={styles.discountedPrice}>
                            {lecture.price}원
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
              <button className={styles.sliderButton} onClick={handleNextSlide}>
                &gt;
              </button>
            </div>
          </div>
        </div>

        {/* 오른쪽 섹션 */}
        <div className={styles.rightContainer}>
          {/* 나의 최근 강의 노트 목록 */}
          <div className={`${styles.card} ${styles.notesCard}`}>
            <div className={styles.cardTitle}>
              나의 노트{" "}
              <span className={styles.totalNotes}>{plans.length}</span>
            </div>
            {/* 노트 목록 */}
            <ul className={styles.noteList}>
              {notes.length > 0 ? (
                notes.map((note) => (
                  <li key={note.note_id}>
                    <div className={styles.noteItem}>
                      {note.title} - 완료 날짜: {note.complete_date}
                    </div>
                  </li>
                ))
              ) : (
                <li>노트를 불러오는 중...</li>
              )}
            </ul>
          </div>

          {/* 나의 활동 현황 */}
          <div className={`${styles.card} ${styles.activityStatusCard}`}>
            <div className={styles.cardTitle}>나의 활동 현황</div>
            {/* 나의 활동 현황 내용 */}
            <div className={styles.activitySummary}>
              <div className={styles.percentage}>{overallPercentage}%</div>
              <div className={styles.expPoints}>
                EXP <br />
                <span>{expPoints}</span>
              </div>
            </div>
            <hr className={styles.separator} />
            <ul className={styles.activityDetails}>
              {activityStatuses.map((status, index) => (
                <li key={index} className={styles.activityItem}>
                  <span>{status.title}</span>
                  <span>
                    {status.value}
                    {status.unit}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
