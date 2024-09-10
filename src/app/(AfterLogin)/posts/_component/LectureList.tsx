"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import styles from "./lectureList.module.css";
import LectureItem from "./LectureItem";
import axios from "axios";
import axiosInstance from "@/lib/axios";
import { Lecture, Section } from "@/types/lecture";

const fetchLectures = async (): Promise<Lecture[]> => {
  const {
    data: { contents },
  } = await axiosInstance.get("/api/lecture?memberId=1");
  return contents;
};

const fetchSections = async (lectureId: number): Promise<Section[]> => {
  const {
    data: { data },
  } = await axiosInstance.get(`/api/lecture/${lectureId}/section?memberId=1`);
  return data.contents;
};

export default function LectureList() {
  const [openLecture, setOpenLecture] = useState<number | null>(null);
  const [lectureList, setLectureList] = useState<Lecture[]>(dummyLectures);

  const {
    data: lectures = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["lectures"],
    queryFn: fetchLectures,
  });

  // useEffect(() => {
  //   if (lectures.length > 0) {
  //     setLectureList(lectures);
  //   }
  // }, [lectures]);

  const toggleLecture = async (index: number) => {
    if (openLecture === index) {
      setOpenLecture(null);
    } else {
      setOpenLecture(index);
      // if (!lectureList[index].sections) {
      //   try {
      //     const sections = await fetchSections(lectureList[index].id);
      //     console.log("sections", sections);
      //     const updatedLectures = [...lectureList];
      //     updatedLectures[index] = {
      //       ...updatedLectures[index],
      //       sections,
      //     };

      //     setLectureList(updatedLectures);
      //   } catch (error) {
      //     console.error("Failed to fetch sections:", error);
      //   }
      // }
    }
  };

  return (
    <div className={styles.container}>
      {lectureList.map((lecture, index) => (
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

const dummySections1: Section[] = [
  { sectionName: "리액트의 개념과 기초" },
  { sectionName: "리액트 응용" },
];
const dummySections2: Section[] = [
  { sectionName: "Next.js의 개념과 기초" },
  { sectionName: "Next.js 응용" },
];
const dummyLectures: Lecture[] = [
  {
    id: 1,
    title: "리액트 기본 강의",
    sections: dummySections1,
  },
  {
    id: 2,
    title: "Next.js 강의",
    sections: dummySections2,
  },
];
