import QuizReview from "@/ui/quiz/QuizReview";
import { getQuizList } from "@/app/api/actions";
import { QuizAnswer } from "@/app/lib/definitions";

export const dynamic = 'force-dynamic';

export default async function ReviewPage() {
  //사용자의 퀴즈 결과를 보여준다
  //퀴즈결과를 받아와서 보여줌
  //예제
  const quizList = await getQuizList();
  console.log("리뷰 남은거?", quizList);
  return (
    <div className="p-8 pb-24">  {/* 하단 패딩 추가 */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white">Review</h1>
      </div>

      <div className="space-y-4 overflow-y-auto">  {/* 스크롤 가능한 영역 */}
        {quizList.map((item:QuizAnswer, index:number) => (
          <QuizReview key={index} item={item} />
        ))}
      </div>
    </div>
  );
}
