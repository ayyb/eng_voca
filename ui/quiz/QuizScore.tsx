'use client'

import { useCounterStore } from '@/providers/counter-store-provider'


const QuizScore: React.FC = () => {

const { count, incrementCount, decrementCount } = useCounterStore(
    (state) => state,
  )
  return (
    <>
      <p className="font-bold text-5xl mb-4 text-center">{count} / 20</p>
    </>
  );
};

export default QuizScore;
