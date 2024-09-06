// src/app/dashboard/page.ts
"use client"; // 클라이언트 컴포넌트로 설정

import React, { useState } from 'react';
import styles from './dashboard.module.css'; // CSS 모듈 임포트
import { learningPlans, LearningPlan } from '@/data/learningPlan'; // 데이터 파일 임포트
import { courses, Course } from '@/data/courses'; // 강의 데이터 파일 임포트
import { activityStatuses, overallPercentage, expPoints } from '@/data/activityStatus'; // 활동 현황 데이터 파일 임포트

export default function Dashboard() {
    const [plans, setPlans] = useState<LearningPlan[]>(learningPlans); // 학습 계획 상태 관리
    const [quizProgress, setQuizProgress] = useState<boolean[]>([false, false, false]); // 퀴즈 진행 상태 관리
    const [currentSlide, setCurrentSlide] = useState(0); // 슬라이더 상태 관리

    // 상태 변경 핸들러
    const handleStatusChange = (index: number, newStatus: LearningPlan['status']) => {
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
    const progressPercentage = (quizProgress.filter(Boolean).length / quizProgress.length) * 100;

    // 슬라이더 핸들러
    const handleNextSlide = () => {
        if (currentSlide < courses.length - 3) { // 한 번에 3개의 슬라이드가 보임
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
        <div className={styles.header}>사용자 000님 <br></br> 오늘도 힘찬 하루 되세요!</div>
        
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
                    <div>{plan.courseName} - {plan.sectionNumber} : {plan.sectionTitle}</div>
                    <select
                      className={`${styles.statusSelect} ${styles[plan.status]}`} // 상태에 따른 스타일
                      value={plan.status}
                      onChange={(e) => handleStatusChange(index, e.target.value as LearningPlan['status'])}
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
                <div className={styles.quizSet}>
                    {/* 퀴즈 진척도 바와 원 */}
                    <div className={styles.progressBarContainer}>
                        <div className={styles.progressBar} style={{ width: `${progressPercentage}%` }}></div>
                        {/* 프로그래스 바 위의 원 */}
                        <div className={styles.quizProgress}>
                            {quizProgress.map((solved, index) => (
                                <div
                                    key={index}
                                    className={`${styles.progressCircle} ${solved ? styles.solved : ''}`}
                                    style={{
                                        left: `calc(${(index + 1) / quizProgress.length * 100}% - 15px)`, // 원의 위치 설정
                                    }}
                                ></div>
                            ))}
                        </div>
                    </div>
                    {/* 퀴즈 문제 리스트 */}
                    <div className={styles.quizList}>
                        {quizProgress.map((solved, index) => (
                            <div key={index} className={styles.quizItem}>
                                <div className={`${styles.quizCircle} ${solved ? styles.solved : ''}`}></div>
                                <div>{index + 1}번 문제</div>
                                <button
                                    className={styles.solveButton}
                                    onClick={() => handleQuizSolve(index)}
                                    disabled={solved} // 이미 푼 문제는 버튼 비활성화
                                >
                                    풀기
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 강의 추천 섹션 */}
            <div className={`${styles.card} ${styles.recommendedLecturesCard}`}>
                <div className={styles.cardTitle}>강의 추천</div>
                {/* 강의 추천 내용 */}
                <div className={styles.sliderContainer}>
                    <button className={styles.sliderButton} onClick={handlePrevSlide}>&lt;</button>
                    <div className={styles.slider}>
                        {courses.slice(currentSlide, currentSlide + 3).map((course: Course) => (
                            <div key={course.id} className={styles.courseCard}>
                                <img src={course.imageUrl} alt={course.title} className={styles.courseImage} />
                                <div className={styles.overlay}>보러 가기</div>
                                <div className={styles.courseDetails}>
                                    <h3 className={styles.courseTitle}>{course.title}</h3>
                                    <p className={styles.courseDescription}>{course.description}</p>
                                    <div className={styles.coursePrice}>
                                        <span className={styles.originalPrice}>{course.originalPrice}</span>
                                        <span className={styles.discountedPrice}>{course.discountedPrice}</span>
                                    </div>
                                    <div className={styles.courseInfo}>
                                        <span className={styles.students}>{`+${course.studentsEnrolled}명`}</span>
                                        {course.isUpdated && <span className={styles.badge}>업데이트</span>}
                                        {course.discountPercentage > 0 && (
                                            <span className={styles.discountBadge}>{`${course.discountPercentage}% 할인`}</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                        </div>
                    <button className={styles.sliderButton} onClick={handleNextSlide}>&gt;</button>
                    </div>
                </div>
            </div>

            {/* 오른쪽 섹션 */}
            <div className={styles.rightContainer}>
                {/* 나의 최근 강의 노트 목록 */}
                <div className={`${styles.card} ${styles.notesCard}`}>
                    <div className={styles.cardTitle}>
                        나의 노트 <span className={styles.totalNotes}>{plans.length}</span>
                    </div>
                    {/* 노트 목록 */}
                    <ul className={styles.noteList}>
                        {plans.map((plan, index) => (
                            <li key={index}>
                                <div className={styles.noteItem}>
                                    {plan.courseName} - {plan.sectionNumber}: {plan.sectionTitle}
                                </div>
                                <div className={styles.noteMeta}>
                                    <span>2일 전</span> {/* 날짜 부분은 예시입니다 */}
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
                        <div className={styles.percentage}>
                            {overallPercentage}%
                        </div>
                        <div className={styles.expPoints}>
                            EXP <br></br><span>{expPoints}</span>
                        </div>
                    </div>
                    <hr className={styles.separator} />
                    <ul className={styles.activityDetails}>
                        {activityStatuses.map((status, index) => (
                            <li key={index} className={styles.activityItem}>
                                <span>{status.title}</span>
                                <span>{status.value}{status.unit}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
        </div>
    );
}
