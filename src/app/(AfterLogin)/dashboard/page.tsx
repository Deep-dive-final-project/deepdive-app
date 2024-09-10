"use client"; // 클라이언트 컴포넌트로 설정

import React, { useState, useEffect } from "react";
import axios from "axios";
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
  status?: string; // status 속성 추가 (선택적)
}

// 추천 강의의 타입 정의
interface RecommendedLecture {
  title: string;
  instructor: string;
  price: number;
  lecture_url: string;
  image_url: string;
}

export default function Dashboard() {
  const [plans, setPlans] = useState<LearningPlan[]>([]); // 학습 계획 상태 관리
  const [recommendedLectures, setRecommendedLectures] = useState<RecommendedLecture[]>([]); // 추천 강의 상태 관리
  const [quizProgress, setQuizProgress] = useState<boolean[]>([
    false,
    false,
    false,
  ]); // 퀴즈 진행 상태 관리
  const [currentSlide, setCurrentSlide] = useState(0); // 슬라이더 상태 관리

  const { accessToken, fetchWithAuth, refreshAccessToken } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 학습 계획 가져오기
        const planResponse = await fetchWithAuth("/api/plan/overview");
        if (planResponse.data.success) {
          setPlans(planResponse.data.data.contents); // 학습 계획 데이터를 상태에 설정
        } else {
          console.error("Failed to fetch learning plans:", planResponse.data.message);
        }

        // 추천 강의 데이터 가져오기
        const lectureResponse = await fetchWithAuth("/api/lecture/recommend");
        if (lectureResponse.data.success) {
          setRecommendedLectures(lectureResponse.data.data.contents); // 추천 강의 데이터를 상태에 설정
        } else {
          console.error("Failed to fetch recommended lectures:", lectureResponse.data.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [accessToken, fetchWithAuth, refreshAccessToken]);

  // 상태 변경 핸들러
  const handleStatusChange = (
    index: number,
    newStatus: string
  ) => {
    setPlans((prevPlans) => {
      const newPlans = [...prevPlans];
      newPlans[index].status = newStatus; // 새로운 상태로 업데이트
      return newPlans;
    });
  };

  // 퀴즈 풀기 핸들러
  const handleQuizSolve = (index: number) => {
    setQuizProgress((prevProgress) => {
      const newProgress = [...prevProgress];
      newProgress[index] = true; // 해당 퀴즈를 푼 것으로 표시
      return newProgress;
    });
  };

  // 퀴즈 진행도 퍼센트 계산
  const progressPercentage =
    (quizProgress.filter(Boolean).length / quizProgress.length) * 100;

  // 슬라이더 핸들러
  const handleNextSlide = () => {
    if (currentSlide < recommendedLectures.length - 3) {
      // 한 번에 3개의 슬라이드가 보임
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
              {plans.map((plan, index) => (
                <li key={index} className={styles.planItem}>
                  <div>
                    {plan.plan_name} <i className={styles.planStartDate}>{plan.start_date}</i>
                  </div>
                  <select
                    className={`${styles.statusSelect} ${styles[plan.status || '']}`} // 상태에 따른 스타일
                    value={plan.status || '시작전'}
                    onChange={(e) =>
                      handleStatusChange(index, e.target.value)
                    }
                  >
                    <option value="시작전">시작전</option>
                    <option value="진행중">진행중</option>
                    <option value="완료">완료</option>
                  </select>
                </li>
              ))}
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
              {plans.map((plan, index) => (
                <li key={index}>
                  <div className={styles.noteItem}>
                    {plan.plan_name} - {plan.start_date}
                  </div>
                  <div className={styles.noteMeta}>
                    <span>2일 전</span> {/* 날짜 예시 */}
                  </div>
                </li>
              ))}
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