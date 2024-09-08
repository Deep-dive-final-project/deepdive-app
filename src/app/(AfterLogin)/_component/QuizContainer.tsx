"use client";
import { useState } from "react";
import QuizList from "../quest/_component/QuizList";
import QuizModal from "../quest/_component/QuizModal";

export default function QuizContainer() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentQuizIndex, setCurrentQuizIndex] = useState<number | null>(null);
  const [quizProgress, setQuizProgress] = useState<boolean[]>([
    false,
    false,
    false,
  ]);

  const handleOpenModal = (index: number) => {
    setCurrentQuizIndex(index);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentQuizIndex(null);
  };

  const handleQuizSolve = (index: number) => {
    setQuizProgress((prevProgress) => {
      const newProgress = [...prevProgress];
      newProgress[index] = true;
      return newProgress;
    });
    handleCloseModal(); // Close the modal after solving
  };

  return (
    <div>
      <QuizList handleOpenModal={handleOpenModal} quizProgress={quizProgress} />
      {isModalOpen && currentQuizIndex !== null && (
        <QuizModal
          isModalOpen={isModalOpen}
          handleCloseModal={handleCloseModal}
          quizIndex={currentQuizIndex}
          handleQuizSolve={handleQuizSolve}
        />
      )}
    </div>
  );
}
