'use client'

import { useCounterStore } from '@/providers/counter-store-provider'
import { fetchScore } from '@/app/api/actions'

interface QuizScoreProps {
  score: {
    score: number
    total: number
  }
}

const QuizScore = ({score}:QuizScoreProps) => {
  return (
    <>
      <p className="font-bold text-5xl mb-4 text-center">{score.score} / {score.total}</p>
    </>
  );
};

export default QuizScore;
