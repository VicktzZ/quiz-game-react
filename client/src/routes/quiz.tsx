import { useEffect, useState } from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

import Timer from '@/components/Timer';
import { Button } from '@/components/ui/button';
import Card from '@/components/ui/Card';
import QuizAnimation from '@/layout/QuizAnimation';
import { useQuizContext } from '@/contexts/QuizContext';
import { indexToLetter } from '@/utils';

export const Route = createFileRoute('/quiz')({
  component: RouteComponent,
})

function RouteComponent() {
  const { currentQuestion, nextQuestion } = useQuizContext()
  const navigate = useNavigate()
  
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [shuffledAnswers, setShuffledAnswers] = useState<Array<{text: string, isCorrect: boolean}>>([])

  const [isTimerPaused, setIsTimerPaused] = useState(false)
  const [timeLeft, setTimeLeft] = useState<number | null>(30)

  const answers = currentQuestion?.incorrectAnswers
    ?.split(/,(?!\s)/)
    ?.map((answer) => ({ text: answer.trim(), isCorrect: false })) || [];

  const correctAnswer = currentQuestion?.correctAnswer 
    ? { text: currentQuestion.correctAnswer, isCorrect: true }
    : { text: '', isCorrect: false };

  function Answer({ answer, index, isSelected, isCorrect, isRevealed, onClick }: { 
    answer: { text: string, isCorrect: boolean }, 
    index: number,
    isSelected: boolean,
    isCorrect: boolean,
    isRevealed: boolean,
    onClick: () => void 
  }) {
    let className = 'flex p-2 items-center cursor-pointer';
    
    if (isRevealed) {
      if (isCorrect) {
        className += ' !bg-green-500';
      } else if (isSelected) {
        className += ' !bg-red-500';
      }
    } else if (isSelected) {
      className += ' !bg-blue-200 dark:!bg-blue-700';
    }
    
    return (
      <Card className={className} onClick={onClick}>
        <h2>{indexToLetter(index)}) {answer.text}</h2>
      </Card>
    )
  }

  useEffect(() => {
    if (!currentQuestion?.id) {
      navigate({ to: '/' });
      return;
    }

    const allAnswers = [...answers, correctAnswer];
    const shuffled = [...allAnswers].sort(() => Math.random() - 0.5);
    setShuffledAnswers(shuffled);
    setSelectedAnswer(null);
    setIsConfirmed(false);
    setIsTimerPaused(false);
    setTimeLeft(30);
  }, [currentQuestion?.id, navigate]);

  useEffect(() => {
    setTimeLeft(30);
  }, [currentQuestion]);

  const handleAnswerClick = (index: number) => {
    if (!isConfirmed) {
      setSelectedAnswer(index);
    }
  };

  const handleConfirm = () => {
    setIsConfirmed(true);
    setIsTimerPaused(true);
  };

  const handleTimerPause = (remainingTime: number) => {
    setTimeLeft(remainingTime);
  };

  const handleNextQuestion = () => {
    setIsConfirmed(false);
    setIsTimerPaused(false);
    setSelectedAnswer(null);
    nextQuestion();
  };

  return (
    <>
      <QuizAnimation />
      <motion.div
        className="flex flex-col justify-between h-full w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <div className="flex p-4 items-center justify-center">
            <Timer 
              size='lg' 
              initialTime={timeLeft || 30}
              isPaused={isTimerPaused}
              onPause={handleTimerPause}
              onTimeUp={() => {
                setSelectedAnswer(-1);
                setIsConfirmed(true);
                setIsTimerPaused(true);
              }}
            />
          </div>
          <Card className="min-h-[200px] gap-4 flex flex-col items-center justify-center">
            <div className="flex items-center justify-center font-bold">
              <h1>Categoria: {currentQuestion.category}</h1>
            </div>
            <div className="flex flex-col items-center justify-center">
              <h1>Questão {currentQuestion.index + 1}</h1>
              <p className="text-center">{currentQuestion.text}</p>
            </div>
          </Card>
        </div>
        <div className="flex flex-col gap-4 items-center justify-center p-4">
          <div className="w-full">
            <div className="grid grid-cols-2 gap-4 p-4">
              {shuffledAnswers.map((answer, index) => (
                <Answer
                  key={index}
                  answer={answer}
                  index={index}
                  isSelected={selectedAnswer === index}
                  isCorrect={answer.isCorrect}
                  isRevealed={isConfirmed}
                  onClick={() => handleAnswerClick(index)}
                />
              ))}
            </div>
            <div className="flex justify-center p-4">
              {isConfirmed && (
                <Button 
                  onClick={handleNextQuestion} 
                  className="w-full max-w-xs"
                >
                  <Check className="mr-2" />
                  Próxima
                </Button>
              )}
              {!isConfirmed && (
                <Button 
                  onClick={handleConfirm} 
                  disabled={selectedAnswer === null}
                  className="w-full max-w-xs"
                >
                  <Check className="mr-2" />
                  Confirmar
                </Button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )
}
