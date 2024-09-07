"use client";

import React from 'react';
import styles from './campaignComplete.module.css';
import Link from 'next/link';

export default function CampaignComplete() {
  return (
    <div className={styles.container}>
      
      <div className={styles.content}>
        <div className={styles.congratsIcon}>
          <img src="/images/congrats-icon.png" alt="Congratulation" className={styles.iconImage} />
        </div>
        
        <h2 className={styles.title}>‘AWS 강의 듣기’</h2>
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
            <div className={styles.courseItem}>
              <img src="/images/Deep_Dive_Fullstack.png" alt="Spring Security OAuth2" className={styles.courseImage} />
              <p className={styles.courseTitle}>Spring Security OAuth2</p>
            </div>
            <div className={styles.courseItem}>
              <img src="/images/Deep_Dive_Fullstack.png" alt="Java Coding Test" className={styles.courseImage} />
              <p className={styles.courseTitle}>Java Coding Test</p>
            </div>
            <div className={styles.courseItem}>
              <img src="/images/Deep_Dive_Fullstack.png" alt="알고리즘 문제 해결 전략" className={styles.courseImage} />
              <p className={styles.courseTitle}>알고리즘 문제 해결 전략</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
