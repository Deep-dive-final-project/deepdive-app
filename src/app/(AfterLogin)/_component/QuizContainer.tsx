"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import QuizList from "../quest/_component/QuizList";
import QuizModal from "../quest/_component/QuizModal";
import { Quiz, QuizFeedback } from "@/types/quiz";
import axiosInstance from "@/lib/axios";

const fetchQuizzes = async (): Promise<Quiz[]> => {
  const { data } = await axiosInstance.get("/api/quest");
  return data;
};

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
  console.log("post res", data);
  const { contents } = data;
  console.log("post feedback", contents);
  return contents;
};

export default function QuizContainer() {
  const queryClient = useQueryClient();

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
    onSuccess: () => {
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
    return <div>Loading...</div>;
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
