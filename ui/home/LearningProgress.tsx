'use client';
import { useEffect, useState } from 'react';
import { fetchLearningProgress } from '@/app/api/actions';

export function LearningProgress() {
  const [progress, setProgress] = useState<number | null>(null);
  const [total, setTotal] = useState<number>(10);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getProgress() {
      try {
        setIsLoading(true);
        const data = await fetchLearningProgress();
        setProgress(data.progress || 0);
        setTotal(data.total || 10);
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h2 className="text mt-2">
        Your learning Progress {`${progress} / ${total}`}
      </h2>
      <div className="w-full bg-white rounded-xl h-6 my-4">
        <div
          className="bg-progress h-6 rounded-xl"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
    </>
  );
} 