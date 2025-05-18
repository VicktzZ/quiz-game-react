import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

type TimerProps = {
  initialTime: number; // in seconds
  onTimeUp?: () => void;
  onTimeExpired?: () => void;
  size?: 'sm' | 'md' | 'lg';
  isPaused?: boolean;
  onPause?: (timeLeft: number) => void;
};

export const Timer = ({
  initialTime,
  onTimeUp,
  onTimeExpired,
  size = 'md',
  isPaused: externalPaused,
  onPause,
}: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState<number>(initialTime);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [prevInitialTime, setPrevInitialTime] = useState<number>(initialTime);

  useEffect(() => {
    if (initialTime !== prevInitialTime) {
      setTimeLeft(initialTime);
      setPrevInitialTime(initialTime);
    }
  }, [initialTime, prevInitialTime]);

  const sizeClasses = {
    sm: 'w-12 h-12 text-sm',
    md: 'w-16 h-16 text-base',
    lg: 'w-24 h-24 text-lg',
  };

  useEffect(() => {
    if (externalPaused !== undefined) {
      setIsPaused(externalPaused);
      if (externalPaused && onPause) {
        onPause(timeLeft);
      }
    }
  }, [externalPaused, onPause, timeLeft]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (timeLeft > 0 && !isPaused) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            onTimeUp?.();
            onTimeExpired?.();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timeLeft, onTimeUp, isPaused]);
  
  useEffect(() => {
    return () => {
      if (onPause && isPaused) {
        onPause(timeLeft);
      }
    };
  }, [isPaused, onPause, timeLeft]);

  const progress = (timeLeft / initialTime) * 100;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const displayTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

  return (
    <div className="relative flex items-center justify-center">
      <motion.div
        className={`${sizeClasses[size]} rounded-full flex items-center justify-center relative`}
        initial={{ scale: 1 }}
        animate={{ scale: timeLeft <= 5 ? [1, 1.1, 1] : 1 }}
        transition={timeLeft <= 5 ? { repeat: 5, duration: 1 } : {}}
      >
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle
            className="text-gray-200"
            strokeWidth="8"
            stroke="currentColor"
            fill="transparent"
            r="45"
            cx="50"
            cy="50"
          />
          <motion.circle
            className={`${timeLeft <= 10 ? 'text-red-500' : 'text-blue-500'}`}
            strokeWidth="8"
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="45"
            cx="50"
            cy="50"
            strokeDasharray="283"
            strokeDashoffset={283 - (283 * progress) / 100}
            initial={{ rotate: -90, scaleX: -1 }}
            style={{ transformOrigin: '50% 50%' }}
            transition={{ duration: 1, ease: 'linear' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`font-bold ${timeLeft <= 10 ? 'text-red-500' : 'text-gray-700'}`}>
            {displayTime}
          </span>
        </div>
      </motion.div>
    </div>
  );
};

export default Timer;