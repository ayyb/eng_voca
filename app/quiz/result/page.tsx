import Link from "next/link";
export default function ResultPage() {
  return (
    <>
      <div className="p-4 w-full h-full">
        {/* 문제 */}
        <div className="flex flex-col py-3 h-1/2 justify-center">
          <p className="font-bold text-5xl mb-4 text-center">
            SCORE
          </p>
          <p className="font-bold text-5xl mb-4 text-center">
            10 / 20
          </p>
          <p className="text-center">OMG! Please study harder~</p>
          <p className="text-center">You can do better than this!</p>
        </div>
        {/* 선택지 */}
        <div className="flex flex-col space-y-6 w-full">
          <Link href="/quiz/problem">
          <div className="bg-white rounded-lg text-center justify-center items-center py-3 font-bold text-xl">
            Replay
          </div>
          </Link>
          <Link href="/quiz/review">
          <div className="bg-white rounded-lg text-center justify-center items-center py-3 font-bold text-xl">
            Review
          </div>
          </Link>
          <Link href="/home">
          <div className="bg-white rounded-lg text-center justify-center items-center py-3 font-bold text-xl">
            Exit
          </div>
          </Link>
        </div>
      </div>
    </>
  );
}
