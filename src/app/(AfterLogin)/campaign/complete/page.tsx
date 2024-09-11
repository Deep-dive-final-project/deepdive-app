"use client";

import React, { useState, useEffect } from 'react';
import styles from './campaignComplete.module.css';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

// 추천 강의의 타입 정의
interface RecommendedCourse {
  title: string;
  instructor: string;
  price: number;
  lecture_url: string;
  image_url: string;
}

export default function CampaignComplete() {
  const [recommendedCourses, setRecommendedCourses] = useState<RecommendedCourse[]>([]); // 타입을 RecommendedCourse 배열로 설정
  const searchParams = useSearchParams(); // useSearchParams를 사용하여 쿼리 파라미터를 가져옵니다.
  const title = searchParams.get('title') || ''; // 쿼리 파라미터에서 title 값을 가져옵니다.

  useEffect(() => {
    // API 요청을 통해 추천 강의 데이터 가져오기
    const fetchRecommendedCourses = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_AI_URL}/ai/lecture/recommend/study-plan?plan_id=1`);
        const data = await response.json();

        // 타입을 명확히 하기 위해 구조체로 타입 캐스팅
        if (data.success && data.data && data.data.contents) {
          const courses: RecommendedCourse[] = data.data.contents.map((course: any) => ({
            title: course.title,
            instructor: course.instructor,
            price: course.price,
            lecture_url: course.lecture_url,
            image_url: course.image_url,
          }));
          setRecommendedCourses(courses);
        } else {
          console.error('Failed to fetch recommended courses:', data.error);
        }
      } catch (error) {
        console.error('Error fetching recommended courses:', error);
      }
    };

    fetchRecommendedCourses();
  }, []);

  return (
    <div className={styles.container}>
      
      <div className={styles.content}>
        <div className={styles.congratsIcon}>
          <img src="/images/congrats-icon.png" alt="Congratulation" className={styles.iconImage} />
        </div>
        
        <h2 className={styles.title}>{`‘${title}’`}</h2>
        <p className={styles.message}>학습 계획 피드백 작성을 완료했습니다!</p>
        <p className={styles.subMessage}>
          작성한 학습 계획 피드백은 해당 학습 계획의 상세 페이지에서 확인해 주세요.
        </p>
        
        <div className={styles.buttonSection}>
          <Link href="/campaign" className={styles.button}>
            학습 계획 메인으로 돌아가기
          </Link>
        </div>
        
        <div className={styles.recommendedSection}>
          <h3 className={styles.recommendationTitle}>내가 좋아할 만한 다른 강의</h3>
          <div className={styles.courseList}>
            {recommendedCourses.map((course, index) => (
              <div key={index} className={styles.courseItem}>
                <img src={course.image_url} alt={course.title} className={styles.courseImage} />
                <p className={styles.courseTitle}>{course.title}</p>
                <p className={styles.courseInstructor}>{course.instructor}</p>
                <p className={styles.coursePrice}>{course.price.toLocaleString()}원</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
