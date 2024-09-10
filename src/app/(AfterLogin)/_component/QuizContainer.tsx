"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import QuizList from "../quest/_component/QuizList";
import QuizModal from "../quest/_component/QuizModal";
import { Quiz, QuizFeedback } from "@/types/quiz";
import axiosInstance from "@/lib/axios";
import { useAuth } from "@/app/context/AuthProvider";



const submitAnswer = async ({
  quizId,
  content,
  answer,
}: {
  quizId: number;
  content: string;
  answer: string;
}): Promise<QuizFeedback> => {
  const { data } = await axiosInstance.post(`/api/quest/${quizId}`, {
    content,
    answer,
  });
  const { contents } = data;
  return contents;
};

export default function QuizContainer() {
  const queryClient = useQueryClient();
  const { fetchWithAuth } = useAuth();

  const fetchQuizzes = async () => {
    try {
      const response = await fetchWithAuth("/api/quest");
      const { data } = response;
      console.log("res", data.dtos);

      return data.dtos;
    } catch (error) {
      console.error("Error fetching quests", error);
    }
    return;
  };

  const { data: quizzes, isLoading } = useQuery({
    queryKey: ["quizzes"],
    queryFn: fetchQuizzes,
  });

  const mutation = useMutation<
    QuizFeedback,
    Error,
    { quizId: number; content: string; answer: string }
  >({
    mutationFn: submitAnswer,
    onSuccess: (feedback) => {
      console.log("here's feedback", feedback);
      queryClient.invalidateQueries({ queryKey: ["quizzes"] });
    },
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentQuizIndex, setCurrentQuizIndex] = useState<number | null>(null);

  const handleOpenModal = (index: number) => {
    setCurrentQuizIndex(index);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentQuizIndex(null);
  };

  const handleQuizSolve = (quizId: number, content: string, answer: string) => {
    mutation.mutate({ quizId, content, answer });
    handleCloseModal();
  };

  if (isLoading) {
    return <div style={{ height: "243px" }}>Loading...</div>;
  }

  if (!quizzes) {
    return <div style={{ height: "243px" }}>풀 문제가 없습니다.</div>;
  }

  return (
    <div>
      <QuizList quizzes={quizzes || []} handleOpenModal={handleOpenModal} />
      {quizzes && isModalOpen && currentQuizIndex !== null && (
        <QuizModal
          isModalOpen={isModalOpen}
          handleCloseModal={handleCloseModal}
          quiz={quizzes[currentQuizIndex]}
          handleQuizSolve={handleQuizSolve}
        />
      )}
    </div>
  );
}
