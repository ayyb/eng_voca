import QuizReview from "@/ui/quiz/QuizReview";
import { getQuizList } from "@/app/api/actions";
import { QuizAnswer } from "@/app/lib/definitions";

export default async function ReviewPage() {
  //사용자의 퀴즈 결과를 보여준다
  //퀴즈결과를 받아와서 보여줌
  //예제
  const QuizResults = await getQuizList();
  console.log("리뷰 남은거?", QuizResults);
  return (
    <div className="flex flex-col h-screen">
      {/* 상단 영역 */}
      <div className="flex items-center h-20 px-4">
        <h1 className="text-4xl font-bold text-white">Review</h1>
      </div>

      {/* 스크롤 가능한 리뷰 목록 영역 */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {QuizResults.map((item:QuizAnswer, idx:number) => (
          <QuizReview key={idx} item={item} />
        ))}
      </div>
    </div>
  );
}
