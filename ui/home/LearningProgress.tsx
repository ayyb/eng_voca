'use client';
import { useEffect, useState } from 'react';
import { fetchLearningProgress } from '@/app/api/actions';

interface ProgressData {
  progress: number;
  total: number;
  date: string;
}

export function LearningProgress() {
  const [progress, setProgress] = useState<number | null>(null);
  const [total, setTotal] = useState<number>(10);
  const [date, setDate] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getProgress() {
      try {
        setIsLoading(true);
        const data = await fetchLearningProgress();
        setProgress(data.progress || 0);
        setTotal(data.total || 10);
        setDate(data.date || new Date().toISOString().split('T')[0]);
      } catch (error) {
        console.error('Error fetching learning progress:', error);
        setProgress(0);
      } finally {
        setIsLoading(false);
      }
    }

    getProgress();
  }, []);

  const progressPercentage = progress !== null ? (progress / total) * 100 : 0;
  const today = new Date().toISOString().split('T')[0];
  const isToday = date === today;
  const isCompleted = progress === total && total > 0;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {isToday ? (
        <>
          <h2 className="text mt-2">
            오늘의 학습 진행도 {`${progress} / ${total}`}
          </h2>
          <div className="w-full bg-white rounded-xl h-6 my-4">
            <div
              className={`h-6 rounded-xl ${isCompleted ? 'bg-green-500' : 'bg-progress'}`}
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          {progress === 0 && (
            <div className="text-sm text-yellow-400 mb-2">
              아직 오늘의 학습을 시작하지 않았습니다!
            </div>
          )}
          {isCompleted && (
            <div className="text-sm text-green-500 font-bold mb-2">
              오늘의 학습을 모두 완료했습니다! 🎉
            </div>
          )}
        </>
      ) : (
        <>
          <h2 className="text mt-2">
            마지막 학습 진행도 ({date}) {`${progress} / ${total}`}
          </h2>
          <div className="w-full bg-white rounded-xl h-6 my-4">
            <div
              className={`h-6 rounded-xl ${progress === total && total > 0 ? 'bg-green-500' : 'bg-progress'}`}
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <div className="text-sm text-yellow-400 mb-2 font-bold">
            오늘의 학습을 시작하세요!
          </div>
        </>
      )}
    </>
  );
} 