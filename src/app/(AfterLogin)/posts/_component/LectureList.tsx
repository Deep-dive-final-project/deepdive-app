"use client";

import { useState, useEffect } from "react";
import styles from "./lectureList.module.css";
import LectureItem from "./LectureItem"; // 분리된 컴포넌트
import axios from "axios"; // 서버 요청을 위한 라이브러리
import axiosInstance from "@/lib/axios";

interface Section {
  title: string;
  isWritten: boolean; // 작성 여부
}

interface Lecture {
  title: string;
  sections: Section[];
}

export default function LectureList() {
  const [lectures, setLectures] = useState<Lecture[]>([]);
  const [openLecture, setOpenLecture] = useState<number | null>(null);

  // 서버에서 강의 데이터를 가져오는 함수
  const fetchLectures = async () => {
    try {
      const { data: response } = await axiosInstance.get("/api/lecture");
      console.log("res", response);
      setLectures(response.data);
    } catch (error) {
      console.error("Failed to fetch lectures:", error);
    }
  };

  useEffect(() => {
    fetchLectures(); // 컴포넌트가 마운트되면 데이터를 불러옴
  }, []);

  const toggleLecture = (index: number) => {
    if (openLecture === index) {
      setOpenLecture(null);
    } else {
      setOpenLecture(index);
    }
  };

  return (
    <div className={styles.container}>
      {lectures.map((lecture, index) => (
        <LectureItem
          key={index}
          lecture={lecture}
          isOpen={openLecture === index}
          toggleLecture={() => toggleLecture(index)}
        />
      ))}
    </div>
  );
}
