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
    <>
      <div className="p-3 w-full h-full overflow-auto">
        {QuizResults.map((item:QuizAnswer, idx:number) => (
          <QuizReview key={idx} item={item} />
        ))}
      </div>
    </>
  );
}
