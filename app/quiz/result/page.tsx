import Link from "next/link";
import QuizScore from "@/ui/quiz/QuizScore";
import { fetchScore } from "@/app/api/actions";

export const dynamic = 'force-dynamic';

export default async function ResultPage() {
  const result = await fetchScore();
  
  return (
    <div className="bg-customBlue p-4 w-full h-screen flex flex-col">
      {/* 상단 영역 - h-20 고정 */}
      <div className="flex items-center h-20">
      </div>

      {/* 점수 영역 - h-1/2 고정 */}
      <div className="flex justify-center items-center flex-col h-1/2">
        <div className="text-center">
          <p className="font-bold text-6xl mb-5">SCORE</p>
          <QuizScore score={result} />
          <div className="mt-8 space-y-2">
            <p className="text-xl">OMG! Please study harder~</p>
            <p className="text-xl">You can do better than this!</p>
          </div>
        </div>
      </div>

      {/* 버튼 영역 */}
      <div className="flex flex-col space-y-4 w-full">
        <Link href="/quiz/problem">
          <div className="bg-white rounded-lg text-center py-4 font-bold text-xl hover:bg-gray-50">
            Replay
          </div>
        </Link>
        <Link href="/quiz/review">
          <div className="bg-white rounded-lg text-center py-4 font-bold text-xl hover:bg-gray-50">
            Review
          </div>
        </Link>
        <Link href="/home">
          <div className="bg-white rounded-lg text-center py-4 font-bold text-xl hover:bg-gray-50">
            Exit
          </div>
        </Link>
      </div>
    </div>
  );
}
