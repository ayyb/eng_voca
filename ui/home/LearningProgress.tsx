'use client';
import { useEffect, useState } from 'react';

interface LearningProgressProps {
  initialProgress: number;
}

export function LearningProgress({ initialProgress }: LearningProgressProps) {
  const progress = ((initialProgress ?? 0) / 10) * 100;

  return (
    <>
      <h2 className="text mt-2">
        Your learning Progress {`${initialProgress} / 10`}
      </h2>
      <div className="w-full bg-white rounded-xl h-6 my-4">
        <div
          className="bg-progress h-6 rounded-xl"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </>
  );
} 