import { useEffect, useState } from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

import Timer from '@/components/Timer';
import { Button } from '@/components/ui/button';
import Card from '@/components/ui/Card';
import QuizAnimation from '@/layout/QuizAnimation';
import { useQuizContext } from '@/contexts/QuizContext';
import { useUser } from '@/contexts/UserContext';

export const Route = createFileRoute('/quiz')({
  component: RouteComponent,
});

interface AnswerOption {
  text: string;
  isCorrect: boolean;
}

function RouteComponent() {
  const { 
    currentQuestion, 
    nextQuestion, 
    isAnswered, 
    selectedAnswer, 
    score,
    timerDuration,
    handleAnswer,
    setSelectedAnswer,
    questionsAmount,
    isQuizFinished,
    setIsQuizFinished,
  } = useQuizContext();
  
  const { user } = useUser();
  const navigate = useNavigate();
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [shuffledAnswers, setShuffledAnswers] = useState<AnswerOption[]>([]);

  useEffect(() => {
    if (!user) {
      navigate({ to: '/' });
    }
  }, [user]);

  if (!user) {
    return navigate({ to: '/' });
  }

  useEffect(() => {
    if (!currentQuestion || (!currentQuestion.text && !currentQuestion.question)) {
      navigate({ to: '/' });
    }
  }, [currentQuestion, navigate]);

  useEffect(() => {
    if (!currentQuestion) return;
    
    const answers = currentQuestion.incorrectAnswers
      ?.split(/,(?!\s)/)
      .map((answer) => ({
        text: answer.trim(),
        isCorrect: false,
      })) || [];

    const correctAnswer = {
      text: currentQuestion.correctAnswer,
      isCorrect: true,
    };

    const allAnswers = [...answers, correctAnswer];
    const shuffled = [...allAnswers].sort(() => Math.random() - 0.5);
    setShuffledAnswers(shuffled);
    setIsConfirmed(false);
    setSelectedAnswer(null);
  }, [currentQuestion, setSelectedAnswer]);

  const handleTimeExpired = () => {
    if (!isAnswered) {
      handleAnswer('');
    }
  };

  const handleAnswerClick = (answer: string) => {
    if (!isConfirmed) {
      setSelectedAnswer(answer);
    }
  };

  const handleConfirm = () => {
    if (selectedAnswer !== null) {
      setIsConfirmed(true);
      handleAnswer(selectedAnswer);
    }
  };

  const handleNextQuestion = () => {
    setIsConfirmed(false);
    nextQuestion();
  };

  const handleEndQuiz = () => {
    setIsQuizFinished(true)
    navigate({ to: '/quiz-fineshed' });
  };

  const handleExit = () => {
    navigate({ to: '/' });
  };

  if (!currentQuestion) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Carregando...</h2>
        </div>
      </div>
    );
  }

  const questionText = currentQuestion.question || currentQuestion.text;
  const questionIndex = typeof currentQuestion.index === 'number' ? currentQuestion.index + 1 : 1;

  useEffect(() => {
    if (isQuizFinished) {
      navigate({ to: '/quiz-fineshed' });
    }
  }, [isQuizFinished]);

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
              size="lg" 
              initialTime={timerDuration} 
              onTimeExpired={handleTimeExpired}
              isPaused={isAnswered}
              key={`timer-${currentQuestion.id}`}
            />
          </div>
          <Card className="min-h-[200px] gap-4 flex flex-col items-center justify-center p-6">
            <div className="flex items-center justify-center font-bold">
              <h1>Categoria: {currentQuestion.category}</h1>
            </div>
            <div className="flex flex-col items-center justify-center text-center">
              <h1 className="text-xl font-semibold mb-2">
                Questão {questionIndex}/{questionsAmount}
              </h1>
              <p className="text-lg">{questionText}</p>
            </div>
          </Card>
        </div>
        
        <div className="flex flex-col gap-4 items-center p-4">
          <div className="w-full max-w-3xl">
            <div className="grid md:grid-cols-2 gap-4 p-4">
              {shuffledAnswers.map((answer, index) => {
                const isSelected = selectedAnswer === answer.text;
                const showCorrect = isConfirmed && answer.isCorrect;
                const showIncorrect = isConfirmed && isSelected && !answer.isCorrect;

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerClick(answer.text)}
                    disabled={isConfirmed}
                    className={`p-4 rounded-lg text-left transition-all duration-200 border-2 ${
                      showCorrect
                        ? 'bg-green-100 text-green-800 border-green-500'
                        : showIncorrect
                        ? 'bg-red-100 text-red-800 border-red-500'
                        : isSelected
                        ? 'bg-blue-100 text-blue-800 border-blue-500'
                        : 'bg-white hover:bg-gray-50 border-gray-200'
                    }`}
                  >
                    {answer.text}
                  </button>
                );
              })}
            </div>
            
            <div className="flex flex-col items-center gap-4 p-4">
              <div className="text-lg font-medium">
                Pontuação: {score}/{questionsAmount}
              </div>
              
              {!isConfirmed ? (
                <Button 
                  onClick={handleConfirm} 
                  disabled={!selectedAnswer}
                  className="w-full max-w-xs py-6 text-lg"
                >
                  <Check className="mr-2" />
                  Confirmar Resposta
                </Button>
              ) : (
                <Button 
                  onClick={questionIndex < questionsAmount ? handleNextQuestion : handleEndQuiz} 
                  className="w-full max-w-xs py-6 text-lg bg-green-600 hover:bg-green-700"
                >
                  {questionIndex < questionsAmount ? 'Próxima Pergunta' : 'Ver Resultado'}
                </Button>
              )}
              <Button 
                onClick={handleExit} 
                className="w-full max-w-xs py-6 text-lg bg-red-600 hover:bg-red-700"
              >
                Sair
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
