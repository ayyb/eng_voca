'use client';
import { PencilIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

interface QuizScoreProps {
  score: {
    score: number;
    total: number;
  };
}

export function QuizScore({ score }: QuizScoreProps) {
  return (
    <div className="quiz_box bg-white p-4 my-4 cursor-pointer rounded-lg text-black flex-1">
      <Link href="/quiz">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-lg font-bold">Quiz</p>
            <p className="text-gray-500 text-sm">
              Latest {score.score}/{score.total}
            </p>
          </div>
          <p className="ml-auto">
            <PencilIcon className="size-6 text-black-500" />
          </p>
        </div>
      </Link>
    </div>
  );
} 