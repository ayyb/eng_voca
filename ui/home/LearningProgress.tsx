'use client';
import { useEffect, useState } from 'react';
import { fetchLearningProgress } from '@/app/api/actions';

export function LearningProgress() {
  const [progress, setProgress] = useState(0);
  const [total, setTotal] = useState(10);

  useEffect(() => {
    async function getProgress() {
      try {
        const data = await fetchLearningProgress();
        setProgress(data.progress);
        setTotal(data.total);
      } catch (error) {
        console.error('Error fetching learning progress:', error);
      }
    }

    getProgress();
  }, []);

  const progressPercentage = ((progress ?? 0) / total) * 100;

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